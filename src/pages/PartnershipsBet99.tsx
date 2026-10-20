import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Handshake, AlertTriangle, CheckCircle2 } from "lucide-react";

const options = [
  {
    label: "Option 1. New LegalXpress member — new Bet99 account",
    sub: "You just joined LegalXpress and are signing in to a new Bet99 account.",
    legal: ["20% off legal help for account, winnings or payout disputes", "Free review of one operator complaint letter", "Free Ontario iGaming “know your rights” guide"],
    gaming: "Opt in to receive Bet99's new-customer promotion discount, as legally allowed, privately by email — issued and set by Bet99.",
  },
  {
    label: "Option 2. New LegalXpress member — existing Bet99 account",
    sub: "You just joined LegalXpress and are signing in to your existing Bet99 account.",
    legal: ["20% off legal help for account, winnings or payout disputes", "Free review of one operator complaint letter", "Free one-on-one walkthrough of Bet99's deposit limits and self-exclusion tools"],
    gaming: "Opt in to receive a legally allowed discount on your current Bet99 account, privately by email — issued and set by Bet99.",
  },
  {
    label: "Option 3. Already a Bet99 member — get a discounted LegalXpress membership",
    sub: "You play on Bet99 and want to join LegalXpress at a discounted membership rate.",
    legal: ["Discounted LegalXpress personal membership rate (placeholder — figure pending agreement with Bet99)", "20% off legal help for account, winnings or payout disputes once joined", "Free review of one operator complaint letter"],
    gaming: "Opt in to receive Bet99 offers privately by email — issued and set by Bet99, whether your Bet99 account is new or existing.",
  },
];

export default function PartnershipsBet99Page() {
  const [selected, setSelected] = useState<number | null>(null);
  const [consented, setConsented] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="section-y pb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 mb-4">
              <Handshake className="h-7 w-7 text-forest dark:text-forest-light" />
            </div>
            <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">Partnerships</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              LegalXpress × Bet99
            </h1>
            <p className="text-muted-foreground font-body">
              A proposed consumer-level partnership built around legal support and responsible play —
              not betting bonuses. Ontario rules do not allow public advertising of sign-up bonuses
              or free bets, so this promotion offers value to players without encouraging wagering.
              It applies to personal memberships only — never to corporate packages.
            </p>
            <div className="mt-6 inline-flex items-start gap-2 rounded-2xl border border-secondary/40 bg-secondary/10 px-4 py-3 text-left text-sm font-body text-foreground">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
              <span>Sample draft — this partnership is proposed and not yet in effect. Offers and terms are placeholders pending agreement with Bet99.</span>
            </div>
          </div>
        </section>

        <section className="section-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">Promotions by member type</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Which promotion applies to you</h2>
            <p className="text-muted-foreground font-body mb-8 max-w-2xl">
              Choose the one option that describes you — that is the promotion you opt in to. Legal-service
              benefits can be shown publicly. Any Bet99 gaming offer is never shown here — it is sent
              privately by Bet99 by email, only to members 19+ in Ontario who have opted in.
            </p>
            <div className="grid gap-6 md:grid-cols-3" role="radiogroup" aria-label="Choose your promotion">
              {options.map((t, i) => (
                <Button
                  variant="outline"
                  key={t.label}
                  type="button"
                  role="radio"
                  aria-checked={selected === i}
                  onClick={() => {
                    setSelected(selected === i ? null : i);
                    setConsented(false);
                    setConfirmed(false);
                  }}
                  className={`h-auto items-stretch justify-start whitespace-normal text-left rounded-lg border p-6 shadow-sm flex flex-col transition-all ${
                    selected === i
                      ? "border-secondary ring-2 ring-secondary/40 bg-secondary/5"
                      : "border-border/50 bg-card hover:border-secondary/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">{t.label}</h3>
                    {selected === i && <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />}
                  </div>
                  <p className="text-sm text-muted-foreground font-body mb-4">{t.sub}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-secondary font-body mb-2">Legal benefits</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground font-body mb-4">
                    {t.legal.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                  <p className="mt-auto text-sm font-medium text-secondary font-body">
                    {selected === i ? "Selected — confirm your opt-in below" : "Click to opt in →"}
                  </p>
                </Button>
              ))}
            </div>

            {selected !== null && (
              <div className="mt-8 rounded-3xl border border-secondary/40 bg-secondary/5 p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Opt in to your Bet99 offer — {options[selected].label}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-5">
                  {options[selected].gaming} Before anything is sent, we verify you are 19+ and in Ontario;
                  self-excluded players are never contacted.
                </p>
                <label className="flex items-start gap-3 text-sm text-foreground font-body cursor-pointer max-w-2xl">
                  <input
                    type="checkbox"
                    checked={consented}
                    onChange={(e) => {
                      setConsented(e.target.checked);
                      if (!e.target.checked) setConfirmed(false);
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-secondary"
                  />
                  <span>
                    I am 19 or older, live in Ontario, and want to receive gaming partner offers by email.
                    I understand offers are issued by Bet99 and I can withdraw my consent at any time.
                  </span>
                </label>
                <Button
                  className="mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  disabled={!consented}
                  onClick={() => setConfirmed(true)}
                >
                  Confirm opt-in
                </Button>
                {confirmed && (
                  <p className="mt-4 text-sm font-medium text-forest dark:text-forest-light font-body">
                    Opt-in recorded (sample). In the live program, Bet99 would send your private offer code
                    to your verified email — the value is never shown on this website.
                  </p>
                )}
              </div>
            )}

            <div className="mt-8">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <a href="/subscriptions/personal">View personal memberships</a>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl"><div className="border-t border-border/50" /></div>

        <section className="section-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">The fine print</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">How your offer reaches you</h2>
            <p className="text-muted-foreground font-body mb-8 max-w-2xl">
              Ontario gaming rules do not allow betting bonuses or credits to be advertised publicly.
              Instead, members who choose to hear from our gaming partners receive their Bet99 offer
              privately, by email:
            </p>
            <ol className="space-y-4 max-w-2xl mb-8">
              {[
                { step: "Opt in separately", text: "Tick the consent box above: \"I am 19 or older, live in Ontario, and want to receive gaming partner offers by email.\" No consent, no offer — and you can withdraw consent at any time." },
                { step: "Age and location check", text: "Before anything is sent, we confirm you are 19+ and in Ontario. Self-excluded players are never contacted." },
                { step: "Offer delivered privately", text: "Bet99 issues the offer code directly to your inbox. The code, its value and its terms come from Bet99 and are never displayed on this website or any public page." },
                { step: "Responsible play built in", text: "Every offer email includes deposit-limit and self-exclusion information and the ConnexOntario helpline (1-866-531-2600)." },
              ].map((s, i) => (
                <li key={s.step} className="flex gap-4 rounded-2xl border border-border/50 bg-card p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/15 font-display text-sm font-bold text-secondary">{i + 1}</span>
                  <div>
                    <p className="font-display font-semibold text-foreground">{s.step}</p>
                    <p className="text-sm text-muted-foreground font-body mt-1">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-2xl">
              This structure follows Ontario's Registrar's Standards for Internet Gaming: inducements,
              bonuses and credits may only be communicated through direct marketing to individuals who
              have actively consented, and may never be publicly advertised or sent to minors,
              self-excluded or high-risk players. Bet99, as the registered operator, issues and fulfils
              all gaming offers; LegalXpress acts only as a consented direct-marketing channel and
              accepts no responsibility for Bet99's products, services or offers. Proposed only; all
              figures are placeholders. If gambling stops being fun, contact ConnexOntario at
              1-866-531-2600.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
