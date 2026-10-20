import { PRICE_NOTICE, LAWYER_NOTICE, JURISDICTION_NOTICE } from "@/data/practiceTerms";

export function PriceNotice({ className = "" }: { className?: string }) {
  return <p className={`text-xs leading-relaxed text-muted-foreground ${className}`}>{PRICE_NOTICE}</p>;
}

export function ProviderNotice({ kind = "lawyer" }: { kind?: "lawyer" | "tool" | "referral" }) {
  const text = kind === "lawyer" ? LAWYER_NOTICE : kind === "tool" ? "Non-legal tool. Not legal advice. Have any document reviewed by a lawyer before relying on it." : "Referral to an independent licensed professional who is not part of LegalXpress.";
  return <p className="text-xs leading-relaxed text-muted-foreground mt-3">{text}</p>;
}

export function PracticeNotice() {
  return <div className="space-y-2 text-xs leading-relaxed"><p>LegalXpress is a law practice regulated by the Law Society of Ontario. Legal services are provided by Shiv Kumar Passi, Lawyer, LSO licence No. 70089L. Non-legal tools and referrals to independent professionals are identified separately; legal services remain our professional responsibility.</p><p>{JURISDICTION_NOTICE}</p><p>{PRICE_NOTICE}</p></div>;
}