import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { BILLING_SHORT, BILLING_NOTE } from "../data/billingTerms";

// Every membership price shown on these pages is a monthly rate on a 12-month
// commitment, so none of them may offer month-to-month cancellation.
const pricePages = [
  "src/components/home/SubscriptionsTeaser.tsx",
  "src/pages/Subscriptions.tsx",
  "src/pages/Checkout.tsx",
  "src/components/home/MembershipBundles.tsx",
  "src/pages/Landing.tsx",
];

// The Contract Library (per month) and Case Law Research packs (one-time)
// have no 12-month term, so they must never carry the membership commitment copy.
const monthToMonthPages = [
  "src/pages/Contracts.tsx",
  "src/pages/CaseAnalysisCheckout.tsx",
  "src/components/home/CaseAnalysisTeaser.tsx",
];

describe("membership billing terms", () => {
  it("states that monthly prices are a 12-month commitment billed monthly", () => {
    expect(BILLING_SHORT).toContain("Yearly commitment");
    expect(BILLING_SHORT).toContain("Billed monthly");
    expect(BILLING_NOTE).toContain("12 months");
  });

  it.each(pricePages)("does not offer month-to-month cancellation in %s", (file) => {
    const source = readFileSync(file, "utf8");
    expect(source).not.toMatch(/cancel[- ]anytime/i);
  });

  it.each(pricePages)("shows the yearly commitment alongside prices in %s", (file) => {
    const source = readFileSync(file, "utf8");
    expect(source).toMatch(/12-month|Yearly commitment/);
  });
});

describe("month-to-month subscriptions", () => {
  it.each(monthToMonthPages)("does not state a 12-month term in %s", (file) => {
    const source = readFileSync(file, "utf8");
    expect(source).not.toMatch(/12-month|Yearly commitment/i);
  });

  it("keeps the Contract Library checkout month-to-month", () => {
    const source = readFileSync("src/pages/Checkout.tsx", "utf8");
    const contracts = source.slice(source.indexOf("contracts: {"), source.indexOf("personal: {"));
    expect(contracts).toContain('period: "/mo"');
    expect(contracts).not.toMatch(/12-month|Yearly commitment/);
  });
});
