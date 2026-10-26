import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, FileText, ChevronDown, ChevronUp, Gavel, ExternalLink, HelpCircle, FileSearch } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MemoDialog } from "./MemoDialog";
import { ResearchDisclosures } from "./ResearchDisclosures";
import { ClaimDrafterPanel } from "./ClaimDrafterPanel";
import type { ResearchResult, MatchedDecision } from "@/hooks/useCaseAnalysis";
import { OUTCOME_LABEL, outcomeFrequency, outcomeLine } from "@/data/caseResearch";

interface AnalysisResultsProps {
  result: ResearchResult | null;
  isSample?: boolean;
  showClaimDrafter?: boolean;
}

function DecisionCard({ d, index }: { d: MatchedDecision; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <CollapsibleTrigger className="w-full">
          <div className="p-4 flex items-start justify-between gap-3 hover:bg-muted/50 transition-colors text-left">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-mono text-[11px] text-muted-foreground">#{String(index + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-forest"><Scale className="h-3 w-3" />Similarity to your search: {d.similarity}%</span>
                <span className="hidden sm:inline-block h-1 w-16 rounded-full bg-muted overflow-hidden" aria-hidden="true"><span className="block h-full rounded-full bg-forest" style={{ width: `${d.similarity}%` }} /></span>
              </div>
              <div className="font-medium text-foreground">{d.name}</div>
              <div className="font-mono text-[11px] text-muted-foreground mt-1">{d.citation} • {d.court} ({d.year})</div>
              <div className="mt-2"><span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground">{OUTCOME_LABEL[d.outcome]}</span></div>
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-3 border-t border-border pt-4 text-sm">
            <div><h5 className="font-medium mb-1 flex items-center gap-2"><FileText className="h-4 w-4 text-secondary" />Summary of the decision</h5><p className="text-muted-foreground">{d.summary}</p></div>
            <div><h5 className="font-medium mb-1 flex items-center gap-2"><Gavel className="h-4 w-4 text-secondary" />What the court decided</h5><p className="text-muted-foreground">{d.conclusion}</p></div>
            {d.url && <a href={d.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-secondary underline underline-offset-2">Read the public decision <ExternalLink className="h-3 w-3" /></a>}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function CollapsibleClaimDrafter() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="p-6 rounded-lg border border-border bg-card text-center">
        <h4 className="font-display font-semibold mb-2 text-foreground">Decided to sue? Draft your claim document</h4>
        <p className="text-sm text-muted-foreground mb-4">Members can enter their case details and download a document arranged in the structure of an Ontario Plaintiff's Claim (Form 7A) or Statement of Claim (Form 14A). Automated formatting; not lawyer-reviewed; not filed.</p>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full gap-2">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {open ? "Hide the Claim Drafter" : "Open the Claim Drafter"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mt-4">
          <ClaimDrafterPanel />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AnalysisResults({ result, isSample = false, showClaimDrafter = true }: AnalysisResultsProps) {
  const [summaryOpen, setSummaryOpen] = useState(false);

  if (!result) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
        <div className="mx-auto mb-4 inline-flex items-center justify-center h-16 w-16 rounded-full bg-forest/10"><FileSearch className="h-8 w-8 text-forest" /></div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">Your matched decisions appear here</h3>
        <p className="text-muted-foreground">See a sample report, or buy a report pack to run your own search.</p>
      </div>
    );
  }

  const stat = outcomeFrequency(result.decisions.map((d) => d.outcome));

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="font-display">Research results</CardTitle>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-1">Automated output · verified against public sources</p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-forest/10 text-forest">{isSample ? "Sample report" : "Research report"}</span>
          </div>
          {isSample && <p className="mt-2 text-sm text-muted-foreground">Sample search: contract disputes, Supreme Court of Canada. It shows the report format only.</p>}
        </CardHeader>
        <CardContent className="space-y-6">
          <ResearchDisclosures />

          <div className="p-5 rounded-lg border border-border bg-card">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Outcome frequency in matched decisions</div>
            <p className="text-foreground">{outcomeLine(stat, result.scopeLabel)}</p>
            {stat.excludedMixed > 0 && <p className="text-xs text-muted-foreground mt-2">{stat.excludedMixed} decision(s) with a mixed outcome are listed but not counted.</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Matched decisions ({result.decisions.length})</div>
              <span className="font-mono text-[11px] text-forest">Ordered by similarity</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Similarity measures how closely a decision's text and issues match your search filters. It does not measure legal merit.</p>
            {result.decisions.length === 0
              ? <p className="text-sm text-muted-foreground">No decision could be verified against a public source for this search, so none are shown.</p>
              : <div className="space-y-3">{result.decisions.map((d, i) => <DecisionCard key={d.citation + i} d={d} index={i} />)}</div>}
          </div>

          {result.factorsConsidered.length > 0 && (
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Factors the courts considered in these decisions</div>
              <div className="space-y-2">
                {result.factorsConsidered.map((f) => (
                  <div key={f.factor} className="p-3 rounded-lg border border-border"><div className="font-medium text-sm">{f.factor}</div><div className="text-xs text-muted-foreground">{f.description}</div></div>
                ))}
              </div>
            </div>
          )}

          {result.legalPrinciples.length > 0 && (
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Legal principles stated in these decisions</div>
              <div className="space-y-2">{result.legalPrinciples.map((p) => <div key={p} className="flex gap-2 p-3 rounded-lg bg-muted/50"><Scale className="h-4 w-4 text-secondary shrink-0 mt-0.5" /><p className="text-sm">{p}</p></div>)}</div>
            </div>
          )}

          {result.questionsForLawyer.length > 0 && (
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Questions to raise with a lawyer</div>
              <div className="space-y-2">{result.questionsForLawyer.map((q) => <div key={q} className="flex gap-2 p-3 rounded-lg bg-secondary/5 border border-secondary/10"><HelpCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /><p className="text-sm">{q}</p></div>)}</div>
            </div>
          )}

          <Button className="w-full" onClick={() => setSummaryOpen(true)}><FileText className="h-4 w-4 mr-2" />Download research summary</Button>

          <div className="p-6 rounded-xl bg-foreground text-background text-center">
            <h4 className="font-display font-semibold mb-2">Review this research with a lawyer</h4>
            <p className="text-sm text-background/75 mb-4">Book a consultation to discuss how these decisions may or may not relate to your situation.</p>
            <Button variant="outline" className="w-full border-gold/40 bg-transparent text-gold-light hover:bg-gold/10" asChild><a href="/book">Book a consultation</a></Button>
          </div>

          {showClaimDrafter && <CollapsibleClaimDrafter />}
        </CardContent>
      </Card>
      <MemoDialog open={summaryOpen} onOpenChange={setSummaryOpen} result={result} />
    </>
  );
}
