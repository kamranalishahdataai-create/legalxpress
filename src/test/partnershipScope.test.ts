import { describe, expect, it } from "vitest";
import { loyaltyDiscountServices, proposedCorporatePackages } from "../data/partnershipScope";
import { featuredServices } from "../data/featuredServices";
import { corporateInclusions } from "../data/corporateMembership";

describe("Partnership proposal scope", () => {
  it("offers businesses only Business Starter and Corporate Package A", () => {
    expect(proposedCorporatePackages).toEqual(["Business Starter", "Corporate Package A"]);
  });

  it("names corporate memberships that exist in the shared package data", () => {
    const ids: Record<string, string> = { "Business Starter": "corporate-starter", "Corporate Package A": "corporate-a" };
    for (const pkg of proposedCorporatePackages) {
      expect(corporateInclusions[ids[pkg]]).toBeTruthy();
    }
  });

  it("keeps small claims and separation agreements out of the included services", () => {
    expect(loyaltyDiscountServices.map((s) => s.id)).toEqual(["small-claims", "separation-prenup"]);
  });

  it("keeps Corporate Packages B and C out of the proposal while their package data exists", () => {
    expect(proposedCorporatePackages).not.toContain("Corporate Package B");
    expect(proposedCorporatePackages).not.toContain("Corporate Package C");
    expect(corporateInclusions["corporate-b"]).toBeTruthy();
    expect(corporateInclusions["corporate-c"]).toBeTruthy();
  });

  it("ties each excluded service to a published service with the same title", () => {
    for (const s of loyaltyDiscountServices) {
      expect(featuredServices.find((f) => f.id === s.id)?.title).toBe(s.title);
    }
  });
});
