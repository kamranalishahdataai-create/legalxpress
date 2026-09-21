import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Award, CheckCircle2, Sparkles } from "lucide-react";
import logo from "@/assets/legalxpress-logo.png";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[88vh] md:min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/50 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>
      {/* Subtle grid overlay for premium texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Top brand bar (in-page, no fixed header) */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-5 md:py-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="LegalXpress logo" width={96} height={96} className="h-16 w-16 md:h-20 md:w-20 object-contain" />
            <span className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground">
              LegalXpress
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-secondary/40 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/10 hover:border-secondary gap-2"
              asChild
            >
              <Link to="/" aria-label="Back to landing page">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="hidden sm:inline">Landing</span>
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36 pb-16 md:pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 text-secondary mb-8 animate-fade-up">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-semibold font-body tracking-wide">Trusted Legal Services and Lawyers Since 2016</span>
            </div>

            <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6 md:mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Modern Legal Solutions for{" "}
              <span className="text-gradient">Tomorrow's Business</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-xl font-body leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              From incorporations to wills and notaries, corporate or personal litigation, we provide comprehensive 
              legal services across Canada. Get your free 30-minute 
              consultation today.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12 md:mb-14 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link to="/book">
                  Book Free Consultation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-secondary/40 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/10 hover:border-secondary gap-2 px-8 py-6 text-base font-semibold transition-all"
                asChild
              >
                <Link to="/case-analysis">
                  <Play className="h-5 w-5" />
                  Try Case Analysis
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mb-10 animate-fade-up" style={{ animationDelay: "0.35s" }}>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span className="font-body">Free initial consultation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span className="font-body">No hidden fees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span className="font-body">Flexible payment plans</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="border-l-2 border-secondary/50 pl-3 sm:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-secondary">500+</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 font-body mt-1">Clients Served</div>
              </div>
              <div className="border-l-2 border-secondary/50 pl-3 sm:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-secondary">98%</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 font-body mt-1">Success Rate</div>
              </div>
              <div className="border-l-2 border-secondary/50 pl-3 sm:pl-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-secondary">24/7</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 font-body mt-1">AI Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Consultation Card */}
          <div className="relative animate-slide-in-right mt-4 lg:mt-0">
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated border border-border ring-1 ring-secondary/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                  <Clock className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Free Consultation</h3>
                  <p className="text-base text-muted-foreground font-body">30 minutes with our expert</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-5 rounded-xl bg-muted/50 border border-border/50 transition-all hover:border-secondary/30 hover:shadow-md">
                  <Award className="h-6 w-6 text-secondary shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground font-body text-lg">Corporate & Contract Law</div>
                    <div className="text-sm text-muted-foreground font-body mt-0.5">Incorporations, Agreements & More</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-muted/50 border border-border/50 transition-all hover:border-secondary/30 hover:shadow-md">
                  <Shield className="h-6 w-6 text-secondary shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground font-body text-lg">Litigation Support</div>
                    <div className="text-sm text-muted-foreground font-body mt-0.5">Corporate & Procurement Disputes</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-secondary/10 border border-secondary/20 mb-8">
                <div className="text-sm text-muted-foreground font-body mb-2">After free consultation:</div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-display font-bold text-foreground">$375</span>
                  <span className="text-muted-foreground font-body">/hour</span>
                  <span className="text-muted-foreground font-body mx-1">or</span>
                  <span className="text-2xl font-display font-bold text-foreground">$200</span>
                  <span className="text-muted-foreground font-body">/30 min</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold" size="lg" asChild>
                <Link to="/book">Schedule Now</Link>
              </Button>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-5 shadow-elevated border border-border animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold ring-2 ring-card">JD</div>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold ring-2 ring-card">SK</div>
                  <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-foreground text-sm font-bold ring-2 ring-card">+5</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-foreground font-body">5 consultations</div>
                  <div className="text-sm text-muted-foreground font-body">booked today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
