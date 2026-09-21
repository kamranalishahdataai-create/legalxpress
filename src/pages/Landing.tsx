import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Scale,
  Building2,
  BadgeCheck,
  Users,
  Handshake,
  ShieldCheck,
  FileText,
  Gavel,
  Stamp,
  ScrollText,
  CheckCircle2,
} from "lucide-react";
import logo from "@/assets/legalxpress-logo.png";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Seo } from "@/components/seo/Seo";

const inHouseServices = [
  { icon: Building2, title: "Incorporations & Corporate Governance", desc: "Federal and provincial incorporations, minute books, shareholder and partnership agreements." },
  { icon: FileText, title: "Commercial Contracts", desc: "Drafting, review and negotiation of supply, service, NDA and procurement agreements." },
  { icon: Gavel, title: "Corporate & Procurement Litigation", desc: "Disputes, demand letters, small claims and commercial litigation support." },
  { icon: ScrollText, title: "Wills & Estate Documents", desc: "Simple and complex wills, powers of attorney and estate planning documents." },
  { icon: Stamp, title: "Notary & Commissioning", desc: "In-person and e-notary services, affidavits, statutory declarations and certified copies." },
  { icon: ShieldCheck, title: "Independent Legal Advice", desc: "ILA certificates for separation, prenuptial and third-party guarantee documents." },
];

const model = [
  {
    icon: Users,
    step: "01",
    title: "Legal services, on membership",
    body:
      "Legal help shouldn't start with a retainer. Flat monthly memberships from $4.99 make legal work affordable and convenient — discounted notary, wills, demand letters, litigation and contract services, plus AI case analysis and our contract library.",
  },
  {
    icon: Scale,
    step: "02",
    title: "One team, ready to assist",
    body:
      "Corporate work, contracts, wills and demand letters are provided in house by our licensed Canadian legal team, led by Shiv Kumar Passi (LSO 70089L) — ready when you need them.",
  },

  {
    icon: Handshake,
    step: "03",
    title: "Affiliates for everything else",
    body:
      "Immigration, family, criminal and real estate matters go to vetted Canadian affiliate counsel — with your membership pricing and our introduction attached.",
  },
];



const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "LegalXpress",
  description:
    "Canadian legal services practice providing in-house corporate, contract, wills, notary and litigation-support services, membership plans, and vetted affiliate referrals for out-of-scope matters.",
  areaServed: { "@type": "Country", name: "Canada" },
  foundingDate: "2016",
  priceRange: "$$",
  knowsAbout: [
    "Corporate law",
    "Commercial contracts",
    "Wills and estates",
    "Notary services",
    "Corporate litigation",
    "Independent legal advice",
  ],
  employee: {
    "@type": "Person",
    name: "Shiv Kumar Passi",
    jobTitle: "Corporate Lawyer",
    identifier: "LSO 70089L",
  },
};

