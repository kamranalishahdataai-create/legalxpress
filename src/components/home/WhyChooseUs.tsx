import { Brain, Users, DollarSign } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Research and templates",
    description:
      "Canadian case-law resources and contract templates are separate from personalised legal advice. Book a consultation to discuss your position.",
    accent: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Users,
    title: "Community-Driven Pricing",
    description:
      "Our aim is to lower membership prices as our community grows. Future reductions are a goal, not a guarantee; only current published prices are committed to.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: DollarSign,
    title: "Transparent & Affordable",
    description:
      "Published fixed fees with a written scope. HST, filing fees and disbursements are extra. Start with a free initial 30-minute consultation.",
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
            Why members choose LegalXpress
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative text-left py-7 border-t border-border"
            >
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 mb-5">
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
