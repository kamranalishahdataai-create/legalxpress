import { useState } from "react";
import { ArrowRight, ArrowLeft, Building2, Check, CheckCircle2, ChevronRight, FileText, Gift, Handshake, Heart, Search, ShieldCheck, Smartphone, Sparkles, Star, TrendingUp, User, Wifi, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { telecomPartnerships, type TelecomPartner } from "@/data/telecomPartnerships";
import { corporateAllowances, corporateAddOns, corporateInclusions } from "@/data/corporateMembership";
import { featuredServices } from "@/data/featuredServices";
import { rogersDemoCustomerFee } from "@/data/rogersDemoFees";
import { loyaltyDiscountNote, loyaltyDiscountServices, proposedCorporatePackages } from "@/data/partnershipScope";
import { PROFESSIONAL_REPORTS_PER_MONTH } from "@/data/caseResearch";
import { StorylineDemo } from "./StorylineDemo";
import mayaImage from "@/assets/rogers-maya-story.jpg";
import mayaContractsImage from "@/assets/rogers-maya-contracts.jpg";
import mayaWillsImage from "@/assets/rogers-maya-wills.jpg";
import rajOptinImage from "@/assets/rogers-raj-optin.jpg";
import rajPerksImage from "@/assets/rogers-raj-perks.jpg";

type Partner = (typeof telecomPartnerships)[TelecomPartner];

function FlowDemo({ partner: p }: { partner: Partner }) {
  const [model, setModel] = useState("included");
  const [step, setStep] = useState(0);
  const included = model === "included";
  const includedInPlan = p.name === "Rogers";
  const steps = included ? [
    { title: includedInPlan ? "Buys a Rogers plan with membership included" : "A plan with something extra", who: p.name, text: includedInPlan ? "In this proposal, buying an eligible Rogers personal or business plan includes the corresponding LegalXpress membership. It is included in the customer's plan, so the customer pays $0 for the membership — no separate membership purchase or promotional opt-in." : `An eligible ${p.name} plan presents a LegalXpress membership as an included benefit. No separate membership purchase or promotional opt-in.`, screen: [p.personalPlan, "LegalXpress Personal membership", includedInPlan ? "Included with plan purchase · $0 membership fee" : "Included benefit · sample"] },
    { title: "The benefit is already included", who: p.account, text: `The proposed ${p.account} benefit area confirms the membership entitlement. No code to copy; account access is a separate step. ${p.name} would have no access to any legal matter.`, screen: [p.account, "Your LegalXpress benefit is ready", includedInPlan ? "Your eligible package · included in your plan" : "Essential · included in this concept"] },
    { title: "Secure access to LegalXpress", who: "LegalXpress", text: "The customer opens their included benefit and confirms identity and privacy choices. No legal matter or case information is shared with the carrier.", screen: ["Welcome to LegalXpress", "Confirm account details", "Access your membership"] },
    { title: "Help for real-life moments", who: "LegalXpress", text: "The member sees their package benefits, explores tools and books a consultation. Each legal service is opened as its own matter, with a conflicts check, client identification and a written scope confirmed before work starts.", screen: ["Your member space", "Package benefits & resources", "Book a consultation"] },
  ] : [
    { title: "Discover the partner benefit", who: p.account, text: `A proposed Preferred Partner listing in ${p.account} introduces LegalXpress personal memberships and corporate packages.`, screen: [p.account, "Preferred Partner · concept", "Explore LegalXpress"] },
    { title: "Verify eligibility", who: p.name, text: "A secure hand-off confirms only the information needed for eligibility, with the customer's permission. No legal information is exchanged.", screen: ["Eligibility check", "Customer permission", "Continue to LegalXpress"] },
    { title: "Choose a membership", who: "LegalXpress", text: "The customer chooses a personal or corporate membership at an agreed partner rate. Direct memberships have a 12-month commitment, billed monthly; no partner price is set yet.", screen: ["Personal or corporate", "Partner rate · to be agreed", "12-month commitment · billed monthly"] },
    { title: "Value in both directions", who: p.name, text: `LegalXpress members may also explore eligible ${p.name} service offers. Any promotion is separately agreed and fulfilled by ${p.name}.`, screen: ["Explore partner services", "Eligibility and terms apply", "No live offer or code"] },
  ];
  const current = steps[step];
  if (!current) return null;
  return <section id="flow" className="section-y border-b border-border">
    <div className="container max-w-6xl">
      <p className="text-partner font-medium mb-3">01 / Demo scenarios</p>
      <h2 className="font-display text-3xl mb-4">Two ways to make it part of the plan.</h2>
      <p className="text-muted-foreground max-w-2xl mb-8">Included membership first. A Preferred Partner offer as an alternative. Both are illustrative, not live integrations.</p>
      <Tabs value={model} onValueChange={(v) => { setModel(v); setStep(0); }}>
        <TabsList className="h-auto flex flex-wrap w-fit mb-8">
          <TabsTrigger value="included" className="py-3"><Smartphone className="h-4 w-4 mr-2" />Built into {p.name} plans</TabsTrigger>
          <TabsTrigger value="preferred" className="py-3"><Star className="h-4 w-4 mr-2" />Preferred Partner</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
        <div>
          <ol className="flex gap-2 mb-8" aria-label="Demo steps">{steps.map((s, i) => <li key={s.title} className="flex-1"><Button variant="ghost" onClick={() => setStep(i)} aria-label={`Step ${i + 1}: ${s.title}`} aria-current={i === step ? "step" : undefined} className={`w-full border-b-2 rounded-none ${i === step ? "border-partner text-partner" : "border-border text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</Button></li>)}</ol>
          <div aria-live="polite" className="min-h-56">
            <p className="text-sm text-partner mb-3">Step {step + 1} of 4 · {current.who}</p>
            <h3 className="font-display text-2xl mb-4">{current.title}</h3>
            <p className="text-muted-foreground">{current.text}</p>
          </div>
          <div className="flex gap-3 mt-6"><Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft />Back</Button><Button variant="partner" onClick={() => setStep(step === 3 ? 0 : step + 1)}>{step === 3 ? "Restart demo" : "Next"}<ArrowRight /></Button></div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8" aria-label="Illustrative account screen">
          <div className="flex justify-between items-center pb-5 border-b border-border"><span className="text-partner font-semibold text-xl">{p.name}</span><span className="text-xs text-muted-foreground">CONCEPT SCREEN</span></div>
          <div className="py-8 min-h-64 space-y-4"><Wifi className="h-8 w-8 text-partner" />{current.screen.map((line, i) => <p key={line} className={i === 0 ? "text-xl font-semibold" : "text-muted-foreground flex gap-2 items-start"}>{i > 0 && <Check className="h-4 w-4 text-partner-support shrink-0 mt-1" />}{line}</p>)}</div>
          <p className="border-t border-border pt-4 text-xs text-muted-foreground">Illustration only · not an official {p.account} screen</p>
        </div>
      </div>
      <OptInScenarios partner={p} />
      <PerkScenarios partner={p} />

    </div>
  </section>;
}

function CustomerStories({ partner: p }: { partner: Partner }) {
  const [audience, setAudience] = useState("personal");
  const [shown, setShown] = useState(1);
  const personal = audience === "personal";
  const rogers = p.name === "Rogers";
  const name = personal ? p.storyName : p.businessName;
  const plan = personal ? (rogers ? "Personal membership · Professional" : "Personal membership · Essential") : "Corporate Package A";
  const moments = [
    { from: p.name, text: `Your eligible plan includes a LegalXpress ${plan}.${rogers ? " This is included in your plan: your membership fee is $0, and services included in your package have a $0 member fee." : " The benefit is already included — no promotional opt-in."} Inclusions apply per membership period and do not carry forward.` },
    { from: name, text: rogers ? (personal ? "My landlord wants to keep my deposit. I want to understand my options before speaking with a lawyer." : "I need supplier agreements and staff contracts for our second restaurant.") : (personal ? "I want to prepare my will and understand the documents I need." : "I need supplier and consulting agreements for my growing business.") },
    { from: "LegalXpress", text: rogers ? (personal ? "Explore the Contract Library for a tenant demand-letter template to organise your questions. Arrange legal review before using it." : "Explore Canadian supplier and employment templates in the Contract Library, in English or French. Arrange legal review before use.") : (personal ? "Explore the Contract Library for a sample Canadian will template, then arrange legal review before relying on it." : "Explore Canadian supplier and consulting templates in the Contract Library, in English or French. Arrange legal review before use.") },
    { from: name, text: personal ? "I also want to read Canadian decisions about a contract issue before speaking with a lawyer." : "Can I research decisions about a supplier contract dispute before my consultation?" },
    { from: "LegalXpress", text: rogers && personal ? `Your Professional package includes ${PROFESSIONAL_REPORTS_PER_MONTH} Case Law Research Tool reports each month at $0 to you. Reports retrieve public Canadian decisions automatically and are not reviewed by a lawyer. Additional packs are optional, separately priced purchases.` : "The Case Law Research Tool retrieves public Canadian decisions. Its reports are prepared automatically and are not reviewed by a lawyer. Tool access and fees depend on your package; they are not promised as part of this sample benefit." },
    { from: "LegalXpress", text: `Book a consultation to discuss next steps. ${rogers ? "Your membership is included in your plan at $0 to you; included legal services have a $0 member fee within your package limits. Small claims pre-trial work and a separation agreement or marriage contract are not included — as a loyal Rogers customer you can still use either at a premium discount rate, subject to the usual checks." : `Your ${plan} provides the applicable member pricing;`} Legal work and any fees are confirmed separately in writing.` },
    ...(rogers && !personal ? [{ from: p.name, text: "Growing fast? Extra lines, fibre Internet, cloud or security services can be added to the account under Rogers for Business terms. LegalXpress add-ons for Corporate Package A are arranged separately with the lawyer." }] : []),
  ];
  return <section id="stories" className="section-y bg-partner-soft border-b border-border">
    <div className="container max-w-6xl">
      <p className="text-partner font-medium mb-3">02 / Everyday possibilities</p>
      <h2 className="font-display text-3xl mb-4">“It comes with my {p.name} plan.”</h2>
      <p className="text-muted-foreground mb-8">Fictional customer stories. Personal memberships for individuals; corporate packages for businesses.</p>
      <Tabs value={audience} onValueChange={(v) => { setAudience(v); setShown(1); }}><TabsList className="h-auto mb-8 flex flex-wrap w-fit"><TabsTrigger value="personal" className="py-3"><User className="h-4 w-4 mr-2" />{p.storyName} · Personal</TabsTrigger><TabsTrigger value="corporate" className="py-3"><Building2 className="h-4 w-4 mr-2" />{p.businessName} · Corporate</TabsTrigger></TabsList></Tabs>
      <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10">
        <div className="space-y-5">
          <div className="w-16 h-16 rounded-lg bg-partner text-partner-foreground flex items-center justify-center text-2xl font-medium">{name.charAt(0)}</div>
          <div><h3 className="text-2xl font-display">{name}</h3><p className="text-muted-foreground">{personal ? p.storyRole : p.businessRole}</p></div>
          <p className="text-sm text-muted-foreground">{personal ? p.personalPlan : p.businessPlan}</p>
          <p className="font-semibold flex gap-2"><Gift className="h-5 w-5 text-partner shrink-0" />{plan} · proposed included benefit</p>
          <div className="border-t border-border pt-5 space-y-3"><a href="/contracts" className="flex gap-2 text-partner underline underline-offset-4"><FileText className="h-5 w-5" />Contract Library</a><a href="/case-analysis/preview" className="flex gap-2 text-partner underline underline-offset-4"><Search className="h-5 w-5" />Free research preview</a></div>
        </div>
        <div><div className="space-y-3" aria-live="polite">{moments.slice(0, shown).map((m, i) => <div key={i} className={`rounded-lg p-4 ${m.from === p.name ? "bg-partner text-partner-foreground" : m.from === name ? "bg-card border border-border ml-6" : "bg-background border border-border mr-6"}`}><p className="font-semibold text-sm mb-1">{m.from}</p><p className="text-sm">{m.text}</p></div>)}</div><Button variant="partner" className="mt-5" onClick={() => setShown(shown === moments.length ? 1 : shown + 1)}>{shown === moments.length ? `Replay ${name}'s story` : "What happens next?"}<ChevronRight /></Button></div>
      </div>
      <p className="text-xs text-muted-foreground mt-8 max-w-4xl">Templates and automated research are informational resources, not legal advice or a substitute for a licensed lawyer or paralegal. They do not create a lawyer-client relationship. Ontario-licensed legal services remain the practice's professional responsibility.</p>
    </div>
  </section>;
}

function PerkScenarios({ partner: p }: { partner: Partner }) {
  const [tab, setTab] = useState("contracts");
  const includedInPlan = p.name === "Rogers";
  const zero = `$${rogersDemoCustomerFee("membership")}`;
  const notary = featuredServices.find((s) => s.id === "notary");
  const will = featuredServices.find((s) => s.id === "will");
  const scenarios: Record<string, { label: string; icon: typeof FileText; who: string; plan: string; steps: { title: string; text: string }[]; perks: string[] }> = {
    contracts: {
      label: "Contracts & free research preview", icon: FileText, who: p.storyName, plan: "Personal membership · Essential",
      steps: [
        { title: "Finds the right template", text: `${p.storyName} opens the Contract Library from the member space and finds a Canadian template in English or French — for example a demand letter or a simple services agreement.` },
        { title: "Tries the free research preview", text: "Before buying anything, she runs the free Case Law Research Tool preview to see what a report looks like: public Canadian decisions retrieved for her search, with similarity scores only — no predictions or strategy." },
        { title: "Chooses a report pack if useful", text: "If she wants full reports, members pay the member rate of $4.99 + HST per 5-report pack (standard $9.99 + HST). Reports are prepared automatically and are not reviewed by a lawyer." },
        { title: "Brings it to a lawyer", text: "She books a consultation at member pricing. If she wants the lawyer to review her template, it is opened as its own matter with a written scope and fee confirmed before work starts." },
      ],
      perks: ["Contract Library access (billed per month, no term)", "Free Case Law Research Tool preview", "Member rate on 5-report packs: $4.99 + HST", "Member pricing on consultations"],
    },
    wills: {
      label: "Wills & notary", icon: Heart, who: p.storyName, plan: "Personal membership · Essential",
      steps: [
        { title: "Needs a document commissioned", text: `${p.storyName} needs an affidavit commissioned for a consent letter. She books a notary appointment from the member space; same-day appointments are subject to availability.` },
        { title: "Member fee, stated up front", text: `Notarization or commissioning is $${notary?.memberFee ?? 10} + HST per document for members. Remote commissioning is available where permitted. Drafting and legal advice are separate services.` },
        { title: "Starts a simple will", text: `She then opens a simple will as its own matter — $${will?.memberFee ?? 100} + HST member fee for an Ontario resident leaving the estate outright to a spouse and/or children, with one round of revisions.` },
        { title: "Signed properly", text: "The lawyer confirms the scope in writing, then provides signing instructions or a supervised signing at the office. Anything outside the simple-will scope — trusts, foreign assets, powers of attorney — is quoted before it begins." },
      ],
      perks: [`Notary & commissioning: $${notary?.memberFee ?? 10} + HST per document`, `Simple will: $${will?.memberFee ?? 100} + HST member fee`, "Supervised signing or signing instructions", "Out-of-scope work quoted in advance"],
    },
    corporate: {
      label: "Corporate packages", icon: Building2, who: p.businessName, plan: "Corporate Package A → B",
      steps: [
        { title: "Incorporates on Package A", text: `${p.businessName} activates Corporate Package A through ${p.business}. It provides a federal or Ontario incorporation, annual return filing, an up-to-date minute book, unlimited director, officer and address changes, a shareholder agreement and Contract Library access.` },
        { title: "Uses the yearly allowances", text: `Package A includes ${corporateAllowances["corporate-a"].map((a) => `${a.label.toLowerCase()}: ${a.value}`).join("; ")}. Each request is opened as its own matter with a written scope. Inclusions apply per membership period and do not carry forward.` },
        { title: "Adds what the business needs", text: `As staff join, the business adds ${corporateAddOns.map((a) => `${a.name} (${a.price})`).slice(0, 2).join(" and ")} — add-ons are chosen separately and confirmed in writing.` },
        { title: "Keeps to the packages in this proposal", text: `This proposal covers ${proposedCorporatePackages.join(" and ")} only. Procurement work such as RFP and bid review, and commercial dispute support, are not part of either package; that work is quoted separately or referred, and any future package would need its own agreement.` },
      ],
      perks: [proposedCorporatePackages.join(" and "), "Yearly commitment · billed monthly", "Per-month add-ons available", "Contract Library access included"],
    },
  };
  if (includedInPlan) {
    scenarios.contracts.plan = "Professional · included in your plan";
    scenarios.contracts.steps = [
      { title: "Buys her plan, then opens the included membership", text: `${p.storyName} buys an eligible Rogers plan that includes Professional membership, then opens her LegalXpress account to access it. The membership is included in her plan, so her membership fee is ${zero} — account activation is not another purchase.` },
      { title: "Uses her included contract downloads", text: "She finds a Canadian template and uses one of her 5 included contract downloads this month at $0. Templates are informational, not lawyer-reviewed; legal review is arranged separately." },
      { title: "Previews research, then uses her allowance", text: `She tries the free Case Law Research Tool preview, then uses one of her ${PROFESSIONAL_REPORTS_PER_MONTH} included monthly reports at $0. Reports are automated, not lawyer-reviewed, and show search similarity — not predictions or strategy.` },
      { title: "Checks the scope before extra work", text: "Her included tools need no additional purchase. Extra report packs, additional downloads and legal services outside her package are optional; any applicable fee is confirmed before she proceeds." },
    ];
    scenarios.contracts.perks = [`Membership: ${zero} to the customer`, "5 included contract downloads/month · $0", "Free research preview", `${PROFESSIONAL_REPORTS_PER_MONTH} included research reports/month · $0`];
    scenarios.wills.plan = "Professional · included in your plan";
    scenarios.wills.steps = [
      { title: "Her Rogers plan purchase includes the benefit", text: `${p.storyName} buys an eligible Rogers plan with Professional membership included at ${zero} to her. She accesses its included e-notary and simple-will benefits through LegalXpress without another membership purchase.` },
      { title: "Uses included e-notary", text: "She requests e-notary or remote commissioning where permitted, at a $0 member fee under her package. Identity, document suitability and appointment availability are confirmed first; drafting and separate legal advice are not included in this appointment." },
      { title: "Requests her included simple will", text: "She opens a simple will as a separate matter at a $0 member fee under Professional: an Ontario resident leaving the estate outright to a spouse and/or children, with one round of revisions and signing instructions or supervised signing." },
      { title: "Confirms scope and signing", text: "The lawyer completes conflicts and identity checks and confirms the written scope before work starts. Trusts, foreign assets, powers of attorney and other out-of-scope work are quoted separately. Government fees, disbursements and third-party charges are extra unless expressly included." },
    ];
    scenarios.wills.perks = [`Membership: ${zero} to the customer`, "Included e-notary · $0 member fee", "Included simple will · $0 member fee", "Written scope and proper signing"];
    scenarios.corporate.plan = `${proposedCorporatePackages.join(" or ")} · included in your plan`;
    scenarios.corporate.steps = [
      { title: "Buys a business plan with Package A included", text: `${p.businessName} buys an eligible Rogers for Business plan that includes Corporate Package A, then accesses it through LegalXpress. His membership fee is ${zero}; included incorporation, annual return filing, minute book upkeep, director/officer/address changes, shareholder agreement and Contract Library access require no second package purchase.` },
      { title: "Uses Package A at $0 member fee", text: `Within Package A's limits, included services have a $0 member fee: ${corporateAllowances["corporate-a"].map((a) => `${a.label.toLowerCase()}: ${a.value}`).join("; ")}. Each legal request has its own conflicts check, identification and written scope. Government filing fees and disbursements are extra unless expressly included.` },
      { title: "Adds what the business needs", text: `Optional add-ons — ${corporateAddOns.slice(0, 2).map((a) => `${a.name} (${a.price})`).join(" and ")} — can be arranged for Corporate Package A and confirmed in writing; they are not part of the plan benefit.` },
      { title: "What stays outside the package", text: "Procurement work such as RFP and bid review, and commercial dispute support, are not part of either package in this proposal. That work is quoted separately or referred, and any future package would need its own agreement." },
    ];
    scenarios.corporate.perks = [`Included corporate membership: ${zero}`, "Assigned package's included services · $0 member fee", `Packages in this proposal: ${proposedCorporatePackages.join(" and ")}`, "No second monthly membership charge"];
  }
  const s = scenarios[tab];
  if (!s) return null;
  return <div id="perks" className="mt-14 border-t border-border pt-10">
    <p className="text-partner font-medium mb-3">Member perks in action</p>
    <h2 className="font-display text-2xl mb-4">What members actually use.</h2>
    <p className="text-muted-foreground max-w-2xl mb-8">Three fictional scenarios showing the package perks a {p.name} customer would get — contracts and research, wills and notary services, and the corporate packages.</p>
    <Tabs value={tab} onValueChange={setTab}><TabsList className="h-auto mb-8 flex flex-wrap w-fit">{Object.entries(scenarios).map(([k, v]) => <TabsTrigger key={k} value={k} className="py-3"><v.icon className="h-4 w-4 mr-2" />{v.label}</TabsTrigger>)}</TabsList></Tabs>
    {includedInPlan ? <StorylineDemo key={tab} name={s.who} image={tab === "corporate" ? rajPerksImage : tab === "contracts" ? mayaContractsImage : mayaWillsImage} plan={s.plan} steps={s.steps} screens={[
      { heading: tab === "corporate" ? "Business plan + Corporate Package A" : "Your Rogers plan + Professional", items: ["Membership included with eligible plan purchase", "Included in your plan · $0 to the customer", "No second membership purchase"] },
      { heading: tab === "contracts" ? "Contract Library" : tab === "wills" ? "E-notary appointment" : "Corporate Package A · included services", items: tab === "contracts" ? ["Canadian templates · English & French", "5 included downloads this month · $0", "Informational templates · arrange legal review"] : tab === "wills" ? ["Included e-notary · $0 member fee", "Identity and document checks first", "Remote commissioning where permitted"] : corporateAllowances["corporate-a"].map(a => `${a.label}: ${a.value} · within package scope`) },
      { heading: tab === "contracts" ? "Case Law Research Tool" : tab === "wills" ? "Simple will · separate matter" : "Optional add-ons · agreed separately", items: tab === "contracts" ? ["Free research preview", `${PROFESSIONAL_REPORTS_PER_MONTH} included reports/month · $0`, "Automated research · not lawyer-reviewed"] : tab === "wills" ? ["Included simple will · $0 member fee", "Ontario simple-will scope", "Written scope confirmed before work"] : [...corporateAddOns.slice(0, 2).map(a => `${a.name} ${a.price}`), "Not part of the plan benefit · confirmed in writing"] },
      { heading: tab === "corporate" ? "Outside the two packages" : "Scope confirmed before proceeding", items: tab === "corporate" ? ["Procurement & RFP work · quoted separately", "Commercial dispute support · quoted separately", "Confidential legal matters · no carrier access"] : ["Package limits apply", "Optional extras quoted separately", "Confidential legal matters · no carrier access"] },
    ]} /> : <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-8">
      <ol className="grid sm:grid-cols-2 gap-5" aria-label={`${s.label} scenario steps`}>
        {s.steps.map((st, i) => <li key={st.title} className="bg-card border border-border rounded-lg p-6">
          <p className="text-partner font-medium mb-3">Step {i + 1} · {s.who}</p>
          <h3 className="font-display text-xl mb-3">{st.title}</h3>
          <p className="text-muted-foreground text-sm">{st.text}</p>
        </li>)}
      </ol>
      <aside className="bg-partner-soft border border-border rounded-lg p-6 h-fit">
        <p className="text-sm text-partner mb-2">{s.plan}</p>
        <h3 className="font-display text-xl mb-4">Perks used</h3>
        <ul className="space-y-3">{s.perks.map((pk) => <li key={pk} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-partner-support shrink-0 mt-0.5" />{pk}</li>)}</ul>
      </aside>
    </div>}
    <p className="text-xs text-muted-foreground mt-8 max-w-4xl">{includedInPlan ? "Proposal only — not a live offer. The membership is included in the eligible Rogers plan: $0 customer membership fee and $0 member fees for included services within the assigned package's scope and allowances. No separate monthly membership bill. Benefits apply per membership period and do not carry forward. Eligibility, included package and duration require agreement. Optional extras, government fees, disbursements and third-party charges are not included unless expressly stated; any extra fee is confirmed in Canadian dollars plus HST before work starts." : "Fictional scenarios. Fees are in Canadian dollars plus HST and confirmed in writing for each matter. Memberships are a 12-month commitment billed monthly; the Contract Library is billed per month with no term and research packs are one-time purchases. Any partner rate is not yet agreed."}</p>
  </div>;
}

function EssentialPackageChoice({ partner: p }: { partner: Partner }) {
  const [choice, setChoice] = useState<"in" | "out" | null>(null);
  const includedInPlan = p.name === "Rogers";
  const inclusions = corporateInclusions["corporate-starter"];
  const allowances = corporateAllowances["corporate-starter"];
  const name = p.businessName;
  const detail = `${inclusions.map((i) => i.toLowerCase()).join(", ")} — plus ${allowances.map((a) => `${a.label.toLowerCase()}: ${a.value}`).join("; ")}.`;
  return <div className="mt-10 bg-card border border-border rounded-lg p-6 sm:p-8">
    <p className="text-partner font-medium mb-3">The choice is theirs</p>
    <h3 className="font-display text-2xl mb-3">Opt in — or out — of the Corporate Essential package.</h3>
    <p className="text-muted-foreground max-w-2xl mb-4">Business Starter is the essential entry-level corporate membership. It includes {detail}</p>
    <p className="text-muted-foreground max-w-2xl mb-6">{includedInPlan ? `Under the included-benefit model it comes with an eligible ${p.name} for Business plan at $0 to the business — activating it is not a purchase, and opting out simply leaves the benefit unused.` : `It would be offered at a future agreed partner rate, with a 12-month commitment billed monthly. Opting in or out is always the business's choice.`}</p>
    <div className="flex flex-wrap gap-3" role="group" aria-label="Corporate Essential package choice">
      <Button variant={choice === "in" ? "partner" : "outline"} onClick={() => setChoice("in")} aria-pressed={choice === "in"}><Check />{name} opts in</Button>
      <Button variant={choice === "out" ? "partner" : "outline"} onClick={() => setChoice("out")} aria-pressed={choice === "out"}><X />{name} opts out</Button>
    </div>
    {choice && <div aria-live="polite" className="mt-6 bg-partner-soft border border-border rounded-lg p-5 text-sm text-muted-foreground">
      {choice === "in" ? (includedInPlan
        ? `${name} opts in. The business activates Business Starter through LegalXpress: the membership is included in the plan, so the membership fee is $0 and included services have a $0 member fee within the package's limits. Each service is opened as its own matter with a conflicts check, client identification and a written scope; government filing fees and disbursements are extra unless expressly included.`
        : `${name} opts in. The business activates Business Starter at a future agreed partner rate — a 12-month commitment billed monthly, treated as a general retainer for member pricing and tools. Each service is opened as its own matter with a conflicts check, client identification and a written scope and fee confirmed in writing, in Canadian dollars plus HST.`)
      : `${name} opts out. Nothing is activated: no LegalXpress account is created and no legal or business information is shared. The business's ${p.name} service is unchanged, and it can revisit the benefit at any time.`}
    </div>}
  </div>;
}

function LoyaltyDiscountCard({ partner: p }: { partner: Partner }) {
  return <div className="mt-10 bg-card border border-border rounded-lg p-6 sm:p-8">
    <p className="text-partner font-medium mb-3">Outside the included package</p>
    <h3 className="font-display text-2xl mb-3">Not included — but discounted for loyal customers.</h3>
    <p className="text-muted-foreground max-w-2xl mb-5">{loyaltyDiscountNote(p.name)}</p>
    <ul className="grid sm:grid-cols-2 gap-4">
      {loyaltyDiscountServices.map((s) => <li key={s.id} className="border border-border/60 rounded-md p-4">
        <span className="font-body font-semibold text-sm text-foreground">{s.title}</span>
        <p className="text-xs text-muted-foreground font-body mt-1">Not an included service · premium discount rate for eligible {p.name} customers</p>
      </li>)}
    </ul>
    <p className="text-xs text-muted-foreground mt-5">The discount rate is illustrative and not yet agreed. No fee, commission or reward is paid to {p.name}, which has no access to or say in any matter. Government fees, disbursements and third-party charges are extra unless expressly included.</p>
  </div>;
}

function CorporateExclusionsCard({ partner: p }: { partner: Partner }) {
  const excluded = [
    { id: "corporate-b", name: "Corporate Package B" },
    { id: "corporate-c", name: "Corporate Package C" },
  ] as const;
  return <div className="mt-10 bg-card border border-border rounded-lg p-6 sm:p-8">
    <p className="text-partner font-medium mb-3">Outside the proposal</p>
    <h3 className="font-display text-2xl mb-3">Two corporate packages are not included.</h3>
    <p className="text-muted-foreground max-w-2xl mb-5">This proposal covers {proposedCorporatePackages.join(" and ")} only. Corporate Packages B and C are deliberately outside it: that work is quoted separately or referred, and any future package would need its own agreement with the business.</p>
    <ul className="grid sm:grid-cols-2 gap-4">
      {excluded.map((s) => <li key={s.id} className="border border-border/60 rounded-md p-4">
        <span className="font-body font-semibold text-sm text-foreground">{s.name}</span>
        <p className="text-xs text-muted-foreground font-body mt-1">{corporateInclusions[s.id].join(" · ")} — not an included package · quoted separately or referred</p>
      </li>)}
    </ul>
    <p className="text-xs text-muted-foreground mt-5">No fee, commission or reward is paid to {p.name}, which has no access to or say in any matter. Government fees, disbursements and third-party charges are extra unless expressly included.</p>
  </div>;
}

function OptInScenarios({ partner: p }: { partner: Partner }) {
  const [audience, setAudience] = useState("personal");
  const personal = audience === "personal";
  const name = personal ? p.storyName : p.businessName;
  const includedInPlan = p.name === "Rogers";
  const steps = personal ? [
    { title: includedInPlan ? "Buys a plan with membership included" : "Sees the benefit and chooses to opt in", text: includedInPlan ? `${name} buys an eligible Rogers personal plan. The assigned LegalXpress membership is included with that purchase at $0 to ${name}; it does not require a separate membership purchase or promotional opt-in.` : `${name} sees the LegalXpress benefit in ${p.account} and taps to activate it. Nothing is shared or started without ${name}'s explicit permission — opting in is always the customer's choice.` },
    { title: "Eligibility confirmed with minimum information", text: `A secure hand-off confirms only what is needed to confirm plan eligibility. No legal question, matter or document is ever shared with ${p.name}.` },
    { title: includedInPlan ? "Accesses the already-included benefit" : "Clear terms before anything starts", text: includedInPlan ? `${name} opens the included benefit in MyRogers and confirms LegalXpress account details and privacy choices with explicit permission. This gives access to an already-included membership; it is not a separate purchase. The terms explain that Rogers funds it, has no access to or say in any legal matter, and that the lawyer's duties run to the member alone.` : `Before the membership activates, ${name} sees who funds the membership, that ${p.name} has no access to or say in any legal matter, and that the lawyer's duties run to the member alone.` },
    { title: "Membership explained honestly", text: includedInPlan ? "The membership is included in the customer's eligible plan, so the customer's membership fee is $0. Included services have a $0 member fee within the assigned package limits; discounted or optional services are not automatically included. The membership remains a general retainer, not a prepayment for a specific legal matter. Benefits apply per membership period and do not carry forward." : "The membership is a general retainer: it provides member pricing and tools, and is not a prepayment for legal work. Direct memberships have a 12-month commitment, billed monthly; an included benefit applies per membership period and does not carry forward." },
    { title: "Two services sit outside the package", text: loyaltyDiscountNote(p.name) },
    { title: "First legal need becomes its own matter", text: `When ${name} needs legal help, the service is opened as its own matter: a conflicts check, client identification and a written scope of work are confirmed before any work starts. Fees are confirmed in writing, in Canadian dollars plus HST.` },
    { title: "Confidential from day one", text: `Everything about ${name}'s matter stays between ${name} and the lawyer. ${p.name} never sees whether a member used a legal service, let alone what was discussed.` },
  ] : [
    { title: includedInPlan ? "Buys a business plan with a package included" : "The business opts in", text: includedInPlan ? `${name} buys an eligible Rogers for Business plan with its assigned LegalXpress corporate package included at $0 to the business. Accessing it through LegalXpress is not a separate package purchase; account access and information sharing require the business's permission.` : `${name} sees the corporate package benefit on the ${p.business} account and chooses to activate it. Activation happens only with the business's explicit permission.` },
    { title: "Eligibility confirmed with minimum information", text: `A secure hand-off confirms business eligibility only. No legal question, contract or matter is ever shared with ${p.name}.` },
    { title: "The right package, chosen knowingly", text: includedInPlan ? `${name} confirms whether ${proposedCorporatePackages.join(" or ")} is included in the eligible Rogers for Business plan. That membership is included in the business's plan: $0 to the business, with no second monthly membership charge. Included services have a $0 member fee within that package's limits; optional upgrades and add-ons need separate agreement. The membership is a general retainer, not a prepayment for a specific legal matter.` : `${name} compares ${proposedCorporatePackages.join(" and ")} and chooses one at a future agreed partner rate. The terms state a 12-month commitment, billed monthly, and that the membership is a general retainer for member pricing and tools — not a prepayment for legal work.` },
    { title: "What Corporate Package A is", text: `Corporate Package A is the incorporation package: a federal or Ontario incorporation, annual return filing, a minute book kept up to date, unlimited director, officer and address changes, a shareholder agreement and Contract Library access — plus ${corporateAllowances["corporate-a"].map((a) => `${a.label.toLowerCase()}: ${a.value}`).join("; ")}. Every service inside it is opened as its own matter, with a written scope confirmed before work starts.${includedInPlan ? " Included services have a $0 member fee within the package's limits." : ""}` },
    { title: "Two corporate packages sit outside the proposal", text: `Corporate Package B (RFP and bid review, bid protests, government contract negotiation and compliance reviews) and Corporate Package C (commercial dispute assessment, contract breach and shareholder disputes, mediation and settlement negotiation) are not part of this proposal. That work is quoted separately or referred, and any future package would need its own agreement.${includedInPlan ? " Nothing in the business's plan changes." : ""}` },
    { title: "The business is verified", text: `LegalXpress confirms the business's details and identifies the authorized signing officer, meeting client-identification requirements before any legal service begins.` },
    { title: "Each engagement is separately scoped", text: `Every legal service — a supplier agreement, an employment contract, a lease review — is opened as its own matter with a conflicts check and a written scope and fee confirmation before work starts. Package inclusions apply per membership period and do not carry forward.` },
    { title: "Confidential from day one", text: `The business's legal matters stay between the business and the lawyer. ${p.name} has no access to or say in any matter, and receives no fee, commission or reward for any customer or matter.` },
  ];
  return <div id="opt-in" className="mt-14 border-t border-border pt-10">
    <div className="container max-w-6xl">
      <p className="text-partner font-medium mb-3">{includedInPlan ? "Included with the plan, step by step" : "Opting in, step by step"}</p>
      <h2 className="font-display text-2xl mb-4">{includedInPlan ? "From Rogers plan purchase to legal support." : "What a compliant sign-up looks like."}</h2>
      <p className="text-muted-foreground max-w-2xl mb-8">{includedInPlan ? "Two fictional walkthroughs: a personal customer and a business buy eligible Rogers plans with LegalXpress membership already included at $0. Account access, privacy permissions and legal-matter checks follow — not another membership purchase." : "Two fictional walkthroughs showing how a personal member and a corporate member would join — with the permission, disclosure, identification and confidentiality safeguards the Law Society of Ontario expects, at every step."}</p>
      <Tabs value={audience} onValueChange={setAudience}><TabsList className="h-auto mb-8 flex flex-wrap w-fit"><TabsTrigger value="personal" className="py-3"><User className="h-4 w-4 mr-2" />{p.storyName} · Personal membership</TabsTrigger><TabsTrigger value="corporate" className="py-3"><Building2 className="h-4 w-4 mr-2" />{p.businessName} · Corporate package</TabsTrigger></TabsList></Tabs>
      {includedInPlan ? <StorylineDemo key={audience} name={name} image={personal ? mayaImage : rajOptinImage} plan={personal ? "Professional · included with eligible Rogers plan" : "Assigned corporate package · included with eligible business plan"} steps={steps} screens={[
        { heading: personal ? "Your personal plan includes LegalXpress" : "Your business plan includes LegalXpress", items: [personal ? "Professional membership · sample package" : "Assigned corporate package · sample benefit", "Included in your plan", "$0 customer membership fee"] },
        { heading: "Eligibility hand-off", items: ["Plan eligibility only", "Customer permission confirmed", "No legal documents or matter details shared"] },
        { heading: personal ? "Welcome, Maya" : "Your included business membership", items: ["Already included · not another purchase", "Account and privacy choices confirmed", "Rogers has no access to legal matters"] },
        ...(!personal ? [{ heading: "Corporate Package A — what it is", items: ["Federal or Ontario incorporation", "Annual return filing & up-to-date minute book", "Unlimited director, officer & address changes", "Shareholder agreement & Contract Library access", "10 lawyer letters or calls a year · 10 document reviews a year (up to 20 pages)"] }, { heading: "Outside this proposal", items: ["Corporate Package B — not included", "Corporate Package C — not included", "That work is quoted separately or referred", "Any future package needs its own agreement"] }] : []),
        { heading: personal ? "Your membership terms" : "Business identification", items: personal ? ["General retainer · separate legal matters", "Included services · $0 within package limits", "Optional extras are separately agreed"] : ["Business details confirmed", "Authorized signing officer identified", "Verification before legal services"] },
        ...(personal ? [{ heading: "Outside the included package", items: [...loyaltyDiscountServices.map(s => s.title), "Eligible customers: a premium discount rate"] }] : []),
        { heading: "A new legal matter", items: ["Conflicts check", "Client identification", "Written scope and any fees confirmed"] },
        { heading: "Your legal matter stays private", items: ["Between the client and the lawyer", "No carrier access or control", "Lawyer's duties run to the client alone"] },
      ]} /> : <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label={`${personal ? "Personal" : "Corporate"} opt-in steps`}>
        {steps.map((s, i) => <li key={s.title} className="bg-card border border-border rounded-lg p-6 flex flex-col">
          <p className="text-partner font-medium mb-3">Step {i + 1}</p>
          <h3 className="font-display text-xl mb-3">{s.title}</h3>
          <p className="text-muted-foreground text-sm">{s.text}</p>
        </li>)}
      </ol>}
      {!personal && <EssentialPackageChoice partner={p} />}
      {!personal && <CorporateExclusionsCard partner={p} />}
      {personal && <LoyaltyDiscountCard partner={p} />}
      <p className="text-xs text-muted-foreground mt-8 max-w-4xl">Fictional scenarios for illustration only. Every safeguard shown — customer permission, plain-language disclosure, conflicts checks, client identification, written scopes and confidentiality — reflects how LegalXpress already operates, and would apply unchanged under any partnership.</p>
    </div>
  </div>;
}

function PartnerValue({ partner: p, corporate = false }: { partner: Partner; corporate?: boolean }) {
  const rogers = p.name === "Rogers";
  const illustrativeOffers = corporate ? ["Up to 25% off · 12 months", "15% service discount", "Up to $500 account credit"] : ["Up to $20/mo off · 12 months", "10% loyalty discount", "$100 bill credit"];
  const cases = [
    { title: `New to ${p.name}`, text: `A LegalXpress ${corporate ? "business" : "personal"} member considering ${corporate ? p.businessServices : p.personalServices} could receive an agreed new-customer offer.` },
    { title: `Already with ${p.name}`, text: "An eligible existing customer could receive a loyalty offer on their current service, subject to a future agreement." },
    { title: "Ready for something more", text: `A member adding ${rogers ? (corporate ? "extra lines, fibre Internet, cloud or security services" : "a new line, Ignite TV or home Internet") : (corporate ? "business connectivity or extra lines" : "a new line or home Internet")} could receive an agreed service-upgrade or account-credit offer.` },
  ];
  return <section id={corporate ? "corporate" : "personal"} className="section-y border-b border-border"><div className="container max-w-6xl">
    <p className="text-partner font-medium mb-3">{corporate ? "04 / Corporate members" : "03 / Personal members"} · Value to {p.name}</p>
    <h2 className="font-display text-3xl mb-4">{rogers ? (corporate ? "Every business we sign on is a potential introduction to Rogers for Business." : "Every member we sign is a Rogers customer we can introduce.") : (corporate ? `A growing business audience for ${p.business}.` : `Every new LegalXpress member is a potential ${p.name} customer.`)}</h2>
    <p className="text-muted-foreground max-w-3xl mb-8">{corporate ? `${proposedCorporatePackages.join(" and ")} connect the proposal to sole proprietors and newly incorporated businesses.${rogers ? " Sole proprietors and incorporated businesses buy lines, Internet and connectivity; interested members could be introduced to Rogers for Business with an agreed partner offer." : ""}` : `The relationship works both ways: LegalXpress can introduce interested members to eligible partner services, with their permission.${rogers ? " Members arrive from many providers — creating opportunities for new Rogers customers, existing-customer loyalty and additional services." : ""}`} No client-referral reward or professional referral fee is offered.</p>
    <div className="grid md:grid-cols-3 gap-5">{cases.map((c, i) => <article key={c.title} className="bg-card border border-border rounded-lg p-6"><p className="text-partner mb-4 font-medium">0{i + 1}</p><h3 className="font-display text-xl mb-3">{c.title}</h3><p className="text-partner font-semibold text-xl mb-3">{illustrativeOffers[i]}</p><p className="text-muted-foreground text-sm">{c.text}</p><p className="mt-5 text-xs text-partner font-medium">Illustrative offer only · not available or agreed</p></article>)}</div>
    <div className="mt-8"><Button variant="outline" asChild><a href={corporate ? "/subscriptions" : "/subscriptions/personal"}>{corporate ? "Explore corporate packages" : "Explore personal memberships"}<ArrowRight /></a></Button></div>
    <p className="mt-5 text-xs text-muted-foreground">LegalXpress makes introductions only with permission; {p.name} would provide and fulfil agreed offers under its own terms. Any new-customer discount, loyalty benefit or account credit remains subject to agreement, eligibility, credit approval and availability. No live offer is available.</p>
  </div></section>;
}

export function TelecomPartnership({ partner }: { partner: TelecomPartner }) {
  const p = telecomPartnerships[partner];
  const wins = partner === "rogers" ? [
    { icon: TrendingUp, title: "Stickier customers", text: "A legal team they rely on gives customers one more reason to stay with Rogers." },
    { icon: Sparkles, title: "Stand out from competitors", text: "It provides customers with access to legal services within their plans." },
    { icon: Heart, title: "Real-life moments", text: "Leases, contracts and simple wills — help arrives when it matters most to customers." },
    { icon: Building2, title: "Built for business", text: "Rogers for Business accounts get access to a legal team from day one under the proposed included-benefit model." },
    { icon: User, title: "New customers, both ways", text: "Every interested personal or business member is an opportunity to introduce Rogers services, with permission." },
    { icon: CheckCircle2, title: "Loyalty and service growth", text: "Proposed loyalty offers give existing customers a reason to stay; extra lines, Internet and service upgrades create opportunities to deepen the relationship." },
  ] : [
    { icon: Heart, title: "Meaningful everyday value", text: "Access to legal services within eligible plans, for life's important moments." },
    { icon: Building2, title: "A stronger business bundle", text: "Corporate packages alongside the connectivity businesses depend on." },
    { icon: CheckCircle2, title: "A simpler member experience", text: "An included benefit without a separate promotional opt-in." },
  ];
  return <Layout><div className={`telecom-partnership telecom-${partner} bg-background text-foreground`}>
    <section className="relative overflow-hidden telecom-hero">
      <img src={p.image} width={1536} height={1024} alt={partner === "bell" ? "Professional beside the Toronto waterfront" : partner === "rogers" ? "Restaurant owner holding a tablet in a bright Toronto restaurant" : "Small-business owner in a bright Canadian café"} className="absolute inset-0 w-full h-full object-cover object-right" />
      <div className="absolute inset-0 telecom-hero-shade" />
      <div className="relative container max-w-6xl py-12 md:py-16 text-partner-foreground">
        <p className="text-sm mb-5 font-medium">SAMPLE PARTNERSHIP PROPOSAL · NOT IN EFFECT</p>
        <div className="flex flex-wrap items-center gap-3 mb-6"><span className="text-xl font-semibold">LegalXpress</span><Handshake className="h-5 w-5" /><span className="text-3xl font-semibold">{p.name}</span></div>
        <h1 className="font-display text-4xl md:text-5xl max-w-xl leading-tight mb-6">{p.headline}</h1>
        <p className="text-lg max-w-lg mb-8">{p.intro}</p>
        <div className="flex flex-wrap gap-3"><Button variant="partner" asChild><a href="#flow">Explore the flow<ArrowRight /></a></Button><Button variant="outline" className="text-foreground" asChild><a href="#stories">Meet the customers</a></Button></div>
      </div>
    </section>
    <div className="bg-partner-soft border-b border-border"><div className="container max-w-6xl py-5 flex gap-3 items-start"><ShieldCheck className="h-5 w-5 text-partner shrink-0 mt-1" /><p className="text-sm">Independent LegalXpress concept, not a live {p.name} offer. No partnership, endorsement, eligibility or discount is confirmed. Illustrative branding; no carrier logos used.</p></div></div>
    <section className="py-10 border-b border-border"><div className="container max-w-6xl">{partner === "rogers" && <p className="text-partner font-medium mb-8">Why it's a win for Rogers</p>}<div className="grid sm:grid-cols-3 gap-8">{wins.map((w) => <div key={w.title}><w.icon className="text-partner h-6 w-6 mb-3" /><h2 className="font-display text-xl mb-2">{w.title}</h2><p className="text-muted-foreground text-sm">{w.text}</p></div>)}</div></div></section>
    <FlowDemo partner={p} /><CustomerStories partner={p} /><PartnerValue partner={p} /><PartnerValue partner={p} corporate />
    <section className="section-y"><div className="container max-w-6xl"><h2 className="font-display text-2xl mb-5">Before this concept becomes a partnership</h2><ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5 max-w-4xl">
      <li>Both parties must agree on eligible carrier plans, package benefits, duration, customer permissions, promotion terms and service availability. No carrier account is connected in this demo.</li>
      <li>The included-benefit model needs agreed continuation and cancellation terms. Direct LegalXpress memberships under the Preferred Partner model have a 12-month commitment, billed monthly.</li>
      <li>Membership payments are general retainers for member pricing and tools, not prepayments for legal work. Each legal service is separately scoped and confirmed in writing. Any advertised LegalXpress fees are in Canadian dollars plus HST; filing fees, disbursements and third-party charges are extra unless stated.</li>
      <li>Legal services are provided under Ontario licensing by Shiv Kumar Passi, Lawyer, LSO No. 70089L. Out-of-jurisdiction matters may require an independent licensed professional.</li>
      <li>Under the included-benefit model, the member terms and every customer-facing asset would state who funds the membership and make clear that {p.name} has no access to or say in any legal matter and that the lawyer's duties run to the member alone. Any included legal service would be described as a "$0 member fee" with government fees and disbursements extra — never as "free legal services".</li>
      <li>Money flows only toward LegalXpress: no fee, commission or reward is paid to {p.name} for any customer or matter. Any marketing would use LegalXpress-approved copy only.</li>
      <li>Each page and document would state which entity does what: legal services are provided by the law practice; membership administration, the Contract Library and research tools are non-legal services identified separately. The structure would be confirmed with the Law Society of Ontario Practice Management Helpline before any agreement is signed.</li>
      <li>Carrier offers and services would be provided by {p.name} under its own terms. LegalXpress's legal services and confidential legal matters remain separate.</li>
      <li>{p.name} and product names identify the subject of this proposal only. The colours are inspired by the carrier's public identity; this page is not official carrier material.</li>
    </ul><nav aria-label="Other sample partnerships" className="mt-10 flex flex-wrap gap-3">{(Object.keys(telecomPartnerships) as TelecomPartner[]).filter((key) => key !== partner).map((key) => <Button key={key} variant="outline" asChild><a href={`/partnerships/${key}`}>{telecomPartnerships[key].name} sample<ArrowRight /></a></Button>)}</nav></div></section>
  </div></Layout>;
}