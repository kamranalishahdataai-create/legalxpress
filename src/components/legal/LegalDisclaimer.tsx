import { AlertTriangle } from "lucide-react";
import { MEMBERSHIP_NOTICE, REFERRAL_POLICY } from "@/data/practiceTerms";
interface LegalDisclaimerProps { context: "case-analysis" | "contracts" | "affiliates" | "membership"; variant?: "full" | "compact"; className?: string; }
const notices = {
  "case-analysis": { title: "Important: AI output is not legal advice", text: "Automated output may be incomplete, outdated or wrong. It is not legal advice and does not create a lawyer-client relationship. Have your matter reviewed by a licensed lawyer before acting. Deadlines remain your responsibility until a written engagement is confirmed." },
  contracts: { title: "Why templates are not legal advice", text: "The Contract Library is a self-serve template tool, not legal advice. Templates are general precedents, not tailored to your facts. Laws, mandatory clauses and formalities differ by province and situation, and templates may be out of date for your circumstances. Have any document reviewed by a lawyer before signing or relying on it. Using the library does not create a lawyer-client relationship. Use is governed by section 8 of our Terms of Service." },
  affiliates: { title: "Independent professionals and our referral-fee policy", text: "Referral partners are not employed, supervised or insured by LegalXpress. Your retainer, fees, advice and work are between you and the independent professional. You remain free to choose anyone. " + REFERRAL_POLICY },
  membership: { title: "What your membership fee is — and is not", text: MEMBERSHIP_NOTICE },
};
export function LegalDisclaimer({context, variant="full", className=""}: LegalDisclaimerProps) {
  const notice = notices[context];
  return <aside className={`rounded-lg border border-secondary/30 bg-secondary/5 ${variant === "compact" ? "p-3" : "p-5 md:p-6"} ${className}`}>
    <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 shrink-0 text-secondary mt-0.5" /><div className="space-y-3">
      <h2 className="font-display text-base font-semibold text-foreground">{notice.title}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{notice.text}</p>
      {context === "membership" && <p className="text-sm text-muted-foreground">Legal services provided by Shiv Kumar Passi, Lawyer (LSO No. 70089L), are our professional responsibility. The Contract Library and automated tools are not legal advice. Referral partners are independent and responsible for their own work.</p>}
      <p className="text-xs text-muted-foreground">For advice about your matter, <a href="/book" className="text-secondary underline underline-offset-2">book a consultation with a lawyer</a>.</p>
    </div></div>
  </aside>;
}
export default LegalDisclaimer;
