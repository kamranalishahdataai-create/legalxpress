import { DollarSign } from "lucide-react";
import { PriceMatchForm } from "@/components/affiliates/PriceMatchForm";

export const PriceMatch = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-semibold font-body">Competitive Pricing</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Price Match
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Tell us about your case, the scope of work, and your budget — we'll work to match 
              or beat competing quotes with a qualified attorney from our network.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 md:p-10">
            <PriceMatchForm />
          </div>
        </div>
      </div>
    </section>
  );
};
