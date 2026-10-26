// Pure formatting logic for the members-only Claim Drafter.
// The tool arranges a member's own input into the structure of an Ontario
// Plaintiff's Claim (Small Claims Court, Form 7A) or Statement of Claim
// (Superior Court of Justice, Form 14A). It does not choose content, give
// advice, or file anything.

export type ClaimTrack = "small-claims" | "civil";

/** Ontario Small Claims Court monetary jurisdiction. */
export const SMALL_CLAIMS_LIMIT = 35000;

export const TRACK_LABEL: Record<ClaimTrack, string> = {
  "small-claims": "Small Claims Court — Plaintiff's Claim (Form 7A)",
  civil: "Superior Court of Justice — Statement of Claim (Form 14A)",
};

export const TRACK_RULES: Record<ClaimTrack, string> = {
  "small-claims": "Rules of the Small Claims Court, O. Reg. 258/98, r. 7.01",
  civil: "Rules of Civil Procedure, R.R.O. 1990, Reg. 194, r. 25.06",
};

export const CLAIM_DISCLAIMERS = [
  "This document is formatted automatically from the information you entered. It has not been reviewed by a lawyer or paralegal.",
  "It is a drafting aid only. It is not the official court form, it is not legal advice, and it does not create a lawyer-client relationship.",
  "Court claims must be prepared on the official forms published by the Ontario government and filed with the court. Nothing you download here has been filed with any court.",
  "Limitation periods and court deadlines are your responsibility. If you may have a claim, speak to a lawyer promptly.",
  "Review this document with a lawyer before using it. LegalXpress can review it as a separate legal service, subject to a conflicts check and a written scope.",
] as const;

export interface ClaimInfo {
  track: ClaimTrack;
  plaintiffName: string;
  plaintiffAddress: string;
  plaintiffPhone: string;
  plaintiffEmail: string;
  defendantName: string;
  defendantAddress: string;
  courtLocation: string;
  amountClaimed: number | null;
  facts: string;
  relief: string;
}

export interface ClaimSection {
  title: string;
  paragraphs: string[];
  numbered?: boolean;
}

export interface ClaimDocument {
  formName: string;
  courtName: string;
  rulesCitation: string;
  parties: { role: string; name: string; address: string }[];
  sections: ClaimSection[];
  notices: string[];
}

export interface ClaimValidation {
  ok: boolean;
  errors: string[];
}

export function validateClaim(info: ClaimInfo): ClaimValidation {
  const errors: string[] = [];
  if (!info.plaintiffName.trim()) errors.push("Your name (plaintiff) is required.");
  if (!info.plaintiffAddress.trim()) errors.push("Your address is required.");
  if (!info.defendantName.trim()) errors.push("The defendant's name is required.");
  if (!info.defendantAddress.trim()) errors.push("The defendant's address is required.");
  if (!info.courtLocation.trim()) errors.push("The court location is required.");
  if (!info.facts.trim()) errors.push("Describe what happened.");
  if (!info.relief.trim()) errors.push("State what you are asking the court to order.");
  if (info.amountClaimed == null || Number.isNaN(info.amountClaimed) || info.amountClaimed <= 0) {
    errors.push("Enter the amount you are claiming.");
  } else if (info.track === "small-claims" && info.amountClaimed > SMALL_CLAIMS_LIMIT) {
    errors.push(
      `The Small Claims Court cannot award more than $${SMALL_CLAIMS_LIMIT.toLocaleString("en-CA")}. For a higher amount, choose the Superior Court of Justice format.`
    );
  }
  return { ok: errors.length === 0, errors };
}

