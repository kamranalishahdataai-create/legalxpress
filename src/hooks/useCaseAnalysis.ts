import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface SimilarCase {
  name: string;
  citation: string;
  year: string;
  court: string;
  result: "Won" | "Lost" | "Settled";
  relevance: number;
  summary: string;
  similarities: string;
  differences: string;
  conclusion: string;
}

export interface KeyFactor {
  factor: string;
  impact: "positive" | "negative" | "neutral";
  description: string;
}

export interface CaseAnalysisResult {
  winRate: number;
  winRateReasoning: string;
  similarCases: SimilarCase[];
  keyFactors: KeyFactor[];
  recommendations: string[];
  legalPrinciples: string[];
}

export function useCaseAnalysis() {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<CaseAnalysisResult | null>(null);

  const analyzeCase = async (
    caseType: string,
    jurisdiction: string,
    caseDescription: string
  ) => {
    if (!caseType || !jurisdiction || !caseDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to analyze your case.",
        variant: "destructive",
      });
      return null;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      // Use fetch directly with AbortController for timeout control
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-case`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ caseType, jurisdiction, caseDescription }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      return data;
    } catch (error) {
      console.error("Analysis error:", error);
      
      let errorMessage = "Failed to analyze your case. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (error.message.includes("credits")) {
          errorMessage = "AI service temporarily unavailable. Please try again later.";
        }
      }

      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  const clearResult = () => setResult(null);

  return {
    analyzing,
    result,
    analyzeCase,
    clearResult,
  };
}
