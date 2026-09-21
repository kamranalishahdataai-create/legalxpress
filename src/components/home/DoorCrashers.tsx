import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSignature, ScrollText, ArrowRight, Scale, Heart, Sparkles, Check } from "lucide-react";

const doorCrasherServices = [
  {
    icon: FileSignature,
    title: "Notary Services",
    price: 10,
    originalPrice: 20,
    description: "Professional notarization for your legal documents. Fast, reliable, and legally binding.",
    features: ["Same-day service", "All document types", "Electronic notary also available"],
    href: "/book?service=notary",
    badge: "Limited Time",
  },
  {
    icon: ScrollText,
    title: "Simple Wills",
    price: 100,
    originalPrice: 200,
    description: "Protect your loved ones with a professionally drafted will. Clear, comprehensive, and legally sound.",
    features: ["Professionally drafted", "Includes revisions", "Digital & physical copy"],
    href: "/book?service=will",
    badge: "Best Value",
  },
  {
    icon: Scale,
    title: "Small Claims Litigation",
    price: 999,
    originalPrice: 1998,
    description: "Non-trial small claims representation including professional demand letter and negotiation.",
    features: ["Demand letter included", "Settlement negotiation", "Court filing support"],
    href: "/book?service=small-claims",
    badge: "New Service",
  },
  {
    icon: Heart,
    title: "Separation & Prenup Agreements",
    price: 999,
    originalPrice: 2000,
    description: "Professionally drafted separation or prenuptial agreements. Connect with a specialist for complex arrangements.",
    features: ["Starting at $999", "Specialist consultation available", "Complex agreements supported"],
    href: "/book?service=separation-prenup",
    badge: "Popular",
  },
];

export function DoorCrashers() {
  return (
    <section id="deals" className="py-16 bg-gradient-to-br from-secondary/5 via-background to-secondary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <Scale className="h-4 w-4" />
            <span className="text-sm font-semibold font-body">Featured Services</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Accessible Legal Solutions
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Take advantage of our special offers on essential legal services.
            Professional quality at prices that can't be beat.
          </p>
        </div>

        {/* Essential Package Promo Banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <Link
            to="/subscriptions/essential"
            className="block relative z-10 overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-r from-secondary via-secondary/95 to-secondary shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-8 left-1/4 w-28 h-28 bg-background rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 right-1/4 w-36 h-36 bg-background rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="relative z-10 px-6 py-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background/20 shrink-0">
                    <Sparkles className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-foreground/80 uppercase tracking-wider mb-1">
                      Save Even More
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-secondary-foreground leading-tight">
                      Get the Essential Package — 50% Off These Services
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-3xl font-display font-bold text-secondary-foreground tabular-nums">$4.99</span>
                      <span className="text-sm text-secondary-foreground/80 font-body">/mo</span>
                    </div>
                    <p className="text-xs text-secondary-foreground/80 font-body">Cancel anytime</p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-background text-foreground hover:bg-background/90 shadow-sm"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-secondary-foreground/20 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-secondary-foreground/90 font-body">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Notary Services</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Simple Wills</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Small Claims</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Separation & Prenup</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {doorCrasherServices.map((service) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-2xl p-8 border-2 border-secondary/30 hover:border-secondary transition-all duration-300 card-hover"
            >
              {/* Badge */}
              <Badge className="absolute -top-3 left-6 bg-destructive text-destructive-foreground">
                {service.badge}
              </Badge>

              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 mb-6 group-hover:bg-secondary/20 transition-colors">
                <service.icon className="h-8 w-8 text-secondary" />
              </div>

              {/* Title & Price */}
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                {service.title}
              </h3>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-secondary">${service.price}</span>
                <span className="text-lg text-muted-foreground line-through">${service.originalPrice}</span>
                <Badge variant="outline" className="text-xs">
                  {Math.round((1 - service.price / service.originalPrice) * 100)}% OFF
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground font-body mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground font-body">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <Link to="/subscriptions/essential">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* Essential upsell */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-secondary" />
                <span>
                  50% off with{" "}
                  <Link to="/subscriptions/essential" className="text-secondary font-semibold hover:underline">
                    Essential Plan
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
