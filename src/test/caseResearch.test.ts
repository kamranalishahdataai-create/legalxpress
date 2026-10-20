import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { RESEARCH_PACK, PACK_COPY, outcomeFrequency, outcomeLine, RESEARCH_DISCLOSURES, PROFESSIONAL_REPORTS_PER_MONTH } from "../data/caseResearch";

describe("Case Law Research Tool rules", () => {
  it("includes 5 monthly reports in Professional membership", () => {
    expect(PROFESSIONAL_REPORTS_PER_MONTH).toBe(5);
  });

  it("sells a 5-report pack at $9.99 standard and $4.99 member", () => {
    expect(RESEARCH_PACK.reports).toBe(5);
    expect(RESEARCH_PACK.standardPrice).toBe(9.99);
    expect(RESEARCH_PACK.memberPrice).toBe(4.99);
  });

  it("packs are non-refundable and expire after 30 days", () => {
    expect(RESEARCH_PACK.refundable).toBe(false);
    expect(RESEARCH_PACK.expiryDays).toBe(30);
    expect(PACK_COPY).toContain("non-refundable");
  });

  it("computes the outcome frequency as a plain count (17 of 24 = 71%)", () => {
    const outcomes = [...Array(17).fill("succeeded"), ...Array(7).fill("did_not_succeed")];
    const stat = outcomeFrequency(outcomes);
    expect(stat).toMatchObject({ matched: 24, succeeded: 17, percent: 71 });
    expect(outcomeLine(stat, "Ontario")).toContain("In the 24 matched Ontario decisions, claimants succeeded in 17 (71%)");
  });

  it("excludes mixed outcomes from the statistic", () => {
    const stat = outcomeFrequency(["succeeded", "mixed", "did_not_succeed"]);
    expect(stat).toMatchObject({ matched: 2, succeeded: 1, excludedMixed: 1, percent: 50 });
  });

  it("has six disclosures", () => {
    expect(RESEARCH_DISCLOSURES).toHaveLength(6);
  });

  it.each([
    "src/components/case-analysis/AnalysisResults.tsx",
    "src/components/case-analysis/MemoDialog.tsx",
    "src/pages/CaseAnalysis.tsx",
    "src/pages/CaseAnalysisCheckout.tsx",
    "src/components/home/CaseAnalysisTeaser.tsx",
  ])("never shows a win rate or strategic recommendations in %s", (file) => {
    const source = readFileSync(file, "utf8");
    expect(source).not.toMatch(/win rate|winRate|Strategic Recommendations|Client Memo/i);
  });
});
