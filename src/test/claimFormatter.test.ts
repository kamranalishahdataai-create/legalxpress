import { describe, it, expect } from "vitest";
import {
  buildClaimDocument,
  validateClaim,
  SMALL_CLAIMS_LIMIT,
  type ClaimInfo,
} from "@/lib/claimFormatter";

const base: ClaimInfo = {
  track: "small-claims",
  plaintiffName: "Maya Chen",
  plaintiffAddress: "123 King St W, Toronto ON",
  plaintiffPhone: "416-555-0100",
  plaintiffEmail: "",
  defendantName: "Acme Renovations Inc.",
  defendantAddress: "45 Queen St E, Toronto ON",
  courtLocation: "Toronto Small Claims Court",
  amountClaimed: 8500,
  facts: "The defendant renovated the plaintiff's kitchen.\nThe work was incomplete and defective.",
  relief: "Payment of $8,500.\nCosts of this action.",
};

describe("validateClaim", () => {
  it("rejects a small-claims amount above the $35,000 court limit", () => {
    const result = validateClaim({ ...base, amountClaimed: SMALL_CLAIMS_LIMIT + 1 });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toContain("35,000");
    }
  });

  it("accepts a small-claims amount at the $35,000 limit", () => {
    expect(validateClaim({ ...base, amountClaimed: SMALL_CLAIMS_LIMIT }).ok).toBe(true);
  });

  it("accepts the same amount on the civil track", () => {
    expect(validateClaim({ ...base, track: "civil", amountClaimed: 90000 }).ok).toBe(true);
  });

  it("requires plaintiff and defendant names", () => {
    const result = validateClaim({ ...base, plaintiffName: " ", defendantName: "" });
    expect(result.ok).toBe(false);
  });
});

describe("buildClaimDocument", () => {
  it("formats small claims as Form 7A under the Rules of the Small Claims Court", () => {
    const doc = buildClaimDocument(base);
    expect(doc.formName).toContain("Form 7A");
    expect(doc.courtName).toContain("Small Claims Court");
    expect(doc.rulesCitation).toContain("O. Reg. 258/98");
  });

  it("formats civil claims as Form 14A under the Rules of Civil Procedure", () => {
    const doc = buildClaimDocument({ ...base, track: "civil", amountClaimed: 90000 });
    expect(doc.formName).toContain("Form 14A");
    expect(doc.courtName).toContain("SUPERIOR COURT OF JUSTICE");
    expect(doc.rulesCitation).toContain("R.R.O. 1990, Reg. 194");
  });

  it("always carries the not-filed and not-lawyer-reviewed notices", () => {
    for (const track of ["small-claims", "civil"] as const) {
      const doc = buildClaimDocument({ ...base, track });
      const notices = doc.notices.join(" ");
      expect(notices).toContain("not been reviewed by a lawyer");
      expect(notices).toContain("has been filed with any court");
    }
  });
});
