import { Layout } from "@/components/layout/Layout";
import { AnalysisResults } from "@/components/case-analysis/AnalysisResults";
import { sampleCaseAnalysis } from "@/data/sampleCaseAnalysis";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CaseAnalysisPreviewPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header */}
      <section className="py-8 bg-secondary/10 border-b border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Button
                variant="ghost"
                className="mb-2 -ml-2"
                onClick={() => navigate("/case-analysis")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Case Analysis
              </Button>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Sample Case Analysis Preview
              </h1>
              <p className="text-muted-foreground font-body mt-1">
                This is a demonstration of our AI-powered analysis capabilities
              </p>
            </div>
            <Button
              className="bg-secondary hover:bg-secondary/90"
              onClick={() => navigate("/checkout/case-analysis")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Get Your Full Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <LegalDisclaimer context="case-analysis" className="mb-8" />
          <AnalysisResults result={sampleCaseAnalysis} isSample={true} />
        </div>
      </section>

    </Layout>
  );
}
