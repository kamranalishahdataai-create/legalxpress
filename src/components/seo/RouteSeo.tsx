import { useLocation } from "react-router-dom";
import { Seo } from "./Seo";

interface RouteMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

/** Routes that render their own <Seo /> (e.g. rich JSON-LD pages). */
const SELF_MANAGED = ["/", "/landing"];

const ROUTE_META: Record<string, RouteMeta> = {
  "/home": {
    title: "Legal Memberships & Ontario-Licensed Lawyer | LegalXpress",
    description:
      "Membership-first legal services in Canada: corporate, contracts, wills, demand letters and notary work in house, affiliates for the rest. From $4.99/month + HST, with a 12-month commitment billed monthly.",
  },

  "/services": {
    title: "Legal Services in Canada | Corporate, Wills & Notary",
    description:
      "Incorporations, shareholder agreements, contracts, wills, notary and litigation support provided in house by a licensed Ontario lawyer.",
  },
  "/book": {
    title: "Book a Free 30-Minute Legal Consultation | LegalXpress",
    description:
      "Schedule a free 30-minute consultation with a licensed Ontario lawyer. Follow-on fees: $200 per 30 minutes or $375 per hour, plus HST.",
  },
  "/subscriptions": {
    title: "Legal Membership Plans from $4.99/Month | LegalXpress",
    description:
      "Compare Essential, Starter, Professional and Executive legal memberships. Discounted notary, wills, litigation and contract services under Ontario licensing.",
  },
  "/contracts": {
    title: "Canadian Contract Template Library | LegalXpress",
    description:
      "Browse Canadian contract templates: NDAs, service agreements, employment, leases and more. Included with LegalXpress memberships.",
  },
  "/case-analysis": {
    title: "Case Law Research Tool | LegalXpress",
    description:
      "See how Canadian courts have decided cases on the same issue. Every case linked to the public decision. Generated automatically; not reviewed by a lawyer.",
  },
  "/case-analysis/draft-claim": {
    title: "Claim Drafter for Members | LegalXpress",
    description:
      "Members enter their claim details and download a document arranged in the structure of Ontario's Plaintiff's Claim (Form 7A) or Statement of Claim (Form 14A). Automated formatting; not lawyer-reviewed; not filed.",
    noindex: true,
  },
  "/affiliates": {
    title: "Independent Professional Referral Network | LegalXpress",
    description:
      "Matters outside our in-house practice areas are referred to independent licensed professionals, with no referral fees or commissions.",
  },
  "/price-match": {
    title: "Legal Fee Price Match Request | LegalXpress",
    description:
      "Have a written quote and have not retained a lawyer? Share the scope for our fixed price; no lawyer names required.",
  },
  "/about": {
    title: "About LegalXpress | Ontario Law Practice",
    description:
      "LegalXpress is an Ontario law practice led by Shiv Kumar Passi, Lawyer (LSO No. 70089L), serving individuals and small businesses.",
  },
  "/contact": {
    title: "Contact LegalXpress | Canadian Legal Services",
    description: "Reach the LegalXpress team about corporate, contract, wills, notary or litigation matters in Canada.",
  },
  "/faq": {
    title: "Frequently Asked Questions | LegalXpress",
    description:
      "Answers about consultations, pricing, memberships, affiliate referrals and how LegalXpress delivers Canadian legal services.",
  },
  "/blog": {
    title: "Canadian Legal Insights & Guides | LegalXpress Blog",
    description: "Practical guides on Canadian corporate law, contracts, wills, notary requirements and dispute resolution.",
  },
  "/community": {
    title: "Share LegalXpress",
    description: "Share our free initial consultation booking link. LegalXpress does not reward client referrals.",
  },
  "/promo-deals": {
    title: "Legal Service Specials & Promotions | LegalXpress",
    description: "Current fixed-price promotions on notary services, simple wills and small claims litigation under Ontario licensing.",
  },
  "/founder-members": {
    title: "Become a LegalXpress Member",
    description: "Choose a 12-month legal membership billed monthly, with published member fees plus HST.",
  },
  "/privacy": { title: "Privacy Policy | LegalXpress", description: "How LegalXpress collects, uses and protects your personal information." },
  "/terms": { title: "Terms of Service | LegalXpress", description: "The terms governing your use of LegalXpress services and website." },
  "/login": { title: "Sign In | LegalXpress", description: "Sign in to your LegalXpress client portal.", noindex: true },
  "/register": { title: "Create an Account | LegalXpress", description: "Create a LegalXpress client account.", noindex: true },
  "/intake": { title: "Client Intake & Conflict Review | LegalXpress", description: "Request a membership or legal help and follow your confidential intake review with LegalXpress.", noindex: true },
};

const PRIVATE_PREFIXES = ["/portal", "/admin", "/lawyer-portal", "/checkout"];

const DEFAULT_META: RouteMeta = {
  title: "Our Legal Team, One Membership With You In Mind | LegalXpress",
  description:
    "Our legal team, one membership with you in mind. Ontario-licensed lawyer providing corporate, contract, wills and demand letter services, plus vetted affiliates — plans from $4.99/month.",
};


/** Applies per-route head metadata for every page that doesn't manage its own. */
export function RouteSeo() {
  const { pathname } = useLocation();

  if (SELF_MANAGED.includes(pathname)) return null;

  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const meta = ROUTE_META[pathname] ?? DEFAULT_META;

  return <Seo title={meta.title} description={meta.description} noindex={meta.noindex || isPrivate} />;
}
