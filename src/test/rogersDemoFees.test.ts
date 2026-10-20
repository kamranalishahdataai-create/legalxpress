import { describe, expect, it } from "vitest";
import { rogersDemoCustomerFee } from "../data/rogersDemoFees";

describe("Rogers included-plan proposal", () => {
  it("charges the customer 0 dollars for the membership included in the plan", () => {
    expect(rogersDemoCustomerFee("membership")).toBe(0);
  });
  it("charges the customer 0 dollars for an included package service", () => {
    expect(rogersDemoCustomerFee("included-service")).toBe(0);
  });
  it("does not promise optional extras at zero dollars", () => {
    expect(rogersDemoCustomerFee("extra")).toBeNull();
  });
});