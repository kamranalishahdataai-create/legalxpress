import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { Link } from "react-router-dom";
import { 
  Heart, DollarSign, Handshake, FileText, Brain,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Share LegalXpress",
    description: "Send someone our booking link. We do not pay or reward client referrals.",
    href: "/community",
    color: "text-forest",
    bg: "bg-forest/10",
  },
  {
    icon: DollarSign,
    title: "Price Match",
    description: "Have a written quote and have not retained a lawyer? Share the scope for our fixed price.",
    href: "/price-match",
    color: "text-forest",
    bg: "bg-forest/10",
  },
  {
    icon: Handshake,
    title: "Referral Network",
    description: "Independent licensed professionals. Read our no-referral-fee policy.",
    href: "/affiliates",
    color: "text-forest",
    bg: "bg-forest/10",
  },
  {
    icon: FileText,
    title: "Contract Library",
    description: "Professional legal templates ready to download & customize",
    href: "/contracts",
    color: "text-forest",
    bg: "bg-forest/10",
  },
  {
    icon: Brain,
    title: "Case Law Research Tool",
    description: "See how Canadian courts decided cases on the same issue",
    href: "/case-analysis",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

export function ExploreMore() {
  return (
    <section id="explore" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
            Discover More
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need, One Platform
          </h2>
          <p className="text-muted-foreground font-body">
            Legal services, informational tools and independent professional referrals — clearly identified.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group flex items-start gap-4 py-6 border-t border-border hover:border-forest/40 transition-all duration-300"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.bg}`}>
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-foreground text-sm mb-1 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-secondary shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
        <LegalDisclaimer context="membership" variant="compact" className="mt-8" />
      </div>
    </section>
  );
}
