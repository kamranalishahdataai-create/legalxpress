import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  FileText, 
  Users, 
  ShoppingCart, 
  Home, 
  Heart, 
  Scale,
  Landmark,
  Send,
  FlaskConical,
  ArrowRight,
  Check
} from "lucide-react";

import incorporationsImg from "@/assets/services/incorporations.jpg";
import minuteBooksImg from "@/assets/services/minute-books.jpg";
import shareholderImg from "@/assets/services/shareholder-agreements.jpg";
import procurementImg from "@/assets/services/procurement.jpg";
import realEstateImg from "@/assets/services/real-estate.jpg";
import divorceImg from "@/assets/services/divorce.jpg";
import litigationImg from "@/assets/services/litigation.jpg";

const services = [
  {
    id: "incorporations",
    slug: "incorporations",
    icon: Building2,
    image: incorporationsImg,
    title: "Incorporations",
    description: "Federal and provincial business incorporation services with complete documentation and compliance support.",
    features: [
      "Federal & Provincial incorporations",
      "Articles of incorporation drafting",
      "Initial organizational resolutions",
      "Share structure setup",
      "Corporate name search & registration",
      "CRA business number registration",
    ],
  },
  {
    id: "minute-books",
    slug: "minute-books",
    icon: FileText,
    image: minuteBooksImg,
    title: "Minute Books",
    description: "Professional minute book preparation, maintenance, and annual updates for corporate governance.",
    features: [
      "Initial minute book setup",
      "Annual resolutions & updates",
      "Share certificates & registers",
      "Director & officer records",
      "Meeting minutes preparation",
      "Corporate seal arrangement",
    ],
  },
  {
    id: "shareholder",
    slug: "shareholder-agreements",
    icon: Users,
    image: shareholderImg,
    title: "Shareholder Agreements",
    description: "Comprehensive shareholder agreements tailored to protect your business interests and relationships.",
    features: [
      "Customized shareholder agreements",
      "Buy-sell provisions",
      "Drag-along & tag-along rights",
      "Dispute resolution mechanisms",
      "Non-compete clauses",
      "Exit strategy planning",
    ],
  },
  {
    id: "procurement",
    slug: "procurement",
    icon: ShoppingCart,
    image: procurementImg,
    title: "Procurement Law",
    description: "Navigate complex procurement processes with expert guidance on bids, contracts, and disputes.",
    features: [
      "RFP response review",
      "Bid protest & appeals",
      "Government contract negotiation",
      "Compliance review",
      "Debriefing representation",
      "Procurement dispute resolution",
    ],
  },
  {
    id: "real-estate",
    slug: "",
    icon: Home,
    image: realEstateImg,
    title: "Residential Real Estate",
    description: "Full-service residential real estate transactions including purchases, sales, and refinancing.",
    features: [
      "Purchase & sale transactions",
      "Title search & insurance",
      "Mortgage documentation",
      "Transfer of ownership",
      "Refinancing services",
      "Property tax adjustments",
    ],
  },
  {
    id: "divorce",
    slug: "divorce",
    icon: Heart,
    image: divorceImg,
    title: "Simple Divorce",
    description: "Straightforward, non-litigated divorce proceedings with compassionate and efficient service.",
    features: [
      "Uncontested divorce applications",
      "Separation agreements",
      "Division of property drafting",
      "Court document preparation",
      "Filing & service handling",
      "Final divorce certificate",
    ],
  },
  {
    id: "escrow-agent",
    slug: "escrow-agent",
    icon: Landmark,
    image: minuteBooksImg,
    title: "Escrow Agent Services",
    description: "Neutral escrow of funds and closing documents held in a lawyer's trust account until conditions are met.",
    features: [
      "Funds held in a lawyer's trust account",
      "Escrow agreement drafting & review",
      "Share purchase & asset sale closings",
      "Holdback and earn-out administration",
      "Document escrow & conditional release",
      "Written confirmation of release conditions",
    ],
  },
  {
    id: "process-service",
    slug: "process-service",
    icon: Send,
    image: divorceImg,
    title: "Process Service",
    description: "Court-compliant service of legal documents anywhere in Canada, with a sworn Affidavit of Service.",
    features: [
      "Personal & substituted service",
      "Claims, applications & motion materials",
      "Family and divorce documents",
      "Demand letters & notices",
      "Sworn Affidavit of Service provided",
      "Skip tracing for hard-to-locate parties",
    ],
  },
  {
    id: "sred",
    slug: "sred",
    icon: FlaskConical,
    image: incorporationsImg,
    title: "SR&ED Tax Credit Support",
    description: "Legal support behind Scientific Research & Experimental Development claims \u2014 structuring, agreements, and CRA review representation.",
    features: [
      "SR&ED eligibility & structuring review",
      "Contractor, employee & IP ownership agreements",
      "Documentation & record-keeping frameworks",
      "Related-party and subcontract SR&ED issues",
      "CRA review & audit response support",
      "Notice of Objection & appeal representation",
    ],
  },
  {
    id: "litigation",
    slug: "litigation",
    icon: Scale,
    image: litigationImg,
    title: "Corporate Litigation",
    description: "Strategic representation in corporate disputes, contract breaches, and commercial litigation.",
    features: [
      "Contract dispute resolution",
      "Shareholder disputes",
      "Commercial litigation",
      "Breach of fiduciary duty",
      "Business tort claims",
      "Settlement negotiation",
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Our Legal Services
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Comprehensive legal solutions for businesses and individuals 
            across Canada.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 mb-6">
                    <service.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground font-body mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10">
                          <Check className="h-3.5 w-3.5 text-secondary" />
                        </div>
                        <span className="text-foreground font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                      <Link to="/book">
                        Book Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {service.slug ? (
                      <Button variant="outline" asChild>
                        <Link to={`/services/${service.slug}`}>Learn More</Link>
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div className={`rounded-2xl overflow-hidden border border-border shadow-lg ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto object-cover aspect-video"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Book your free 30-minute consultation today and let us help you 
            with your legal needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <Link to="/book">Book Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
