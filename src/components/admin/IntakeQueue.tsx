import { useEffect, useState } from "react";
import { Search, RefreshCw, ShieldCheck, ArrowRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { IntakeConsent, IntakeField, IntakeSelect } from "@/components/intake/IntakeFields";
import { intakeClient, type IntakeRecord, type IntakeReview } from "@/lib/intakeApi";
import { intakeStatuses, lsoSources, type IntakeStatus } from "@/lib/intake";

const freshReview = (id: string): IntakeReview => ({ intake_id: id, notes: "", conflict_checked: false, identification_checked: false, verification: "pending", verification_record: "", organization_checked: false, third_party_checked: false, funds_checked: false, monitoring_record: "", reviewed_by: null, reviewed_at: null });
export function IntakeQueue() {
  const { toast } = useToast();
  const [rows, setRows] = useState<IntakeRecord[]>([]);
  const [selected, setSelected] = useState<IntakeRecord | null>(null);
  const [review, setReview] = useState<IntakeReview>(freshReview(""));
  const [status, setStatus] = useState<IntakeStatus>("submitted");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [events, setEvents] = useState<{ action: string; created_at: string }[]>([]);
  const load = async () => {
    setLoading(true);
    const { data, error: failure } = await intakeClient.from("client_intakes").select("*").order("created_at", { ascending: false }).returns<IntakeRecord[]>();
    setLoading(false);
    if (failure) { setError("Intake records could not be loaded. Please retry."); return; }
    setError(""); setRows(data || []);
  };
  useEffect(() => { load(); }, []);
  useEffect(() => {
    let active = true;
    if (!selected) return;
    setReview(freshReview(selected.id)); setStatus(selected.status); setMessage(selected.client_message);
    setBusy(true);
    Promise.all([
      intakeClient.from("intake_reviews").select("*").eq("intake_id", selected.id).maybeSingle().returns<IntakeReview>(),
      intakeClient.from("intake_events").select("action, created_at").eq("intake_id", selected.id).order("created_at", { ascending: false }),
    ]).then(([r, e]) => { if (!active) return; setBusy(false); if (r.error || e.error) { setError("Review history could not be loaded. Retry before making a decision."); return; } setError(""); setReview(r.data || freshReview(selected.id)); setEvents(e.data || []); });
    return () => { active = false; };
  }, [selected]);
  const change = <K extends keyof IntakeReview>(key: K, value: IntakeReview[K]) => setReview(r => ({ ...r, [key]: value }));
  const save = async () => {
    if (!selected) return;
    if (!review.notes.trim()) { toast({ title: "Record the review first", description: "Document your search, potential matches, decision and any required consent.", variant: "destructive" }); return; }
    if (["needs_information", "closed"].includes(status) && !message.trim()) { toast({ title: "Client message required", description: "Explain the requested information or non-engagement outcome without revealing another client’s confidential information.", variant: "destructive" }); return; }
    setBusy(true);
    const { error: reviewError } = await intakeClient.from("intake_reviews").upsert({ ...review }, { onConflict: "intake_id" });
    if (reviewError) { setBusy(false); toast({ title: "Review not saved", description: "Please retry.", variant: "destructive" }); return; }
    const { data, error: saveError } = await intakeClient.from("client_intakes").update({ status, client_message: message }).eq("id", selected.id).eq("updated_at", selected.updated_at).select().single().returns<IntakeRecord>();
    setBusy(false);
    if (saveError || !data) { toast({ title: "Status not changed", description: "Complete the applicable checklist, or reload if another reviewer changed this request. Your review notes were saved.", variant: "destructive" }); return; }
    setRows(r => r.map(i => i.id === data.id ? data : i)); setSelected(data);
    toast({ title: "Review saved", description: "The client can now see their updated status. No membership or matter was activated." });
  };
  const visible = rows.filter(r => JSON.stringify(r.details).toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-7"><div className="flex flex-wrap justify-between items-start gap-4"><div><h2 className="font-display text-2xl flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-forest" /> Client intake & review</h2><p className="text-sm text-muted-foreground mt-2">Restricted to the administrator. Review conflicts across all practice records before requesting more information.</p></div><Button variant="outline" size="icon" aria-label="Refresh intake queue" title="Refresh intake queue" onClick={load} disabled={loading}><RefreshCw className="h-4 w-4" /></Button></div>
    <div className="grid sm:grid-cols-3 border-y border-border py-4 gap-4">{[["Awaiting conflicts", rows.filter(r => r.status === "submitted").length], ["Compliance review", rows.filter(r => r.status === "compliance_review").length], ["Waiting for client", rows.filter(r => ["needs_information", "conflict_cleared"].includes(r.status)).length]].map(([label, value]) => <div key={label}><p className="text-2xl font-display">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>)}</div>
    {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
    <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Search intake names and parties" placeholder="Search intake names, organizations and parties…" value={query} onChange={e => setQuery(e.target.value)} className="pl-10" /></div><p className="text-xs text-muted-foreground">This searches intake records only—not the complete practice conflict system. Check current, former and prospective clients, declined enquiries, related parties and offline records, and record the search sources and outcome.</p>
    <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-7"><div className="space-y-3">{loading && <p role="status">Loading requests…</p>}{!loading && !visible.length && <p className="text-muted-foreground text-sm">{rows.length ? "No matching requests." : "No intake requests yet."}</p>}{visible.map(r => <Button key={r.id} variant="outline" onClick={() => setSelected(r)} className={`w-full h-auto text-left justify-start whitespace-normal p-4 ${selected?.id === r.id ? "border-forest bg-forest/5" : ""}`}><div className="w-full"><p className="font-medium break-words">{r.details.clientType === "organization" ? r.details.organization : r.details.legalName}</p><p className="text-xs text-muted-foreground mt-1">{r.details.area}</p><p className="text-xs text-forest mt-2">{intakeStatuses[r.status]}</p><p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleDateString("en-CA")}</p></div></Button>)}</div>
      {selected ? <div className="space-y-7 min-w-0"><div className="border-b border-border pb-5"><Badge variant="outline">{selected.id.slice(0, 8).toUpperCase()}</Badge><h3 className="font-display text-2xl mt-3">{selected.details.legalName}</h3><p className="text-sm text-muted-foreground">{selected.details.email} · {selected.details.phone}</p><p className="text-sm mt-2">{selected.details.plan} · {selected.details.clientType} · {selected.details.jurisdiction}</p>{selected.details.deadline && <p className="text-destructive text-sm mt-2">Reported deadline: {selected.details.deadline} · confirm immediately</p>}</div>
        <dl className="text-sm space-y-3">{[["Other names", selected.details.otherNames || "None provided"], ["Organization / authority", selected.details.organization ? `${selected.details.organization} / ${selected.details.authority}` : "Individual client"], ["Other parties", selected.details.parties.map(p => `${p.name} — ${p.relationship}`).join("; ") || "None known"]].map(([label, value]) => <div key={label}><dt className="text-muted-foreground">{label}</dt><dd className="break-words">{value}</dd></div>)}</dl>
        {selected.identity && <details open className="border-y border-border py-4"><summary className="font-medium cursor-pointer">Client identification details</summary><dl className="mt-4 space-y-3 text-sm">{Object.entries(selected.identity).filter(([key, value]) => key !== "accuracy" && value).map(([key, value]) => <div key={key}><dt className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</dt><dd className="whitespace-pre-wrap break-words">{String(value)}</dd></div>)}</dl></details>}
        <form onSubmit={e => { e.preventDefault(); save(); }}><fieldset disabled={busy || !!error} className="space-y-5"><h4 className="font-display text-xl flex gap-2 items-center"><ClipboardCheck className="h-5 w-5 text-forest" /> Professional review record</h4><IntakeField id="review-notes" label="Conflict search record & professional decision (staff only)" multiline value={review.notes} onChange={v => change("notes", v)} hint="Date, databases/offline records searched, names searched, matches, assessment, any permissible consent and the responsible lawyer. Do not expose another client’s details in the client message." />
          <IntakeConsent id="conflict-checked" checked={review.conflict_checked} onChange={v => change("conflict_checked", v)}>The responsible lawyer has reviewed and resolved the conflicts identified for this request.</IntakeConsent>
          {selected.identity && <div className="border-t border-border pt-5 space-y-5"><IntakeConsent id="identification-checked" checked={review.identification_checked} onChange={v => change("identification_checked", v)}>Required client identification information is recorded, including occupation(s) and applicable business contact information.</IntakeConsent>
            <IntakeSelect id="verification-assessment" label="Identity verification assessment" value={review.verification} onChange={v => change("verification", v)} options={["pending", "not_required", "exempt", "completed"]} /><IntakeField id="verification-record" label="Trigger, exemption or completed verification record" value={review.verification_record} onChange={v => change("verification_record", v)} multiline hint="Record applicable financial activity, reasons and any specific exemption. If completed: each person/entity verified, compliant method, date, reviewer and secure evidence reference. An uploaded scan or ordinary video call alone is not authenticated virtual verification." />
            <IntakeConsent id="organization-checked" checked={review.organization_checked} onChange={v => change("organization_checked", v)}>Organization, authorized instructors, beneficial ownership/control and any trust information are assessed and recorded where applicable; otherwise the reason is recorded.</IntakeConsent>
            <IntakeConsent id="third-party-checked" checked={review.third_party_checked} onChange={v => change("third_party_checked", v)}>Third-party instructions, authority, capacity and applicable identification/verification have been assessed.</IntakeConsent>
            <IntakeConsent id="funds-checked" checked={review.funds_checked} onChange={v => change("funds_checked", v)}>Applicable source-of-funds information and consistency/risk review are recorded, or a reason for non-application is recorded.</IntakeConsent>
            <IntakeField id="monitoring-record" label="Compliance evidence & ongoing monitoring plan" value={review.monitoring_record} onChange={v => change("monitoring_record", v)} multiline hint="Reference secure records, funds origin/amount/currency/payer/date where applicable, ownership accuracy measures and exceptions. Record review findings and when changed parties, instructions or funds require further checks. Do not store ID scans or bank account numbers here." />
          </div>}
          <IntakeSelect id="review-status" label="Next status" value={status} onChange={v => setStatus(v as IntakeStatus)} options={Object.keys(intakeStatuses)} /><p className="text-sm text-forest">Client sees: {intakeStatuses[status]}</p><IntakeField id="client-message" label="Message visible to the client" multiline value={message} onChange={setMessage} hint="Use plain language. Request only necessary information. If declining, confirm non-engagement and deadline responsibility without disclosing confidential conflict details." />
          <p className="text-xs border-l-2 border-secondary pl-3 text-muted-foreground">“Ready” is not an accepted matter or activated membership. Confirm scope, exclusions, fees, instructions and acceptance in writing separately. Membership activation remains in the Memberships tab after approved payment arrangements.</p>
          <Button type="submit" disabled={busy || !!error}>{busy ? "Saving…" : "Save review & client update"}<ArrowRight className="h-4 w-4 ml-2" /></Button>
        </fieldset></form><details className="border-t border-border pt-4"><summary className="cursor-pointer text-sm">Status history</summary><ul className="mt-3 text-xs text-muted-foreground space-y-2">{events.map((e, i) => <li key={i}>{new Date(e.created_at).toLocaleString("en-CA")} · {e.action}</li>)}</ul></details><div className="flex flex-wrap gap-3 text-xs">{lsoSources.map(s => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline">{s.label}</a>)}</div>
      </div> : <div className="py-12 text-center text-muted-foreground"><ShieldCheck className="h-10 w-10 mx-auto mb-4 text-forest" /><p>Select a request to review its names and next steps.</p></div>}
    </div>
  </div>;
}