/** Splits free text into non-empty paragraphs for numbered pleading paragraphs. */
function toParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const money = (n: number) =>
  `$${n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function buildClaimDocument(info: ClaimInfo): ClaimDocument {
  const parties = [
    { role: "Plaintiff", name: info.plaintiffName.trim(), address: info.plaintiffAddress.trim() },
    { role: "Defendant", name: info.defendantName.trim(), address: info.defendantAddress.trim() },
  ];
  const facts = toParagraphs(info.facts);
  const relief = toParagraphs(info.relief);

  if (info.track === "small-claims") {
    return {
      formName: "PLAINTIFF'S CLAIM — Form 7A",
      courtName: "ONTARIO\nSuperior Court of Justice\nSmall Claims Court",
      rulesCitation: TRACK_RULES["small-claims"],
      parties,
      sections: [
        {
          title: "REASONS FOR CLAIM AND DETAILS",
          numbered: true,
          paragraphs: [
            `The plaintiff claims from the defendant the amount of ${money(info.amountClaimed!)}, plus interest and costs.`,
            ...facts,
          ],
        },
        {
          title: "RELIEF SOUGHT",
          numbered: true,
          paragraphs: relief,
        },
        {
          title: "PLACE OF TRIAL",
          paragraphs: [`The plaintiff proposes that this action be tried at ${info.courtLocation.trim()}.`],
        },
        {
          title: "PLAINTIFF'S CONTACT INFORMATION",
          paragraphs: [
            info.plaintiffName.trim(),
            info.plaintiffAddress.trim(),
            ...(info.plaintiffPhone.trim() ? [`Telephone: ${info.plaintiffPhone.trim()}`] : []),
            ...(info.plaintiffEmail.trim() ? [`Email: ${info.plaintiffEmail.trim()}`] : []),
          ],
        },
      ],
      notices: [...CLAIM_DISCLAIMERS],
    };
  }

  return {
    formName: "STATEMENT OF CLAIM — Form 14A",
    courtName: "ONTARIO\nSUPERIOR COURT OF JUSTICE",
    rulesCitation: TRACK_RULES.civil,
    parties,
    sections: [
      {
        title: "TO THE DEFENDANT",
        paragraphs: [
          "A LEGAL PROCEEDING HAS BEEN COMMENCED AGAINST YOU by the plaintiff. The claim made against you is set out in the following pages.",
          "IF YOU WISH TO DEFEND THIS PROCEEDING, you or an Ontario lawyer acting for you must prepare a statement of defence in Form 18A prescribed by the Rules of Civil Procedure, serve it on the plaintiff's lawyer or, where the plaintiff does not have a lawyer, serve it on the plaintiff, and file it, with proof of service, in this court office, WITHIN TWENTY DAYS after this statement of claim is served on you, if you are served in Ontario.",
          "IF YOU FAIL TO DEFEND THIS PROCEEDING, JUDGMENT MAY BE GIVEN AGAINST YOU IN YOUR ABSENCE AND WITHOUT FURTHER NOTICE TO YOU.",
        ],
      },
      {
        title: "CLAIM",
        paragraphs: [`The plaintiff claims:`, ...relief.map((r, i) => `${i + 1}. ${r}`)],
      },
      {
        title: "MATERIAL FACTS",
        numbered: true,
        paragraphs: facts,
      },
      {
        title: "AMOUNT CLAIMED",
        paragraphs: [`The plaintiff claims ${money(info.amountClaimed!)}, plus prejudgment and postjudgment interest and costs.`],
      },
      {
        title: "PLACE OF TRIAL",
        paragraphs: [`The plaintiff proposes that this action be tried at ${info.courtLocation.trim()}.`],
      },
      {
        title: "PLAINTIFF'S CONTACT INFORMATION",
        paragraphs: [
          info.plaintiffName.trim(),
          info.plaintiffAddress.trim(),
          ...(info.plaintiffPhone.trim() ? [`Telephone: ${info.plaintiffPhone.trim()}`] : []),
          ...(info.plaintiffEmail.trim() ? [`Email: ${info.plaintiffEmail.trim()}`] : []),
        ],
      },
    ],
    notices: [...CLAIM_DISCLAIMERS],
  };
}
