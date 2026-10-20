// Corporate membership inclusions, yearly allowances, add-ons and partner offer.
// Shared by the Plans section, the comparison page and checkout.

export const corporateAllowances: Record<string, { label: string; value: string }[]> = {
  "corporate-starter": [
    { label: "Lawyer letters or calls", value: "3 per year" },
    { label: "Document reviews", value: "3 per year · up to 15 pages" },
  ],
  "corporate-a": [
    { label: "Lawyer letters or calls", value: "10 per year · up to 3/mo" },
    { label: "Document reviews", value: "10 per year · up to 20 pages" },
  ],
  "corporate-b": [
    { label: "Lawyer letters or calls", value: "20 per year · up to 5/mo" },
    { label: "Document / RFP reviews", value: "20 per year · up to 25 pages" },
  ],
  "corporate-c": [
    { label: "Lawyer letters or calls", value: "40 per year · up to 10/mo" },
    { label: "Document reviews", value: "40 per year · up to 25 pages" },
    { label: "Collection letters", value: "15 per month" },
  ],
};

export const corporateInclusions: Record<string, string[]> = {
  "corporate-starter": [
    "Sole proprietorship / business name registration",
    "Renewal reminders & filing support",
    "Contract Library access",
  ],
  "corporate-a": [
    "Federal or Ontario incorporation",
    "Annual return filing",
    "Minute book kept up to date",
    "Unlimited director, officer & address changes",
    "Shareholder agreement",
    "Contract Library access",
  ],
  "corporate-b": [
    "RFP / bid response review",
    "Bid protests & debriefings",
    "Government contract negotiation",
    "Compliance review",
  ],
  "corporate-c": [
    "Commercial dispute assessment",
    "Contract breach & shareholder disputes",
    "Mediation & settlement negotiation",
  ],
};

export const corporateAddOns = [
  { name: "Trial Defence Support", price: "+$49/mo", description: "Extra support if a matter goes to trial." },
  { name: "Employees & Contractors", price: "+$19/mo", description: "Employment & contractor agreements, policies and advice." },
  { name: "Share Management", price: "+$15/mo", description: "Issue, transfer and repurchase shares." },
  { name: "GST/HST Registration", price: "$49 once", description: "We register your business number for GST/HST." },
];

export const bankPartnerOffer = {
  title: "Business banking — proposal only",
  text: "A business banking benefit is being considered. No bank partner or customer offer is confirmed.",
  note: "No reward or discount is available until a partner and written terms are confirmed.",
};
