import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "$4.99",
    highlight: false,
    features: [
      "50% off Notary Services",
      "50% off Simple Wills",
      "50% off Small Claims & Pre-Nup",
    ],
  },
  {
    name: "Starter",
    price: "$6.99",
    highlight: true,
    features: [
      "Everything in Essential",
      "1 AI Case Analysis",
      "Free e-Notary services",
    ],
  },
  {
    name: "Professional",
    price: "$9.99",
    highlight: false,
    features: [
      "Everything in Starter",
      "3 AI Case Analyses",
      "5 contract downloads + Simple Wills",
    ],
  },
  {
    name: "Executive",
    price: "$14.99",
    highlight: false,
    features: [
      "Everything in Professional",
      "Unlimited AI Case Analyses",
      "50% off Complex Wills + 3 free demand letters/yr",
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
            All plans include 15% off Affiliate Partner services. Cancel anytime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-8">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border transition-shadow ${
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
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-display font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground font-body">/mo</span>
              </div>
              <ul className="space-y-2 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground font-body">
                    <Check className="h-4 w-4 text-secondary shrink-0" />
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
      </div>
    </section>
  );
}
