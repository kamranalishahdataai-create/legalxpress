// Scope of the membership in the carrier partnership proposals.
// Shared by every partnership page so the same services stay outside the package everywhere.

/**
 * Corporate memberships offered in the proposals.
 * Corporate Packages B and C are deliberately not part of any proposal.
 */
export const proposedCorporatePackages = ["Business Starter", "Corporate Package A"] as const;

/**
 * Personal services that are not included services. Eligible carrier customers may
 * still use them at a premium discount rate for being a loyal customer.
 */
export const loyaltyDiscountServices = [
  { id: "small-claims", title: "Small claims — pre-trial package", phrase: "small claims pre-trial work" },
  { id: "separation-prenup", title: "Separation agreement or marriage contract", phrase: "a separation agreement or marriage contract" },
] as const;

/** Plain-language statement of the personal carve-out, for any carrier page. */
export function loyaltyDiscountNote(carrier: string): string {
  const [first, second] = loyaltyDiscountServices.map((s) => s.phrase);
  const opening = `${first.charAt(0).toUpperCase()}${first.slice(1)}`;
  return `${opening} and ${second} are not included services. An eligible ${carrier} customer can still use either at a premium discount rate for being a loyal ${carrier} customer, subject to a conflicts check, client identification and a written scope, with the fee confirmed in writing in Canadian dollars plus HST.`;
}
