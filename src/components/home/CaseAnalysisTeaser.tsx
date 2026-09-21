import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Search, BarChart3, FileCheck, ArrowRight } from "lucide-react";

export function CaseAnalysisTeaser() {
  return (
    <section id="case-analysis" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left - Content */}
          <div>
            <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
              AI-Powered
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Know Your Case Before You Start
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Our AI analyzes thousands of legal precedents across Canada 
              to give you an honest assessment of your case — before you spend a dollar 
              on legal fees.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: Search, text: "Precedent law research across jurisdictions" },
                { icon: BarChart3, text: "AI-driven win-rate predictions" },
                { icon: FileCheck, text: "Detailed case citations & legal memo" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <item.icon className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="text-sm font-body text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2" asChild>
                <Link to="/case-analysis/preview">
                  Try Free Preview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <Link to="/case-analysis">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Visual Card */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <Brain className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Case Analysis</h3>
                  <p className="text-sm text-muted-foreground font-body">Powered by AI</p>
                </div>
              </div>

              {/* Mock analysis preview */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-muted-foreground font-body">Win Probability</span>
                    <span className="text-sm font-bold text-secondary font-display">78%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-muted-foreground font-body">Precedents Found</span>
                    <span className="text-sm font-bold text-foreground font-display">24</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">Across 3 jurisdictions</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                  <p className="text-xs text-muted-foreground font-body mb-1">Only</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-display font-bold text-foreground">$9.99</span>
                    <span className="text-sm text-muted-foreground font-body">/month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -top-3 -right-3 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              Free Preview Available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
