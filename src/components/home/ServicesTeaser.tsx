import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building2, FileText, Scale, Heart, ArrowRight, Users, 
  ShoppingCart, Globe, ChevronDown, ShieldCheck, Landmark, Send, FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    icon: Building2,
    title: "Business Formation",
    description: "Incorporations, minute books & shareholder agreements",
    services: [
      { title: "Incorporations", href: "/services/incorporations", icon: Building2 },
      { title: "Minute Books", href: "/services/minute-books", icon: FileText },
      { title: "Shareholder Agreements", href: "/services/shareholder-agreements", icon: Users },
    ],
  },
  {
    icon: Scale,
    title: "Litigation & Disputes",
    description: "Corporate litigation & commercial dispute resolution",
    services: [
      { title: "Corporate Litigation", href: "/services/litigation", icon: Scale },
    ],
  },
  {
    icon: ShoppingCart,
    title: "Procurement Law",
    description: "RFP reviews, bid protests & government contract support",
    services: [
      { title: "Procurement Law", href: "/services/procurement", icon: ShoppingCart },
    ],
  },

  {
    icon: FlaskConical,
    title: "SR&ED & Innovation",
    description: "Legal support for SR&ED tax credit claims, IP ownership & CRA reviews",
    services: [
      { title: "SR&ED Tax Credit Support", href: "/services/sred", icon: FlaskConical },
    ],
  },
  {
    icon: FileText,
    title: "Contracts & Templates",
    description: "Professional legal documents ready to customize",
    services: [
      { title: "Contract Library", href: "/contracts", icon: FileText },
    ],
  },
  {
    icon: Landmark,
    title: "Escrow Agent",
    description: "Neutral escrow of funds & closing documents in a lawyer's trust account",
    services: [
      { title: "Escrow Agent Services", href: "/services/escrow-agent", icon: Landmark },
    ],
  },
  {
    icon: Globe,
    title: "Immigration",
    description: "US E-2 and EB-5 investor visa support for Canadian entrepreneurs",
    services: [
      { title: "E2 Investor Visa", href: "/services/e2-visa", icon: Globe },
      { title: "EB-5 Investor Visa", href: "/services/eb5-visa", icon: Globe },
    ],
  },
  {
    icon: Heart,
    title: "Personal Legal",
    description: "Simple divorce, independent legal advice & process service",
    services: [
      { title: "Simple Divorce", href: "/services/divorce", icon: Heart },
      { title: "Independent Legal Advice Certificate", href: "/services/ila-certificate", icon: ShieldCheck },
      { title: "Process Service", href: "/services/process-service", icon: Send },
    ],
  },
];

export function ServicesTeaser() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (title: string) => {
    setExpanded((prev) => (prev === title ? null : title));
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Legal Solutions, Simplified
          </h2>
          <p className="text-muted-foreground font-body">
            Whether you're starting a business or resolving a dispute, we've got you covered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          {categories.map((cat) => {
            const isOpen = expanded === cat.title;
            return (
              <div
                key={cat.title}
                className={cn(
                  "group relative bg-card rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-secondary/40 shadow-lg"
                    : "border-border/50 hover:border-secondary/30 hover:shadow-md"
                )}
              >
                {/* Category Header */}
                <button
                  onClick={() => toggle(cat.title)}
                  className="w-full text-left p-6 flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <cat.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-secondary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-300",
                      isOpen && "rotate-180 text-secondary"
                    )}
                  />
                </button>

                {/* Expanded Services */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-6 pt-0 space-y-2">
                    <div className="h-px bg-border/50 mb-3" />
                    {cat.services.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/5 transition-colors group/item"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                          <service.icon className="h-4 w-4 text-secondary" />
                        </div>
                        <span className="text-sm font-medium text-foreground font-body group-hover/item:text-secondary transition-colors">
                          {service.title}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link to="/services">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
