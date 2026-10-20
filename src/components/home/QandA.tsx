import { JURISDICTION_NOTICE, CONFIDENTIALITY_NOTICE, MEMBERSHIP_NOTICE } from "@/data/practiceTerms";
import { HelpCircle } from "lucide-react";

const questions = [
  {q: "Is my information confidential?", a: CONFIDENTIALITY_NOTICE},
  {
    q: "What does a LegalXpress membership include?",
    a: "Memberships start at $4.99/month + HST, with a 12-month commitment billed monthly. They give member pricing on the defined scope of legal services, plus tools according to plan. HST, filing fees and disbursements are extra. Each legal service is confirmed in writing and billed when delivered.",
  },
  {
    q: "What legal services are provided in house?",
    a: "These services are provided by Shiv Kumar Passi, Lawyer (LSO No. 70089L): incorporations and corporate governance, commercial contracts, corporate and procurement litigation support, wills and estate documents, notary and commissioning, and independent legal advice.",
  },
  {
    q: "Is my membership a deposit toward legal work?",
    a: MEMBERSHIP_NOTICE,
  },
  {
    q: "Where does LegalXpress provide legal services?",
    a: JURISDICTION_NOTICE,
  },
];

export function QandA() {
  return (
    <section id="q-and-a" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
            <span className="inline-flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Common Questions
            </span>
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Q and A
          </h2>
        </div>

        <div className="space-y-6">
          {questions.map((item) => (
            <article
              key={item.q}
              className="border-t border-border py-6"
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {item.q}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
