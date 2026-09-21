import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Gift, Trophy, ArrowRight, Heart } from "lucide-react";

export function JoinCommunity() {
  return (
    <section id="community" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-semibold font-body">Referral Program</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-8">
            Know someone who needs legal help? Refer them to us — once they engage with a lawyer, 
            you'll be entered into our monthly draw for a <span className="font-semibold text-primary">$250 gift card</span>!
          </p>

          {/* Quick Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-4 w-4 text-primary" />
              <span>Monthly Drawing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gift className="h-4 w-4 text-primary" />
              <span>$250 Prize</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>Unlimited Referrals</span>
            </div>
          </div>

          <Button size="lg" asChild>
            <Link to="/community">
              Submit a Referral
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
