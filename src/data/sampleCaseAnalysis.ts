import { CaseAnalysisResult } from "@/hooks/useCaseAnalysis";

export const sampleCaseAnalysis: CaseAnalysisResult = {
  winRate: 72,
  winRateReasoning: "Based on the pattern of similar breach of contract cases in Ontario, plaintiffs with documented evidence of material breach and quantifiable damages have historically achieved favorable outcomes in approximately 72% of cases.",
  similarCases: [
    {
      name: "Tercon Contractors Ltd. v. British Columbia",
      citation: "2010 SCC 4",
      year: "2010",
      court: "Supreme Court of Canada",
      result: "Won",
      relevance: 89,
      summary: "Tercon bid on a highway construction project but was disqualified. The province awarded the contract to another bidder who did not meet the eligibility requirements. Tercon sued for breach of Contract A (the bidding process contract).",
      similarities: "Both cases involve breach of contractual obligations where one party failed to adhere to agreed terms, resulting in financial damages to the other party.",
      differences: "Tercon involved a government procurement process with specific bidding rules, while typical commercial disputes may have different procedural requirements.",
      conclusion: "The Supreme Court held that exclusion clauses must be interpreted in light of the parties' intentions and public policy. The Court established a framework for analyzing exclusion clauses."
    },
    {
      name: "Bhasin v. Hrynew",
      citation: "2014 SCC 71",
      year: "2014",
      court: "Supreme Court of Canada",
      result: "Won",
      relevance: 85,
      summary: "Bhasin was an enrollment director for a commercial education company. The defendant failed to act honestly in the performance of the contract and actively deceived Bhasin about the non-renewal of his dealership agreement.",
      similarities: "Both cases deal with breach of good faith obligations in commercial contracts and the duty of honest performance.",
      differences: "Bhasin specifically established the duty of honest contractual performance as a general doctrine, which may have broader implications.",
      conclusion: "The Supreme Court recognized a new duty of honest performance in contract law, requiring parties to be honest with each other in the performance of their contractual obligations."
    },
    {
      name: "Hadley v. Baxendale",
      citation: "(1854) 9 Exch 341",
      year: "1854",
      court: "Court of Exchequer (UK)",
      result: "Lost",
      relevance: 78,
      summary: "A mill owner sought damages from a carrier for delay in delivering a broken mill shaft for repair, claiming lost profits during the delay period.",
      similarities: "Both cases involve claims for consequential damages arising from breach of contract.",
      differences: "This is a foundational UK case that established foreseeability rules for damages, which Canadian courts have adopted but may apply with some variations.",
      conclusion: "Established the rule that damages must be foreseeable at the time of contracting to be recoverable, limiting recovery to losses within the reasonable contemplation of the parties."
    },
    {
      name: "Double N Earthmovers Ltd. v. Edmonton",
      citation: "2007 SCC 3",
      year: "2007",
      court: "Supreme Court of Canada",
      result: "Won",
      relevance: 74,
      summary: "A construction company challenged the City of Edmonton's tendering process, alleging the city breached Contract A by accepting a non-compliant bid.",
      similarities: "Both cases involve claims for damages arising from breach of contractual obligations in a commercial context.",
      differences: "This case specifically deals with public tendering processes and the duties owed to unsuccessful bidders.",
      conclusion: "The Court affirmed that owners in a tendering process owe a duty of fairness to all bidders and can be liable for breach of Contract A."
    },
    {
      name: "Transamerica Life Insurance Co. v. ING Canada Inc.",
      citation: "2003 CanLII 9923 (ON CA)",
      year: "2003",
      court: "Ontario Court of Appeal",
      result: "Settled",
      relevance: 71,
      summary: "A dispute over the interpretation of contractual provisions in an insurance business acquisition, with claims for breach of representations and warranties.",
      similarities: "Both involve commercial contract disputes with significant damages claims and interpretation of contractual terms.",
      differences: "Insurance industry contracts may have specific regulatory considerations not applicable to other commercial disputes.",
      conclusion: "The case was ultimately settled, but the Court of Appeal's analysis of contractual interpretation principles remains instructive."
    }
  ],
  keyFactors: [
    {
      factor: "Documented Evidence",
      impact: "positive",
      description: "Clear documentary evidence of the contractual terms and the alleged breach significantly strengthens the plaintiff's position."
    },
    {
      factor: "Quantifiable Damages",
      impact: "positive",
      description: "Being able to demonstrate specific, calculable financial losses improves the likelihood of a favorable damages award."
    },
    {
      factor: "Mitigation Efforts",
      impact: "positive",
      description: "Evidence that the plaintiff took reasonable steps to mitigate their losses is typically viewed favorably by courts."
    },
    {
      factor: "Limitation Period",
      impact: "neutral",
      description: "The timing of the claim relative to the limitation period should be confirmed to ensure the action is not statute-barred."
    },
    {
      factor: "Exclusion Clauses",
      impact: "negative",
      description: "If the contract contains exclusion or limitation of liability clauses, these may reduce or eliminate potential recovery."
    }
  ],
  recommendations: [
    "Gather and preserve all documentary evidence including the original contract, correspondence, invoices, and records of performance.",
    "Calculate and document all financial losses with supporting evidence to establish quantum of damages.",
    "Review the contract for any exclusion clauses, limitation periods, or dispute resolution mechanisms.",
    "Consider whether pre-litigation negotiation or mediation might achieve a favorable settlement.",
    "Consult with a litigation lawyer to assess the strength of the case and potential costs versus recovery."
  ],
  legalPrinciples: [
    "Duty of honest performance requires parties to act honestly in fulfilling contractual obligations (Bhasin v. Hrynew).",
    "Damages for breach of contract must be foreseeable at the time of contracting (Hadley v. Baxendale).",
    "Exclusion clauses are subject to interpretation considering the parties' intentions and public policy (Tercon).",
    "The innocent party has a duty to mitigate losses following a breach.",
    "Specific performance may be available as a remedy where damages are inadequate."
  ]
};
