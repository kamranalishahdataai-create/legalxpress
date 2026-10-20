import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PACK_TERMS_SHORT, RESEARCH_PACK, STAT_CAVEAT } from "@/data/caseResearch";

export function CaseAnalysisTeaser() {
  const consoleLines = [
    { prompt: "›", value: "area_of_law: contract_dispute" },
    { prompt: "›", value: "jurisdiction: ontario · federal · scc" },
    { prompt: "›", value: "sources: canlii + public court records" },
    { prompt: "✓", value: "6 decisions matched and verified", ok: true },
    { prompt: "✓", value: "every case linked to the public judgment", ok: true },
  ];
  const items = [
    { title: "Matched decisions", text: "See how Canadian courts have decided cases on the same issue." },
    { title: "Every case linked", text: "Each decision links to the public judgment so you can check it." },
    { title: "Research summary", text: "Research in minutes; bring it to your consultation." },
  ];
  return (
    <section id="case-analysis" className="section-y bg-muted/40 border-y border-border">
      <div className="container gutter-x">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-forest mb-3">Case Law Research Tool</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-5">See how courts decided cases on the same issue.</h2>
            <p className="text-muted-foreground mb-3">Automated research from published Canadian decisions. Generated automatically; not reviewed by a lawyer, and not an assessment of your case.</p>
            <p className="text-sm text-muted-foreground mb-7">{STAT_CAVEAT.replace("This describes", "Outcome statistics describe")}</p>
            <div className="flex flex-wrap gap-3"><Button className="gap-2" asChild><Link to="/case-analysis/preview">See a sample report <ArrowRight className="h-4 w-4" /></Link></Button><Button variant="outline" asChild><Link to="/case-analysis">Learn more</Link></Button></div>
          </div>
          <div>
            <div className="rounded-xl overflow-hidden border border-foreground/15 shadow-xl mb-6">
              <div className="bg-foreground text-background/70 px-4 py-2.5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-forest-light" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-background/25" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/60 ml-2">case-law-research — query</span>
              </div>
              <div className="bg-foreground/95 px-5 py-4 font-mono text-xs leading-relaxed space-y-1.5">
                {consoleLines.map((line) => (
                  <p key={line.value} className={line.ok ? "text-forest-light" : "text-background/75"}>
                    <span className={line.ok ? "text-forest-light" : "text-gold-light"}>{line.prompt}</span> {line.value}
                  </p>
                ))}
                <p className="text-background/40 pt-1 border-t border-background/10 mt-2">
                  <span className="animate-pulse text-gold-light">▍</span> running report…
                </p>
              </div>
            </div>
            {items.map((item) => (
              <div key={item.title} className="flex gap-4 py-4 border-t border-border">
                <div>
                  <h3 className="font-display text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
            <p className="text-sm text-muted-foreground mt-4">{RESEARCH_PACK.reports}-report pack: <span className="text-foreground font-semibold">${RESEARCH_PACK.standardPrice.toFixed(2)} + HST</span> standard, <span className="text-foreground font-semibold">${RESEARCH_PACK.memberPrice.toFixed(2)} + HST</span> for members. {PACK_TERMS_SHORT}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
