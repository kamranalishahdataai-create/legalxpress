import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Brain, Lock, BarChart3, Sparkles } from "lucide-react";
import { useCaseAnalysis, CaseAnalysisResult } from "@/hooks/useCaseAnalysis";
import { AnalysisForm } from "@/components/case-analysis/AnalysisForm";
import { AnalysisResults } from "@/components/case-analysis/AnalysisResults";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";


export default function CaseAnalysisPage() {
  const [caseDescription, setCaseDescription] = useState("");
  const [caseType, setCaseType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  
  const { analyzing, result, analyzeCase } = useCaseAnalysis();

  const handleAnalyze = () => {
    analyzeCase(caseType, jurisdiction, caseDescription);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium font-body">AI-Powered Analysis</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Case Analysis Tool
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Analyze your litigation against Canadian case law 
            precedents to estimate your chances of success.
          </p>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-6 bg-secondary/10 border-y border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">Free Preview Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">Paid Full Report with Strategies</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">Confidential & Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <LegalDisclaimer context="case-analysis" className="mb-10" />
          <div className="grid lg:grid-cols-2 gap-12">
            <AnalysisForm
              caseType={caseType}
              setCaseType={setCaseType}
              jurisdiction={jurisdiction}
              setJurisdiction={setJurisdiction}
              caseDescription={caseDescription}
              setCaseDescription={setCaseDescription}
              onAnalyze={handleAnalyze}
              analyzing={analyzing}
            />
            <AnalysisResults result={result} isSample={false} />
          </div>
        </div>
      </section>
    </Layout>

  );
}
