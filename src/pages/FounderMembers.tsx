import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, TrendingDown, Shield, Star, ArrowRight, 
  CheckCircle2, BarChart3, Heart, Zap, Clock 
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_SPOTS = 100000;

const benefits = [
  {
    icon: TrendingDown,
    title: "Lower Prices on Everything",
    description: "The more Members we have, the more we can invest in efficiency and technology — passing monthly savings on all membership services directly to you.",
  },
  {
    icon: Shield,
    title: "Locked-In Member Rates",
    description: "As a Member, you'll always receive priority pricing on all services — bundles, Case Analysis, Contract Templates, and more — even as standard rates increase.",
  },
  {
    icon: Star,
    title: "Priority Access",
    description: "Members get first access to new services, features, and exclusive consultations before they're available to the public.",
  },
  {
    icon: Heart,
    title: "Shape Our Services",
    description: "Your feedback directly influences the services we build. Members have a voice in what we offer next.",
  },
];

const howItWorks = [
  { step: "1", title: "Claim Your Spot", description: "Sign up as one of our first 100,000 Members." },
  { step: "2", title: "Access Discounted Services", description: "Immediately enjoy member-exclusive pricing on all legal services." },
  { step: "3", title: "Community Grows", description: "As more members join, operational costs decrease and services get even cheaper." },
  { step: "4", title: "Everyone Wins", description: "A larger community means better rates, more resources, and stronger legal support for all." },
];

const milestones = [
  { members: "25,000", discount: "25%", label: "Milestone 1" },
  { members: "50,000", discount: "50%", label: "Milestone 2" },
  { members: "75,000", discount: "75%", label: "Milestone 3" },
  { members: "100,000", discount: "$1 each", label: "Final Goal" },
];

const FounderMembers = () => {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      const { data } = await supabase
        .from("subscriber_counter")
        .select("spots_remaining")
        .limit(1)
        .maybeSingle();
      setSpotsLeft(data?.spots_remaining ?? TOTAL_SPOTS);
    };
    fetchSpots();

    const channel = supabase
      .channel("founder_spots_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "subscriber_counter" },
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

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30 px-4 py-1.5">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            Only {(spotsLeft ?? TOTAL_SPOTS).toLocaleString()} of {TOTAL_SPOTS.toLocaleString()} spots remaining
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Become a Member
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 leading-relaxed font-medium">
            Protect yourself from unexpected legal costs with a membership designed to put you first. Instead of facing legal issues alone, you join a community of individuals who have chosen steady, predictable support over surprise bills.
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-6 leading-relaxed">
            Join our <strong className="font-bold uppercase tracking-wide">first</strong> 100,000 members and <strong className="underline">start saving right away</strong> on Bundle Packages, Case Analysis, Contract Templates, and exclusive affiliate discount services that cut your everyday costs even further. Once we hit 100,000 members, every service drops to just <strong>$1/month</strong> — <strong className="font-semibold uppercase tracking-wide">serious legal protection for less than the cost of a coffee.</strong>
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            <strong className="font-bold uppercase tracking-wide underline">It isn't just another subscription</strong> — it's <strong>your legal safety net</strong>, with built‑in savings through our affiliate partners, all on your terms, built on a simple promise of <strong className="underline">reliable, affordable legal support</strong> that rewards loyalty and transparency, <strong className="underline">not fine print or hidden fees.</strong>
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
            <Link to="/subscriptions/personal">
              View Member Deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Live Counter */}
      {spotsLeft !== null && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <div className="bg-card rounded-2xl border-2 border-secondary/30 p-8 text-center shadow-lg">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Member Spots Claimed
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-display font-bold text-secondary tabular-nums">
                  {(TOTAL_SPOTS - spotsLeft).toLocaleString()}
                </span>
                <span className="text-2xl text-muted-foreground">/ {TOTAL_SPOTS}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden max-w-md mx-auto mb-2">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, percentage)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {percentage.toFixed(1)}% claimed — {spotsLeft} spots left
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Why It Matters */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-semibold font-body">The Power of Community</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              More Members = Lower Costs
            </h2>
            <p className="text-lg text-muted-foreground font-body">
              Traditional law firms charge high fees because they serve few clients. 
              Our model is different — by growing our community, we spread costs and invest in 
              technology that makes <strong>all membership services</strong> — Bundle Packages, Case Analysis, 
              and Contract Templates — dramatically more affordable. As our community grows, 
              we unlock further legal savings and cost reduction across the board.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl p-6 border border-border card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 mb-4">
                  <b.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-semibold font-body">Price Milestones</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              More Members, Bigger Savings
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              For every 25,000 members who join, monthly prices across <strong>all membership services</strong> — Bundle Packages, 
              Case Analysis, and Contract Templates — drop by 25%. Once we reach 100,000 members, 
              all services go down to just <strong>$1/month</strong>, unlocking further legal savings and cost reduction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => {
              const membersJoined = spotsLeft !== null ? TOTAL_SPOTS - spotsLeft : 0;
              const threshold = (i + 1) * 25000;
              const reached = membersJoined >= threshold;
              return (
                <div
                  key={m.label}
                  className={`relative rounded-2xl border-2 p-6 text-center transition-all ${
                    reached
                      ? "border-secondary bg-secondary/10 shadow-lg"
                      : "border-border bg-card"
                  }`}
                >
                  {reached && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-secondary text-secondary-foreground">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Reached
                      </Badge>
                    </div>
                  )}
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {m.label}
                  </p>
                  <p className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                    {m.members}
                  </p>
                  <p className="text-sm text-muted-foreground font-body mb-3">members</p>
                  <div className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${
                    reached
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {m.discount.startsWith("$") ? `All services ${m.discount}/mo` : `${m.discount} off all services`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="deals" className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <Zap className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Claim Your Spot?
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-8">
            Browse our discounted legal services below and book as a Member today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <Link to="/subscriptions/personal">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                View Member Deals
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/book">
                <Clock className="mr-2 h-4 w-4" />
                Book a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FounderMembers;
