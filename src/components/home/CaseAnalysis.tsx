import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ArrowRight, Sparkles, BarChart3, Lock, Scale, FileSearch, TrendingUp } from "lucide-react";

export function CaseAnalysis() {
  return (
    <section id="case-analysis" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium font-body">AI-Powered Analysis</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Check Your Case Against{" "}
              <span className="text-gradient">Precedent Law</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-6">
              Our AI compares your situation against thousands of Canadian 
              case law precedents to estimate your chances of success before you invest 
              in costly legal proceedings.
            </p>

            {/* Key Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <FileSearch className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Comprehensive Research</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyze against all Canadian provinces and territories
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Win-Rate Predictions</h3>
                  <p className="text-sm text-muted-foreground">
                    Get estimated success rates based on similar case outcomes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Scale className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Full Citations</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive similar cases with complete citations and court conclusions
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" variant="default" asChild>
              <Link to="/case-analysis">
                Try Case Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid gap-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <Sparkles className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Free Preview Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Get an initial assessment at no cost to see if your case has merit
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Detailed Full Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Paid reports include strategic recommendations and case comparisons
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <Lock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Confidential & Encrypted</h3>
                    <p className="text-sm text-muted-foreground">
                      Your case details are private and only accessible to you
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
