import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LawyerFinderForm } from "@/components/affiliates/LawyerFinderForm";
import { ArrowLeft, Sparkles } from "lucide-react";

const categoryLabels: Record<string, string> = {
  "immigration": "Immigration Law",
  "criminal": "Criminal Defense",
  "personal-injury": "Personal Injury",
  "real-estate-commercial": "Residential and Commercial Real Estate",
  "bankruptcy": "Bankruptcy",
  "family": "Complex Family Law",
  "employment": "Employment Law",
  "insurance": "Insurance Claims",
};

export default function AffiliateRequest() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const categoryLabel = categoryLabels[category];

  return (
    <Layout>
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <Link
            to="/affiliates"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-body text-sm">Back to Affiliates</span>
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium font-body">Affiliate Referral Request</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Request a Referral
              {categoryLabel && (
                <span className="block text-2xl md:text-3xl text-primary-foreground/80 mt-2 font-normal">
                  for {categoryLabel}
                </span>
              )}
            </h1>
            <p className="text-lg text-primary-foreground/80 font-body">
              Tell us about your case below and submit. We'll connect you with the right
              affiliate partner within 24-48 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="glass rounded-2xl p-8 md:p-10">
            <LawyerFinderForm defaultPracticeArea={category} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
