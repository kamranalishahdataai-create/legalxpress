import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Outcome } from "@/data/caseResearch";

export interface ResearchFilters {
  areaOfLaw: string;
  issues: string[];
  jurisdiction: string;
  courtLevel: string;
  dateRange: string;
  partyType: string;
  keywords: string;
}

export const emptyFilters: ResearchFilters = {
  areaOfLaw: "",
  issues: [],
  jurisdiction: "",
  courtLevel: "any",
  dateRange: "any",
  partyType: "any",
  keywords: "",
};

export interface MatchedDecision {
  name: string;
  citation: string;
  year: string;
  court: string;
  outcome: Outcome;
  similarity: number;
  summary: string;
  conclusion: string;
  url: string;
  source?: string;
}

export interface CourtFactor {
  factor: string;
  description: string;
}

export interface ResearchResult {
  decisions: MatchedDecision[];
  factorsConsidered: CourtFactor[];
  questionsForLawyer: string[];
  legalPrinciples: string[];
  scopeLabel?: string;
}

export function useCaseAnalysis() {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const analyzeCase = async (filters: ResearchFilters) => {
    if (!filters.areaOfLaw || !filters.jurisdiction) {
      toast({ title: "Missing filters", description: "Choose an area of law and a jurisdiction.", variant: "destructive" });
      return null;
    }
    setAnalyzing(true);
    setResult(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-case`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify(filters),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.error) throw new Error(data.error || `Request failed with status ${response.status}`);
      setResult(data);
      return data as ResearchResult;
    } catch (error) {
      console.error("Research error:", error);
      toast({ title: "Research failed", description: "We couldn't complete the search. Please try again.", variant: "destructive" });
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  return { analyzing, result, analyzeCase, clearResult: () => setResult(null) };
}
