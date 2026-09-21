import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Lock, Check, TrendingUp, TrendingDown, Minus, Brain, 
  Scale, FileText, ChevronDown, ChevronUp, Mail, Gavel,
  ArrowUpRight, ArrowDownRight, Equal
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MemoDialog } from "./MemoDialog";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";

import type { CaseAnalysisResult, SimilarCase } from "@/hooks/useCaseAnalysis";

interface AnalysisResultsProps {
  result: CaseAnalysisResult | null;
  isSample?: boolean;
}

function CaseCard({ caseItem, index }: { caseItem: SimilarCase; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const getResultColor = (result: string) => {
    switch (result) {
      case "Won":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Settled":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <CollapsibleTrigger className="w-full">
          <div className="p-4 flex items-start justify-between hover:bg-muted/50 transition-colors">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                <div className="flex items-center gap-1 text-xs text-secondary font-medium">
                  <Scale className="h-3 w-3" />
                  {caseItem.relevance}% relevance
                </div>
              </div>
              <div className="font-medium text-foreground font-body">
                {caseItem.name}
              </div>
              <div className="text-xs text-muted-foreground font-body mt-1">
                {caseItem.citation} • {caseItem.court} ({caseItem.year})
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getResultColor(caseItem.result)}`}>
                {caseItem.result}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
            {/* Summary */}
            <div>
              <h5 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                <FileText className="h-4 w-4 text-secondary" />
                Case Summary
              </h5>
              <p className="text-sm text-muted-foreground font-body">
                {caseItem.summary}
              </p>
            </div>

            {/* Similarities */}
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h5 className="text-sm font-medium text-green-700 dark:text-green-400 mb-1 flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Similarities to Your Case
              </h5>
              <p className="text-sm text-green-600 dark:text-green-300 font-body">
                {caseItem.similarities}
              </p>
            </div>

            {/* Differences */}
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h5 className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4" />
                Differences from Your Case
              </h5>
              <p className="text-sm text-amber-600 dark:text-amber-300 font-body">
                {caseItem.differences}
              </p>
            </div>

            {/* Conclusion */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <h5 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                <Gavel className="h-4 w-4 text-primary" />
                Court's Conclusion
              </h5>
              <p className="text-sm text-muted-foreground font-body">
                {caseItem.conclusion}
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function AnalysisResults({ result, isSample = false }: AnalysisResultsProps) {
  const [memoDialogOpen, setMemoDialogOpen] = useState(false);

  if (!result) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <Brain className="h-16 w-16 text-secondary/30 mx-auto mb-4" />
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          AI Analysis Ready
        </h3>
        <p className="text-muted-foreground font-body">
          Click "Free Analysis Preview" to see a sample analysis, 
          or purchase a full analysis tailored to your case.
        </p>
      </div>
    );
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-amber-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800";
      case "negative":
        return "bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800";
      default:
        return "bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display">Analysis Results</CardTitle>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isSample 
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                : "bg-secondary/10 text-secondary"
            }`}>
              {isSample ? "Sample Preview" : "Full Report"}
            </div>
          </div>
          {isSample && (
            <div className="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This is a sample analysis of a contract dispute case. 
                Purchase a full analysis to get results tailored to your specific case.
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Win Rate */}
          <div className="p-6 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20">
            <div className="text-sm text-muted-foreground font-body mb-2">
              Estimated Win Rate
            </div>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-display font-bold text-secondary">
                {result.winRate}%
              </div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-copper-light rounded-full transition-all duration-1000"
                    style={{ width: `${result.winRate}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-body mt-3">
              {result.winRateReasoning}
            </p>
          </div>

          {/* Key Factors */}
          <div>
            <div className="text-sm text-muted-foreground font-body mb-3">
              Key Factors
            </div>
            <div className="space-y-2">
              {result.keyFactors.map((factor, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${getImpactColor(factor.impact)}`}
                >
                  {getImpactIcon(factor.impact)}
                  <div>
                    <div className="font-medium text-foreground font-body text-sm">
                      {factor.factor}
                    </div>
                    <div className="text-xs text-muted-foreground font-body">
                      {factor.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Principles */}
          {result.legalPrinciples && result.legalPrinciples.length > 0 && (
            <div>
              <div className="text-sm text-muted-foreground font-body mb-3">
                Applicable Legal Principles
              </div>
              <div className="space-y-2">
                {result.legalPrinciples.map((principle, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <Scale className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-body">{principle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Cases - Full Detail */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground font-body">
                Relevant Case Law ({result.similarCases.length} cases)
              </div>
              <span className="text-xs text-secondary">Ordered by relevance</span>
            </div>
            <div className="space-y-3">
              {result.similarCases.map((caseItem, i) => (
                <CaseCard key={i} caseItem={caseItem} index={i} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div>
              <div className="text-sm text-muted-foreground font-body mb-3">
                Strategic Recommendations
              </div>
              <div className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                    <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-body">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal disclaimer */}
          <LegalDisclaimer context="case-analysis" variant="compact" />

          {/* Generate Memo Button */}
          <Button 
            className="w-full bg-secondary hover:bg-secondary/90"
            onClick={() => setMemoDialogOpen(true)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Client Memo
          </Button>


          {/* Contact for Full Consultation */}
          <div className="p-6 rounded-lg bg-primary/5 border border-primary/10 text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <h4 className="font-display font-semibold text-foreground mb-2">
              Need Professional Legal Advice?
            </h4>
            <p className="text-sm text-muted-foreground font-body mb-4">
              This AI analysis is for informational purposes. For a comprehensive 
              legal strategy tailored to your specific situation, schedule a 
              consultation with our experienced attorneys.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/book">
                Schedule a Consultation
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <MemoDialog 
        open={memoDialogOpen} 
        onOpenChange={setMemoDialogOpen} 
        result={result} 
      />
    </>
  );
}
