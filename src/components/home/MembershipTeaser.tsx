import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingDown, Shield } from "lucide-react";

export function MembershipTeaser() {
  return (
    <section id="membership" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl hero-gradient p-10 md:p-14">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              {/* Left - Story */}
              <div className="text-primary-foreground">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium font-body mb-6">
                  <Sparkles className="h-4 w-4" />
                  Become a Member
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Reliable legal support,{" "}
                  <span className="text-secondary">no surprise bills</span>
                </h2>
                <p className="text-primary-foreground/80 font-body leading-relaxed mb-4">
                  Protect yourself from unexpected legal costs with a membership designed to put you first. 
                  Join a community that has chosen steady, predictable support over surprise bills.
                </p>
                <p className="text-primary-foreground/70 font-body text-sm leading-relaxed mb-6">
                  Become one of our first 100,000 members and unlock reduced pricing on all membership 
                  services. Once we reach 100,000, all services drop to just <strong className="text-secondary">$1/month</strong> — 
                  rewarding loyalty and transparency, not fine print.
                </p>
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                  asChild
                >
                  <Link to="/founder-members">
                    Learn How It Works
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Right - Quick Stats */}
              <div className="space-y-4">
                <div className="bg-card/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/10">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingDown className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium text-primary-foreground/90 font-body">Price Drops As We Grow</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-bold text-secondary">$1</span>
                    <span className="text-primary-foreground/60 font-body">/month goal</span>
                  </div>
                </div>
                <div className="bg-card/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium text-primary-foreground/90 font-body">Everything Included</span>
                  </div>
                  <p className="text-sm text-primary-foreground/70 font-body">
                    Bundles, Case Analysis, Contract Templates & Affiliate Partner discounts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
