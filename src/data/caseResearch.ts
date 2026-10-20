// Shared copy and rules for the Case Law Research Tool.
// The tool is an automated research product sold by the practice with no
// lawyer review, so it may only describe past decisions — never the user's
// chances, strategy or a personalised memo.

export const RESEARCH_TOOL_NAME = "Case Law Research Tool";
export const PROFESSIONAL_REPORTS_PER_MONTH = 5;

export const RESEARCH_PACK = {
  reports: 5,
  standardPrice: 9.99,
  memberPrice: 4.99,
  expiryDays: 30,
  refundable: false,
} as const;

export const PACK_TERMS_SHORT = `Non-refundable. Unused reports expire ${RESEARCH_PACK.expiryDays} days after purchase.`;

export const PACK_COPY = `${RESEARCH_TOOL_NAME}: ${RESEARCH_PACK.reports}-report pack. Standard price $${RESEARCH_PACK.standardPrice.toFixed(2)} + HST. Member price $${RESEARCH_PACK.memberPrice.toFixed(2)} + HST (requires an active membership at the time of purchase). Each pack gives ${RESEARCH_PACK.reports} reports to use within ${RESEARCH_PACK.expiryDays} days of purchase; unused reports expire and do not roll over. Packs are non-refundable. Each report covers one search. Reports are generated automatically and are not reviewed by a lawyer.`;

export const RESEARCH_DISCLOSURES = [
  "This report is generated automatically by software. It has not been reviewed by a lawyer or paralegal.",
  "It is produced using third-party AI language models (including OpenAI) from publicly available sources and may be incomplete, out of date or wrong. Verify every decision before relying on it.",
  "It does not consider your facts beyond the search filters you selected and is not an assessment of your case.",
  "It is not legal advice and does not create a lawyer-client relationship with LegalXpress or any lawyer.",
  "Limitation periods and deadlines are your responsibility. If you may have a claim, speak to a lawyer promptly.",
  "Information you enter is processed by a third-party provider outside Canada. Do not enter names, identifying details or confidential information.",
] as const;

export const SUMMARY_HEADER =
  "Case Law Research Summary. Prepared automatically for discussion with your lawyer. Not reviewed by a lawyer.";

export const STAT_CAVEAT =
  "This describes past decisions in this set, not the chances in any particular case.";

export const KEYWORD_NOTICE =
  "Used only to find similar decisions; not stored as a description of your case.";

export type Outcome = "succeeded" | "did_not_succeed" | "settled" | "mixed";

export const OUTCOME_LABEL: Record<Outcome, string> = {
  succeeded: "Outcome for claimant: succeeded",
  did_not_succeed: "Outcome for claimant: did not succeed",
  settled: "Outcome for claimant: settled",
  mixed: "Outcome for claimant: mixed",
};

export interface OutcomeFrequency {
  matched: number; // decisions counted (mixed outcomes are excluded)
  succeeded: number;
  excludedMixed: number;
  percent: number | null;
}

/** Computed count only — no model estimate is ever blended in. */
export function outcomeFrequency(outcomes: Outcome[]): OutcomeFrequency {
  const counted = outcomes.filter((o) => o !== "mixed");
  const succeeded = counted.filter((o) => o === "succeeded").length;
  return {
    matched: counted.length,
    succeeded,
    excludedMixed: outcomes.length - counted.length,
    percent: counted.length ? Math.round((succeeded / counted.length) * 100) : null,
  };
}

export function outcomeLine(stat: OutcomeFrequency, scope = ""): string {
  const where = scope ? ` ${scope}` : "";
  if (!stat.matched) return `No matched${where} decisions could be counted. ${STAT_CAVEAT}`;
  return `In the ${stat.matched} matched${where} decisions, claimants succeeded in ${stat.succeeded} (${stat.percent}%). ${STAT_CAVEAT}`;
}
