export interface BlogSection {
  heading?: string;
  body: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  cover_image_url: string | null;
  published_at: string | null;
  /** Curated articles carry sections; hosted posts are parsed into sections on read. */
  content?: BlogSection[];
}

/**
 * Curated fallback articles shown when no hosted posts are published.
 * General legal information only — every article renders with the
 * informational disclaimer on the article page.
 */
export const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Shareholder Agreements: A Complete Guide",
    excerpt:
      "Learn the essential components of a shareholder agreement and why every business needs one to protect stakeholder interests.",
    slug: "understanding-shareholder-agreements",
    cover_image_url: null,
    published_at: "2024-01-15",
    content: [
      {
        body: "A unanimous shareholder agreement (USA) is one of the most important documents a Canadian corporation with more than one owner can have. It sits alongside your articles of incorporation and by-laws, and it governs the relationship between the people who own the business — before a disagreement puts that relationship to the test.",
      },
      {
        heading: "What a shareholder agreement covers",
        body: "Most agreements address how shares can be transferred, what happens when a shareholder dies, becomes disabled or wants to exit, how major decisions are approved, and how disputes are resolved. Common mechanisms include rights of first refusal, shotgun (buy-sell) clauses, drag-along and tag-along rights, and reserved matters that require a supermajority or unanimous consent.",
      },
      {
        heading: "Why the default rules are not enough",
        body: "Without an agreement, the Canada Business Corporations Act or the Ontario Business Corporations Act supplies default rules — and those defaults rarely match what the owners actually intend. For example, nothing in the statute stops a shareholder from selling to a stranger, and there is no built-in process for valuing shares on exit.",
      },
      {
        heading: "When to put one in place",
        body: "The best time is at incorporation or when a new investor joins, while everyone is aligned. Negotiating an agreement after a conflict has started is slower, more expensive and often unsuccessful. Existing corporations can adopt an agreement at any time with the required shareholder approval.",
      },
      {
        heading: "Getting it right",
        body: "A well-drafted agreement reflects your share structure, tax planning and growth plans, so templates should be a starting point rather than the finished product. Independent legal advice for each shareholder is strongly recommended so the agreement holds up if it is ever tested.",
      },
    ],
  },
  {
    id: "2",
    title: "Procurement Law Changes in 2024: What You Need to Know",
    excerpt:
      "Recent changes to procurement regulations in Canada and how they affect businesses bidding on government contracts.",
    slug: "procurement-law-changes-2024",
    cover_image_url: null,
    published_at: "2024-01-10",
    content: [
      {
        body: "Public procurement in Canada continues to evolve. With the Canada-United States-Mexico Agreement, the Canadian Free Trade Agreement and the Comprehensive Economic and Trade Agreement all shaping who can bid and how, businesses that sell to government need to keep their playbook current.",
      },
      {
        heading: "Trade agreement coverage",
        body: "Federal, provincial and territorial procurements above set dollar thresholds must generally be openly advertised and run under fair, transparent rules. Thresholds are adjusted periodically, so a contract that was below the line two years ago may now be covered — and covered procurements come with enforceable supplier rights.",
      },
      {
        heading: "Fairness and bid challenges",
        body: "When a procurement is covered, suppliers can challenge unfair processes through bodies such as the Canadian International Trade Tribunal (for federal procurements) or through the courts under the Contract A/Contract B framework. Strict limitation periods apply, so concerns about a competition need to be assessed quickly.",
      },
      {
        heading: "Practical steps for bidders",
        body: "Read every solicitation document in full, comply exactly with submission requirements, ask clarification questions within the stated window, and keep records of your communications. If a process seems flawed — undisclosed criteria, unequal treatment, an implausible evaluation — get advice before the award is final, not after.",
      },
      {
        body: "Procurement disputes are technical and time-sensitive. Early advice preserves options that disappear once a contract is signed.",
      },
    ],
  },
  {
    id: "3",
    title: "The Incorporation Decision: Federal vs Provincial",
    excerpt:
      "A comprehensive comparison of federal and provincial incorporation options to help you make the right choice for your business.",
    slug: "federal-vs-provincial-incorporation",
    cover_image_url: null,
    published_at: "2024-01-05",
    content: [
      {
        body: "One of the first decisions in a Canadian incorporation is where to incorporate: federally under the Canada Business Corporations Act, or provincially — for most of our clients, under the Ontario Business Corporations Act. Both create a separate legal entity with limited liability; the differences are in name protection, cost and administration.",
      },
      {
        heading: "Name protection",
        body: "A federal incorporation protects your corporate name across Canada (subject to trade-mark considerations), while an Ontario incorporation protects it within Ontario. If you plan to operate under your corporate name in several provinces, federal incorporation can reduce name conflicts later.",
      },
      {
        heading: "Cost and ongoing filings",
        body: "Ontario incorporation is typically less expensive to set up and maintain. A federal corporation must also register extra-provincially in every province where it carries on business — including Ontario — which adds an annual filing and fee in each province.",
      },
      {
        heading: "Residency requirements",
        body: "Both statutes require at least 25% of directors to be resident Canadians (or at least one, for small boards). If your founding team is entirely non-resident, the choice of jurisdiction and board structure needs careful planning.",
      },
      {
        heading: "Which should you choose?",
        body: "For a business operating mainly in Ontario, provincial incorporation is often the simpler, cheaper route. For national ambitions, outside investors or name protection across Canada, federal incorporation is frequently worth the extra administration. The right answer depends on where you will actually do business and how you plan to grow.",
      },
    ],
  },
  {
    id: "4",
    title: "Contract Essentials: What Every Business Owner Should Know",
    excerpt:
      "Key contract clauses and provisions that protect your business interests in commercial agreements.",
    slug: "contract-essentials-business-owners",
    cover_image_url: null,
    published_at: "2024-01-02",
    content: [
      {
        body: "Every business runs on contracts — with customers, suppliers, contractors and partners. Most disputes we see trace back to a handful of clauses that were missing, vague or copied from a document that did not fit the deal.",
      },
      {
        heading: "Scope and deliverables",
        body: "The single most litigated issue is what was actually promised. Define the work, deliverables, timelines and acceptance criteria in writing. If it is not in the contract, assume it will be argued about later.",
      },
      {
        heading: "Payment terms",
        body: "State the price, invoicing schedule, interest on late payment, and who bears taxes and disbursements. For ongoing work, include a clear mechanism for approving changes in scope before the work is done — not after the invoice arrives.",
      },
      {
        heading: "Limitation of liability and indemnities",
        body: "These clauses allocate risk when something goes wrong. A cap on liability, exclusions of indirect damages and a balanced indemnity can be the difference between an inconvenience and an existential claim. Read them even — especially — in the other party's standard form.",
      },
      {
        heading: "Termination and dispute resolution",
        body: "Know how the contract ends: notice periods, termination for convenience, and what survives termination. A governing law clause and a chosen forum (courts of Ontario, or arbitration) prevent expensive preliminary fights about where a dispute will be heard.",
      },
      {
        body: "A contract reviewed before signing costs a fraction of litigating one after. If the deal matters to your business, have it looked at first.",
      },
    ],
  },
  {
    id: "5",
    title: "Corporate Litigation: When to Settle vs. Go to Trial",
    excerpt:
      "Factors to consider when deciding between settlement and trial in corporate disputes.",
    slug: "corporate-litigation-settle-vs-trial",
    cover_image_url: null,
    published_at: "2023-12-28",
    content: [
      {
        body: "The vast majority of Canadian commercial disputes settle before trial. That is not an accident — it reflects the real economics of litigation. But some cases should be tried, and knowing the difference is a strategic decision, not an emotional one.",
      },
      {
        heading: "The case for settlement",
        body: "Trial is expensive, slow and public. Legal fees through trial routinely reach six figures in Superior Court, and a decision can take years from filing. Settlement offers certainty, confidentiality, preserved business relationships and immediate finality — value that never appears on a damages award.",
      },
      {
        heading: "The case for trial",
        body: "Trial may be right when a precedent matters to your industry, when the other side's position is untenable and they refuse to move, when your documentation is exceptionally strong, or when a settlement number on the table undervalues a claim you can prove. Summary judgment can also shorten the path where the facts are not genuinely in dispute.",
      },
      {
        heading: "How to decide",
        body: "Assess your realistic best and worst outcomes, the probability of each, the cost of getting to trial, and the collectability of any judgment. Compare that risk-weighted number against the settlement on offer. Revisit the analysis at every stage — after discoveries, after mediation, after key motions — because the answer changes as the evidence develops.",
      },
      {
        body: "The strongest negotiating position comes from being genuinely prepared to try the case. Preparation and settlement are complements, not opposites.",
      },
    ],
  },
  {
    id: "6",
    title: "Real Estate Transactions: Avoiding Common Pitfalls",
    excerpt:
      "Common mistakes in residential real estate transactions and how to avoid them.",
    slug: "real-estate-common-pitfalls",
    cover_image_url: null,
    published_at: "2023-12-20",
    content: [
      {
        body: "A home purchase is the largest transaction most Ontarians will ever make, and the agreement of purchase and sale is usually signed before a lawyer sees it. A few recurring pitfalls account for most of the problems that land in our office.",
      },
      {
        heading: "Signing without conditions",
        body: "In a competitive market buyers are pressured to waive financing and inspection conditions. Those conditions exist to protect you: waiving them means you are committed even if the mortgage falls through or the inspection reveals serious defects. Understand the risk before you remove them.",
      },
      {
        heading: "Title and status certificate issues",
        body: "Title searches can reveal liens, easements and work orders that must be dealt with before closing. For condominiums, the status certificate review is essential — it discloses the financial health of the corporation, pending special assessments and litigation that will affect your costs.",
      },
      {
        heading: "Closing cost surprises",
        body: "Land transfer tax (with a municipal layer in Toronto), title insurance, adjustments for property taxes and utilities, and legal fees and disbursements add up. First-time buyer rebates help, but budget for the full picture so closing day holds no surprises.",
      },
      {
        heading: "Timing and the requisition date",
        body: "The requisition date is the deadline for raising title issues, and missing it can limit your options. Involving your lawyer early — ideally before you sign — keeps every deadline working for you rather than against you.",
      },
    ],
  },
];
