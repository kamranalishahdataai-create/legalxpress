export const PRACTICE = {
  name: "LegalXpress",
  lawyer: "Shiv Kumar Passi",
  licence: "70089L",
  currency: "CAD",
  membershipMonths: 12,
  referralFee: 0,
  referralReward: 0,
} as const;

export const PRICE_NOTICE = "Prices are in Canadian dollars. HST is added to all fees. Court and government filing fees, disbursements and third-party charges are extra and are itemized on your account. Member prices apply only to the services and scope described on this page.";
export const LAWYER_NOTICE = "Provided by a lawyer (Shiv Kumar Passi, LSO No. 70089L).";
export const JURISDICTION_NOTICE = "We provide legal services under Ontario licensing. Clients in other provinces are welcome where the matter is governed by Ontario or federal law; where another province’s law applies, we refer you to a lawyer licensed there.";
export const REFERRAL_POLICY = "LegalXpress does not receive any referral fee, commission or other benefit from any professional in this network, and does not pay any. Participating professionals may offer members a courtesy discount on their own fees; any discount is their decision and comes entirely out of their fee.";
export const MEMBERSHIP_NOTICE = "Your monthly membership fee is a general retainer. It pays for eligibility for member pricing and $0 member fees on the services listed for your plan, and access to member tools. It is not a deposit or prepayment toward any specific legal service and is not held in trust. Each legal service is opened as a separate matter, confirmed in writing and billed when delivered at the member fee (which may be $0), plus HST, filing fees and disbursements. Memberships are 12-month commitments billed monthly. Fees for a billing period already provided are not refunded; amounts paid toward a specific legal service not performed are refunded in full.";
export const COMMUNITY_GOAL = "Our aim is to lower membership prices as our member base grows. Any reduction is announced to members in writing and applied at the next billing period. Current published prices are the only prices we commit to; future reductions are a goal, not a guarantee.";
export const CONFIDENTIALITY_NOTICE = "Information you give us after we confirm an engagement is protected by solicitor-client privilege and our professional duty of confidentiality. Before an engagement is confirmed, we keep your information confidential as a matter of policy, but privilege may not yet apply. Please do not send sensitive documents until we ask for them.";

export function unusedLegalServiceRefund(amountPaid: number, performed: boolean): number {
  return performed ? 0 : Math.max(0, amountPaid);
}