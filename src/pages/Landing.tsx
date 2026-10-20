import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Building2, ShoppingCart, Scale, FileText, Stamp, ScrollText, ShieldCheck, BadgeCheck, Check, Phone, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Seo } from "@/components/seo/Seo";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { PracticeNotice, PriceNotice } from "@/components/legal/PracticeNotice";
import logo from "@/assets/legalxpress-logo.png";
import toronto from "@/assets/landing-toronto.jpg";

const corporatePackages = [
  { name: "Corporate Package A", letter: "A", title: "Business Formation", price: "$99", icon: Building2, description: "A strong foundation for your next chapter.", services: ["Incorporations", "Minute books", "Shareholder agreements"], href: "/checkout?plan=corporate-a", serviceHref: "/services/incorporations" },
  { name: "Corporate Package B", letter: "B", title: "Procurement Law", price: "$499", icon: ShoppingCart, description: "Clarity at every stage of the bidding process.", services: ["RFP reviews", "Bid protests", "Government contract support"], href: "/checkout?plan=corporate-b", serviceHref: "/services/procurement" },
  { name: "Corporate Package C", letter: "C", title: "Litigation & Disputes", price: "$999", icon: Scale, description: "A considered approach when business gets complex.", services: ["Corporate litigation", "Commercial disputes", "Dispute resolution support"], href: "/checkout?plan=corporate-c", serviceHref: "/services/litigation" },
];
const personalServices = [
  { icon: Stamp, name: "Notary & e-Notary", href: "/services" },
  { icon: ScrollText, name: "Wills & Powers of Attorney", href: "/services" },
  { icon: ShieldCheck, name: "Independent Legal Advice", href: "/services" },
  { icon: Scale, name: "Small Claims & Agreements", href: "/services" },
];
const resources = [
  { icon: FileText, name: "Canadian Contract Library", description: "English and French templates, including commercial and procurement agreements.", href: "/contracts" },
  { icon: Scale, name: "Case Law Research Tool", description: "Automated research: see how Canadian courts decided cases on the same issue. Not reviewed by a lawyer.", href: "/case-analysis" },
  { icon: Handshake, name: "Affiliate Partners & Locator", description: "Independent professionals for matters outside our in-house practice areas.", href: "/affiliates" },
];
const jsonLd = {
  "@context": "https://schema.org", "@type": "LegalService", name: "LegalXpress",
  description: "Ontario law practice providing in-house legal services and corporate memberships for business formation, procurement law, and litigation and disputes.",
  areaServed: { "@type": "Country", name: "Canada" }, telephone: "+1-647-200-9104",
  knowsAbout: ["Corporate law", "Procurement law", "Commercial contracts", "Corporate litigation", "Wills", "Notary services"],
  employee: { "@type": "Person", name: "Shiv Kumar Passi", jobTitle: "Corporate Lawyer", identifier: "LSO 70089L" },
};

