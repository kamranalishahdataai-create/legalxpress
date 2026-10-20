import { Layout } from "@/components/layout/Layout";
import { AnalysisResults } from "@/components/case-analysis/AnalysisResults";
import { sampleCaseAnalysis } from "@/data/sampleCaseAnalysis";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { RESEARCH_PACK } from "@/data/caseResearch";
import { useNavigate } from "react-router-dom";

export default function CaseAnalysisPreviewPage() {
  const navigate = useNavigate();
  return (
    <Layout>
      <section className="py-8 bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Button variant="ghost" className="mb-2 -ml-2" onClick={() => navigate("/case-analysis")}><ArrowLeft className="h-4 w-4 mr-2" />Back to the research tool</Button>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Live sample · report format</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Sample research report</h1>
            <p className="text-muted-foreground mt-1">An example of the report format, using published decisions.</p>
          </div>
          <Button onClick={() => navigate("/checkout/case-analysis")}><Search className="h-4 w-4 mr-2" />Get a {RESEARCH_PACK.reports}-report pack</Button>
        </div>
      </section>
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnalysisResults result={sampleCaseAnalysis} isSample />
        </div>
      </section>
    </Layout>
  );
}
