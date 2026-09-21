import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  FileText, 
  Users, 
  ShoppingCart, 
  Heart, 
  Scale,
  Globe,
  ArrowRight

} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Incorporations",
    description: "Federal and provincial business incorporation services with complete documentation and compliance support.",
    href: "/services/incorporations",
  },
  {
    icon: FileText,
    title: "Minute Books",
    description: "Professional minute book preparation, maintenance, and annual updates for corporate governance.",
    href: "/services/minute-books",
  },
  {
    icon: Users,
    title: "Shareholder Agreements",
    description: "Comprehensive shareholder agreements tailored to protect your business interests and relationships.",
    href: "/services/shareholder-agreements",
  },
  {
    icon: ShoppingCart,
    title: "Procurement Law",
    description: "Navigate complex procurement processes with expert guidance on bids, contracts, and disputes.",
    href: "/services/procurement",
  },
  {
    icon: Heart,
    title: "Simple Divorce",
    description: "Straightforward, non-litigated divorce proceedings with compassionate and efficient service.",
    href: "/services/divorce",
  },
  {
    icon: Scale,
    title: "Corporate Litigation",
    description: "Strategic representation in corporate disputes, contract breaches, and commercial litigation.",
    href: "/services/litigation",
  },
  {
    icon: Globe,
    title: "E2 Investor Visa",
    description: "US E-2 treaty investor visa support for Canadian entrepreneurs — investment structuring & application prep.",
    href: "/services/e2-visa",
  },
  {
    icon: Globe,
    title: "EB-5 Investor Visa",
    description: "US EB-5 immigrant investor program support — structuring, source-of-funds & petition preparation.",
    href: "/services/eb5-visa",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <Scale className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Our Practice Areas</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Legal Services
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            From startup incorporations to complex litigation, we provide end-to-end 
            legal solutions across Canada.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group card-hover bg-card rounded-xl p-6 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4 group-hover:bg-secondary/20 transition-colors">
                <service.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-secondary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