const Landing = () => (
  <div className="landing-page bg-background text-foreground">
    <Seo title="Ontario Legal Services & Memberships | LegalXpress" description="Our legal team, one membership with you in mind. Legal services provided under Ontario licensing. Business formation from $99/month, procurement from $499/month, litigation from $999/month. Free initial consultation." jsonLd={jsonLd} />
    <section className="landing-hero relative isolate overflow-hidden bg-primary text-primary-foreground">
      <img src={toronto} alt="Toronto skyline and CN Tower overlooking Lake Ontario" width={1920} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
      <div className="landing-hero-shade absolute inset-0 -z-10" />
      <header className="border-b border-primary-foreground/15">
        <div className="container gutter-x flex items-center justify-between gap-4 py-4">
          <Link to="/" aria-label="LegalXpress landing page" className="flex items-center gap-2">
            <img src={logo} alt="" width={64} height={64} className="h-12 w-12 sm:h-14 sm:w-14 object-contain" />
            <span className="font-display text-xl sm:text-2xl">LegalXpress</span>
          </Link>
          <div className="flex items-center gap-4 lg:gap-7">
            <nav aria-label="Landing navigation" className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/about" className="hover:underline underline-offset-4">Our practice</Link>
              <Link to="/subscriptions" className="hover:underline underline-offset-4">Memberships</Link>
              <Link to="/home" className="flex items-center gap-2 hover:underline underline-offset-4">Explore LegalXpress <ArrowUpRight className="h-4 w-4" /></Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <div className="container gutter-x relative py-12 md:py-8 lg:py-10">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm text-primary-foreground/85 mb-5"><BadgeCheck className="h-4 w-4 text-gold" /> Membership-based legal services · Lawyer licensed in Ontario</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.08] mb-4">LegalXpress</h1>
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.25] text-primary-foreground mb-5 max-w-xl">Our legal team, one membership <span className="text-gold">with you in mind.</span></p>
          <p className="font-body text-base sm:text-lg text-primary-foreground/85 max-w-lg mb-7">An Ontario law practice for the business you’re building and the life around it. Legal services provided in-house, with memberships that meet you where you are.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-gold text-secondary-foreground hover:bg-gold/90 rounded-md gap-2 font-semibold" asChild><Link to="/subscriptions">Explore Memberships <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button size="lg" variant="outline" className="rounded-md border-primary-foreground/40 bg-primary/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild><Link to="/book">Book Free Consultation</Link></Button>
          </div>
          <Link to="/home" className="inline-flex items-center gap-2 text-sm mt-6 underline underline-offset-4 decoration-primary-foreground/40">Enter the full website <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <main>
      <section className="border-b border-border bg-muted/50">
        <div className="container gutter-x grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 py-6 text-sm">
          {["Corporate law, provided in-house", "Memberships for business & everyday life", "Free initial 30-minute consultation"].map(text => <p key={text} className="flex items-center gap-2"><Check className="h-4 w-4 text-forest shrink-0" />{text}</p>)}
        </div>
      </section>
      <section className="section-y" id="corporate-memberships">
        <div className="container gutter-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div className="max-w-2xl">
              <p className="text-sm text-forest font-semibold uppercase mb-3">Corporate memberships</p>
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">For the next move in your business.</h2>
              <p className="text-muted-foreground max-w-xl">From getting established to navigating procurement and resolving disputes — three focused memberships, one practice ready to assist.</p>
            </div>
            <Button variant="link" className="px-0 gap-2 shrink-0" asChild><Link to="/subscriptions">Compare all plans <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {corporatePackages.map(pkg => <article key={pkg.letter} className="flex flex-col rounded-lg border border-border bg-card p-6 lg:p-8">
              <div className="flex items-center justify-between mb-7"><pkg.icon className="h-6 w-6 text-forest" /><span className="text-sm text-muted-foreground">{pkg.name}</span></div>
              <h3 className="font-display text-2xl font-medium mb-3">{pkg.title}</h3>
              <p className="text-sm text-muted-foreground min-h-[3rem] mb-5">{pkg.description}</p>
              <p className="flex items-baseline gap-1 mb-1"><span className="text-sm text-muted-foreground mr-1">from</span><span className="font-display text-4xl">{pkg.price}</span><span className="text-sm text-muted-foreground">/month</span></p>
              <p className="text-xs text-muted-foreground mb-3">Yearly commitment · Billed monthly · + HST</p><PriceNotice className="mb-6" />
              <ul className="space-y-3 border-t border-border pt-5 mb-7 flex-1">{pkg.services.map(service => <li key={service} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 shrink-0 mt-1 text-forest" />{service}</li>)}</ul>
              <Button className="rounded-md w-full gap-2" asChild><Link to={pkg.href}>Join Package {pkg.letter} <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button variant="link" className="mt-2 text-muted-foreground" asChild><Link to={pkg.serviceHref}>Explore the service</Link></Button>
            </article>)}
          </div>
          <p className="text-sm text-muted-foreground mt-6">Inclusions vary by package. Review the plan details and discuss the scope of your matter with our team.</p>
        </div>
      </section>
      <section className="section-y bg-muted/50 border-y border-border">
        <div className="container gutter-x grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20">
          <div>
            <p className="text-sm text-forest font-semibold uppercase mb-3">The practice behind your membership</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-5">Real legal work.<br />A personal connection.</h2>
            <p className="text-muted-foreground mb-6">Led by Shiv Kumar Passi, Corporate Lawyer (LSO 70089L), LegalXpress provides corporate and contract law services in-house. Your legal work is our responsibility — not a handoff.</p>
            <Button variant="outline" className="rounded-md gap-2" asChild><Link to="/about">Meet our practice <ArrowUpRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="space-y-0">
            {[
              { n: "01", title: "Start with a conversation", text: "Tell us about your matter in a free initial 30-minute consultation." },
              { n: "02", title: "Choose the right fit", text: "Understand your service options, membership benefits and the scope of the work before proceeding." },
              { n: "03", title: "Move forward with clarity", text: "Work with our in-house practice, with independent affiliates introduced only for matters outside our practice areas." },
            ].map(item => <div key={item.n} className="flex gap-5 py-5 border-b border-border first:pt-0 last:border-0"><span className="font-display text-2xl text-forest shrink-0">{item.n}</span><div><h3 className="font-display text-xl mb-2">{item.title}</h3><p className="text-muted-foreground text-sm">{item.text}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="section-y">
        <div className="container gutter-x grid lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <p className="text-sm text-forest font-semibold uppercase mb-3">Everyday legal needs</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-5">Because life doesn’t stop<br className="hidden sm:block" /> at business.</h2>
            <p className="text-muted-foreground mb-6">Personal memberships start at $4.99/month + HST, with a 12-month commitment billed monthly. Essential provides member pricing on notary services, simple wills, the Ontario small claims pre-trial package and agreed separation or marriage contracts. Explore Starter, Professional and Executive for additional benefits.</p>
            <Button variant="outline" className="rounded-md gap-2" asChild><Link to="/subscriptions">Compare personal memberships <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8">
            {personalServices.map(service => <Link key={service.name} to={service.href} className="group flex items-center gap-3 py-6 border-b border-border"><service.icon className="h-5 w-5 text-forest shrink-0" /><span className="font-display text-lg flex-1">{service.name}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0" /></Link>)}
          </div>
        </div>
      </section>
      <section className="section-y bg-muted/40 border-t border-border">
        <div className="container gutter-x">
          <p className="text-sm text-forest font-semibold uppercase mb-3">Value-added resources</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">More resources. Clear boundaries.</h2>
          <p className="text-muted-foreground max-w-2xl mb-9">Explore informational tools and independent partners alongside our legal practice. These are separate from the legal services we provide in-house.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">{resources.map(resource => <article key={resource.name} className="border-t border-border pt-6"><resource.icon className="h-6 w-6 text-forest mb-4" /><h3 className="font-display text-xl mb-3">{resource.name}</h3><p className="text-muted-foreground text-sm mb-4">{resource.description}</p><Button variant="link" className="px-0 gap-2" asChild><Link to={resource.href}>Explore <ArrowUpRight className="h-4 w-4" /></Link></Button></article>)}</div>
          <LegalDisclaimer context="membership" />
        </div>
      </section>
      <section className="bg-primary text-primary-foreground py-14 md:py-20">
        <div className="container gutter-x flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl"><p className="text-sm text-primary-foreground/70 mb-3">Your next step</p><h2 className="font-display text-3xl md:text-4xl font-medium mb-4">Let’s talk about what’s ahead.</h2><p className="text-primary-foreground/75">Start with a free 30-minute consultation. We’ll help you understand where your matter fits. The free consultation is general guidance only; a lawyer-client relationship begins after a conflicts check and written engagement.</p></div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto"><Button size="lg" className="bg-gold text-secondary-foreground hover:bg-gold/90 rounded-md gap-2" asChild><Link to="/book">Book Free Consultation <ArrowRight className="h-4 w-4" /></Link></Button><Button size="lg" variant="outline" className="rounded-md border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary gap-2" asChild><Link to="/home">Explore the Full Website <ArrowUpRight className="h-4 w-4" /></Link></Button></div>
        </div>
      </section>
    </main>
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/15">
      <div className="container gutter-x pt-8 text-primary-foreground/70"><PracticeNotice /></div>
      <div className="container gutter-x py-7 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <p className="text-xs text-primary-foreground/65">© {new Date().getFullYear()} LegalXpress · Toronto, Ontario · Canada</p>
        <a href="tel:+16472009104" className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" />(647) 200-9104</a>
        <nav aria-label="Footer" className="flex flex-wrap gap-5 text-xs text-primary-foreground/75"><a href="/contact" className="hover:underline">Contact</a><a href="/privacy" className="hover:underline">Privacy Policy</a><a href="/terms" className="hover:underline">Terms of Service</a></nav>
      </div>
    </footer>
  </div>
);
export default Landing;
