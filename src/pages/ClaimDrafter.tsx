import { Layout } from "@/components/layout/Layout";
import { FileText, Scale } from "lucide-react";
import { RESEARCH_TOOL_NAME } from "@/data/caseResearch";
import { ClaimDrafterPanel } from "@/components/case-analysis/ClaimDrafterPanel";

export default function ClaimDrafterPage() {
  return (
    <Layout>
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-4">Members only · Ontario court formats</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Automated formatting · not reviewed by a lawyer · not filed</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Claim Drafter</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Enter the details of your claim and download a document arranged in the structure of an Ontario Plaintiff's Claim (Form 7A) or Statement of Claim (Form 14A).
          </p>
          <p className="text-sm text-primary-foreground/70 max-w-2xl mx-auto mt-4">
            You can also open this form right inside the {RESEARCH_TOOL_NAME} results, after you run a search.
          </p>
        </div>
      </section>

      <section className="py-6 bg-secondary/10 border-y border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 text-foreground">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"><Scale className="h-4 w-4 text-forest" />Small Claims Court · Form 7A</span>
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"><Scale className="h-4 w-4 text-forest" />Superior Court of Justice · Form 14A</span>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ClaimDrafterPanel />
        </div>
      </section>
    </Layout>
  );
}
