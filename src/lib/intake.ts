import { z } from "zod";

export const INTAKE_VERSION = "2026-10-21";
export const intakePlans = ["Essential", "Starter", "Professional", "Executive", "Business Starter", "Corporate Package A", "Corporate Package B", "Corporate Package C"] as const;
export const intakeStatuses = {
  submitted: "Conflict review pending",
  needs_information: "Information requested",
  conflict_cleared: "Your identification details are needed",
  compliance_review: "Identification & compliance review",
  ready_for_engagement: "Ready to discuss your written agreement",
  closed: "Request closed",
} as const;
export type IntakeStatus = keyof typeof intakeStatuses;

const text = (max: number) => z.string().trim().max(max);
export const conflictSchema = z.object({
  purpose: z.enum(["membership", "matter", "both"]),
  plan: text(80),
  clientType: z.enum(["individual", "organization"]),
  legalName: text(160).min(2, "Enter your full legal name."),
  otherNames: text(400),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: text(40).min(7, "Enter a contact phone number."),
  organization: text(200),
  authority: text(200),
  area: text(120).min(1, "Choose a service."),
  jurisdiction: text(120).min(1, "Enter the province or jurisdiction."),
  deadline: text(40),
  parties: z.array(z.object({ name: text(200).min(2, "Enter the party’s full name."), relationship: text(120).min(1, "Choose the party’s relationship.") })).max(30),
  noOtherParties: z.boolean(),
  consent: z.literal(true, { errorMap: () => ({ message: "Confirm permission to use these details for intake review." }) }),
}).superRefine((value, ctx) => {
  if (value.purpose !== "matter" && !intakePlans.some(p => p === value.plan)) ctx.addIssue({ code: "custom", path: ["plan"], message: "Choose a membership plan." });
  if (value.clientType === "organization" && (!value.organization || !value.authority)) ctx.addIssue({ code: "custom", path: ["organization"], message: "Enter the organization’s legal name and your authority to instruct us." });
  if (!value.parties.length && !value.noOtherParties) ctx.addIssue({ code: "custom", path: ["parties"], message: "Add the other parties, or confirm there are none known." });
  if (value.parties.length && value.noOtherParties) ctx.addIssue({ code: "custom", path: ["parties"], message: "Remove the no-other-parties confirmation when parties are listed." });
});
export type ConflictDetails = z.infer<typeof conflictSchema>;
export const emptyConflict: ConflictDetails = { purpose: "both", plan: "Essential", clientType: "individual", legalName: "", otherNames: "", email: "", phone: "", organization: "", authority: "", area: "", jurisdiction: "Ontario", deadline: "", parties: [], noOtherParties: false, consent: true };

export const identitySchema = z.object({
  address: text(500).min(8, "Enter your full mailing address."),
  occupation: text(200).min(2, "Enter your occupation or explain your current status."),
  businessContact: text(500),
  registration: text(200),
  organizationAddress: text(500),
  businessActivity: text(400),
  directors: text(2000),
  owners: text(3000),
  thirdParty: text(1000),
  financial: z.enum(["yes", "no", "unsure"]),
  sourceOfFunds: text(1500),
  accuracy: z.literal(true, { errorMap: () => ({ message: "Confirm that these details are accurate." }) }),
});
export type IdentityDetails = z.infer<typeof identitySchema>;
export const emptyIdentity: IdentityDetails = { address: "", occupation: "", businessContact: "", registration: "", organizationAddress: "", businessActivity: "", directors: "", owners: "", thirdParty: "", financial: "unsure", sourceOfFunds: "", accuracy: true };
export function validateIdentity(details: Omit<IdentityDetails, "accuracy"> & { accuracy?: boolean }, clientType: string) {
  const parsed = identitySchema.safeParse(details);
  const errors = parsed.success ? [] : parsed.error.issues.map(i => i.message);
  if (clientType === "organization" && (!details.registration.trim() || !details.organizationAddress.trim() || !details.businessActivity.trim())) errors.push("Enter the organization’s registration, address and business activity; say ‘not registered’ where applicable.");
  return errors;
}
export function canProvideIdentity(status: IntakeStatus, hasIdentity: boolean) {
  return status === "conflict_cleared" || (status === "needs_information" && hasIdentity);
}

export const lsoSources = [
  { label: "Conflicts of interest · Rules 3.4", url: "https://lso.ca/about-lso/legislation-rules/rules-of-professional-conduct/chapter-3#ch3_sec4-1" },
  { label: "Client identification & verification · By-Law 7.1", url: "https://lso.ca/about-lso/legislation-rules/by-laws/by-law-7-1" },
  { label: "Confidentiality · Rules 3.3", url: "https://lso.ca/about-lso/legislation-rules/rules-of-professional-conduct/chapter-3#ch3_sec3-1" },
];