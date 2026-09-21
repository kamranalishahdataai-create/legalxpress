import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Users, ArrowRight } from "lucide-react";

export function ReferralTeaser() {
  return (
    <section id="referral" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500/10 via-background to-violet-500/10 border border-border/50 p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left - Story */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 text-sm font-medium font-body mb-6">
                  <Heart className="h-4 w-4" />
                  Community Referral Program
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  Refer & Win <span className="text-pink-500">$250</span> Monthly
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  Know someone who needs legal help? Refer them to our network and 
                  get entered into our monthly gift card draw. It's that simple.
                </p>
                <Button className="bg-primary hover:bg-primary/90 gap-2" asChild>
                  <Link to="/community">
                    Start Referring
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Right - How it works */}
              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    step: "01",
                    title: "Refer a Friend",
                    desc: "Submit their details through our simple form",
                  },
                  {
                    icon: Heart,
                    step: "02",
                    title: "They Get Help",
                    desc: "Once they engage with a lawyer, you're activated",
                  },
                  {
                    icon: Gift,
                    step: "03",
                    title: "Win $250",
                    desc: "Choose your draw month — one entry per referral",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card/80 border border-border/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10">
                      <item.icon className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-pink-500 font-display">{item.step}</span>
                        <h3 className="font-display font-semibold text-foreground text-sm">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
