import { Brain, Users, DollarSign } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Get instant case assessments backed by precedent law research. Know your legal standing before your first consultation.",
    accent: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Users,
    title: "Community-Driven Pricing",
    description:
      "Join 100,000 members working toward $1/month legal services. More members means lower costs for everyone.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: DollarSign,
    title: "Transparent & Affordable",
    description:
      "No hidden fees, no surprises. Flat-rate bundles, flexible payment plans, and a free 30-minute consultation to start.",
    accent: "from-gold/20 to-gold/5",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
            Why Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Built Different. Built for You.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative text-center p-8 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${pillar.accent} opacity-50`} />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 mx-auto mb-5">
                  <pillar.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
