import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileSearch, Link2, ScrollText } from "lucide-react";
import { useCaseAnalysis, emptyFilters, type ResearchFilters } from "@/hooks/useCaseAnalysis";
import { AnalysisForm } from "@/components/case-analysis/AnalysisForm";
import { AnalysisResults, CollapsibleClaimDrafter } from "@/components/case-analysis/AnalysisResults";
import { ResearchDisclosures } from "@/components/case-analysis/ResearchDisclosures";
import { PACK_COPY, RESEARCH_TOOL_NAME } from "@/data/caseResearch";

export default function CaseAnalysisPage() {
  const [filters, setFilters] = useState<ResearchFilters>(emptyFilters);
  const { analyzing, result, analyzeCase } = useCaseAnalysis();

  return (
    <Layout>
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-4">AI research engine · published Canadian decisions</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <FileSearch className="h-4 w-4" />
            <span className="text-sm font-medium">Automated research · not reviewed by a lawyer</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">{RESEARCH_TOOL_NAME}</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            See how Canadian courts have decided cases on the same issue. Research in minutes; bring it to your consultation.
          </p>
        </div>
      </section>

      <section className="py-6 bg-secondary/10 border-y border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 text-foreground">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"><Link2 className="h-4 w-4 text-forest" />Every case linked to the public decision</span>
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"><ScrollText className="h-4 w-4 text-forest" />Outcome statistics describe past decisions, not your chances</span>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ResearchDisclosures className="mb-6" />
          <p className="text-sm text-muted-foreground mb-10 max-w-4xl">{PACK_COPY}</p>
          <div className="grid lg:grid-cols-2 gap-12">
            <AnalysisForm filters={filters} setFilters={setFilters} onAnalyze={() => analyzeCase(filters)} analyzing={analyzing} />
            <AnalysisResults result={result} showClaimDrafter={false} />
          </div>
          <div className="mt-14 max-w-3xl mx-auto">
            <CollapsibleClaimDrafter />
          </div>
        </div>
      </section>
    </Layout>
  );
}
