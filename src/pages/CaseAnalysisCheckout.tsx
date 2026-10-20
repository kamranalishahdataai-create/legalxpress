import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, FileSearch, Phone } from "lucide-react";
import { ResearchDisclosures } from "@/components/case-analysis/ResearchDisclosures";
import { PACK_COPY, PACK_TERMS_SHORT, RESEARCH_PACK, RESEARCH_TOOL_NAME } from "@/data/caseResearch";

const features = [
  `${RESEARCH_PACK.reports} research reports, one search each`,
  "Matched Canadian decisions, each linked to the public judgment",
  "Outcome frequency in matched decisions, with sample size",
  "Factors the courts considered and questions to raise with a lawyer",
  "Downloadable research summary",
];

const CaseAnalysisCheckout = () => (
  <Layout>
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">{RESEARCH_TOOL_NAME}: {RESEARCH_PACK.reports}-report pack</h1>
          <p className="text-muted-foreground">A one-time pack purchase, not a subscription.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2"><FileSearch className="h-5 w-5 text-secondary" /><CardTitle className="font-display">Order summary</CardTitle></div>
              <CardDescription>Reports are generated automatically and are not reviewed by a lawyer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1">
                <div className="flex justify-between"><span className="text-muted-foreground">Standard price</span><span className="font-display text-xl font-bold">${RESEARCH_PACK.standardPrice.toFixed(2)} + HST</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Member price</span><span className="font-display text-xl font-bold">${RESEARCH_PACK.memberPrice.toFixed(2)} + HST</span></div>
                <p className="text-xs text-muted-foreground">Member price requires an active membership at the time of purchase.</p>
              </div>
              <Separator />
              <ul className="space-y-3">{features.map((f) => <li key={f} className="flex gap-3"><Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">{f}</span></li>)}</ul>
              <Separator />
              <p className="text-sm font-medium text-foreground">{PACK_TERMS_SHORT}</p>
              <p className="text-xs text-muted-foreground">{PACK_COPY}</p>
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="font-display">Online payment is not active yet</CardTitle>
              <CardDescription>We don't collect card details on this page. To buy a pack now, please call us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild><a href="tel:+16472009104"><Phone className="h-4 w-4 mr-2" />(647) 200-9104</a></Button>
              <Button variant="outline" className="w-full" asChild><a href="/case-analysis/preview">See a sample report</a></Button>
            </CardContent>
          </Card>
        </div>
        <ResearchDisclosures className="mt-8" />
      </div>
    </div>
  </Layout>
);

export default CaseAnalysisCheckout;
