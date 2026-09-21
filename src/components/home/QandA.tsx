import { HelpCircle } from "lucide-react";

const questions = [
  {
    q: "What does a LegalXpress membership include?",
    a: "Memberships start at $4.99 per month and cover discounted or included access to notary work, simple wills, demand letters, small claims litigation and separation or prenuptial agreements, plus AI case analysis and our Canadian contract template library. You can also book consultations and in-house legal work at member pricing.",
  },
  {
    q: "What legal services are provided in house?",
    a: "Incorporations and corporate governance, commercial contract drafting and review, corporate and procurement litigation support, wills and estate documents, notary and commissioning services, and independent legal advice certificates.",
  },
  {
    q: "How does the legal membership work?",
    a: "Memberships start at $4.99 per month and provide discounted or included access to core services such as notary work, simple wills, small claims litigation and separation or prenuptial agreements, along with AI case analysis and the contract library.",
  },
  {
    q: "Where does LegalXpress provide legal services?",
    a: "We serve clients across Canada, with legal advice provided under Ontario licensing and referrals to licensed partners in other provinces where required.",
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
              className="rounded-2xl border border-border bg-card p-7 shadow-sm"
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
