import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Check, 
  Briefcase, 
  ShoppingCart,
  Scale,
  ArrowRight,
  MessageSquare
} from "lucide-react";

const subscriptionPlans = [
  {
    id: "corporate",
    title: "Corporate Legal Subscription",
    subtitle: "Ongoing corporate legal support",
    description: "Comprehensive legal support for your business operations, governance, and compliance needs.",
    icon: Building2,
    features: [
      "Monthly corporate governance review",
      "Board resolution preparation",
      "Shareholder agreement updates",
      "Annual filing reminders & support",
      "Corporate minute book maintenance",
      "Regulatory compliance monitoring",
      "Priority email & phone support",
    ],
    popular: false,
    href: "/book?service=corporate-subscription",
    cta: "Get a Quote",
  },
  {
    id: "general-counsel",
    title: "General Counsel Subscription",
    subtitle: "Your outsourced legal department",
    description: "A dedicated legal partner providing full-spectrum counsel for growing businesses.",
    icon: Briefcase,
    features: [
      "Everything in Corporate subscription",
      "Unlimited contract review & drafting",
      "Employment law guidance",
      "Dispute resolution support",
      "Strategic legal planning sessions",
      "Vendor & partner negotiations",
      "Dedicated attorney access",
      "Monthly legal health reports",
    ],
    popular: true,
    href: "/book?service=general-counsel-subscription",
    cta: "Get a Quote",
  },
  {
    id: "procurement",
    title: "Procurement Law Subscription",
    subtitle: "Win more government contracts",
    description: "Specialized legal support for navigating complex government procurement processes.",
    icon: ShoppingCart,
    features: [
      "RFP/RFQ response review",
      "Bid preparation support",
      "Compliance verification",
      "Debriefing representation",
      "Bid protest assistance",
      "Subcontractor agreements",
      "Procurement strategy sessions",
    ],
    popular: false,
    href: "/book?service=procurement-subscription",
    cta: "Get a Quote",
  },
];

export function SubscriptionPlans() {
  return (
    <section id="subscriptions" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Scale className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Subscription Services</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Subscription-Based Legal Services
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Predictable legal costs with ongoing support. Choose the subscription 
            that fits your business needs and scale with confidence.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 card-hover flex flex-col ${
                plan.popular 
                  ? "border-primary shadow-xl lg:scale-[1.02]" 
                  : "border-border hover:border-secondary"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                  Most Popular
                </Badge>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl mb-4 ${
                  plan.popular ? "bg-primary/10" : "bg-secondary/10"
                }`}>
                  <plan.icon className={`h-7 w-7 ${plan.popular ? "text-primary" : "text-secondary"}`} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {plan.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  {plan.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground font-body mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 mt-0.5 ${
                      plan.popular ? "bg-primary/10" : "bg-secondary/10"
                    }`}>
                      <Check className={`h-3 w-3 ${plan.popular ? "text-primary" : "text-secondary"}`} />
                    </div>
                    <span className="text-foreground font-body text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
                size="lg"
                asChild
              >
                <Link to={plan.href}>
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* Trust text */}
              <p className="text-center text-xs text-muted-foreground mt-4">
                Custom pricing based on your needs
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground font-body mb-4">
            Not sure which subscription is right for you?
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/book">
              <MessageSquare className="mr-2 h-4 w-4" />
              Schedule a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
