import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ResearchResult } from "@/hooks/useCaseAnalysis";
import { OUTCOME_LABEL, RESEARCH_DISCLOSURES, SUMMARY_HEADER, outcomeFrequency, outcomeLine } from "@/data/caseResearch";

interface MemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: ResearchResult;
}

const RULE = "=".repeat(80);

export function buildResearchSummary(result: ResearchResult): string {
  const date = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const stat = outcomeFrequency(result.decisions.map((d) => d.outcome));
  let s = `${SUMMARY_HEADER}\n${RULE}\nDate generated: ${date}\n\n`;
  s += RESEARCH_DISCLOSURES.map((d) => `- ${d}`).join("\n") + `\n\n${RULE}\nOUTCOME FREQUENCY IN MATCHED DECISIONS\n${RULE}\n${outcomeLine(stat, result.scopeLabel)}\n\n`;
  s += `${RULE}\nMATCHED DECISIONS\n${RULE}\n`;
  result.decisions.forEach((d, i) => {
    s += `\n${i + 1}. ${d.name}\n   ${d.citation} — ${d.court} (${d.year})\n   ${OUTCOME_LABEL[d.outcome]}\n   Similarity to your search: ${d.similarity}%\n   Public decision: ${d.url || "n/a"}\n   Summary: ${d.summary}\n   What the court decided: ${d.conclusion}\n`;
  });
  if (result.factorsConsidered.length) {
    s += `\n${RULE}\nFACTORS THE COURTS CONSIDERED IN THESE DECISIONS\n${RULE}\n` + result.factorsConsidered.map((f, i) => `${i + 1}. ${f.factor}: ${f.description}`).join("\n") + "\n";
  }
  if (result.questionsForLawyer.length) {
    s += `\n${RULE}\nQUESTIONS TO RAISE WITH A LAWYER\n${RULE}\n` + result.questionsForLawyer.map((q, i) => `${i + 1}. ${q}`).join("\n") + "\n";
  }
  s += `\nTo review this research with a lawyer, book a consultation at /book.\n`;
  return s;
}

export function MemoDialog({ open, onOpenChange, result }: MemoDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const content = buildResearchSummary(result);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({ title: "Copied", description: "The research summary is on your clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `case-law-research-summary-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-display">Research summary</DialogTitle>
          <DialogDescription>Prepared automatically for discussion with your lawyer. Not reviewed by a lawyer.</DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleCopy}>{copied ? <><Check className="h-4 w-4 mr-2" />Copied</> : <><Copy className="h-4 w-4 mr-2" />Copy</>}</Button>
          <Button variant="outline" size="sm" onClick={handleDownload}><Download className="h-4 w-4 mr-2" />Download</Button>
        </div>
        <ScrollArea className="h-[50vh] rounded-lg border border-border bg-muted/30 p-4">
          <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">{content}</pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
