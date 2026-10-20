import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { COMMUNITY_GOAL } from "@/data/practiceTerms";
import { PriceNotice, ProviderNotice } from "@/components/legal/PracticeNotice";
import { BILLING_SHORT, BILLING_NOTE } from "@/data/billingTerms";
import { PROFESSIONAL_REPORTS_PER_MONTH } from "@/data/caseResearch";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  ArrowRight,
  Star,
  Zap,
  Shield,
  MessageSquare,
  FileText,
  Brain,
  Download,
  Stamp,
  ScrollText,
  Scale,
  Heart,
  Users,
  Percent,
  Minus,
  XCircle,
  ThumbsUp,
  AlertTriangle,
  DollarSign,
  Building2,
  Store,
  ShoppingCart,
} from "lucide-react";


const plans = {
  essential: {
    id: "essential",
    title: "Essential",
    subtitle: "Discounts on core legal services — perfect entry plan",
    price: 4.99,
    period: "month",
    color: "secondary",
    popular: false,
    features: [
      { icon: Percent, text: "Notary & commissioning: $10 member fee per document", included: true },
      { icon: Percent, text: "Simple will: $100 member fee (published scope)", included: true },
      { icon: Percent, text: "Ontario small claims pre-trial package: $999 member fee", included: true },
      { icon: Percent, text: "Agreed separation / marriage contract: $999 member fee", included: true },
      { icon: Percent, text: "Participating referral partners may offer a 15% courtesy discount on their own fees", included: true },
      { icon: MessageSquare, text: "Email support", included: true },
    ],
  },
  starter: {
    id: "starter",
    title: "Starter",
    subtitle: "Essential legal tools to get you started",
    price: 6.99,
    period: "month",
    color: "secondary",
    popular: false,
    features: [
      { icon: Check, text: "Everything in Essential, plus:", included: true },
      { icon: Brain, text: "1 case-law research report per month", included: true },
      { icon: Download, text: "1 contract download/month (PDF or Word)", included: true },
      { icon: Stamp, text: "e-Notary: $0 member fee; in-person: $10 per document", included: true },
    ],
  },
  professional: {
    id: "professional",
    title: "Professional",
    subtitle: "Member pricing and defined legal services",
    price: 9.99,
    period: "month",
    color: "secondary",
    popular: false,
    features: [
      { icon: Check, text: "Everything in Starter, plus:", included: true },
      { icon: Brain, text: `${PROFESSIONAL_REPORTS_PER_MONTH} case-law research reports per month`, included: true },
      { icon: Download, text: "5 contract downloads/month (PDF or Word)", included: true },
      { icon: Stamp, text: "In-person and e-Notary: $0 member fee", included: true },
      { icon: Heart, text: "Simple will: $0 member fee (published scope)", included: true },
    ],
  },
  executive: {
    id: "executive",
    title: "Executive",
    subtitle: "Additional services and member tools",
    price: 14.99,
    period: "month",
    color: "primary",
    popular: false,
    features: [
      { icon: Check, text: "Everything in Professional, plus:", included: true },
      { icon: Brain, text: "5 case-law research reports per month", included: true },
      { icon: Download, text: "Unlimited contract downloads (PDF or Word), fair use", included: true },
      { icon: Percent, text: "50% off Complex Wills", included: true },
      { icon: ScrollText, text: "Demand letters: $0 member fee, up to 3 per membership year", included: true },
    ],
  },
};

type PlanKey = keyof typeof plans;

// Side-by-side comparison matrix (order = ascending tier).
const planOrder: PlanKey[] = ["essential", "starter", "professional", "executive"];

