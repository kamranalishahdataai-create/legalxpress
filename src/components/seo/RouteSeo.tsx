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
    title: "Legal Memberships & Canadian Lawyers | LegalXpress",
    description:
      "Membership-first legal services in Canada: corporate, contracts, wills, demand letters and notary work in house, affiliates for the rest. From $4.99/month.",
  },

  "/services": {
    title: "Legal Services in Canada | Corporate, Wills & Notary",
    description:
      "Incorporations, shareholder agreements, contracts, wills, notary and litigation support provided in house by a licensed Ontario lawyer.",
  },
  "/book": {
    title: "Book a Free 30-Minute Legal Consultation | LegalXpress",
    description:
      "Schedule a free 30-minute consultation with a licensed Canadian lawyer. Transparent follow-on rates of $200 per 30 minutes or $375 per hour.",
  },
  "/subscriptions": {
    title: "Legal Membership Plans from $4.99/Month | LegalXpress",
    description:
      "Compare Essential, Starter, Professional and Executive legal memberships. Discounted notary, wills, litigation and contract services across Canada.",
  },
  "/contracts": {
    title: "Canadian Contract Template Library | LegalXpress",
    description:
      "Browse lawyer-reviewed Canadian contract templates: NDAs, service agreements, employment, leases and more. Included with LegalXpress memberships.",
  },
  "/case-analysis": {
    title: "AI Case Analysis for Canadian Law | LegalXpress",
    description:
      "Get an AI-assisted assessment of your Canadian legal matter using CanLII and Canadian case law sources. Not legal advice — always lawyer reviewed.",
  },
  "/affiliates": {
    title: "Vetted Canadian Affiliate Legal Partners | LegalXpress",
    description:
      "Matters outside our in-house practice areas are referred to vetted Canadian affiliate lawyers in immigration, family, criminal and real estate law.",
  },
  "/price-match": {
    title: "Legal Fee Price Match Request | LegalXpress",
    description:
      "Submit a competing lawyer quote and we will review whether LegalXpress can match or beat it on comparable Canadian legal work.",
  },
  "/about": {
    title: "About LegalXpress | Canadian Legal Practice Since 2016",
    description:
      "LegalXpress is a Canadian legal services practice led by Shiv Kumar Passi (LSO 70089L), serving business and personal clients since 2016.",
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
    title: "LegalXpress Community & Referral Program",
    description: "Join the LegalXpress community, refer others and help unlock lower legal pricing for Canadian members.",
  },
  "/promo-deals": {
    title: "Legal Service Specials & Promotions | LegalXpress",
    description: "Current fixed-price promotions on notary services, simple wills and small claims litigation across Canada.",
  },
  "/founder-members": {
    title: "LegalXpress Member Spots | Canadian Legal Memberships",
    description: "Track remaining member spots and join the LegalXpress membership program for affordable Canadian legal services.",
  },
  "/privacy": { title: "Privacy Policy | LegalXpress", description: "How LegalXpress collects, uses and protects your personal information." },
  "/terms": { title: "Terms of Service | LegalXpress", description: "The terms governing your use of LegalXpress services and website." },
  "/login": { title: "Sign In | LegalXpress", description: "Sign in to your LegalXpress client portal.", noindex: true },
  "/register": { title: "Create an Account | LegalXpress", description: "Create a LegalXpress client account.", noindex: true },
};

const PRIVATE_PREFIXES = ["/portal", "/admin", "/lawyer-portal", "/checkout"];

const DEFAULT_META: RouteMeta = {
  title: "Our Legal Team, One Membership With You In Mind | LegalXpress",
  description:
    "Our legal team, one membership with you in mind. Canadian lawyers providing corporate, contract, wills and demand letter services, plus vetted affiliates — plans from $4.99/month.",
};


/** Applies per-route head metadata for every page that doesn't manage its own. */
export function RouteSeo() {
  const { pathname } = useLocation();

  if (SELF_MANAGED.includes(pathname)) return null;

  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const meta = ROUTE_META[pathname] ?? DEFAULT_META;

  return <Seo title={meta.title} description={meta.description} noindex={meta.noindex || isPrivate} />;
}
