import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CaseAnalysisResult } from "@/hooks/useCaseAnalysis";

interface MemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: CaseAnalysisResult;
}

export function MemoDialog({ open, onOpenChange, result }: MemoDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const generateMemoContent = () => {
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let memo = `LEGAL MEMORANDUM
================================================================================
Date: ${date}
Re: Case Analysis Summary

================================================================================
EXECUTIVE SUMMARY
================================================================================

Based on our comprehensive analysis of relevant case law and the specific facts 
of your matter, we estimate your likelihood of success at approximately ${result.winRate}%.

${result.winRateReasoning}

================================================================================
KEY FACTORS AFFECTING YOUR CASE
================================================================================

`;

    result.keyFactors.forEach((factor, i) => {
      const impactLabel = factor.impact === "positive" ? "[FAVORABLE]" : 
                         factor.impact === "negative" ? "[UNFAVORABLE]" : "[NEUTRAL]";
      memo += `${i + 1}. ${factor.factor} ${impactLabel}
   ${factor.description}

`;
    });

    if (result.legalPrinciples && result.legalPrinciples.length > 0) {
      memo += `================================================================================
APPLICABLE LEGAL PRINCIPLES
================================================================================

`;
      result.legalPrinciples.forEach((principle, i) => {
        memo += `${i + 1}. ${principle}

`;
      });
    }

    memo += `================================================================================
RELEVANT CASE LAW ANALYSIS
================================================================================

The following cases are most relevant to your matter, listed in order of 
relevance to the specific facts of your case:

`;

    result.similarCases.forEach((caseItem, i) => {
      memo += `--------------------------------------------------------------------------------
CASE ${i + 1}: ${caseItem.name}
--------------------------------------------------------------------------------
Citation: ${caseItem.citation}
Court: ${caseItem.court} (${caseItem.year})
Outcome: ${caseItem.result}
Relevance: ${caseItem.relevance}%

CASE SUMMARY:
${caseItem.summary}

SIMILARITIES TO YOUR CASE:
${caseItem.similarities}

DIFFERENCES FROM YOUR CASE:
${caseItem.differences}

COURT'S CONCLUSION:
${caseItem.conclusion}

`;
    });

    if (result.recommendations && result.recommendations.length > 0) {
      memo += `================================================================================
STRATEGIC RECOMMENDATIONS
================================================================================

`;
      result.recommendations.forEach((rec, i) => {
        memo += `${i + 1}. ${rec}

`;
      });
    }

    memo += `================================================================================
DISCLAIMER
================================================================================

This memorandum is provided for informational purposes only and does not 
constitute legal advice. The analysis is based on AI-powered review of case 
law and should be reviewed with a qualified attorney before making any legal 
decisions. Past case outcomes do not guarantee future results.

For personalized legal counsel tailored to your specific situation, please 
schedule a consultation with our legal team.

================================================================================
`;

    return memo;
  };

  const memoContent = generateMemoContent();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(memoContent);
      setCopied(true);
      toast({
        title: "Copied to Clipboard",
        description: "The memo has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([memoContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `legal-memo-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Memo Downloaded",
      description: "The memo has been saved to your downloads.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-display">Client Memo</DialogTitle>
          <DialogDescription className="font-body">
            A formatted legal memorandum summarizing the case analysis for your records.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download as Text
          </Button>
        </div>

        <ScrollArea className="h-[50vh] rounded-lg border border-border bg-muted/30 p-4">
          <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
            {memoContent}
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
