import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
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
      { icon: Percent, text: "50% off Notary Services", included: true },
      { icon: Percent, text: "50% off Simple Wills", included: true },
      { icon: Percent, text: "50% off Small Claims Litigation", included: true },
      { icon: Percent, text: "50% off Separation & Pre-Nup Agreements", included: true },
      { icon: Percent, text: "15% off all Affiliate Partner services", included: true },
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
    popular: true,
    features: [
      { icon: Check, text: "Everything in Essential, plus:", included: true },
      { icon: Brain, text: "1 AI Case Analysis per month", included: true },
      { icon: Download, text: "1 contract download/month (PDF or Word)", included: true },
      { icon: Stamp, text: "Free e-Notaries (in addition to 50% off in-person)", included: true },
    ],
  },
  professional: {
    id: "professional",
    title: "Professional",
    subtitle: "Full-featured plan for complete legal coverage",
    price: 9.99,
    period: "month",
    color: "secondary",
    popular: false,
    features: [
      { icon: Check, text: "Everything in Starter, plus:", included: true },
      { icon: Brain, text: "Up to 3 AI Case Analyses per month", included: true },
      { icon: Download, text: "5 contract downloads/month (PDF or Word)", included: true },
      { icon: Stamp, text: "Free in-person & e-Notaries", included: true },
      { icon: Scale, text: "Legal memos included", included: true },
      { icon: Heart, text: "Simple Wills included", included: true },
      { icon: Zap, text: "Priority processing", included: true },
    ],
  },
  executive: {
    id: "executive",
    title: "Executive",
    subtitle: "Premium plan with unlimited access and maximum savings",
    price: 14.99,
    period: "month",
    color: "primary",
    popular: false,
    features: [
      { icon: Check, text: "Everything in Professional, plus:", included: true },
      { icon: Brain, text: "Unlimited AI Case Analyses", included: true },
      { icon: Download, text: "Unlimited contract downloads (PDF or Word)", included: true },
      { icon: Percent, text: "50% off Complex Wills", included: true },
      { icon: ScrollText, text: "Free Demand Letters (up to 3 per year)", included: true },
      { icon: Shield, text: "Dedicated priority support", included: true },
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
    category: "Discounts on Legal Services",
    rows: [
      { feature: "Notary Services", values: { essential: "50% off", starter: "Free e-Notary + 50% in-person", professional: "Free in-person & e-Notary", executive: "Free in-person & e-Notary" } },
      { feature: "Simple Wills", values: { essential: "50% off", starter: "50% off", professional: "Included", executive: "Included" } },
      { feature: "Complex Wills", values: { essential: false, starter: false, professional: false, executive: "50% off" } },
      { feature: "Small Claims Litigation", values: { essential: "50% off", starter: "50% off", professional: "50% off", executive: "50% off" } },
      { feature: "Separation & Pre-Nup Agreements", values: { essential: "50% off", starter: "50% off", professional: "50% off", executive: "50% off" } },
      { feature: "Affiliate Partner services", values: { essential: "15% off", starter: "15% off", professional: "15% off", executive: "15% off" } },
    ],
  },
  {
    category: "AI & Document Tools",
    rows: [
      { feature: "AI Case Analysis", values: { essential: false, starter: "1 / month", professional: "3 / month", executive: "Unlimited" } },
      { feature: "Contract downloads (PDF or Word)", values: { essential: false, starter: "1 / month", professional: "5 / month", executive: "Unlimited" } },
      { feature: "Legal memos", values: { essential: false, starter: false, professional: true, executive: true } },
      { feature: "Demand Letters", values: { essential: false, starter: false, professional: false, executive: "Up to 3 / year free" } },
    ],
  },
  {
    category: "Support & Perks",
    rows: [
      { feature: "Email support", values: { essential: true, starter: true, professional: true, executive: true } },
      { feature: "Priority processing", values: { essential: false, starter: false, professional: true, executive: true } },
      { feature: "Dedicated priority support", values: { essential: false, starter: false, professional: false, executive: true } },
    ],
  },
];

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
              All plans are yearly commitments with monthly billing. Cancel anytime. Prices decrease as our member community grows.
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

              <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card shadow-sm">
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



            {/* Community pricing note */}
            <div className="max-w-2xl mx-auto mt-12 text-center">
              <p className="text-muted-foreground font-body mb-4">
                Our prices decrease as our community grows. Join 100,000 members and pay just $1/month.
              </p>
              <Button variant="link" className="text-secondary gap-1" asChild>
                <Link to="/founder-members">
                  Learn about our Member Spots program
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
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
                  Yearly commitment · Monthly billing · Cancel anytime
                </p>

                <div className="mb-8 pb-6 border-b border-border">
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
                      30-Day Guarantee
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
                Why the Essential Plan Pays for Itself
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
                    "50% off notary services, simple wills, small claims litigation and separation/prenup agreements",
                    "15% off all affiliate partner services (immigration, real estate, family, criminal and more)",
                    "Low monthly cost — less than most single notarizations",
                    "No long-term lock-in; cancel anytime",
                    "Same licensed Canadian legal team behind every service",
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
                    "Does not include free contract downloads or AI case analysis (available in Starter and above)",
                    "Discounts apply to eligible services only; some complex matters may still require separate quotes",
                    "Yearly commitment with monthly billing — best for those who expect at least one legal service per year",
                    "In-person notary and e-notary are discounted, not free (free in higher tiers)",
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
                <h3 className="font-display text-xl font-bold text-foreground">Real-world savings example</h3>
              </div>
              <p className="text-muted-foreground font-body mb-6">
                A simple will and one notarization can easily cost $250–$400 when purchased separately. With Essential, you pay $4.99/month and save 50% on each service — often recovering the full year's membership cost in a single visit.
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
            <span className="font-display font-semibold text-foreground">Community Pricing</span>
          </div>
          <p className="text-muted-foreground font-body mb-6">
            Our prices decrease as our community grows. Every 25,000 members triggers a 25% reduction. 
            At 100,000 members, all membership services drop to just $1/month.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/founder-members">
              Learn More About Member Spots
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
