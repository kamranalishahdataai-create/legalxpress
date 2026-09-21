import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Video } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-20 md:py-28 hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 right-20 w-64 h-64 bg-secondary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-secondary/50 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/80 font-body mb-8 max-w-2xl mx-auto">
            Book your free 30-minute consultation today. No obligation, 
            just expert legal advice tailored to your needs.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Clock className="h-5 w-5 text-secondary" />
              <span className="font-body">30 Min Free</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Video className="h-5 w-5 text-secondary" />
              <span className="font-body">Google Meet</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Calendar className="h-5 w-5 text-secondary" />
              <span className="font-body">Flexible Scheduling</span>
            </div>
          </div>

          {/* Pricing Reminder */}
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl glass mb-10">
            <div className="text-left">
              <div className="text-sm text-muted-foreground font-body">After free consultation:</div>
              <div className="flex items-baseline gap-2 text-foreground">
                <span className="text-2xl font-display font-bold">$375</span>
                <span className="text-muted-foreground font-body">/hour</span>
                <span className="text-muted-foreground font-body">or</span>
                <span className="text-xl font-display font-bold">$200</span>
                <span className="text-muted-foreground font-body">/30 min</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 animate-pulse-glow shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all px-8 py-6 text-base font-semibold"
              asChild
            >
              <Link to="/book">
                <Calendar className="h-5 w-5" />
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-primary-foreground/30 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/10 hover:border-secondary px-8 py-6 text-base font-semibold transition-all"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
