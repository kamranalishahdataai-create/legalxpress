import { AlertTriangle } from "lucide-react";

interface LegalDisclaimerProps {
  /** "case-analysis" | "contracts" — tailors the wording to the service */
  context: "case-analysis" | "contracts" | "affiliates" | "membership";
  /** compact renders a single condensed paragraph */
  variant?: "full" | "compact";
  className?: string;
}

const HEADINGS: Record<LegalDisclaimerProps["context"], string> = {
  "case-analysis": "Important: This AI Case Analysis Is Not Legal Advice",
  contracts: "Important: These Templates Are Not Legal Advice",
  affiliates: "Important: Affiliate Partners Are Independent Third Parties",
  membership: "Important: What Your Membership Does and Does Not Cover",
};

const COMPACT: Record<LegalDisclaimerProps["context"], string> = {
  "case-analysis":
    "This AI-generated analysis is a value-added informational service only. It is not legal advice, does not create a lawyer-client relationship, and is not a substitute for advice from a licensed lawyer or paralegal. Please have your matter reviewed by a licensed professional before acting. LegalXpress accepts no liability for any use of or reliance on this analysis.",
  contracts:
    "These templates are a value-added informational service only. They are not legal advice, do not create a lawyer-client relationship, and are not a substitute for advice from a licensed lawyer or paralegal. Have any document reviewed and customized by a licensed professional before signing or relying on it. LegalXpress accepts no liability for any use of or reliance on these templates.",
  affiliates:
    "Affiliate partners are independent lawyers, paralegals and service providers who are not employed, supervised or insured by LegalXpress. Any retainer, fee, advice or work product is strictly between you and that partner. LegalXpress does not provide, review or guarantee their services and accepts no liability for them.",
  membership:
    "Your membership combines legal services provided in-house by our licensed Canadian legal team with value-added tools \u2014 the AI Case Analysis, the Contract Library and our affiliate partner network. Those value-added tools are informational or third-party services only: they are not legal advice, do not create a lawyer-client relationship, and LegalXpress accepts no responsibility or liability for them.",
};

export function LegalDisclaimer({
  context,
  variant = "full",
  className = "",
}: LegalDisclaimerProps) {
  if (variant === "compact") {
    return (
      <div
        className={`flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/5 p-3 ${className}`}
      >
        <AlertTriangle className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
        <p className="text-xs leading-relaxed text-muted-foreground font-body">
          <span className="font-semibold text-foreground">Legal disclaimer: </span>
          {COMPACT[context]}
        </p>
      </div>
    );
  }

  if (context === "affiliates" || context === "membership") {
    return (
      <div
        className={`rounded-xl border border-secondary/30 bg-secondary/5 p-5 md:p-6 ${className}`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-secondary mt-0.5" />
          <div className="space-y-3">
            <h2 className="font-display text-base md:text-lg font-semibold text-foreground">
              {HEADINGS[context]}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground font-body">
              {COMPACT[context]}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              Work provided in-house by our licensed Canadian legal team is fully our
              responsibility.{" "}
              <a href="/book" className="text-secondary underline underline-offset-2">
                Book a consultation with a licensed professional
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isCase = context === "case-analysis";

  return (
    <div
      className={`rounded-xl border border-secondary/30 bg-secondary/5 p-5 md:p-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-secondary mt-0.5" />
        <div className="space-y-3">
          <h2 className="font-display text-base md:text-lg font-semibold text-foreground">
            {HEADINGS[context]}
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground font-body list-disc pl-5">
            <li>
              {isCase
                ? "This tool provides AI-generated, general legal information for research and educational purposes. It is a value-added service, not legal advice."
                : "Our contract templates provide general legal information and starting-point drafting language. They are a value-added service, not legal advice."}
            </li>
            <li>
              Using this service does <strong>not</strong> create a lawyer-client
              relationship with LegalXpress or any of its lawyers, paralegals, or
              affiliate partners.
            </li>
            <li>
              {isCase
                ? "Outcomes, win-rate estimates and case-law references are predictions based on publicly available sources and may be incomplete, outdated or inaccurate."
                : "Laws, required clauses and formalities vary by province, territory and situation, and templates may be incomplete or outdated for your circumstances."}
            </li>
            <li>
              You should have {isCase ? "your matter" : "any document"} reviewed by a{" "}
              <strong>licensed lawyer or paralegal</strong> in your jurisdiction before{" "}
              {isCase ? "taking any action or relying on this analysis" : "signing, filing or relying on it"}.
            </li>
            <li>
              LegalXpress is not responsible or liable in any way for any loss, damage,
              or outcome arising from your use of, or reliance on,{" "}
              {isCase ? "this analysis" : "these templates"}. This service is not a
              substitute for legal advice.
            </li>
          </ul>
          <p className="text-xs text-muted-foreground font-body">
            Need advice on your specific situation?{" "}
            <a href="/book" className="text-secondary underline underline-offset-2">
              Book a consultation with a licensed professional
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default LegalDisclaimer;
