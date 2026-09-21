import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============ FREE LEGAL DATA SOURCES (Canada only) ============
// All sources below are free / no-API-key (or optional key) public legal databases.
//
// Canada:
//  - CanLII (requires free API key — gracefully skipped without one)
//  - Supreme Court of Canada (SCC) decisions — via Google CSE
//  - Federal Court of Canada decisions — via Google CSE
//  - Google Programmable Search (CSE) — general legal web results

// CanLII — Canadian Legal Information Institute (requires free API key)
async function searchCanLII(query: string, limit = 5) {
  try {
    const apiKey = Deno.env.get("CANLII_API_KEY");
    if (!apiKey) return []; // gracefully skip until key added
    const url = `https://api.canlii.org/v1/caseBrowse/en/?api_key=${apiKey}&resultCount=${limit}&search=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.cases || []).map((c: { title?: string; citation?: string; databaseId?: string; caseId?: { en?: string }; decisionDate?: string }) => ({
      name: c.title || "Unknown",
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

// Google Programmable Search (CSE) — optional, restricted to legal sites
async function searchGoogleCSE(query: string, limit = 5) {
  try {
    const key = Deno.env.get("GOOGLE_CSE_API_KEY");
    const cx = Deno.env.get("GOOGLE_CSE_ID");
    if (!key || !cx) return [];
    const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${encodeURIComponent(query)}&num=${limit}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((it: { title?: string; link?: string; snippet?: string; displayLink?: string }) => ({
      name: it.title || "",
      citation: "",
      court: it.displayLink || "",
      year: "",
      url: it.link || "",
      snippet: it.snippet || "",
      source: `Google (${it.displayLink || "web"})`,
    }));
  } catch (e) {
    console.error("Google CSE error:", e);
    return [];
  }
}

// Supreme Court of Canada decisions (scc-csc.lexum.com) — open, search via CSE
async function searchSCC(query: string, limit = 3) {
  return searchGoogleCSE(`site:scc-csc.lexum.com ${query}`, limit);
}

// Federal Court of Canada decisions (decisions.fct-cf.gc.ca) — open
async function searchFederalCourtCanada(query: string, limit = 3) {
  return searchGoogleCSE(`site:decisions.fct-cf.gc.ca ${query}`, limit);
}


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { caseType, jurisdiction, caseDescription } = await req.json();

    if (!caseType || !jurisdiction || !caseDescription) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    // ========== STEP 1: Gather REAL Canadian precedents from free sources ==========
    const searchQuery = `${caseType} ${caseDescription.slice(0, 200)}`;

    const [canliiResults, sccResults, fctResults, googleResults] = await Promise.all([
      searchCanLII(searchQuery, 8),
      searchSCC(searchQuery, 4),
      searchFederalCourtCanada(searchQuery, 4),
      searchGoogleCSE(`${searchQuery} ${jurisdiction} Canadian case law`, 4),
    ]);

    const realPrecedents = [
      ...canliiResults, ...sccResults, ...fctResults, ...googleResults,
    ];
    const precedentContext = realPrecedents.length > 0
      ? `\n\nVerified Canadian precedents from authoritative free sources (use these as the basis for similarCases — do NOT fabricate citations):\n${realPrecedents.map((p, i) => `${i + 1}. [${p.source}] ${p.name} — ${p.citation} (${p.court} ${p.year})\n   URL: ${p.url}\n   Snippet: ${p.snippet}`).join("\n\n")}`
      : "\n\n(No live precedent data available — base analysis on well-known established Canadian case law for this jurisdiction.)";

    const systemPrompt = `You are an expert legal analyst specializing in Canadian case law. Analyze the case and provide:

1. Estimated win rate (40-85%)
2. 5-8 relevant precedent cases — PREFER the verified precedents provided in the user prompt; supplement with well-known established cases only when needed
3. Key factors affecting the outcome
4. Strategic recommendations

For each precedent: full citation, year, court, outcome, relevance %, summary, similarities, differences, conclusion, and sourceUrl (use the verified URL when provided).

IMPORTANT: Respond using the analyze_case function. Order cases by relevance (highest first). When using a verified precedent, copy its sourceUrl exactly.`;

    const userPrompt = `Analyze this legal case:

Case Type: ${caseType}
Jurisdiction: ${jurisdiction}

Case Description:
${caseDescription}
${precedentContext}

Provide a comprehensive analysis grounded in the verified precedents above where possible.`;

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    let response;
    try {
      response = await client.messages.create({
        model: "claude-opus-4-8",
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
                winRate: { type: "number", description: "Estimated win rate percentage (40-85)" },
                winRateReasoning: { type: "string" },
                similarCases: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      citation: { type: "string" },
                      year: { type: "string" },
                      court: { type: "string" },
                      result: { type: "string", enum: ["Won", "Lost", "Settled"] },
                      relevance: { type: "number" },
                      summary: { type: "string" },
                      similarities: { type: "string" },
                      differences: { type: "string" },
                      conclusion: { type: "string" },
                      sourceUrl: { type: "string", description: "Direct link to case (CanLII/Google) when known; empty string if unknown" },
                      source: { type: "string", description: "CanLII | Google | AI" },
                    },
                    required: ["name", "citation", "year", "court", "result", "relevance", "summary", "similarities", "differences", "conclusion", "sourceUrl", "source"],
                    additionalProperties: false,
                  },
                },
                keyFactors: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      factor: { type: "string" },
                      impact: { type: "string", enum: ["positive", "negative", "neutral"] },
                      description: { type: "string" },
                    },
                    required: ["factor", "impact", "description"],
                    additionalProperties: false,
                  },
                },
                recommendations: { type: "array", items: { type: "string" } },
                legalPrinciples: { type: "array", items: { type: "string" } },
              },
              required: ["winRate", "winRateReasoning", "similarCases", "keyFactors", "recommendations", "legalPrinciples"],
              additionalProperties: false,
            },
          },
        },
      });
    } catch (aiError) {
      if (aiError instanceof Anthropic.RateLimitError) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a few moments." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (aiError instanceof Anthropic.APIError) {
        console.error("Anthropic API error:", aiError.status, aiError.message);
      }
      throw new Error("AI analysis failed");
    }

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("Invalid AI response format");
    }

    const analysis = JSON.parse(textBlock.text);
    if (analysis.similarCases) {
      analysis.similarCases.sort((a: { relevance: number }, b: { relevance: number }) => b.relevance - a.relevance);
    }
    // Attach the raw verified sources so the UI can display "Verified by" badges
    analysis.verifiedSources = realPrecedents;

    // Optionally save to DB
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabase.auth.getUser(token);
        if (userData?.user) {
          await supabase.from("case_analyses").insert({
            user_id: userData.user.id,
            case_type: caseType,
            jurisdiction,
            case_description: caseDescription,
            preview_result: analysis,
          });
        }
      } catch (dbError) {
        console.error("Failed to save analysis:", dbError);
      }
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-case error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
