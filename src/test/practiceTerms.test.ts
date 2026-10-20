import { describe, it, expect } from "vitest";
import { PRACTICE, unusedLegalServiceRefund } from "@/data/practiceTerms";
import { featuredServices } from "@/data/featuredServices";

describe("Approved practice rules", () => {
  it("does not pay or receive referral fees", () => expect(PRACTICE.referralFee).toBe(0));
  it("does not reward client referrals", () => expect(PRACTICE.referralReward).toBe(0));
  it("retains a 12-month membership commitment", () => expect(PRACTICE.membershipMonths).toBe(12));
  it("refunds the entire advance for undelivered legal work", () => expect(unusedLegalServiceRefund(200, false)).toBe(200));
  it("does not refund completed legal work under the unused-work rule", () => expect(unusedLegalServiceRefund(200, true)).toBe(0));
  it.each([["notary", 10], ["will", 100], ["small-claims", 999], ["separation-prenup", 999]])("uses the revised %s member fee", (id, fee) => expect(featuredServices.find(s => s.id === id)?.memberFee).toBe(fee));
});