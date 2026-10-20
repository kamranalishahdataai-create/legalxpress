import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, BadgeCheck, Check } from "lucide-react";
import logo from "@/assets/legalxpress-logo.png";
import toronto from "@/assets/home-toronto.jpg";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Hero() {
  return (
    <>
      <section id="hero" className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img src={toronto} alt="Toronto City Hall and downtown architecture in morning light" width={1920} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
        <div className="site-hero-shade absolute inset-0 -z-10" />
        <div className="border-b border-primary-foreground/15">
          <div className="container gutter-x flex items-center justify-between gap-3 py-4">
            <Link to="/" className="flex items-center gap-2" aria-label="LegalXpress landing page">
              <img src={logo} alt="" width={64} height={64} className="h-12 w-12 sm:h-14 sm:w-14 object-contain" />
              <span className="font-display text-xl sm:text-2xl">LegalXpress</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-5">
              <Button variant="link" className="text-primary-foreground gap-2 px-0" asChild><Link to="/" aria-label="Back to landing page"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Back to landing</span></Link></Button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <div className="container gutter-x py-8 md:py-6 lg:py-8">
          <div className="max-w-2xl">
            <p className="flex items-start gap-2 text-sm text-primary-foreground/85 mb-5"><BadgeCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />Lawyer licensed in Ontario · LSO No. 70089L</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.08] mb-3">LegalXpress</h1>
            <p className="font-display text-2xl sm:text-3xl leading-[1.25] mb-4 max-w-xl">Legal services for individuals and small businesses — <span className="text-gold">on membership, at published prices.</span></p>
            <p className="text-base text-primary-foreground/85 max-w-xl mb-5">From incorporations to wills, notarizations and small claims, LegalXpress provides legal services through an Ontario-licensed lawyer and refers you to independent licensed professionals when a matter is outside our practice. Start with a free 30-minute consultation.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-gold text-secondary-foreground hover:bg-gold/90 gap-2" asChild><Link to="/book">Book Free Consultation <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/40 bg-primary/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild><Link to="/subscriptions">Explore Memberships</Link></Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-4">Personal memberships from $4.99/mo + HST · Corporate memberships from $99/mo + HST · 12-month commitment, billed monthly</p>
          </div>
        </div>
      </section>
      <div className="bg-muted/50 border-b border-border">
        <div className="container gutter-x grid sm:grid-cols-3 gap-3 sm:gap-6 py-6 text-sm">
          {["Corporate law, provided in-house", "Published fixed prices (HST extra)", "Free initial 30-minute consultation"].map(text => <p key={text} className="flex items-center gap-2"><Check className="h-4 w-4 text-forest shrink-0" />{text}</p>)}
        </div>
      </div>
    </>
  );
}
