import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODEL = "claude-opus-4-8";
const OUTCOMES = ["succeeded", "did_not_succeed", "settled", "mixed"] as const;

interface SourceRecord {
  name: string;
  citation: string;
  court: string;
  year: string;
  url: string;
  snippet: string;
  source: string;
}

// ============ PUBLIC LEGAL SOURCES (Canada only) ============
//  - CanLII API (requires CANLII_API_KEY — skipped without one)
//  - Supreme Court of Canada and Federal Court decisions — via Google CSE
//  - Google Programmable Search (CSE) — limited to court / CanLII decision hosts
// Without keys nothing is retrieved, and nothing is shown.

async function searchCanLII(query: string, limit = 5): Promise<SourceRecord[]> {
  try {
    const apiKey = Deno.env.get("CANLII_API_KEY");
    if (!apiKey) return [];
    const url = `https://api.canlii.org/v1/caseBrowse/en/?api_key=${apiKey}&resultCount=${limit}&search=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.cases || []).map((c: { title?: string; citation?: string; databaseId?: string; caseId?: { en?: string }; decisionDate?: string }) => ({
      name: c.title || "",
      citation: c.citation || "",
      court: c.databaseId || "",
      year: c.decisionDate ? c.decisionDate.slice(0, 4) : "",
      url: c.caseId?.en ? `https://www.canlii.org/en/${c.databaseId}/doc/${c.caseId.en}/` : "",
      snippet: "",
      source: "CanLII",
    }));
  } catch (e) {
    console.error("CanLII error:", e);
    return [];
  }
}

async function searchGoogleCSE(query: string, limit = 5): Promise<SourceRecord[]> {
  try {
    const key = Deno.env.get("GOOGLE_CSE_API_KEY");
    const cx = Deno.env.get("GOOGLE_CSE_ID");
    if (!key || !cx) return [];
    const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${encodeURIComponent(query)}&num=${limit}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((it: { title?: string; link?: string; snippet?: string; displayLink?: string }) => {
      const text = `${it.title || ""} ${it.snippet || ""}`;
      const citation = text.match(NEUTRAL_CITATION)?.[0] || "";
      return {
        name: it.title || "",
        citation,
        court: it.displayLink || "",
        year: citation ? citation.slice(0, 4) : "",
        url: it.link || "",
        snippet: it.snippet || "",
        source: `Google (${it.displayLink || "web"})`,
      };
    });
  } catch (e) {
    console.error("Google CSE error:", e);
    return [];
  }
}

const searchSCC = (q: string, limit = 3) => searchGoogleCSE(`site:scc-csc.lexum.com ${q}`, limit);
const searchFederalCourtCanada = (q: string, limit = 3) => searchGoogleCSE(`site:decisions.fct-cf.gc.ca ${q}`, limit);

// ============ VERIFICATION ============
// Neutral citation, e.g. "2019 SCC 65", "2021 ONCA 123", "2018 FC 1234".
const NEUTRAL_CITATION = /\b(?:19|20)\d{2}\s+[A-Z][A-Za-z]{1,9}\s+\d{1,5}\b/g;

// Hosts that publish court/tribunal decisions. Anything else (blogs, firm sites,
// news) is never treated as a decision record.
const DECISION_HOSTS = [
  "canlii.org",
  "scc-csc.lexum.com",
  "decisions.scc-csc.ca",
  "decisions.fct-cf.gc.ca",
  "decisions.fca-caf.gc.ca",
  "ontariocourts.ca",
  "courts.gov.bc.ca",
  "bccourts.ca",
  "albertacourts.ca",
  "courtsnl.ca",
  "courts.ns.ca",
  "tcc-cci.gc.ca",
];

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const normCitation = (s: string) => s.toUpperCase().replace(/\s+/g, " ").trim();

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isDecisionHost(url: string): boolean {
  const h = hostOf(url);
  return !!h && DECISION_HOSTS.some((d) => h === d || h.endsWith(`.${d}`));
}

// Token overlap between two case names (style of cause), 0..1.
function nameSimilarity(a: string, b: string): number {
  const stop = new Set(["v", "vs", "the", "of", "and", "et", "al", "inc", "ltd", "re", "canlii", "decision"]);
  const ta = new Set(norm(a).split(" ").filter((t) => t.length > 1 && !stop.has(t)));
  const tb = new Set(norm(b).split(" ").filter((t) => t.length > 1 && !stop.has(t)));
  if (!ta.size || !tb.size) return 0;
  let hit = 0;
  ta.forEach((t) => tb.has(t) && hit++);
  return hit / Math.min(ta.size, tb.size);
}

