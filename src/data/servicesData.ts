import { Building2, FileText, Users, ShoppingCart, Heart, Scale, ShieldCheck, Globe, Landmark, Send, FlaskConical } from "lucide-react";

import incorporationsImg from "@/assets/services/incorporations.jpg";
import minuteBooksImg from "@/assets/services/minute-books.jpg";
import shareholderImg from "@/assets/services/shareholder-agreements.jpg";
import procurementImg from "@/assets/services/procurement.jpg";
import e2VisaImg from "@/assets/services/e2-visa.jpg";
import divorceImg from "@/assets/services/divorce.jpg";
import litigationImg from "@/assets/services/litigation.jpg";

export interface ServiceDetail {
  slug: string;
  icon: typeof Building2;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  details: string[];
  faqs: { q: string; a: string }[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "incorporations",
    icon: Building2,
    title: "Incorporations",
    tagline: "Launch your business on a solid legal foundation",
    description:
      "Whether you're starting a new venture or restructuring an existing one, our incorporation services cover Ontario and federal registrations. We handle everything from name searches to CRA registration so you can focus on growing your business.",
    image: incorporationsImg,
    features: [
      "Federal & Ontario incorporations",
      "Articles of incorporation drafting",
      "Initial organizational resolutions",
      "Share structure setup",
      "Corporate name search & registration",
      "CRA business number registration",
    ],
    details: [
      "Our team guides you through selecting the right corporate structure—whether it's a sole proprietorship, partnership, or corporation—based on your specific business goals and tax considerations.",
      "We prepare all foundational documents including articles of incorporation, by-laws, and initial resolutions, ensuring your company is set up for long-term success.",
      "Post-incorporation, we assist with obtaining your business number, setting up your corporate minute book, and ensuring compliance with all regulatory requirements.",
    ],
    faqs: [
      { q: "How long does incorporation take?", a: "Federal incorporations are typically completed within 1-3 business days. Provincial incorporations vary by province but generally take 1-5 business days." },
      { q: "Federal vs Provincial—which is right for me?", a: "Federal incorporation offers Canada-wide name protection and the ability to operate in any province. Provincial is simpler and less expensive if you only plan to operate in one province." },
      { q: "What documents will I receive?", a: "You'll receive your Certificate of Incorporation, Articles of Incorporation, corporate by-laws, initial resolutions, share certificates, and a complete minute book." },
    ],
  },
  {
    slug: "minute-books",
    icon: FileText,
    title: "Minute Books",
    tagline: "Keep your corporate records in perfect order",
    description:
      "A well-maintained minute book is essential for corporate governance and compliance. Our team prepares, organizes, and maintains your corporate records so you're always audit-ready and in good standing.",
    image: minuteBooksImg,
    features: [
      "Initial minute book setup",
      "Annual resolutions & updates",
      "Share certificates & registers",
      "Director & officer records",
      "Meeting minutes preparation",
      "Corporate seal arrangement",
    ],
    details: [
      "We create comprehensive minute books that include all required corporate documents organized in a professional binder format, making them easy to reference during audits, financing, or sale transactions.",
      "Our annual update service ensures your minute book stays current with all director changes, share transfers, and annual resolutions required by law.",
      "Whether you need to bring an outdated minute book up to date or start fresh, our team handles the entire process efficiently.",
    ],
    faqs: [
      { q: "Why is a minute book important?", a: "A minute book is your corporation's legal record. Banks, investors, and buyers will request it during financing or acquisition. An incomplete minute book can delay or derail these transactions." },
      { q: "What if my minute book is outdated?", a: "We can reconstruct and update your minute book by reviewing your corporate filings and preparing the missing resolutions and documents." },
      { q: "How often should my minute book be updated?", a: "At minimum, your minute book should be updated annually. Additional updates are needed when there are changes to directors, officers, or share structure." },
    ],
  },
  {
    slug: "e2-visa",
    icon: Globe,
    title: "E-2 — Canadian-law transaction support",
    tagline: "Canadian-law support; US immigration advice and filings require a US-licensed lawyer",
    description: "We provide Canadian-law and transaction support for Canadian entrepreneurs pursuing a US E-2 investment route. We do not provide US immigration advice or prepare US immigration filings. Those services must be provided by an independent US-licensed immigration lawyer selected by you.",
    image: e2VisaImg,
    features: ["Canadian corporate and commercial documents", "Canadian-law investment transaction review", "Coordination with independently retained US immigration counsel"],
    details: ["Our work is limited to the Canadian-law scope confirmed in writing after a conflicts check.", "US eligibility, petitions, consular forms, immigration strategy and representation are outside our Ontario licence and must be handled by US-licensed counsel. A referral does not require you to retain any suggested professional."],
    faqs: [{q: "Who handles US immigration filings?", a: "An independent US-licensed immigration lawyer. LegalXpress provides only the Canadian-law transaction support identified in the written engagement."}, {q: "What fees are included?", a: "Canadian-law support is quoted before work begins. US counsel fees, government charges and disbursements are separate."}],
  },
  {
    slug: "eb5-visa",
    icon: Globe,
    title: "EB-5 — Canadian-law transaction support",
    tagline: "Canadian-law support; US immigration advice and filings require a US-licensed lawyer",
    description: "We provide Canadian-law and transaction support for Canadian entrepreneurs pursuing a US EB-5 investment route. We do not provide US immigration advice or prepare US immigration filings. Those services must be provided by an independent US-licensed immigration lawyer selected by you.",
    image: e2VisaImg,
    features: ["Canadian corporate and commercial documents", "Canadian-law investment transaction review", "Coordination with independently retained US immigration counsel"],
    details: ["Our work is limited to the Canadian-law scope confirmed in writing after a conflicts check.", "US eligibility, petitions, consular forms, immigration strategy and representation are outside our Ontario licence and must be handled by US-licensed counsel. A referral does not require you to retain any suggested professional."],
    faqs: [{q: "Who handles US immigration filings?", a: "An independent US-licensed immigration lawyer. LegalXpress provides only the Canadian-law transaction support identified in the written engagement."}, {q: "What fees are included?", a: "Canadian-law support is quoted before work begins. US counsel fees, government charges and disbursements are separate."}],
  },
  {
    slug: "shareholder-agreements",
    icon: Users,
    title: "Shareholder Agreements",
    tagline: "Protect your business relationships from day one",
    description:
      "A well-crafted shareholder agreement prevents disputes and protects everyone's interests. We draft comprehensive agreements tailored to your business structure, ownership dynamics, and long-term goals.",
    image: shareholderImg,
    features: [
      "Customized shareholder agreements",
      "Buy-sell provisions",
      "Drag-along & tag-along rights",
      "Dispute resolution mechanisms",
      "Non-compete clauses",
      "Exit strategy planning",
    ],
    details: [
      "Our shareholder agreements address critical scenarios including what happens when a shareholder wants to leave, becomes incapacitated, or passes away—preventing costly disputes down the road.",
      "We include carefully drafted provisions for decision-making authority, profit distribution, and capital contributions that reflect your unique business arrangement.",
      "Each agreement includes clear dispute resolution mechanisms, protecting your business from the time and expense of litigation.",
    ],
    faqs: [
      { q: "Do I really need a shareholder agreement?", a: "Absolutely. Without one, disputes are governed by default corporate legislation, which may not reflect your intentions. A shareholder agreement is your business's insurance policy." },
      { q: "Can we modify the agreement later?", a: "Yes. We draft agreements with amendment provisions so they can evolve with your business. We can assist with amendments as your needs change." },
      { q: "What's a buy-sell provision?", a: "It establishes the process and valuation method for buying out a departing shareholder, ensuring a smooth transition without disrupting business operations." },
    ],
  },
  {
    slug: "procurement",
    icon: ShoppingCart,
    title: "Procurement Law",
    tagline: "Legal support for procurement processes and disputes",
    description:
      "Government procurement is highly regulated and complex. Our lawyer helps you navigate RFPs, bid protests, and contract negotiations to review your bids, contracts and procurement disputes.",
    image: procurementImg,
    features: [
      "RFP response review",
      "Bid protest & appeals",
      "Government contract negotiation",
      "Compliance review",
      "Debriefing representation",
      "Procurement dispute resolution",
    ],
    details: [
      "We review your RFP responses before submission, ensuring compliance with all mandatory requirements and strengthening your evaluation criteria to maximize scoring potential.",
      "If you believe a procurement process was unfair, we can file bid protests and appeals before the relevant tribunal, advocating for a fair outcome.",
      "Our team provides strategic advice throughout the entire procurement lifecycle—from opportunity identification to contract performance and renewal.",
    ],
    faqs: [
      { q: "When should I engage a procurement lawyer?", a: "Ideally before you submit your bid. We can review your response for compliance issues and strategic improvements. However, we can also assist after award if you need to file a protest." },
      { q: "What is a bid protest?", a: "A formal challenge to a government procurement decision. If you believe the process was unfair or your bid was improperly evaluated, a protest can lead to re-evaluation or re-competition." },
      { q: "Do you handle both federal and provincial procurement?", a: "We advise on Ontario and federal procurement matters where authorized. Matters governed by another province’s law are referred to a lawyer licensed there." },
    ],
  },
  {
    slug: "divorce",
    icon: Heart,
    title: "Simple Divorce",
    tagline: "Compassionate guidance through a difficult time",
    description:
      "We provide straightforward, non-litigated divorce services with empathy and efficiency. Our team handles all the paperwork and court filings so you can focus on moving forward with your life.",
    image: divorceImg,
    features: [
      "Uncontested divorce applications",
      "Separation agreements",
      "Division of property drafting",
      "Court document preparation",
      "Filing & service handling",
      "Final divorce certificate",
    ],
    details: [
      "Our simple divorce service is designed for couples who have agreed on the terms of their separation, including property division, support, and custody arrangements.",
      "We prepare all required court documents, file them on your behalf, and guide you through the process from application to final divorce certificate.",
      "For more complex situations involving contested issues, we can connect you with specialized family law practitioners through our network.",
    ],
    faqs: [
      { q: "What qualifies as a 'simple' divorce?", a: "A simple or uncontested divorce is one where both parties agree on all terms including property division, spousal support, and child custody. There are no issues to be decided by the court." },
      { q: "How long does a simple divorce take?", a: "Typically 4-6 months from filing to receiving the final divorce certificate, depending on court processing times in your jurisdiction." },
      { q: "Do both parties need a lawyer?", a: "We represent one party in the divorce. The other party can retain their own lawyer or choose to proceed without representation in an uncontested matter." },
    ],
  },
  {
    slug: "ila-certificate",
    icon: ShieldCheck,
    title: "Independent Legal Advice Certificate",
    tagline: "Certified independent legal advice for binding agreements",
    description:
      "We provide Independent Legal Advice (ILA) and issue signed ILA Certificates for clients entering into mortgages, cohabitation, separation, prenuptial, guarantor, or shareholder agreements — ensuring you fully understand the document before signing.",
    image: divorceImg,
    features: [
      "Same-day virtual or in-person appointments",
      "Review of the agreement clause by clause",
      "Plain-language explanation of rights & obligations",
      "Confirmation of voluntary, informed consent",
      "Signed & sealed ILA Certificate provided",
      "Acceptance and signing requirements confirmed before engagement",
    ],
    details: [
      "Independent Legal Advice protects both parties by confirming that the person signing understands the terms and is not signing under pressure. Lenders and courts often require an ILA Certificate before enforcing an agreement.",
      "Our lawyer meets with you privately (no other party present), reviews the document, answers your questions, and issues a formal certificate that meets Law Society of Ontario standards.",
      "Common uses: spousal guarantees on mortgages, cohabitation and prenuptial agreements, separation agreements, shareholder agreements, and personal guarantees on business loans.",
    ],
    faqs: [
      { q: "How long does an ILA appointment take?", a: "Most appointments are completed in 30–60 minutes depending on the length and complexity of the agreement." },
      { q: "Do you offer virtual ILA?", a: "Yes. We provide virtual ILA under Ontario licensing with secure video conferencing and electronic delivery of the signed certificate where permitted." },
      { q: "What do I need to bring?", a: "A copy of the agreement to be signed, government-issued photo ID, and any related documents (e.g., mortgage commitment, financial disclosure)." },
    ],
  },
  {
    slug: "escrow-agent",
    icon: Landmark,
    title: "Escrow Agent Services",
    tagline: "A neutral, licensed third party holding funds and documents",
    description:
      "We act as an independent escrow agent for business, real estate, and private transactions governed by Ontario or federal law — holding funds and closing documents in a lawyer's trust account and releasing them only when the agreed conditions are met.",
    image: minuteBooksImg,
    features: [
      "Funds held in a lawyer's trust account",
      "Escrow agreement drafting & review",
      "Share purchase & asset sale closings",
      "Holdback and earn-out administration",
      "Document escrow & conditional release",
      "Written confirmation of release conditions",
    ],
    details: [
      "As an escrow agent we provide a neutral, accountable hold on deposits, purchase price holdbacks, and signed closing documents so neither party has to rely on the other's good faith.",
      "We draft or review the escrow agreement, confirm the release conditions in writing, and disburse only when those conditions are satisfied or on joint written direction.",
      "Escrow is commonly used for share and asset purchases, private loans, settlement funds, domain and IP transfers, and deposits on private sale transactions.",
    ],
    faqs: [
      { q: "Where are the funds held?", a: "Funds are held in our law firm's trust account, governed by Law Society trust accounting rules and reconciled monthly." },
      { q: "What does escrow cost?", a: "Escrow fees are quoted upfront based on the value of the transaction and the complexity of the release conditions." },
      { q: "How quickly are funds released?", a: "Once the release conditions are satisfied or we receive joint written direction, funds are typically disbursed within one business day." },
    ],
  },
  {
    slug: "process-service",
    icon: Send,
    title: "Process Service",
    tagline: "Reliable, court-compliant service of legal documents",
    description:
      "We coordinate document service for Ontario matters and the required affidavit of service. Availability and any independent process server’s charges are confirmed before work begins.",
    image: divorceImg,
    features: [
      "Personal & substituted service",
      "Claims, applications & motion materials",
      "Divorce and family law documents",
      "Demand letters & notices",
      "Sworn Affidavit of Service provided",
      "Skip tracing for hard-to-locate parties",
    ],
    details: [
      "Improper service is one of the most common reasons a matter gets adjourned. We serve documents in accordance with the applicable Rules of Civil Procedure and family law rules.",
      "Each service is documented with time, date, location, and a description of the person served, and is followed by a sworn Affidavit of Service ready for filing.",
      "Where a party cannot be located or is evading service, we can assist with skip tracing and with a motion for substituted service.",
    ],
    faqs: [
      { q: "How fast can documents be served?", a: "Standard service is usually attempted within 2–3 business days; rush service is available for urgent court deadlines." },
      { q: "What if the person avoids service?", a: "We document each attempt and can help you obtain a court order for substituted service by email, mail, or social media where permitted." },
      { q: "Do I receive proof of service?", a: "Yes. You receive a sworn Affidavit of Service that can be filed with the court." },
    ],
  },
  {
    slug: "sred",
    icon: FlaskConical,
    title: "SR&ED Tax Credit Support",
    tagline: "Legal support for Scientific Research & Experimental Development claims",
    description:
      "We provide the corporate and contractual legal work that sits behind a defensible SR&ED claim \u2014 eligibility structuring, IP and contractor agreements, documentation practices, and representation if the CRA reviews or audits your claim.",
    image: incorporationsImg,
    features: [
      "SR&ED eligibility & structuring review",
      "Contractor, employee & IP ownership agreements",
      "Documentation & record-keeping frameworks",
      "Related-party and subcontract SR&ED issues",
      "CRA review & audit response support",
      "Notice of Objection & appeal representation",
    ],
    details: [
      "SR&ED is Canada\u2019s largest innovation incentive, but claims are increasingly denied on legal and contractual grounds \u2014 who owns the IP, who bore the financial risk, and whether the work was properly documented.",
      "We review your corporate structure, contractor and employment agreements, and intellectual property arrangements so that the entity claiming the credit is the entity legally entitled to it.",
      "If the CRA reviews or reassesses your claim, we assist with the response, and where necessary prepare a Notice of Objection and represent you through the appeal process.",
    ],
    faqs: [
      { q: "Do you prepare the SR&ED technical narrative?", a: "The technical narrative and costing schedules are normally prepared by your SR&ED consultant or accountant. We handle the legal side \u2014 structuring, agreements, IP ownership, and CRA dispute work \u2014 and can coordinate directly with them." },
      { q: "Why do contracts matter for SR&ED?", a: "The CRA looks at who bore the financial risk and who owns the resulting IP. Poorly drafted contractor or joint-development agreements can move the entitlement to another party and disqualify the claim." },
      { q: "Can you help after a claim was denied?", a: "Yes. We can review the CRA\u2019s position, assist with the second-level review, and prepare and argue a Notice of Objection within the statutory deadline." },
    ],
  },
  {
    slug: "litigation",
    icon: Scale,
    title: "Corporate Litigation",
    tagline: "Strategic representation when the stakes are high",
    description:
      "When business disputes escalate, you need a lawyer on your side. We provide strategic, cost-effective representation in corporate disputes, contract breaches, and commercial litigation matters.",
    image: litigationImg,
    features: [
      "Contract dispute resolution",
      "Shareholder disputes",
      "Commercial litigation",
      "Breach of fiduciary duty",
      "Business tort claims",
      "Settlement negotiation",
    ],
    details: [
      "Our lawyer takes a strategic approach, always considering the most cost-effective path to resolution—whether that's negotiation, mediation, or trial.",
      "We represent both plaintiffs and defendants in a wide range of corporate disputes, from breach of contract claims to complex shareholder oppression matters.",
      "Early case assessment is a key part of our process. We provide honest, realistic advice about your chances of success and the likely costs so you can make informed decisions.",
    ],
    faqs: [
      { q: "How much does litigation cost?", a: "Litigation costs vary significantly depending on complexity. We provide detailed cost estimates upfront and offer alternative fee arrangements where appropriate." },
      { q: "Can we settle out of court?", a: "Most cases settle before trial. We actively pursue settlement when it serves your interests, potentially saving significant time and expense." },
      { q: "What is the litigation process?", a: "It typically involves: initial assessment, pleadings, documentary and oral discovery, mediation, and if necessary, trial. We guide you through each step." },
    ],
  },
];
