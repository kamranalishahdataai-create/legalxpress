import { Layout } from "@/components/layout/Layout";
import { ResearchDisclosures } from "@/components/case-analysis/ResearchDisclosures";
import { RESEARCH_TOOL_NAME, STAT_CAVEAT } from "@/data/caseResearch";

export default function CaseResearchMethodology() {
  return (
    <Layout>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-16 space-y-8">
        <header>
          <h1 className="font-display text-4xl font-bold mb-3">How the {RESEARCH_TOOL_NAME} works</h1>
          <p className="text-muted-foreground">This page explains where the decisions come from and how each number in a report is produced.</p>
        </header>
        <section className="space-y-2"><h2 className="font-display text-2xl">Sources</h2><p className="text-muted-foreground">Decisions are retrieved from publicly available sources, including CanLII and the public decision databases of Canadian courts. Third-party AI language models (including OpenAI) are used to retrieve, rank and summarize decisions. They are not used to estimate the outcome of anyone's matter.</p></section>
        <section className="space-y-2"><h2 className="font-display text-2xl">Citation check</h2><p className="text-muted-foreground">Before a decision is shown, it must match a decision returned by a public source. A decision that cannot be matched to a public source is not shown. Every decision shown links to the public judgment.</p></section>
        <section className="space-y-2"><h2 className="font-display text-2xl">Outcome tags</h2><p className="text-muted-foreground">Each decision is tagged from the claimant's (or appellant's) point of view: succeeded, did not succeed, settled, or mixed. Tags are checked against the text of the decision. Where the outcome is unclear or partly successful, it is tagged "mixed" and left out of the statistic.</p></section>
        <section className="space-y-2"><h2 className="font-display text-2xl">Outcome frequency</h2><p className="text-muted-foreground">The percentage in a report is a plain count: the number of matched decisions where the claimant succeeded, divided by the number of matched decisions counted. The sample size is always shown. No model estimate is added to it. {STAT_CAVEAT}</p></section>
        <section className="space-y-2"><h2 className="font-display text-2xl">Similarity</h2><p className="text-muted-foreground">"Similarity to your search" measures how closely a decision's text and issues match the filters you chose. It does not measure legal merit.</p></section>
        <section className="space-y-2"><h2 className="font-display text-2xl">Known limits</h2><p className="text-muted-foreground">Results can be affected by selection bias in what gets published, unreported decisions, settlements that never reach a judgment, and model error. We make no claim about the accuracy of the tool.</p></section>
        <section className="space-y-2"><h2 className="font-display text-2xl">Quality checks and records</h2><p className="text-muted-foreground">A sample of reports is checked by a person each month, and the findings are logged. For each report we keep a record of the filters used, the model version, the sources retrieved and the output.</p></section>
        <ResearchDisclosures />
      </article>
    </Layout>
  );
}