// A returned decision is verified only if the model's echo of the record's name
// and citation matches the retrieved record it points at.
function matchesRecord(src: SourceRecord, echoedName: string, echoedCitation: string): boolean {
  if (src.citation && echoedCitation) {
    return normCitation(src.citation) === normCitation(echoedCitation);
  }
  return nameSimilarity(src.name, echoedName) >= 0.6;
}

// Every neutral citation mentioned in free text must belong to a retrieved record.
function unverifiedCitations(text: string, known: Set<string>): string[] {
  return (text.match(NEUTRAL_CITATION) || []).map(normCitation).filter((c) => !known.has(c));
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await req.json();
    const areaOfLaw = String(body.areaOfLaw || "").slice(0, 80);
    const jurisdiction = String(body.jurisdiction || "").slice(0, 40);
    const issues: string[] = Array.isArray(body.issues) ? body.issues.slice(0, 8).map((i: unknown) => String(i).slice(0, 60)) : [];
    const courtLevel = String(body.courtLevel || "any").slice(0, 20);
    const dateRange = String(body.dateRange || "any").slice(0, 10);
    const partyType = String(body.partyType || "any").slice(0, 30);
    // Keywords are used only for retrieval and are never stored or echoed back.
    const keywords = String(body.keywords || "").slice(0, 120);
    if (!areaOfLaw || !jurisdiction) return json({ error: "Missing required filters" }, 400);

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not configured");

    const searchQuery = [areaOfLaw, ...issues, keywords].filter(Boolean).join(" ");
    const [canlii, scc, fct, google] = await Promise.all([
      searchCanLII(searchQuery, 10),
      searchSCC(searchQuery, 5),
      searchFederalCourtCanada(searchQuery, 5),
      searchGoogleCSE(`${searchQuery} ${jurisdiction} decision`, 5),
    ]);
    const retrieved = [...canlii, ...scc, ...fct, ...google];

    // Keep only records on a decision host, de-duplicated by URL and citation.
    const seenKeys = new Set<string>();
    const sources = retrieved.filter((p) => {
      if (!p.url || !isDecisionHost(p.url)) return false;
      const keys = [p.url.replace(/[#?].*$/, "").replace(/\/$/, "").toLowerCase()];
      if (p.citation) keys.push(normCitation(p.citation));
      if (keys.some((k) => seenKeys.has(k))) return false;
      keys.forEach((k) => seenKeys.add(k));
      return true;
    });

    const filters = { areaOfLaw, issues, jurisdiction, courtLevel, dateRange, partyType };
    const emptyReport = { decisions: [], factorsConsidered: [], questionsForLawyer: [], legalPrinciples: [], scopeLabel: "" };
    if (sources.length === 0) {
      console.log("analyze-case: no public sources retrieved", { retrieved: retrieved.length });
      return json(emptyReport);
    }

    const systemPrompt = `You are a case-law research assistant. You describe published decisions only.
Never estimate anyone's chances, never give a win rate or probability, never recommend a strategy, and never refer to the user's case or facts.
Use ONLY the numbered source records provided. Do not mention, cite or rely on any decision that is not in the list, even if you know of it.
Skip any record that is not a court or tribunal decision, or that you cannot describe from its title and snippet.
For each decision you return, give its index, copy its name and citation exactly as listed (empty string if none is listed), a neutral summary, what the court decided, a similarity score (0-100) measuring how closely its text and issues match the search filters, and the outcome for the claimant/appellant: succeeded, did_not_succeed, settled, or mixed (use mixed whenever unclear).
Also list factors the courts considered (descriptive, drawn from the listed decisions), legal principles stated in them, and neutral questions a person could raise with a lawyer. Do not include any citation in those lists that is not in the source records.`;

    const userPrompt = `Search filters: ${JSON.stringify(filters)}

Source records:
${sources.map((p, i) => `[${i}] ${p.name} | citation: ${p.citation || "(none listed)"} | ${p.court} ${p.year} | ${p.url}\n${p.snippet}`).join("\n\n")}`;

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
    let response;
    try {
      response = await client.messages.create({
        model: MODEL,
        max_tokens: 16000,
        thinking: { type: "adaptive" },
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
        output_config: {
          format: {
            type: "json_schema",
            schema: {
              type: "object",
              properties: {
                decisions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      sourceIndex: { type: "integer" },
                      name: { type: "string" },
                      citation: { type: "string" },
                      outcome: { type: "string", enum: [...OUTCOMES] },
                      similarity: { type: "number" },
                      summary: { type: "string" },
                      conclusion: { type: "string" },
                    },
                    required: ["sourceIndex", "name", "citation", "outcome", "similarity", "summary", "conclusion"],
                    additionalProperties: false,
                  },
                },
                factorsConsidered: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: { factor: { type: "string" }, description: { type: "string" } },
                    required: ["factor", "description"],
                    additionalProperties: false,
                  },
                },
                legalPrinciples: { type: "array", items: { type: "string" } },
                questionsForLawyer: { type: "array", items: { type: "string" } },
              },
              required: ["decisions", "factorsConsidered", "legalPrinciples", "questionsForLawyer"],
              additionalProperties: false,
            },
          },
        },
      });
    } catch (aiError) {
      if (aiError instanceof Anthropic.RateLimitError) {
        return json({ error: "Rate limit exceeded. Please try again in a few moments." }, 429);
      }
      if (aiError instanceof Anthropic.APIError) {
        console.error("Anthropic API error:", aiError.status, aiError.message);
      }
      throw new Error("Research failed");
    }

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") throw new Error("Invalid AI response format");
    const raw = JSON.parse(textBlock.text);

    // ---- Post-generation verification ----
    // Neutral citations found anywhere in a retrieved record (e.g. "2019 SCC 65" inside "2019 SCC 65 (CanLII)").
    const knownCitations = new Set(
      sources.flatMap((s) => `${s.citation} ${s.name} ${s.snippet}`.match(NEUTRAL_CITATION) || []).map(normCitation),
    );
    const withheld: { reason: string; sourceIndex?: number; name?: string }[] = [];
    const used = new Set<number>();

    type RawDecision = { sourceIndex: number; name: string; citation: string; outcome: string; similarity: number; summary: string; conclusion: string };
    const decisions = ((raw.decisions || []) as RawDecision[])
      .filter((d) => {
        const src = Number.isInteger(d.sourceIndex) ? sources[d.sourceIndex] : undefined;
        if (!src) return withheld.push({ reason: "no_matching_record", name: d.name }) && false;
        if (used.has(d.sourceIndex)) return withheld.push({ reason: "duplicate", sourceIndex: d.sourceIndex }) && false;
        if (!matchesRecord(src, d.name || "", d.citation || "")) {
          return withheld.push({ reason: "name_or_citation_mismatch", sourceIndex: d.sourceIndex, name: d.name }) && false;
        }
        if (unverifiedCitations(`${d.summary} ${d.conclusion}`, knownCitations).length) {
          return withheld.push({ reason: "cites_unretrieved_decision", sourceIndex: d.sourceIndex }) && false;
        }
        used.add(d.sourceIndex);
        return true;
      })
      .map((d) => {
        const src = sources[d.sourceIndex];
        // Identifying fields always come from the retrieved record, never the model.
        return {
          name: src.name,
          citation: src.citation,
          year: src.year,
          court: src.court,
          url: src.url,
          source: src.source,
          outcome: (OUTCOMES as readonly string[]).includes(d.outcome) ? d.outcome : "mixed",
          similarity: Math.max(0, Math.min(100, Math.round(Number(d.similarity) || 0))),
          summary: d.summary,
          conclusion: d.conclusion,
        };
      })
      .sort((a, b) => b.similarity - a.similarity);

    const clean = (s: string) => unverifiedCitations(s, knownCitations).length === 0;
    const factorsConsidered = (raw.factorsConsidered || []).filter((f: { factor: string; description: string }) => clean(`${f.factor} ${f.description}`));
    const legalPrinciples = (raw.legalPrinciples || []).filter(clean);
    const questionsForLawyer = (raw.questionsForLawyer || []).filter(clean);

    const report = decisions.length
      ? { decisions, factorsConsidered, legalPrinciples, questionsForLawyer, scopeLabel: "" }
      : emptyReport;

    const verification = {
      retrieved: retrieved.length,
      eligibleSources: sources.length,
      returnedByModel: (raw.decisions || []).length,
      verified: decisions.length,
      withheld,
      droppedListItems:
        (raw.factorsConsidered || []).length - factorsConsidered.length +
        (raw.legalPrinciples || []).length - legalPrinciples.length +
        (raw.questionsForLawyer || []).length - questionsForLawyer.length,
    };
    console.log("analyze-case verification", JSON.stringify(verification));

    // Audit log: filters, model version, sources retrieved, verification and output. Keywords are not stored.
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
        const { data: userData } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
        if (userData?.user) {
          await supabase.from("case_analyses").insert({
            user_id: userData.user.id,
            case_type: areaOfLaw,
            jurisdiction,
            case_description: "[not stored]",
            preview_result: { ...report, audit: { model: MODEL, filters, sources, verification, generatedAt: new Date().toISOString() } },
          });
        }
      } catch (dbError) {
        console.error("Failed to log report:", dbError);
      }
    }

    return json(report);
  } catch (error) {
    console.error("analyze-case error:", error);
    return json({ error: error instanceof Error ? error.message : "Research failed" }, 500);
  }
});
