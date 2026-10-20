// Proposal-only customer charges; never used to activate billing or entitlements.
export function rogersDemoCustomerFee(kind: "membership" | "included-service" | "extra"): number | null {
  return kind === "extra" ? null : 0;
}