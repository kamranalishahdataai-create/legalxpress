import { PriceNotice, ProviderNotice } from "@/components/legal/PracticeNotice";
import { BILLING_SHORT } from "@/data/billingTerms";
import { PROFESSIONAL_REPORTS_PER_MONTH } from "@/data/caseResearch";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Package, ArrowRight, Sparkles } from "lucide-react";

const bundles = [
  {
    id: "essential",
    title: "Essential Bundle",
    subtitle: "Discounts on core legal services",
    price: "$4.99",
    period: "/mo · 12-month term",
    savings: "New",
    features: [
      "Notary: $10 member fee per document",
      "Simple will: $100 member fee",
      "Ontario small claims pre-trial package: $999 member fee",
      "Agreed separation / marriage contract: $999 member fee",
      "15% courtesy discount on participating referral partners’ own fees",
      "Email support",
    ],
    popular: false,
    href: "/checkout?bundle=essential",
    cta: "Get Started",
  },
  {
    id: "starter",
    title: "Starter Bundle",
    subtitle: "Essential legal tools",
    price: "$6.99",
    period: "/mo · 12-month term",
    savings: "Save 15%",
    features: [
      "Everything in Essential, plus:",
      "1 case-law research report per month",
      "1 contract download per month (PDF or Word)",
      "e-Notary: $0 member fee",
    ],
    popular: false,
    href: "/checkout?bundle=starter",
    cta: "Get Started",
  },
  {
    id: "professional",
    title: "Professional Bundle",
    subtitle: "Member services and tools",
    price: "$9.99",
    period: "/mo · 12-month term",
    savings: "Save 25%",
    features: [
      "Everything in Starter, plus:",
      `${PROFESSIONAL_REPORTS_PER_MONTH} case-law research reports per month`,
      "5 contract downloads per month (PDF or Word)",
      "In-person and e-Notary: $0 member fee",
      "Simple will: $0 member fee",
    ],
    popular: false,
    href: "/checkout?bundle=professional",
    cta: "Get Started",
  },
  {
    id: "business",
    title: "Executive Bundle",
    subtitle: "Complete legal toolkit",
    price: "$14.99",
    period: "/mo · 12-month term",
    savings: "Save 35%",
    features: [
      "Everything in Professional, plus:",
      "5 case-law research reports per month",
      "Unlimited contract downloads (PDF or Word), fair use",
      "50% off Complex Wills",
      "Demand letters: $0 member fee, up to 3/year",
    ],
    popular: false,
    href: "/checkout?bundle=business",
    cta: "Get Started",
    footnote: "*Filing fees and trial costs are separate",
  },
];

export function MembershipBundles() {
  return (
    <section id="bundles" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <Package className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Membership Bundles</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bundle & Save on Yearly Memberships
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Get more value by combining case-law research reports and Contract Templates into
            one affordable yearly membership. Every bundle is a 12-month membership billed monthly. Legal-service scope and member fees are confirmed in writing.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 card-hover flex flex-col ${
                bundle.popular
                  ? "border-primary shadow-xl lg:scale-[1.02]"
                  : "border-border hover:border-secondary"
              }`}
            >
              {/* Popular Badge */}
              {bundle.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Best Value
                </Badge>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {bundle.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  {bundle.subtitle}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {bundle.price}
                  </span>
                  <span className="text-muted-foreground font-body">
                    {bundle.period}
                  </span>
                </div>
                <PriceNotice className="mt-4" /><ProviderNotice />
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {bundle.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 mt-0.5 ${
                        bundle.popular ? "bg-primary/10" : "bg-secondary/10"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          bundle.popular ? "text-primary" : "text-secondary"
                        }`}
                      />
                    </div>
                    <span className="text-foreground font-body text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full ${
                  bundle.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
                size="lg"
                asChild
              >
                <Link to={bundle.href}>
                  {bundle.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                {BILLING_SHORT}
              </p>
              {(bundle as any).footnote && (
                <p className="text-center text-xs text-muted-foreground mt-2 italic">
                  {(bundle as any).footnote}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Member pricing note */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-muted-foreground font-body text-sm">
            Future reductions are a community pricing goal, not a guarantee.{" "}
            <Link
              to="/founder-members"
              className="text-primary hover:underline font-medium"
            >
              Learn about our community pricing goal →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
