import { describe, expect, it } from "vitest";
import { conflictSchema, emptyConflict, emptyIdentity, canProvideIdentity, validateIdentity } from "@/lib/intake";

const valid = { ...emptyConflict, legalName: "Alex Sample", email: "alex@example.com", phone: "4165550100", area: "Wills & estates", noOtherParties: true };
describe("client intake safeguards", () => {
  it("requires permission before submitting a conflict check", () => {
    expect(conflictSchema.safeParse(valid).success).toBe(true);
    expect(conflictSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
  it("requires related parties or an explicit none-known confirmation", () => {
    expect(conflictSchema.safeParse({ ...valid, noOtherParties: false }).success).toBe(false);
  });
  it("requires corporate client name and instructing authority", () => {
    expect(conflictSchema.safeParse({ ...valid, clientType: "organization" }).success).toBe(false);
    expect(conflictSchema.safeParse({ ...valid, clientType: "organization", organization: "Sample Inc.", authority: "Director" }).success).toBe(true);
  });
  it("does not open identification before a human conflict clearance", () => {
    expect(canProvideIdentity("submitted", false)).toBe(false);
    expect(canProvideIdentity("conflict_cleared", false)).toBe(true);
    expect(canProvideIdentity("ready_for_engagement", true)).toBe(false);
  });
  it("requires organization identification as well as individual contact information", () => {
    const identity = { ...emptyIdentity, address: "100 Sample Street, Toronto ON", occupation: "Director" };
    expect(validateIdentity(identity, "individual")).toEqual([]);
    expect(validateIdentity(identity, "organization").length).toBeGreaterThan(0);
  });
});