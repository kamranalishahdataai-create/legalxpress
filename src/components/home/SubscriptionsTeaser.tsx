import { PriceNotice, ProviderNotice } from "@/components/legal/PracticeNotice";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, ShoppingCart, Scale, Check, ArrowRight, Store, Landmark } from "lucide-react";
import { corporateAllowances, corporateInclusions, corporateAddOns, bankPartnerOffer } from "@/data/corporateMembership";
import { BILLING_SHORT, BILLING_NOTE } from "@/data/billingTerms";
import { PROFESSIONAL_REPORTS_PER_MONTH } from "@/data/caseResearch";

const corporatePackages = [
  {
    id: "corporate-starter",
    name: "Business Starter",
    shortName: "Starter",
    title: "Sole Proprietors",
    icon: Store,
    price: "$29",
    period: "/mo",
    description: "For freelancers and sole proprietors getting registered and covered.",
    checkoutHref: "/checkout?plan=corporate-starter",
    href: "/services/incorporations",
  },
  {
    id: "corporate-a",
    name: "Corporate Package A",
    shortName: "Package A",
    title: "Business Formation",
    icon: Building2,
    price: "$99",
    period: "/mo",
    description: "Incorporations, minute books & shareholder agreements — one monthly membership.",
    services: [
      { title: "Incorporations", href: "/services/incorporations" },
      { title: "Minute Books", href: "/services/minute-books" },
      { title: "Shareholder Agreements", href: "/services/shareholder-agreements" },
    ],
    checkoutHref: "/checkout?plan=corporate-a",
    href: "/services/incorporations",
  },
  {
    id: "corporate-b",
    name: "Corporate Package B",
    shortName: "Package B",
    title: "Procurement Law",
    icon: ShoppingCart,
    price: "$499",
    period: "/mo",
    description: "RFP reviews, bid protests & government contract support — one monthly membership.",
    services: [{ title: "Procurement Law", href: "/services/procurement" }],
    checkoutHref: "/checkout?plan=corporate-b",
    href: "/services/procurement",
  },
  {
    id: "corporate-c",
    name: "Corporate Package C",
    shortName: "Package C",
    title: "Litigation & Disputes",
    icon: Scale,
    price: "$999",
    period: "/mo",
    description: "Corporate litigation & commercial dispute resolution — one monthly membership.",
    services: [{ title: "Corporate Litigation", href: "/services/litigation" }],
    checkoutHref: "/checkout?plan=corporate-c",
    href: "/services/litigation",
  },
];

const plans = [
  {
    name: "Essential",
    price: "$4.99",
    highlight: false,
    features: [
      "Notary: $10 member fee per document",
      "Simple will: $100 member fee",
      "Small claims pre-trial / agreed marriage contract: $999 member fee",
    ],
  },
  {
    name: "Starter",
    price: "$6.99",
    highlight: false,
    features: [
      "Everything in Essential",
      "1 research report / month",
      "e-Notary: $0 member fee",
    ],
  },
  {
    name: "Professional",
    price: "$9.99",
    highlight: false,
    features: [
      "Everything in Starter",
      `${PROFESSIONAL_REPORTS_PER_MONTH} case-law research reports per month`,
      "5 contract downloads/month + simple will at $0 member fee",
    ],
  },
  {
    name: "Executive",
    price: "$14.99",
    highlight: false,
    features: [
      "Everything in Professional",
      "5 case-law research reports per month",
      "Complex wills: 50% off quoted fee + 3 demand letters/year at $0 member fee",
    ],
  },
];

export function SubscriptionsTeaser() {
  return (
    <section id="subscriptions" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
            Membership Plans
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Plans That Grow With You
          </h2>
          <p className="text-muted-foreground font-body">
            Participating referral partners may offer a 15% courtesy discount on their own fees. Every plan is a 12-month membership billed monthly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-8">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg p-6 border flex flex-col transition-shadow ${
                plan.highlight
                  ? "border-secondary shadow-lg bg-card"
                  : "border-border/50 bg-card/80"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-display font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground font-body">/mo</span>
              </div>
              <p className="text-xs text-muted-foreground font-body mb-4">{BILLING_SHORT} · + HST</p><PriceNotice className="mb-4" />
              <ul className="space-y-2 mb-5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground font-body">
                    <Check className="h-4 w-4 text-forest shrink-0 mt-1" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlight ? "default" : "outline"}
                size="sm"
                className={`w-full ${plan.highlight ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}`}
                asChild
              >
                <Link to={`/subscriptions/${plan.name.toLowerCase()}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="link" className="gap-1 text-secondary" asChild>
            <Link to="/subscriptions">
              Compare all plan features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="max-w-6xl mx-auto mt-14 pt-12 border-t border-border/50">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
              Corporate Memberships
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Corporate Packages
            </h3>
            <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
              Business memberships on the same 12-month, billed-monthly basis as our personal plans.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {corporatePackages.map((pkg) => (
              <div key={pkg.name} className="flex flex-col bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-forest/10">
                    <pkg.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground">{pkg.name}</h4>
                </div>
                <p className="font-display text-xl font-semibold text-foreground mb-2">{pkg.title}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-body">from</span>
                  <span className="text-3xl font-display font-bold text-foreground">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground font-body">{pkg.period}</span>
                </div>
                <p className="text-xs text-muted-foreground font-body mb-3">{BILLING_SHORT} · + HST</p><PriceNotice className="mb-4" />
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{pkg.description}</p><ProviderNotice />
                <ul className="space-y-2 mb-4">
                  {(corporateInclusions[pkg.id] ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-body text-foreground">
                      <Check className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="rounded-md bg-muted/40 p-3 mb-5 flex-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-body mb-2">Yearly allowance</p>
                  <ul className="space-y-1">
                    {(corporateAllowances[pkg.id] ?? []).map((a) => (
                      <li key={a.label} className="text-xs font-body text-foreground">
                        <span className="font-semibold">{a.label}:</span> {a.value}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                  <Link to={pkg.checkoutHref}>Join {pkg.shortName}<ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="link" className="px-0 text-sm text-secondary font-body" asChild>
                  <Link to={pkg.href}>Explore the service</Link>
                </Button>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground font-body text-center mt-5">{BILLING_NOTE}</p>

          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
              <h4 className="font-display text-lg font-bold text-foreground mb-1">Add-ons for any corporate membership</h4>
              <p className="text-sm text-muted-foreground font-body mb-4">Tailor your membership for a small extra fee, added to your monthly bill for the length of your 12-month term.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {corporateAddOns.map((a) => (
                  <div key={a.name} className="border border-border/60 rounded-md p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-body font-semibold text-sm text-foreground">{a.name}</span>
                      <span className="font-body text-sm text-secondary font-semibold whitespace-nowrap">{a.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body mt-1">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-forest/10 border border-forest/30 rounded-lg p-6 flex flex-col">
              <Landmark className="h-6 w-6 text-forest mb-3" />
              <h4 className="font-display text-lg font-bold text-foreground mb-2">{bankPartnerOffer.title}</h4>
              <p className="text-sm text-foreground font-body mb-3">{bankPartnerOffer.text}</p>
              <p className="text-xs text-muted-foreground font-body mt-auto italic">{bankPartnerOffer.note}</p>
            </div>
          </div>
        </div>
        <LegalDisclaimer context="membership" variant="compact" className="mt-8" />
      </div>
    </section>
  );
}
