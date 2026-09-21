import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Scale, 
  Building2, 
  HeartHandshake,
  Home,
  Car,
  Briefcase,
  FileText,
  ArrowRight,
  Search,
  MessageSquare,
  MapPin,
  Sparkles,
  Bot,
  Calculator,
  Landmark,
  UserCheck,
  Building,
  Receipt,
  PiggyBank
} from "lucide-react";
import { LawyerFinderForm } from "@/components/affiliates/LawyerFinderForm";

const legalCategories = [
  {
    id: "immigration",
    icon: Users,
    title: "Immigration Law",
    description: "Visa applications, permanent residency, citizenship, and deportation defense.",
    comingSoon: true,
  },
  {
    id: "criminal",
    icon: Scale,
    title: "Criminal Defense",
    description: "DUI, assault, theft, drug charges, and other criminal matters.",
    comingSoon: true,
  },
  {
    id: "personal-injury",
    icon: HeartHandshake,
    title: "Personal Injury",
    description: "Car accidents, medical malpractice, slip and fall, wrongful death claims.",
    comingSoon: false,
    partners: [{ name: "Adam Yoo and Associates", specialty: "Personal Injury Law" }],
  },
  {
    id: "real-estate-commercial",
    icon: Building2,
    title: "Residential and Commercial Real Estate",
    description: "Residential and commercial property transactions, leases, zoning, and development projects.",
    comingSoon: false,
    partners: [{ name: "Strata Law Firm", specialty: "Real Estate Law" }],
  },
  {
    id: "bankruptcy",
    icon: FileText,
    title: "Bankruptcy",
    description: "Chapter 7, Chapter 11, Chapter 13, debt negotiation, and financial restructuring.",
    comingSoon: true,
  },
  {
    id: "family",
    icon: Home,
    title: "Complex Family Law",
    description: "Contested divorces, child custody disputes, adoption, and prenuptial agreements.",
    comingSoon: true,
  },
  {
    id: "employment",
    icon: Briefcase,
    title: "Employment Law",
    description: "Wrongful termination, discrimination, harassment, wage disputes, and OSHA violations.",
    comingSoon: true,
  },
  {
    id: "insurance",
    icon: Car,
    title: "Insurance Claims",
    description: "Denied claims, bad faith insurance, property damage, and life insurance disputes.",
    comingSoon: false,
    partners: [{ name: "Adam Yoo and Associates", specialty: "Insurance Claims" }],
  },
];

const accountantCategories = [
  {
    id: "personal-tax",
    icon: Receipt,
    title: "Personal Tax Services",
    description: "Individual tax preparation, tax planning, CRA audit support, and personal tax optimization.",
    comingSoon: true,
  },
  {
    id: "business-accounting",
    icon: Calculator,
    title: "Business Accounting",
    description: "Bookkeeping, financial statements, payroll, HST/GST filing, and corporate tax returns.",
    comingSoon: true,
  },
  {
    id: "corporate-tax",
    icon: Building,
    title: "Corporate Tax Planning",
    description: "Tax-efficient business structures, year-end planning, incorporation, and holding companies.",
    comingSoon: true,
  },
  {
    id: "estate-planning-accounting",
    icon: PiggyBank,
    title: "Estate & Trust Accounting",
    description: "Estate tax returns, trust accounting, succession planning, and wealth transfer strategies.",
    comingSoon: true,
  },
];

const mortgageCategories = [
  {
    id: "residential-mortgage",
    icon: Home,
    title: "Residential Mortgages",
    description: "First-time homebuyer programs, mortgage pre-approvals, refinancing, and rate negotiations.",
    comingSoon: true,
  },
  {
    id: "commercial-mortgage",
    icon: Landmark,
    title: "Commercial Mortgages",
    description: "Commercial property financing, multi-unit investments, construction loans, and bridge financing.",
    comingSoon: true,
  },
  {
    id: "mortgage-renewal",
    icon: FileText,
    title: "Mortgage Renewals & Transfers",
    description: "Competitive renewal rates, lender transfers, blended mortgages, and penalty calculations.",
    comingSoon: true,
  },
  {
    id: "private-lending",
    icon: UserCheck,
    title: "Private & Alternative Lending",
    description: "Private mortgages, B-lender solutions, debt consolidation, and credit rebuilding programs.",
    comingSoon: true,
  },
];

type PartnerCategory = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  comingSoon: boolean;
  partners?: { name: string; specialty: string }[];
};

