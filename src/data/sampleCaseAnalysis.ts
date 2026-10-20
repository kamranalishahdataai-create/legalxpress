import type { ResearchResult } from "@/hooks/useCaseAnalysis";

const canlii = (year: number, n: number) => `https://www.canlii.org/en/ca/scc/doc/${year}/${year}scc${n}/${year}scc${n}.html`;

// Sample report format. Outcomes are stated from the claimant's / appellant's perspective.
export const sampleCaseAnalysis: ResearchResult = {
  scopeLabel: "Supreme Court of Canada",
  decisions: [
    { name: "Tercon Contractors Ltd. v. British Columbia (Transportation and Highways)", citation: "2010 SCC 4", year: "2010", court: "Supreme Court of Canada", outcome: "succeeded", similarity: 89, url: canlii(2010, 4),
      summary: "A bidder sued the province after the contract was awarded to an ineligible bidder, and the province relied on an exclusion clause.",
      conclusion: "The majority held the exclusion clause did not apply on its wording and upheld the damages award. The Court set out a framework for exclusion clauses." },
    { name: "Bhasin v. Hrynew", citation: "2014 SCC 71", year: "2014", court: "Supreme Court of Canada", outcome: "succeeded", similarity: 85, url: canlii(2014, 71),
      summary: "A dealer claimed the other party misled him about the non-renewal of a dealership agreement.",
      conclusion: "The Court recognized a general organizing principle of good faith and a duty of honest performance in contracts." },
    { name: "C.M. Callow Inc. v. Zollinger", citation: "2020 SCC 45", year: "2020", court: "Supreme Court of Canada", outcome: "succeeded", similarity: 81, url: canlii(2020, 45),
      summary: "A contractor alleged the condominium corporation actively misled it about renewing a maintenance contract before terminating it.",
      conclusion: "The majority restored the trial judgment, finding a breach of the duty of honest performance." },
    { name: "Wastech Services Ltd. v. Greater Vancouver Sewerage and Drainage District", citation: "2021 SCC 7", year: "2021", court: "Supreme Court of Canada", outcome: "did_not_succeed", similarity: 77, url: canlii(2021, 7),
      summary: "A contractor claimed the other party exercised a contractual discretion in bad faith by reallocating waste.",
      conclusion: "The Court held the discretion was exercised reasonably and in line with the purposes for which it was granted." },
    { name: "Double N Earthmovers Ltd. v. Edmonton (City)", citation: "2007 SCC 3", year: "2007", court: "Supreme Court of Canada", outcome: "did_not_succeed", similarity: 74, url: canlii(2007, 3),
      summary: "An unsuccessful bidder alleged the city should have investigated whether the winning bid complied with tender requirements.",
      conclusion: "The majority held the owner was not required to investigate beyond the bid documents and dismissed the claim." },
    { name: "Sattva Capital Corp. v. Creston Moly Corp.", citation: "2014 SCC 53", year: "2014", court: "Supreme Court of Canada", outcome: "succeeded", similarity: 70, url: canlii(2014, 53),
      summary: "A dispute about how a finder's fee should be calculated under an agreement.",
      conclusion: "The Court restored the arbitrator's award and held that contractual interpretation is usually a question of mixed fact and law." },
  ],
  factorsConsidered: [
    { factor: "Wording of the clause", description: "The courts read exclusion and discretion clauses in light of their words, the whole contract and the surrounding circumstances." },
    { factor: "Honesty in performance", description: "Several decisions turned on whether one party actively misled the other about the contract." },
    { factor: "Purpose of a discretion", description: "Where a contract granted discretion, the courts asked whether it was exercised consistently with its purpose." },
    { factor: "Tender documents", description: "In tendering cases the courts looked at what the bid documents required the owner to do." },
  ],
  legalPrinciples: [
    "Parties must not lie or knowingly mislead each other about matters directly linked to performing the contract (Bhasin; Callow).",
    "Contractual discretion must be exercised reasonably and consistently with its purpose (Wastech).",
    "Exclusion clauses are assessed by interpretation, unconscionability and public policy (Tercon).",
  ],
  questionsForLawyer: [
    "Which of these decisions, if any, are relevant to my situation, and why?",
    "Are there more recent or Ontario decisions on this issue?",
    "What limitation period might apply, and when does it start?",
    "What documents should I bring to a consultation?",
  ],
};