const comparisonGroups: {
  category: string;
  rows: { feature: string; values: Record<PlanKey, string | boolean> }[];
}[] = [
  {
    category: "Member fees for legal services — provided by a lawyer",
    rows: [
      { feature: "Notary Services", values: { essential: "$10 per document", starter: "e-Notary $0; in-person $10", professional: "$0 member fee", executive: "$0 member fee" } },
      { feature: "Simple Wills", values: { essential: "$100 member fee", starter: "$100 member fee", professional: "$0 member fee", executive: "$0 member fee" } },
      { feature: "Complex Wills", values: { essential: false, starter: false, professional: false, executive: "50% off" } },
      { feature: "Ontario small claims pre-trial package", values: { essential: "$999", starter: "$999", professional: "$999", executive: "$999" } },
      { feature: "Agreed separation / marriage contract", values: { essential: "$999", starter: "$999", professional: "$999", executive: "$999" } },
      { feature: "Demand letters", values: { essential: false, starter: false, professional: false, executive: "Up to 3 / year at $0 member fee" } },
      { feature: "Courtesy discount on participating partners’ own fees", values: { essential: "15% off", starter: "15% off", professional: "15% off", executive: "15% off" } },
    ],
  },
  {
    category: "AI & Document Tools",
    rows: [
      { feature: "Case law research reports", values: { essential: false, starter: "1 / month", professional: `${PROFESSIONAL_REPORTS_PER_MONTH} / month`, executive: "5 / month" } },
      { feature: "Contract downloads (PDF or Word), fair use", values: { essential: false, starter: "1 / month", professional: "5 / month", executive: "Unlimited" } },
    ],
  },
  {
    category: "Support & Perks",
    rows: [
      { feature: "Email support", values: { essential: true, starter: true, professional: true, executive: true } },
    ],
  },
];

// Corporate memberships (12-month commitment, billed monthly).
const corporatePackages = {
  "corporate-starter": {
    id: "corporate-starter",
    title: "Business Starter",
    shortTitle: "Starter",
    focus: "Sole Proprietors",
    price: 29,
    icon: Store,
    blurb: "For freelancers and sole proprietors.",
  },
  "corporate-a": {
    id: "corporate-a",
    title: "Corporate Package A",
    shortTitle: "Package A",
    focus: "Business Formation",
    price: 99,
    icon: Building2,
    blurb: "For new and growing businesses that need their legal foundation in order.",
  },
  "corporate-b": {
    id: "corporate-b",
    title: "Corporate Package B",
    shortTitle: "Package B",
    focus: "Procurement Law",
    price: 499,
    icon: ShoppingCart,
    blurb: "For contractors bidding on and managing government work.",
  },
  "corporate-c": {
    id: "corporate-c",
    title: "Corporate Package C",
    shortTitle: "Package C",
    focus: "Litigation & Disputes",
    price: 999,
    icon: Scale,
    blurb: "For businesses in, or heading toward, a commercial dispute.",
  },
};

type CorpKey = keyof typeof corporatePackages;
const corporateOrder: CorpKey[] = ["corporate-starter", "corporate-a", "corporate-b", "corporate-c"];

const corporateRows: { feature: string; values: Record<CorpKey, string | boolean> }[] = [
  {
    feature: "Best for",
    values: {
      "corporate-starter": "Freelancers & sole proprietors",
      "corporate-a": "Starting & structuring a business",
      "corporate-b": "Winning & keeping government contracts",
      "corporate-c": "Resolving commercial disputes",
    },
  },
  {
    feature: "Business registration",
    values: {
      "corporate-starter": "Sole proprietorship / business name",
      "corporate-a": "Federal or provincial incorporation",
      "corporate-b": false,
      "corporate-c": false,
    },
  },
  {
    feature: "Annual filings & minute book upkeep",
    values: { "corporate-starter": "Renewal reminders", "corporate-a": true, "corporate-b": false, "corporate-c": false },
  },
  {
    feature: "Director, officer & address changes",
    values: { "corporate-starter": false, "corporate-a": "Unlimited", "corporate-b": false, "corporate-c": false },
  },
  {
    feature: "Shareholder agreement",
    values: { "corporate-starter": false, "corporate-a": true, "corporate-b": false, "corporate-c": false },
  },
  {
    feature: "Procurement Law",
    values: {
      "corporate-starter": false,
      "corporate-a": false,
      "corporate-b": "RFP review, bid protests & contract negotiation",
      "corporate-c": false,
    },
  },
  {
    feature: "Litigation & Disputes",
    values: {
      "corporate-starter": false,
      "corporate-a": false,
      "corporate-b": false,
      "corporate-c": "Claims, breach, shareholder disputes & mediation",
    },
  },
  {
    feature: "Lawyer letters or calls",
    values: {
      "corporate-starter": "3 / year",
      "corporate-a": "10 / year",
      "corporate-b": "20 / year",
      "corporate-c": "40 / year",
    },
  },
  {
    feature: "Document reviews",
    values: {
      "corporate-starter": "3 / year · 15 pages",
      "corporate-a": "10 / year · 20 pages",
      "corporate-b": "20 / year · 25 pages",
      "corporate-c": "40 / year · 25 pages",
    },
  },
  {
    feature: "Collection letters",
    values: { "corporate-starter": false, "corporate-a": false, "corporate-b": false, "corporate-c": "15 / month" },
  },
  {
    feature: "Contract Library access",
    values: { "corporate-starter": true, "corporate-a": true, "corporate-b": true, "corporate-c": true },
  },
  {
    feature: "Optional add-ons",
    values: {
      "corporate-starter": "GST/HST registration",
      "corporate-a": "Trial Defence, Employees, Shares, GST/HST",
      "corporate-b": "Trial Defence, Employees, GST/HST",
      "corporate-c": "Trial Defence, Employees",
    },
  },
];

