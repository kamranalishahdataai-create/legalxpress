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
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 mb-4">
              <DollarSign className="h-7 w-7 text-emerald-500" />
            </div>
            <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
              Price Match
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Got a Quote From Another Lawyer? We'll Try to Beat It.
            </h1>
            <p className="text-muted-foreground font-body">
              Share your legal question or case along with the quote you received. Please reference
              the lawyer who quoted you so we can verify and provide an accurate price match.
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
