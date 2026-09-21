import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Scale, FileSignature, ScrollText, Heart, ArrowRight,
  CheckCircle2, Clock, Flame, Users, Shield, Zap, Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_SPOTS = 500;

const promoServices = [
  {
    icon: FileSignature,
    title: "Notary Services",
    price: 10,
    originalPrice: 25,
    description: "Professional notarization for your legal documents. Fast, reliable, and legally binding.",
    features: ["Same-day service", "All document types", "Electronic notary also available"],
    href: "/book?service=notary",
    badge: "Limited Time",
  },
  {
    icon: ScrollText,
    title: "Simple Wills",
    price: 100,
    originalPrice: 250,
    description: "Protect your loved ones with a professionally drafted will. Clear, comprehensive, and legally sound.",
    features: ["Professionally drafted", "Includes revisions", "Digital & physical copy"],
    href: "/book?service=will",
    badge: "Best Value",
  },
  {
    icon: Scale,
    title: "Small Claims Litigation",
    price: 999,
    originalPrice: 2500,
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
    description: "Professionally drafted separation or prenuptial agreements tailored to your situation.",
    features: ["Starting at $999", "Specialist consultation available", "Complex agreements supported"],
    href: "/book?service=separation-prenup",
    badge: "Popular",
  },
];

const reasons = [
  {
    icon: Shield,
    title: "Professional Quality",
    description: "Every service is handled by licensed legal professionals with years of experience.",
  },
  {
    icon: Zap,
    title: "Unbeatable Pricing",
    description: "We've slashed prices on these essential services to make legal help accessible to everyone.",
  },
  {
    icon: Star,
    title: "Limited Availability",
    description: "Only 500 spots at these prices — once they're gone, standard rates apply.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "By serving more clients efficiently, we keep costs low and quality high for everyone.",
  },
];

const PromoDeals = () => {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      const { data } = await supabase
        .from("promo_spots_counter")
        .select("spots_remaining")
        .limit(1)
        .maybeSingle();
      setSpotsLeft(data?.spots_remaining ?? TOTAL_SPOTS);
    };
    fetchSpots();

    const channel = supabase
      .channel("promo_deals_spots_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "promo_spots_counter" },
        (payload) => {
          if (payload.new && "spots_remaining" in payload.new) {
            setSpotsLeft(payload.new.spots_remaining as number);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const percentage = spotsLeft !== null ? ((TOTAL_SPOTS - spotsLeft) / TOTAL_SPOTS) * 100 : 0;
  const isUrgent = spotsLeft !== null && spotsLeft < 50;

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge className="mb-6 bg-destructive/20 text-destructive-foreground border-destructive/30 px-4 py-1.5">
            {isUrgent ? <Flame className="h-3.5 w-3.5 mr-1.5" /> : <Scale className="h-3.5 w-3.5 mr-1.5" />}
            Only {spotsLeft ?? TOTAL_SPOTS} of {TOTAL_SPOTS} promo spots remaining
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Accessible Legal Solutions
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            Essential legal services at prices that can't be beat. These exclusive rates are only available 
            to the first <strong>500 clients</strong> — act now before spots run out.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
            <a href="#services">
              View Deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Live Counter */}
      {spotsLeft !== null && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <div className="bg-card rounded-2xl border-2 border-destructive/30 p-8 text-center shadow-lg">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Promo Spots Claimed
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-display font-bold text-secondary tabular-nums">
                  {(TOTAL_SPOTS - spotsLeft).toLocaleString()}
                </span>
                <span className="text-2xl text-muted-foreground">/ {TOTAL_SPOTS}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden max-w-md mx-auto mb-2">
                <div
                  className="h-full bg-destructive rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, percentage)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {percentage.toFixed(1)}% claimed — <strong>{spotsLeft} spots left</strong>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Why These Deals */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why These Prices?
            </h2>
            <p className="text-lg text-muted-foreground font-body">
              We believe everyone deserves access to quality legal services. By limiting these deals to 500 
              spots, we can offer dramatically reduced rates while maintaining the professional standard you expect.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {reasons.map((r) => (
              <div key={r.title} className="bg-card rounded-2xl p-6 border border-border card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 mb-4">
                  <r.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Exclusive Promo Services
            </h2>
            <p className="text-lg text-muted-foreground font-body">
              Lock in these prices before all {TOTAL_SPOTS} spots are taken.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {promoServices.map((service) => (
              <div
                key={service.title}
                className="group relative bg-card rounded-2xl p-8 border-2 border-secondary/30 hover:border-secondary transition-all duration-300 card-hover"
              >
                <Badge className="absolute -top-3 left-6 bg-destructive text-destructive-foreground">
                  {service.badge}
                </Badge>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 mb-6 group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-secondary" />
                </div>
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
                <p className="text-muted-foreground font-body mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground font-body">
                      <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                  <Link to="/subscriptions/essential">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {spotsLeft !== null
                      ? `Only ${spotsLeft} promo spots remaining`
                      : "Offer available while spots last"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <Zap className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Don't Miss Out
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-8">
            These exclusive rates won't last forever. Claim your spot and get professional legal services 
            at a fraction of the usual cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <a href="#services">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                View All Deals
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/founder-members">
                <Users className="mr-2 h-4 w-4" />
                Become a Member
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PromoDeals;
