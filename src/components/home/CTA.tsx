import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Video } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="section-y bg-primary text-primary-foreground">
      <div className="container gutter-x grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-20 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-5">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 max-w-xl mb-6">Start with a free 30-minute consultation. We’ll help you understand where your matter fits, the scope of our services, and what comes next.</p>
          <div className="flex flex-wrap gap-5 text-sm text-primary-foreground/75"><span className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" />30 minutes free</span><span className="flex items-center gap-2"><Video className="h-4 w-4 text-gold" />Google Meet</span></div>
        </div>
        <div className="border-t lg:border-t-0 lg:border-l border-primary-foreground/20 pt-7 lg:pt-0 lg:pl-10">
          <p className="text-sm text-primary-foreground/70 mb-2">After your free consultation</p>
          <p className="flex flex-wrap items-baseline gap-2 mb-7"><span className="font-display text-3xl">$375</span><span className="text-sm text-primary-foreground/70">/hour + HST</span><span className="text-sm text-primary-foreground/70 mx-1">or</span><span className="font-display text-3xl">$200</span><span className="text-sm text-primary-foreground/70">/30 min + HST</span></p>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-secondary-foreground gap-2" asChild><Link to="/book">Book Free Consultation <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild><Link to="/contact">Contact Us</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