const Landing = () => {
  return (
    <>
      <Seo
        title="Our Legal Team, One Membership With You In Mind | LegalXpress"
        description="Our legal team, one membership with you in mind. Canadian lawyers providing corporate, contract, wills and demand letter services in house — with vetted affiliates for everything else. Plans from $4.99/month."
        jsonLd={jsonLd}
      />

      <div className="min-h-screen flex flex-col bg-background">
        {/* Brand bar */}
        <header className="hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4 md:py-5">
            <Link to="/home" className="flex items-center gap-2 sm:gap-3 min-w-0" aria-label="LegalXpress home">
              <img src={logo} alt="LegalXpress logo" width={80} height={80} className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain shrink-0" />
              <span className="font-display text-lg sm:text-2xl md:text-3xl font-semibold text-primary-foreground truncate">LegalXpress</span>
            </Link>
            <div className="flex items-center gap-2 md:gap-5 shrink-0">
              <nav aria-label="Main" className="hidden xl:flex items-center gap-5">
                {[
                  { to: "/home", label: "Home" },
                  { to: "/services", label: "Services" },
                  { to: "/subscriptions", label: "Memberships" },
                  { to: "/contracts", label: "Contracts" },
                  { to: "/case-analysis", label: "Case Analysis" },
                  { to: "/affiliates", label: "Affiliates" },
                  { to: "/contact", label: "Contact" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="font-body text-sm whitespace-nowrap text-primary-foreground/85 hover:text-secondary transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <LanguageSwitcher />
            </div>
          </div>


          {/* Hero */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pt-16 md:pb-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-start sm:items-center gap-2 rounded-2xl sm:rounded-full border border-secondary/40 bg-primary-foreground/5 px-4 py-2 text-secondary mb-8 max-w-full">
                <BadgeCheck className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-xs md:text-sm font-semibold font-body tracking-wide leading-snug">
                  Membership-first legal services · Licensed Canadian lawyers since 2016
                </span>
              </div>

              <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-primary-foreground text-balance mb-6">
                Our legal team, one membership{" "}
                <span className="text-gradient">with you in mind.</span>
              </h1>


              <p className="text-lg md:text-xl text-primary-foreground/85 font-body leading-relaxed mb-10">
                LegalXpress is changing the way Canadians access legal help: real lawyers, offered on a simple
                monthly membership instead of an intimidating retainer. Corporate work, contracts, wills and demand
                letters are provided in house by our team — ready to assist the moment you need them — with vetted
                affiliate counsel for matters outside our practice.
              </p>




              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 px-8 py-6 text-base font-semibold shadow-xl" asChild>
                  <Link to="/subscriptions">
                    See Membership Plans
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border border-primary-foreground px-8 py-6 text-base font-semibold shadow-lg"
                  asChild
                >
                  <Link to="/book">Book a Free Consultation</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-secondary/70 bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary gap-2 px-8 py-6 text-base font-semibold transition-colors"
                  asChild
                >
                  <Link to="/home">
                    Enter Website
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

              </div>


              <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
                {["Memberships from $4.99/month", "Fixed, published pricing", "Canadian lawyers, Canadian law"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground/80 font-body">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          </section>
        </header>

        <main className="flex-1">
          {/* How we work */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-14">
                <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">Our model</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  A better way to access legal services
                </h2>
                <p className="text-muted-foreground font-body text-lg">
                  One monthly plan puts a full Canadian legal team behind you — affordable, convenient, and clear
                  about what we provide in house and when a vetted affiliate takes the file.
                </p>


              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {model.map((m) => (
                  <article key={m.title} className="rounded-2xl border border-border bg-card p-8 shadow-sm flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 shrink-0">
                        <m.icon className="h-7 w-7 text-secondary" />
                      </div>
                      <span className="font-display text-4xl font-bold text-secondary/25 leading-none" aria-hidden="true">
                        {m.step}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 text-balance">{m.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed">{m.body}</p>
                  </article>
                ))}

              </div>
            </div>
          </section>

          {/* In-house services */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-14">
                <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">In house</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Legal services we provide in house
                </h2>
                <p className="text-muted-foreground font-body text-lg">
                  These matters are provided directly by our own licensed legal team — drafted, reviewed and filed in
                  house.
                </p>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {inHouseServices.map((s) => (
                  <article key={s.title} className="rounded-2xl border border-border bg-card p-7 hover:shadow-lg transition-shadow">
                    <s.icon className="h-7 w-7 text-secondary mb-5" />
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
                  </article>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-secondary/30 bg-secondary/5 p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Outside these areas?</h3>
                  <p className="text-muted-foreground font-body max-w-2xl">
                    Immigration, family, criminal and real estate matters are routed to vetted Canadian affiliate
                    partners. You are told before any referral is made.
                  </p>
                </div>
                <Button variant="outline" className="shrink-0 border-secondary/50" asChild>
                  <Link to="/affiliates">See Affiliate Partners</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Membership */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">Memberships</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ongoing legal coverage from $4.99 / month
                </h2>
                <p className="text-muted-foreground font-body text-lg mb-8">
                  Memberships make routine legal work predictable: discounted notary services, simple wills, small
                  claims litigation and separation or prenuptial agreements, plus AI case analysis and our Canadian
                  contract library.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2" asChild>
                    <Link to="/subscriptions">
                      Compare Membership Plans
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-secondary/50" asChild>
                    <Link to="/services">Browse All Services</Link>
                  </Button>
                </div>
              </div>

              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "50% off notary services",
                  "50% off simple wills",
                  "Discounted small claims litigation",
                  "Separation & prenuptial agreements",
                  "AI-assisted Canadian case analysis",
                  "Canadian contract template library",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="font-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>


          {/* Final CTA */}
          <section className="py-16 md:py-24 hero-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-5">
                Start with a free 30-minute consultation
              </h2>
              <p className="text-primary-foreground/85 font-body text-lg mb-10">
                We will tell you exactly whether your matter is handled in house, covered by a membership, or better
                served by one of our affiliate partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 px-8 py-6 text-base font-semibold" asChild>
                  <Link to="/book">
                    Book Free Consultation
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-secondary/40 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base font-semibold"
                  asChild
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Landing;
