import { Link } from "react-router-dom";
import { 
  Heart, DollarSign, Handshake, FileText, Brain,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Referral Program",
    description: "Refer friends & enter our monthly $250 gift card draw",
    href: "/community",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: DollarSign,
    title: "Price Match",
    description: "Got a quote from another lawyer? Share it and we'll try to beat it",
    href: "/price-match",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Handshake,
    title: "Affiliate Partners & Locator",
    description: "Find legal, accounting & mortgage pros — AI-matched to your local area",
    href: "/affiliates",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: FileText,
    title: "Contract Library",
    description: "Professional legal templates ready to download & customize",
    href: "/contracts",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Brain,
    title: "AI Case Analysis",
    description: "Instant case assessment backed by precedent law research",
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
            From AI-powered case analysis to a network of trusted professionals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.href}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-secondary/30 hover:shadow-md transition-all duration-300"
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
      </div>
    </section>
  );
}
