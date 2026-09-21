import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Download, Check, Globe } from "lucide-react";

export function ContractLibrary() {
  return (
    <section id="contracts" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Contract Library</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Contracts at{" "}
            <span className="text-gradient-gold">$4.99/mo · Billed Yearly</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-8">
            Access 50+ professionally drafted legal contracts for Canada. 
            Download, customize, and use for your business needs.
          </p>

          {/* Quick Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Download className="h-4 w-4 text-secondary" />
              <span>Unlimited Downloads</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-secondary" />
              <span>Professionally Reviewed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-secondary" />
              <span>Canada</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
              <Link to="/contracts">
                Browse Contracts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/checkout?plan=contracts">
                Subscribe for $4.99/mo · Yearly
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