function MemberLoyaltyRewards() {
 return <section className="py-12 bg-background"><div className="container gutter-x max-w-4xl"><h2 className="font-display text-2xl mb-4">For current members</h2><p className="text-muted-foreground mb-4">Your active plan provides the published services and allowances for that plan. Partner offers are separate sample proposals, subject to the independent partner’s eligibility and terms. No referral rewards or guaranteed renewal-rate locks are offered.</p><LegalDisclaimer context="membership" /></div></section>;
}

export default function Subscriptions() {
  const { planType } = useParams();
  const selectedKey = (planType && planType in plans ? planType : null) as PlanKey | null;


  // If no plan selected, show comparison page
  if (!selectedKey) {
    return (
      <Layout>
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium font-body">Membership Plans</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Plans That Grow With You
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
              All plans are 12-month commitments billed monthly. Prices are in Canadian dollars plus HST. Member fees apply only to the published service scope; filing fees and disbursements are extra.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
            {/* Side-by-side comparison matrix */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Compare Plans Side-by-Side
                </h2>
                <p className="text-muted-foreground font-body">
                  Faded rows aren't part of that plan. Highlighted rows are included.
                </p>
              </div>

              <PriceNotice className="mb-4" /><ProviderNotice /><div className="overflow-x-auto rounded-2xl border border-border/60 bg-card shadow-sm mt-4">
                <table className="w-full min-w-[720px] text-sm font-body">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left p-4 font-display font-semibold text-foreground w-[32%]">
                        Feature
                      </th>
                      {planOrder.map((key) => {
                        const p = plans[key];
                        return (
                          <th
                            key={key}
                            className={`p-4 text-center align-bottom ${
                              p.popular ? "bg-secondary/10" : ""
                            }`}
                          >
                            <div className="font-display text-base font-bold text-foreground">
                              {p.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              ${p.price}/mo
                            </div>
                            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                              12-month term
                            </div>
                            {p.popular && (
                              <div className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wide bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                                Popular
                              </div>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonGroups.flatMap((group) => [
                      <tr key={`h-${group.category}`} className="bg-muted/20">
                        <td
                          colSpan={planOrder.length + 1}
                          className="px-4 py-3 font-display font-semibold text-primary text-xs uppercase tracking-wider"
                        >
                          {group.category}
                        </td>
                      </tr>,
                      ...group.rows.map((row, ri) => (
                        <tr
                          key={`${group.category}-${ri}`}
                          className="border-t border-border/40"
                        >
                          <td className="p-4 text-foreground font-medium">
                            {row.feature}
                          </td>
                          {planOrder.map((key) => {
                            const val = row.values[key];
                            const included = val !== false;
                            const p = plans[key];
                            return (
                              <td
                                key={key}
                                className={`p-4 text-center transition-colors ${
                                  included
                                    ? p.popular
                                      ? "bg-secondary/10 text-foreground"
                                      : "text-foreground"
                                    : "bg-muted/40 text-muted-foreground/40"
                                }`}
                              >
                                {included ? (
                                  val === true ? (
                                    <Check className="h-5 w-5 text-secondary mx-auto" />
                                  ) : (
                                    <span className="inline-flex items-center gap-1 justify-center">
                                      <Check className="h-4 w-4 text-secondary shrink-0" />
                                      <span className="text-xs md:text-sm">{val as string}</span>
                                    </span>
                                  )
                                ) : (
                                  <Minus className="h-4 w-4 mx-auto opacity-50" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      )),
                    ])}
                    <tr className="border-t border-border/60 bg-muted/20">
                      <td className="p-4"></td>
                      {planOrder.map((key) => (
                        <td key={key} className="p-4 text-center">
                          <Button
                            size="sm"
                            variant={plans[key].popular ? "default" : "outline"}
                            className={
                              plans[key].popular
                                ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                : ""
                            }
                            asChild
                          >
                            <Link to={`/checkout?plan=${key}`}>Choose {plans[key].title}</Link>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Corporate Packages comparison */}
            <div className="max-w-6xl mx-auto mt-16 pt-12 border-t border-border/50">
              <div className="text-center mb-10">
                <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
                  Corporate Memberships
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Compare Corporate Packages
                </h2>
                <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                  Packages A, B and C are 12-month business memberships billed monthly — the same
                  basis as our personal plans.
                </p>
              </div>

              <PriceNotice className="mb-4" /><ProviderNotice /><div className="overflow-x-auto rounded-2xl border border-border/60 bg-card shadow-sm mt-4">
                <table className="w-full min-w-[720px] text-sm font-body">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left p-4 font-display font-semibold text-foreground w-[32%]">
                        Feature
                      </th>
                      {corporateOrder.map((key) => {
                        const p = corporatePackages[key];
                        return (
                          <th key={key} className="p-4 text-center align-bottom">
                            <div className="flex flex-col items-center gap-1.5">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
                                <p.icon className="h-4 w-4 text-secondary" />
                              </div>
                              <div className="font-display text-base font-bold text-foreground">
                                {p.shortTitle}
                              </div>
                              <div className="text-xs text-muted-foreground">{p.focus}</div>
                              <div className="text-xs font-semibold text-foreground">
                                from ${p.price}/mo
                              </div>
                              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                12-month term
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {corporateRows.map((row, ri) => (
                      <tr key={ri} className="border-t border-border/40">
                        <td className="p-4 text-foreground font-medium">{row.feature}</td>
                        {corporateOrder.map((key) => {
                          const val = row.values[key];
                          const included = val !== false;
                          return (
                            <td
                              key={key}
                              className={`p-4 text-center ${
                                included
                                  ? "text-foreground"
                                  : "bg-muted/40 text-muted-foreground/40"
                              }`}
                            >
                              {included ? (
                                val === true ? (
                                  <Check className="h-5 w-5 text-secondary mx-auto" />
                                ) : (
                                  <span className="text-xs md:text-sm">{val as string}</span>
                                )
                              ) : (
                                <Minus className="h-4 w-4 mx-auto opacity-50" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr className="border-t border-border/60 bg-muted/20">
                      <td className="p-4"></td>
                      {corporateOrder.map((key) => (
                        <td key={key} className="p-4 text-center">
                          <Button
                            size="sm"
                            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                            asChild
                          >
                            <Link to={`/checkout?plan=${key}`}>
                              Choose {corporatePackages[key].shortTitle}
                            </Link>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-muted-foreground font-body text-center mt-6">{BILLING_NOTE}</p>
            </div>

            {/* Community pricing note */}
            <div className="max-w-2xl mx-auto mt-12 text-center">
              <p className="text-muted-foreground font-body mb-4">
                {COMMUNITY_GOAL}
              </p>
              <Button variant="link" className="text-secondary gap-1" asChild>
                <Link to="/founder-members">
                  Learn about our community pricing goal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <MemberLoyaltyRewards />
      </Layout>
    );
  }

  const plan = plans[selectedKey];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground mb-6">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Membership Plans</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {plan.title} Plan
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            {plan.subtitle}
          </p>
          {plan.popular && (
            <Badge className="mt-4 bg-secondary text-secondary-foreground border-0">
              <Star className="h-3 w-3 mr-1" /> Most Popular
            </Badge>
          )}
        </div>
      </section>

      {/* Plan Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Features List */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                What's Included
              </h2>
              <ul className="space-y-4">
                {plan.features
                  .filter((f) => f.included)
                  .map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                        plan.color === "primary" ? "bg-primary/10" : "bg-secondary/10"
                      }`}>
                        <feature.icon className={`h-5 w-5 ${
                          plan.color === "primary" ? "text-primary" : "text-secondary"
                        }`} />
                      </div>
                      <span className="text-foreground font-body pt-2">{feature.text}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Pricing Card */}
            <div className="sticky top-24">
              <div className={`bg-card rounded-2xl p-8 border-2 ${
                plan.color === "primary" ? "border-primary" : "border-secondary"
              } shadow-xl`}>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {plan.title} Plan
                </h3>
                <p className="text-muted-foreground text-sm font-body mb-6">
                  {BILLING_SHORT}
                </p>

                <PriceNotice className="mb-4" /><ProviderNotice /><div className="mb-8 pb-6 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground font-body">/month</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className={`w-full ${
                      plan.color === "primary"
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    }`}
                    size="lg"
                    asChild
                  >
                    <Link to={`/checkout?plan=${selectedKey}`}>
                      <Zap className="mr-2 h-4 w-4" />
                      Subscribe Now
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <Link to="/contact">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Talk to an Advisor
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Secure Payment
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Published scope and fees
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Switcher */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Looking for a different plan?</p>
                <Button variant="link" asChild>
                  <Link to="/subscriptions">
                    Compare all plans
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Plan Value Breakdown */}
      {selectedKey === "essential" && (
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
                Value Breakdown
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Is Essential right for you?
              </h2>
              <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                At $4.99/month, Essential is built for people who need occasional legal help and want real savings without a large upfront commitment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Pros */}
              <div className="bg-card rounded-2xl border border-border/60 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                    <ThumbsUp className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">Pros</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Published member fees for notary, simple wills, small claims pre-trial work and agreed separation/marriage contracts",
                    "Participating professionals may offer their own courtesy discount; referrals are independent",
                    "Low monthly cost: $4.99 + HST, billed monthly for 12 months",
                    "Billed monthly — no large upfront payment",
                    "Legal services provided by Shiv Kumar Passi, Lawyer (LSO No. 70089L)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-foreground font-body text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-card rounded-2xl border border-border/60 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">Considerations</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Does not include free contract downloads or case-law research reports (available in Starter and above)",
                    "Discounts apply to eligible services only; some complex matters may still require separate quotes",
                    "12-month commitment billed monthly — best for those who expect at least one legal service per year",
                    "Notary fee: $10 + HST per document on Essential; $0 member fees on higher plans are stated separately",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-foreground font-body text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Savings example */}
            <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-6 w-6 text-secondary" />
                <h3 className="font-display text-xl font-bold text-foreground">Example of member fees</h3>
              </div>
              <p className="text-muted-foreground font-body mb-6">
                A simple will ($100 member fee) and one notarization ($10 member fee) cost $110 + HST in legal-service fees. The Essential membership costs $59.88 + HST over its 12-month term. Filing fees and disbursements are extra. No comparison to unconfirmed standard prices is made.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="lg"
                  asChild
                >
                  <Link to="/checkout?plan=essential">
                    <Zap className="mr-2 h-4 w-4" />
                    Get Essential for $4.99/mo
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/subscriptions">Compare all plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What the membership does and does not cover */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <LegalDisclaimer context="membership" />
        </div>
      </section>

      {/* Community Pricing */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-secondary" />
            <span className="font-display font-semibold text-foreground">Community pricing goal</span>
          </div>
          <p className="text-muted-foreground font-body mb-6">
            {COMMUNITY_GOAL}
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/founder-members">
              Learn about membership
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      <MemberLoyaltyRewards />
    </Layout>
  );
}
