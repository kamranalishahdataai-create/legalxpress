import { AlertTriangle } from "lucide-react";
import { RESEARCH_DISCLOSURES } from "@/data/caseResearch";

export function ResearchDisclosures({ className = "" }: { className?: string }) {
  return (
    <aside className={`rounded-lg border border-secondary/30 bg-secondary/5 p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-secondary mt-0.5" />
        <div>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Before you use this research</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
            {RESEARCH_DISCLOSURES.map((d) => <li key={d}>{d}</li>)}
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            How the numbers are produced: <a href="/case-analysis/methodology" className="text-secondary underline underline-offset-2">methodology</a>.
            {" "}To review this research with a lawyer, <a href="/book" className="text-secondary underline underline-offset-2">book a consultation</a>.
          </p>
        </div>
      </div>
    </aside>
  );
}
