import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, LockKeyhole, Plus, Trash2, CircleCheck, Clock3, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { IntakeConsent, IntakeField, IntakeSelect } from "@/components/intake/IntakeFields";
import { canProvideIdentity, conflictSchema, emptyConflict, emptyIdentity, intakePlans, intakeStatuses, INTAKE_VERSION, lsoSources, validateIdentity, type ConflictDetails, type IdentityDetails } from "@/lib/intake";
import { intakeClient, type IntakeRecord } from "@/lib/intakeApi";
import { CONFIDENTIALITY_NOTICE, MEMBERSHIP_NOTICE, PRICE_NOTICE } from "@/data/practiceTerms";

const stages = ["Your request", "Names & parties", "Review & send"];
const services = ["Membership access only", "Wills & estates", "Notary / e-Notary", "Contracts", "Business formation & corporate", "Procurement", "Litigation / small claims", "Separation / marriage agreement", "Other / unsure"];
const planKeys: Record<string, string> = { essential: "Essential", starter: "Starter", professional: "Professional", executive: "Executive", business: "Executive", "corporate-starter": "Business Starter", "corporate-a": "Corporate Package A", "corporate-b": "Corporate Package B", "corporate-c": "Corporate Package C" };

export default function ClientIntake() {
  const { user, loading: authLoading } = useAuth();
  const [params] = useSearchParams();
  const { toast } = useToast();
  const [details, setDetails] = useState<ConflictDetails>({ ...emptyConflict, plan: planKeys[params.get("plan") || ""] || "Essential" });
  const [identity, setIdentity] = useState<IdentityDetails>(emptyIdentity);
  const [consent, setConsent] = useState(false);
  const [accuracy, setAccuracy] = useState(false);
  const [step, setStep] = useState(0);
  const [records, setRecords] = useState<IntakeRecord[]>([]);
  const [selected, setSelected] = useState<IntakeRecord | null>(null);
  const [mode, setMode] = useState<"new" | "status" | "identity" | "correction">("new");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const update = <K extends keyof ConflictDetails>(key: K, value: ConflictDetails[K]) => setDetails(d => ({ ...d, [key]: value }));
  const updateIdentity = (key: keyof IdentityDetails, value: string) => setIdentity(d => ({ ...d, [key]: value }));

  useEffect(() => {
    let active = true;
    if (!user) { setRecords([]); return; }
    setDetails(d => ({ ...d, email: user.email || d.email, legalName: d.legalName || user.user_metadata?.full_name || "" }));
    setLoading(true);
    intakeClient.from("client_intakes").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).returns<IntakeRecord[]>().then(({ data, error }) => {
      if (!active) return;
      setLoadError(!!error);
      setRecords(data || []);
      if (data?.[0]) { setSelected(data[0]); setMode("status"); }
      setLoading(false);
    });
    return () => { active = false; };
  }, [user]);

  const check = () => {
    const parsed = conflictSchema.safeParse({ ...details, consent });
    const relevant = parsed.success ? [] : parsed.error.issues.filter(i => step !== 0 || ["purpose", "plan", "clientType", "area", "jurisdiction"].includes(String(i.path[0])));
    setErrors(relevant.map(i => i.message));
    if (!relevant.length) { setStep(s => Math.min(2, s + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };
  const save = async () => {
    if (!user) return;
    const parsed = conflictSchema.safeParse({ ...details, consent });
    if (!parsed.success) { setErrors(parsed.error.issues.map(i => i.message)); return; }
    setBusy(true);
    const payload = { details: parsed.data, status: "submitted" as const };
    const response = mode === "correction" && selected
      ? await intakeClient.from("client_intakes").update(payload).eq("id", selected.id).select().single().returns<IntakeRecord>()
      : await intakeClient.from("client_intakes").insert({ ...payload, user_id: user.id, version: INTAKE_VERSION }).select().single().returns<IntakeRecord>();
    setBusy(false);
    if (response.error || !response.data) { toast({ title: "Request not sent", description: "Your request could not be saved. Please retry or call LegalXpress.", variant: "destructive" }); return; }
    setSelected(response.data);
    setRecords(r => [response.data, ...r.filter(i => i.id !== response.data.id)]);
    setMode("status"); setErrors([]);
    toast({ title: "Request received", description: "Conflict review is pending. No membership or legal matter has been activated." });
  };
  const sendIdentity = async () => {
    if (!selected || !user) return;
    const problems = validateIdentity({ ...identity, accuracy }, selected.details.clientType);
    setErrors(problems);
    if (problems.length) return;
    const payload: IdentityDetails = { ...identity, accuracy: true };
    setBusy(true);
    const { data, error } = await intakeClient.from("client_intakes").update({ identity: payload, status: "compliance_review" }).eq("id", selected.id).select().single().returns<IntakeRecord>();
    setBusy(false);
    if (error || !data) { toast({ title: "Details not saved", description: "Please retry. Your review status may have changed.", variant: "destructive" }); return; }
    setSelected(data); setRecords(r => r.map(i => i.id === data.id ? data : i)); setMode("status"); setErrors([]);
    toast({ title: "Identification details received", description: "LegalXpress will review the applicable requirements." });
  };
  const newRequest = () => { setSelected(null); setMode("new"); setStep(0); setConsent(false); setAccuracy(false); setErrors([]); setDetails({ ...emptyConflict, email: user?.email || "", legalName: user?.user_metadata?.full_name || "" }); };
  const journeyStage = mode === "identity" || selected?.status === "compliance_review" || selected?.status === "conflict_cleared" ? 2 : selected?.status === "ready_for_engagement" ? 3 : mode === "status" ? 1 : 0;

  return <Layout><div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 mb-8"><Link to="/portal" className="font-display text-xl">LegalXpress <span className="font-body text-sm text-muted-foreground ml-2">Client intake</span></Link><span className="flex items-center gap-2 text-sm text-forest"><LockKeyhole className="h-4 w-4" /> Private intake</span></div>
    <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-14">
      <aside className="space-y-8"><div><ShieldCheck className="h-9 w-9 text-forest mb-4" /><h1 className="font-display text-3xl mb-3">A clear start.<br />A careful review.</h1><p className="text-muted-foreground text-sm">Our legal team, one membership with you in mind.</p></div>
        <ol className="space-y-5" aria-label="Intake journey">{["Your request", "Conflict review", "Identification", "Written engagement"].map((label, i) => <li key={label} className="flex items-center gap-3"><span className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center border text-sm ${i === journeyStage ? "bg-forest text-forest-foreground border-forest" : "border-border text-muted-foreground"}`}>{i + 1}</span><span className="text-sm">{label}</span></li>)}</ol>
        <div className="border-t border-border pt-5 space-y-3"><p className="text-xs text-muted-foreground">No documents, identification scans, payment details or detailed case facts at the first stage.</p><Button variant="outline" asChild className="w-full"><Link to="/contact"><Phone className="h-4 w-4 mr-2" /> Prefer to speak with us?</Link></Button></div>
      </aside>
      <div className="min-w-0">
        {authLoading || loading ? <p role="status" className="py-16 text-muted-foreground">Loading your intake…</p> : !user ? <div className="py-6 space-y-6"><Badge variant="outline">Before we begin</Badge><h2 className="font-display text-3xl">Your client account comes first.</h2><p className="text-muted-foreground">Sign in to send a private intake request and follow its progress. Account creation alone does not activate a membership or retain LegalXpress for a matter.</p><div className="flex flex-wrap gap-3"><Button asChild><Link to={`/login?redirect=${encodeURIComponent("/intake" + (params.toString() ? "?" + params.toString() : ""))}`}>Sign in <ArrowRight className="h-4 w-4 ml-2" /></Link></Button><Button variant="outline" asChild><Link to={`/register?redirect=${encodeURIComponent("/intake" + (params.toString() ? "?" + params.toString() : ""))}`}>Create an account</Link></Button></div><p className="text-sm border-l-2 border-secondary pl-4">Have an urgent deadline? Contact a lawyer immediately. Sending an intake does not mean LegalXpress is protecting a limitation period, court date or filing deadline.</p></div> : <>
        {loadError && <p role="alert" className="mb-5 text-destructive">Your previous requests could not be loaded. Reload this page before sending another request.</p>}
        {records.length > 0 && <div className="mb-7 flex flex-wrap items-end gap-3"><div className="flex-1 min-w-0"><p className="text-sm font-medium">Your requests</p><div className="flex flex-wrap gap-2 mt-2">{records.map(r => <Button key={r.id} size="sm" variant={selected?.id === r.id ? "secondary" : "outline"} onClick={() => { setSelected(r); setMode("status"); setErrors([]); }}>{r.details.area} · {new Date(r.created_at).toLocaleDateString("en-CA")}</Button>)}</div></div><Button variant="outline" onClick={newRequest}><Plus className="h-4 w-4 mr-2" /> New request</Button></div>}
        {mode === "status" && selected ? <div className="space-y-7"><Badge className="bg-forest/10 text-forest">{intakeStatuses[selected.status]}</Badge><h2 className="font-display text-3xl">{selected.status === "submitted" ? "Thank you. Your request is with us." : "Your next step, at a glance."}</h2><p className="text-sm text-muted-foreground">Reference {selected.id.slice(0, 8).toUpperCase()} · {selected.details.legalName} · {selected.details.area}</p><div className="bg-muted/60 border-l-2 border-forest p-5"><Clock3 className="h-5 w-5 text-forest mb-3" /><p>{selected.client_message || "LegalXpress will review the names against its conflict records and contact you about next steps. A search or submitted form is not automatic conflict clearance."}</p></div>
          {canProvideIdentity(selected.status, !!selected.identity) && <Button onClick={() => { setIdentity(selected.identity || emptyIdentity); setAccuracy(false); setMode("identity"); }}>Provide identification details <ArrowRight className="h-4 w-4 ml-2" /></Button>}
          {selected.status === "needs_information" && !selected.identity && <Button onClick={() => { setDetails(selected.details); setConsent(false); setStep(0); setMode("correction"); }}>Update requested details <ArrowRight className="h-4 w-4 ml-2" /></Button>}
          <div className="border-t border-border pt-5"><h3 className="font-display text-xl mb-2">Membership is not a matter retainer.</h3><p className="text-sm text-muted-foreground">No payment is processed and no membership is activated by this intake. Legal work begins only after LegalXpress confirms acceptance, the scope and applicable fee in writing. You remain responsible for deadlines unless we expressly agree otherwise.</p></div>
        </div> : mode === "identity" && selected ? <form onSubmit={e => { e.preventDefault(); sendIdentity(); }} className="space-y-6"><Badge variant="outline">Stage 3 · After conflict review</Badge><h2 className="font-display text-3xl">A little more about you.</h2><p className="text-muted-foreground text-sm">These are identification details, not identity verification. LegalXpress will tell you if a separate verification step is required and arrange an appropriate method. Do not upload or type an ID number here.</p>
          <IntakeField id="address" label="Full home / mailing address" value={identity.address} onChange={v => updateIdentity("address", v)} /><IntakeField id="occupation" label="Occupation(s) / current status" value={identity.occupation} onChange={v => updateIdentity("occupation", v)} /><IntakeField id="businessContact" label="Business address and telephone, if applicable" value={identity.businessContact} onChange={v => updateIdentity("businessContact", v)} hint="If not applicable, leave blank." />
          {selected.details.clientType === "organization" && <div className="border-t border-border pt-6 space-y-5"><h3 className="font-display text-xl">The organization</h3>{[["registration", "Registration number and place of issue (or not registered)"], ["organizationAddress", "Business address & telephone"], ["businessActivity", "General business activity"], ["directors", "Directors’ names, if known"], ["owners", "Ownership & control, if known"]].map(([key, label]) => <IntakeField key={key} id={key} label={label} value={String(identity[key as keyof IdentityDetails])} onChange={v => updateIdentity(key as keyof IdentityDetails, v)} multiline={key === "owners"} hint={key === "owners" ? "For applicable financial transactions: names and addresses of direct/indirect owners at 25% or more, and the ownership/control structure. For trusts: trustees, known beneficiaries and settlors. Staff will confirm what applies." : undefined} />)}</div>}
          <IntakeField id="thirdParty" label="Are you instructing us for someone else?" value={identity.thirdParty} onChange={v => updateIdentity("thirdParty", v)} multiline hint="If yes, give their name and your authority. LegalXpress may request their identification separately. Otherwise enter ‘No’." />
          <IntakeSelect id="financial" label="Will the matter involve receiving, paying or transferring funds beyond our legal fees and expenses?" value={identity.financial} onChange={v => updateIdentity("financial", v)} options={["yes", "no", "unsure"]} />
          {identity.financial !== "no" && <IntakeField id="sourceOfFunds" label="What is the expected source of those funds, if known?" value={identity.sourceOfFunds} onChange={v => updateIdentity("sourceOfFunds", v)} multiline hint="Describe the origin, expected amount/currency and payer, not bank account numbers. Leave blank if unknown; staff will follow up." />}
          <IntakeConsent id="accuracy" checked={accuracy} onChange={setAccuracy}>These details are accurate to the best of my knowledge. I will tell LegalXpress about changes in parties, instructions or funds.</IntakeConsent>
          {errors.length > 0 && <ErrorList errors={errors} />}<div className="flex justify-between gap-3"><Button variant="outline" onClick={() => { setMode("status"); setErrors([]); }} type="button">Back</Button><Button type="submit" disabled={busy}>{busy ? "Sending…" : "Send for review"}<ArrowRight className="h-4 w-4 ml-2" /></Button></div>
        </form> : <form onSubmit={e => { e.preventDefault(); step === 2 ? save() : check(); }} className="space-y-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">{stages.map((label, i) => <div key={label} className={`flex-1 border-t-2 pt-3 ${i <= step ? "border-forest text-forest" : "border-border"}`} aria-current={i === step ? "step" : undefined}>{i + 1}. {label}</div>)}</div>
          <h2 className="font-display text-3xl">{step === 0 ? "How can we help?" : step === 1 ? "Names first. Details later." : "Make sure everything looks right."}</h2>
          {step === 0 && <><p className="text-muted-foreground text-sm">Choose a membership request, a new legal matter, or both. Every new matter needs its own review—even if you already have a membership.</p><RadioGroup value={details.purpose} onValueChange={v => update("purpose", v as ConflictDetails["purpose"])} className="grid sm:grid-cols-3 gap-3">{[["membership", "Join as a member"], ["matter", "Request legal help"], ["both", "Membership + legal help"]].map(([value, label]) => <Label key={value} htmlFor={`purpose-${value}`} className={`p-4 border rounded-lg flex items-start gap-3 min-h-[80px] cursor-pointer ${details.purpose === value ? "border-forest bg-forest/5" : "border-border"}`}><RadioGroupItem id={`purpose-${value}`} value={value} className="shrink-0 mt-1" /><span>{label}</span></Label>)}</RadioGroup>
            {details.purpose !== "matter" && <IntakeSelect id="intake-plan" label="Membership requested" value={details.plan} onChange={v => update("plan", v)} options={intakePlans} />}
            <div className="grid sm:grid-cols-2 gap-5"><IntakeSelect id="clientType" label="Who would be the client?" value={details.clientType} onChange={v => update("clientType", v as ConflictDetails["clientType"])} options={["individual", "organization"]} /><IntakeSelect id="area" label="Service requested" value={details.area} onChange={v => update("area", v)} options={services} /></div><IntakeField id="jurisdiction" label="Province / jurisdiction of the matter" value={details.jurisdiction} onChange={v => update("jurisdiction", v)} /><IntakeField id="deadline" label="Known court date or deadline (optional)" type="date" value={details.deadline} onChange={v => update("deadline", v)} /><p className="text-sm border-l-2 border-secondary pl-4">Urgent deadlines need immediate attention. This request is not an agreement to protect a deadline or begin legal work.</p></>}
          {step === 1 && <><p className="text-sm text-muted-foreground">Provide names for conflict screening only. Do not share allegations, detailed facts, medical information or documents at this stage.</p><IntakeField id="legalName" label="Your full legal name" value={details.legalName} onChange={v => update("legalName", v)} /><IntakeField id="otherNames" label="Other / former names (optional)" value={details.otherNames} onChange={v => update("otherNames", v)} /><div className="grid sm:grid-cols-2 gap-5"><IntakeField id="intake-email" label="Safe contact email" type="email" value={details.email} onChange={v => update("email", v)} /><IntakeField id="intake-phone" label="Safe contact phone" type="tel" value={details.phone} onChange={v => update("phone", v)} /></div>{details.clientType === "organization" && <><IntakeField id="organization" label="Organization’s full legal name" value={details.organization} onChange={v => update("organization", v)} /><IntakeField id="authority" label="Your position and authority to instruct LegalXpress" value={details.authority} onChange={v => update("authority", v)} /></>}
            <div className="border-t border-border pt-5 space-y-4"><h3 className="font-display text-xl">Other parties & related entities</h3><p className="text-sm text-muted-foreground">Include opposing parties, spouses, co-clients, businesses and relevant related entities. For a will or other non-dispute matter, list relevant people where known; staff may ask for more names.</p>{details.parties.map((party, i) => <div key={i} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end"><IntakeField id={`party-${i}`} label={`Party ${i + 1} · full name`} value={party.name} onChange={v => update("parties", details.parties.map((p, j) => j === i ? { ...p, name: v } : p))} /><IntakeSelect id={`relationship-${i}`} label="Relationship" value={party.relationship} onChange={v => update("parties", details.parties.map((p, j) => j === i ? { ...p, relationship: v } : p))} options={["Opposing party", "Spouse / partner", "Co-client", "Related business", "Beneficiary / executor", "Other"]} /><Button type="button" variant="ghost" size="icon" aria-label={`Remove party ${i + 1}`} title="Remove party" onClick={() => update("parties", details.parties.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button></div>)}<Button type="button" variant="outline" disabled={details.parties.length >= 30} onClick={() => { update("parties", [...details.parties, { name: "", relationship: "Opposing party" }]); update("noOtherParties", false); }}><Plus className="h-4 w-4 mr-2" /> Add a party</Button>{!details.parties.length && <IntakeConsent id="no-parties" checked={details.noOtherParties} onChange={v => update("noOtherParties", v)}>There are no other parties known to me at this stage.</IntakeConsent>}</div>
            <IntakeConsent id="intake-consent" checked={consent} onChange={setConsent}>I authorize LegalXpress to use these details to assess this request, check conflicts and contact me. This is not marketing consent or permission to share my matter with a carrier or referral partner.</IntakeConsent></>}
          {step === 2 && <><dl className="divide-y divide-border">{[["Request", details.purpose === "matter" ? "Legal help" : `${details.plan} · ${details.purpose === "both" ? "membership and legal help" : "membership"}`], ["Intended client", details.clientType === "organization" ? `${details.organization} · instructed by ${details.legalName} (${details.authority})` : details.legalName], ["Contact", `${details.email} · ${details.phone}`], ["Service & jurisdiction", `${details.area} · ${details.jurisdiction}`], ["Other names", details.otherNames || "None provided"], ["Other parties", details.parties.map(p => `${p.name} (${p.relationship})`).join("; ") || "None known"], ["Deadline", details.deadline || "None provided"]].map(([label, value]) => <div key={label} className="py-3 grid sm:grid-cols-[150px_1fr] gap-2"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="text-sm break-words">{value}</dd></div>)}</dl><div className="bg-forest/5 border-l-2 border-forest p-5"><CircleCheck className="h-5 w-5 text-forest mb-2" /><h3 className="font-display text-xl mb-2">What happens next</h3><p className="text-sm">A human reviews conflicts first. If we can proceed, we request identification and assess any verification obligations. LegalXpress then discusses written scope, fees and acceptance. This form does not provide legal advice, activate membership or create a matter.</p></div>{details.purpose !== "matter" && <details className="text-sm border-y border-border py-4"><summary className="cursor-pointer font-medium">Membership terms & fee treatment</summary><p className="text-muted-foreground mt-3">{MEMBERSHIP_NOTICE}</p><p className="text-muted-foreground mt-3">{PRICE_NOTICE}</p><Link className="underline mt-3 inline-block" to="/subscriptions">Review your plan’s scope and published price</Link></details>}</>}
          {errors.length > 0 && <ErrorList errors={errors} />}<div className="flex items-center justify-between gap-3 border-t border-border pt-6">{step > 0 ? <Button type="button" variant="outline" onClick={() => { setStep(s => s - 1); setErrors([]); }}><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button> : <span className="text-xs text-muted-foreground">Step 1 of 3</span>}<Button type="submit" disabled={busy || loadError}>{busy ? "Sending…" : step === 2 ? "Send intake request" : "Continue"}{step === 2 ? <Check className="h-4 w-4 ml-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}</Button></div>
        </form>}
        </>}
        <div className="border-t border-border mt-10 pt-5 space-y-3 text-xs text-muted-foreground"><p>We protect prospective-client information even if we do not accept the matter. Please do not send sensitive documents until we ask. Intake forms are not a substitute for a lawyer’s professional assessment.</p><details><summary className="cursor-pointer">Confidentiality and professional safeguards</summary><p className="mt-3">{CONFIDENTIALITY_NOTICE}</p><p className="mt-2">Provided by Shiv Kumar Passi, Lawyer, LSO No. 70089L. The review follows applicable LSO rules; the website does not certify compliance or automatically clear conflicts. Identification and verification requirements vary by matter.</p><ul className="mt-3 space-y-2">{lsoSources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a></li>)}</ul></details><Link to="/privacy" className="underline">Privacy policy</Link></div>
      </div>
    </div>
  </div></Layout>;
}
function ErrorList({ errors }: { errors: string[] }) { return <div role="alert" className="border-l-2 border-destructive bg-destructive/5 p-4 text-sm text-destructive"><p className="font-medium mb-2">Please check these details:</p><ul className="list-disc pl-5">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul></div>; }