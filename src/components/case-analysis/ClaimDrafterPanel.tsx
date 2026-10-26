import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, Lock, Scale, AlertTriangle } from "lucide-react";
import { useMembership } from "@/hooks/useMembership";
import {
  buildClaimDocument,
  validateClaim,
  CLAIM_DISCLAIMERS,
  SMALL_CLAIMS_LIMIT,
  TRACK_LABEL,
  TRACK_RULES,
  type ClaimInfo,
  type ClaimTrack,
} from "@/lib/claimFormatter";
import { claimDocumentToDocx } from "@/lib/claimDocx";
import { downloadBlob } from "@/lib/download";
import { useToast } from "@/hooks/use-toast";

const emptyInfo: ClaimInfo = {
  track: "small-claims",
  plaintiffName: "",
  plaintiffAddress: "",
  plaintiffPhone: "",
  plaintiffEmail: "",
  defendantName: "",
  defendantAddress: "",
  courtLocation: "",
  amountClaimed: null,
  facts: "",
  relief: "",
};

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

/**
 * Inline Claim Drafter form. Used directly on the Case Law Research Tool page
 * (inside the research results column) so members never leave the page.
 */
export function ClaimDrafterPanel() {
  const { membership, isMember, loading, user } = useMembership();
  const { toast } = useToast();
  const [info, setInfo] = useState<ClaimInfo>(emptyInfo);
  const [errors, setErrors] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const set = (patch: Partial<ClaimInfo>) => setInfo((prev) => ({ ...prev, ...patch }));

  const handleGenerate = async () => {
    const result = validateClaim(info);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    setGenerating(true);
    try {
      const doc = buildClaimDocument(info);
      const blob = await claimDocumentToDocx(doc);
      const track = info.track === "small-claims" ? "plaintiffs-claim-form-7a" : "statement-of-claim-form-14a";
      downloadBlob(blob, `legalxpress-${track}-draft.docx`);
      toast({ title: "Document downloaded", description: "Review it with a lawyer before using it. It has not been filed with any court." });
    } catch (e) {
      console.error("Claim document error:", e);
      toast({ title: "Couldn't create the document", description: "Please try again.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-secondary/30 bg-secondary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CLAIM_DISCLAIMERS.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">1. Choose the court format</CardTitle>
          <CardDescription>{TRACK_RULES[info.track]}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={info.track}
            onValueChange={(v) => set({ track: v as ClaimTrack })}
            className="grid sm:grid-cols-2 gap-4"
          >
            {(Object.keys(TRACK_LABEL) as ClaimTrack[]).map((track) => (
              <label
                key={track}
                htmlFor={`track-${track}`}
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${info.track === track ? "border-secondary bg-secondary/5" : "border-border"}`}
              >
                <RadioGroupItem value={track} id={`track-${track}`} className="mt-1" />
                <span>
                  <span className="block font-medium text-foreground">{TRACK_LABEL[track]}</span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {track === "small-claims"
                      ? `Claims up to $${SMALL_CLAIMS_LIMIT.toLocaleString("en-CA")}.`
                      : "Claims of any amount, or matters the Small Claims Court cannot hear."}
                  </span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">2. The parties</CardTitle>
          <CardDescription>Exactly as they should appear on the claim. Use full legal names.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">You (plaintiff)</p>
            <Field id="plaintiffName" label="Full legal name">
              <Input id="plaintiffName" value={info.plaintiffName} onChange={(e) => set({ plaintiffName: e.target.value })} maxLength={200} />
            </Field>
            <Field id="plaintiffAddress" label="Address for service">
              <Textarea id="plaintiffAddress" value={info.plaintiffAddress} onChange={(e) => set({ plaintiffAddress: e.target.value })} maxLength={500} rows={2} />
            </Field>
            <Field id="plaintiffPhone" label="Telephone (optional)">
              <Input id="plaintiffPhone" value={info.plaintiffPhone} onChange={(e) => set({ plaintiffPhone: e.target.value })} maxLength={40} />
            </Field>
            <Field id="plaintiffEmail" label="Email (optional)">
              <Input id="plaintiffEmail" type="email" value={info.plaintiffEmail} onChange={(e) => set({ plaintiffEmail: e.target.value })} maxLength={255} />
            </Field>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">The other side (defendant)</p>
            <Field id="defendantName" label="Full legal name">
              <Input id="defendantName" value={info.defendantName} onChange={(e) => set({ defendantName: e.target.value })} maxLength={200} />
            </Field>
            <Field id="defendantAddress" label="Address">
              <Textarea id="defendantAddress" value={info.defendantAddress} onChange={(e) => set({ defendantAddress: e.target.value })} maxLength={500} rows={2} />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">3. The claim</CardTitle>
          <CardDescription>Write in plain language. Each line becomes a numbered paragraph in the document.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field id="courtLocation" label="Court location (city where you propose the trial)">
            <Input id="courtLocation" value={info.courtLocation} onChange={(e) => set({ courtLocation: e.target.value })} maxLength={200} placeholder="e.g. Toronto" />
          </Field>
          <Field id="amountClaimed" label="Amount claimed (CAD)">
            <Input
              id="amountClaimed"
              type="number"
              min={0}
              step="0.01"
              value={info.amountClaimed ?? ""}
              onChange={(e) => set({ amountClaimed: e.target.value === "" ? null : Number(e.target.value) })}
              placeholder={info.track === "small-claims" ? `Up to ${SMALL_CLAIMS_LIMIT.toLocaleString("en-CA")}` : "Amount in dollars"}
            />
          </Field>
          <Field id="facts" label="What happened (one point per line, in date order)">
            <Textarea id="facts" value={info.facts} onChange={(e) => set({ facts: e.target.value })} rows={6} maxLength={5000} placeholder={"On March 3, 2026, the defendant agreed to renovate my kitchen for $12,000.\nI paid a deposit of $6,000.\nThe defendant abandoned the work on April 10, 2026."} />
          </Field>
          <Field id="relief" label="What you are asking the court to order (one item per line)">
            <Textarea id="relief" value={info.relief} onChange={(e) => set({ relief: e.target.value })} rows={3} maxLength={2000} placeholder={"Payment of $6,000.\nInterest and costs."} />
          </Field>
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <ul className="space-y-1 text-sm text-destructive">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <p className="text-muted-foreground text-center py-4">Checking your membership…</p>
          ) : isMember ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Signed in as a member{membership ? ` (${membership.plan})` : ""}. Your document is formatted in your browser and downloaded to your device; the details you enter are not sent to our servers.
              </p>
              <Button className="w-full gap-2" onClick={handleGenerate} disabled={generating}>
                <Download className="h-4 w-4" />
                {generating ? "Preparing your document…" : "Download my claim document (.docx)"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10">
                <Lock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">The Claim Drafter is included with membership</h3>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                {user
                  ? "An active membership is required to generate a claim document. You can fill in the form above now — it stays on this page while you arrange your membership."
                  : "Sign in with an active membership to generate your claim document. You can fill in the form above first — it stays on this page."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {!user && <Button asChild><Link to="/login">Sign in</Link></Button>}
                <Button variant={user ? "default" : "outline"} asChild><Link to="/subscriptions">See membership plans</Link></Button>
                <Button variant="outline" asChild><Link to="/book">Book a free consultation</Link></Button>
              </div>
            </div>
          )}
          <div className="mt-6 p-4 rounded-lg bg-foreground text-background text-center">
            <h4 className="font-display font-semibold mb-2">Have a lawyer review it before you file</h4>
            <p className="text-sm text-background/75 mb-4">Court rules and deadlines are strict. Book a consultation and we will review your draft as a separate legal service.</p>
            <Button variant="outline" className="border-gold/40 bg-transparent text-gold-light hover:bg-gold/10" asChild><Link to="/book">Book a consultation</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
