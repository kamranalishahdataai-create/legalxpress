import { PriceMatchForm } from "@/components/affiliates/PriceMatchForm";
import { DollarSign } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function PriceMatchPage() {
  return (
    <Layout>
    <div className="min-h-screen bg-background">
      <section className="section-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 mb-4">
              <DollarSign className="h-7 w-7 text-forest dark:text-forest-light" />
            </div>
            <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
              Price Match
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Have a written quote and not yet retained a lawyer?
            </h1>
            <p className="text-muted-foreground font-body">
              Send the scope of work you were quoted and we will tell you our fixed price for the same work. We do not need the other lawyer’s name and do not contact them. If you have already retained a lawyer for this matter, please speak with them first; we do not solicit represented clients.
            </p>
          </div>

          <div className="rounded-3xl border border-border/50 bg-card p-6 md:p-10 shadow-sm">
            <PriceMatchForm />
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
}