function PartnerGrid({ categories }: { categories: PartnerCategory[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="group bg-card rounded-xl p-6 border border-border hover:border-secondary transition-all duration-300 card-hover"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4 group-hover:bg-secondary/20 transition-colors">
            <category.icon className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            {category.title}
          </h3>
          <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          {category.comingSoon ? (
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-body">
              Partners Coming Soon
            </span>
          ) : category.partners ? (
            <div className="space-y-2">
              {category.partners.map((partner) => (
                <div key={partner.name} className="flex items-center gap-2 text-sm font-body">
                  <div className="h-2 w-2 rounded-full bg-secondary shrink-0" />
                  <span className="text-foreground font-medium">{partner.name}</span>
                </div>
              ))}
              <Button variant="link" className="p-0 h-auto text-secondary text-xs" asChild>
                <Link to={`/affiliates/request?category=${category.id}`}>
                  Request Referral <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          ) : (
            <Button variant="link" className="p-0 h-auto text-secondary" asChild>
              <Link to={`/affiliates/${category.id}`}>
                View Partners <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

function FinderSteps({ steps }: { steps: { label: string; desc: string; icon?: React.ReactNode }[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-10">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 shrink-0">
            {step.icon || <span className="text-secondary font-bold text-sm">{i + 1}</span>}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{step.label}</p>
            <p className="text-xs text-muted-foreground">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Affiliates() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground mb-6">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Partner Network</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Our Affiliate Partners
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            We connect you with trusted professionals across legal, accounting, and mortgage services 
            to ensure all your needs are covered.
          </p>
        </div>
      </section>

      {/* Affiliate liability disclaimer */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <LegalDisclaimer context="affiliates" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              How Affiliate Referrals Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              We've partnered with experienced professionals to ensure you get quality help 
              across legal, financial, and mortgage services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 mx-auto mb-4">
                <Search className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">1. Explore Services</h3>
              <p className="text-muted-foreground text-sm font-body">
                Browse our partner categories to find the professional you need.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">2. Request Referral</h3>
              <p className="text-muted-foreground text-sm font-body">
                Tell us about your needs and we'll match you with the right partner.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 mx-auto mb-4">
                <HeartHandshake className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">3. Get Connected</h3>
              <p className="text-muted-foreground text-sm font-body">
                We introduce you to the partner who schedules a consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Partner Sections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <Tabs defaultValue="legal" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="inline-flex h-auto p-1.5 rounded-full bg-muted/80 gap-1">
                <TabsTrigger
                  value="legal"
                  className="rounded-full px-6 py-3 text-sm font-semibold font-body data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Legal Partners
                </TabsTrigger>
                <TabsTrigger
                  value="accountants"
                  className="rounded-full px-6 py-3 text-sm font-semibold font-body data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Accountant Partners
                </TabsTrigger>
                <TabsTrigger
                  value="mortgage"
                  className="rounded-full px-6 py-3 text-sm font-semibold font-body data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all"
                >
                  <Landmark className="h-4 w-4 mr-2" />
                  Mortgage Agent Partners
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="legal" className="mt-0 space-y-16">
              <div>
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Legal Partners & Affiliates
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto font-body">
                    Trusted attorneys across various practice areas ready to assist with your legal needs.
                  </p>
                </div>
                <PartnerGrid categories={legalCategories} />
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-semibold font-body">Local Attorney Matching</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Find Me a Lawyer in My Local Area
                  </h2>
                  <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                    Submit your information below and our AI-powered matching system will 
                    recommend qualified attorneys in your area based on your specific legal needs.
                  </p>
                </div>
                <FinderSteps
                  steps={[
                    { label: "Submit Request", desc: "Fill out the form with your details" },
                    { label: "AI Matching", desc: "Our system finds the best fit", icon: <Bot className="h-4 w-4 text-secondary" /> },
                    { label: "Get Connected", desc: "Receive attorney recommendations", icon: <Sparkles className="h-4 w-4 text-secondary" /> },
                  ]}
                />
                <div className="glass rounded-2xl p-8 md:p-10">
                  <LawyerFinderForm />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accountants" className="mt-0 space-y-16">
              <div>
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Accountant Partners — Business & Personal
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto font-body">
                    Professional accountants for personal tax, business bookkeeping, corporate tax planning, and estate accounting.
                  </p>
                </div>
                <PartnerGrid categories={accountantCategories} />
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-semibold font-body">Local Accountant Matching</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Find Me an Accountant in My Local Area
                  </h2>
                  <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                    Submit your information below and our AI-powered matching system will 
                    recommend qualified accountants in your area based on your specific financial needs.
                  </p>
                </div>
                <FinderSteps
                  steps={[
                    { label: "Submit Request", desc: "Fill out the form with your details" },
                    { label: "AI Matching", desc: "Our system finds the best fit", icon: <Bot className="h-4 w-4 text-secondary" /> },
                    { label: "Get Connected", desc: "Receive accountant recommendations", icon: <Sparkles className="h-4 w-4 text-secondary" /> },
                  ]}
                />
                <div className="glass rounded-2xl p-8 md:p-10">
                  <LawyerFinderForm />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mortgage" className="mt-0 space-y-16">
              <div>
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Mortgage Agent Partners
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto font-body">
                    Licensed mortgage agents for residential, commercial, renewals, and alternative lending solutions.
                  </p>
                </div>
                <PartnerGrid categories={mortgageCategories} />
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-semibold font-body">Local Mortgage Agent Matching</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Find Me a Mortgage Agent in My Local Area
                  </h2>
                  <p className="text-muted-foreground font-body max-w-2xl mx-auto">
                    Submit your information below and our AI-powered matching system will 
                    recommend qualified mortgage agents in your area based on your specific needs.
                  </p>
                </div>
                <FinderSteps
                  steps={[
                    { label: "Submit Request", desc: "Fill out the form with your details" },
                    { label: "AI Matching", desc: "Our system finds the best fit", icon: <Bot className="h-4 w-4 text-secondary" /> },
                    { label: "Get Connected", desc: "Receive mortgage agent recommendations", icon: <Sparkles className="h-4 w-4 text-secondary" /> },
                  ]}
                />
                <div className="glass rounded-2xl p-8 md:p-10">
                  <LawyerFinderForm />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Become Partner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Are You a Professional?
          </h2>
          <p className="text-primary-foreground/80 font-body mb-6 max-w-xl mx-auto">
            Join our affiliate network as a lawyer, accountant, or mortgage agent and receive quality referrals. 
            We're always looking for trusted partners.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/contact?subject=affiliate-partnership">
              Become an Affiliate Partner
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
