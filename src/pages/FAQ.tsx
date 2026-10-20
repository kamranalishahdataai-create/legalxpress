import { JURISDICTION_NOTICE, CONFIDENTIALITY_NOTICE, MEMBERSHIP_NOTICE } from "@/data/practiceTerms";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
}

const fallbackFAQs: FAQ[] = [
  {
    id: "1",
    question: "How does the free 30-minute consultation work?",
    answer: "Your first consultation is completely free for 30 minutes. During this time, we'll discuss your legal matter, understand your needs, and provide initial guidance. You can book online, and we'll send you a Google Meet link. If you need more time after the free consultation, our rates are $375/hour + HST or $200 + HST for an additional 30 minutes. The initial consultation is general guidance; a lawyer-client relationship begins after a conflicts check and written engagement.",
    category: "Consultations",
  },
  {
    id: "2",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers through our secure Stripe payment gateway. For larger matters, we can also arrange payment plans.",
    category: "Payments",
  },
  {
    id: "3",
    question: "How long does incorporation take?",
    answer: "Federal incorporation in Canada typically takes 1-2 business days once all documents are submitted. Provincial incorporation times vary by province. We'll provide a detailed timeline during your consultation based on your specific situation.",
    category: "Services",
  },
  {
    id: "4",
    question: "Which jurisdictions do you serve?",
    answer: JURISDICTION_NOTICE,
    category: "Services",
  },
  {
    id: "5",
    question: "How does the Case Law Research Tool work?",
    answer: "You choose search filters (area of law, issues, jurisdiction, court level, dates, party type). The tool finds published Canadian decisions on the same issue, links each to the public judgment, and shows how often claimants succeeded in those decisions, with the sample size. It does not assess your case or predict your chances, and reports are generated automatically without lawyer review. A 5-report pack is $9.99 + HST, or $4.99 + HST for members; packs are non-refundable and unused reports expire 30 days after purchase.",
    category: "Case Law Research",
  },
  {
    id: "6",
    question: "What is the difference between the Contract Library subscription and a membership?",
    answer: "The Contract Library is a template subscription only: $4.99/month + HST for English or $5.99/month + HST for French, with unlimited downloads subject to fair use. It does not include legal-service member pricing or other membership benefits. Starter includes 1 download/month, Professional 5/month and Executive unlimited downloads subject to fair use. Templates are not legal advice; have a lawyer review them before use.",
    category: "Contracts",
  },
  {
    id: "7",
    question: "Can I access my documents through the client portal?",
    answer: "Yes! Once you create an account, you'll have access to our full client portal. This includes viewing your consultations, downloading contracts (with subscription), your research reports, and communicating with our team.",
    category: "Portal",
  },
  {
    id: "8",
    question: "What areas of law do you practice?",
    answer: "Corporate governance, commercial contracts, corporate and procurement litigation support, wills and estate documents, notary and commissioning, and independent legal advice are provided by Shiv Kumar Passi, Lawyer (LSO No. 70089L). Out-of-scope matters, including real estate, are independent referrals.",
    category: "Services",
  },
  {
    id: "9",
    question: "How do video consultations work?",
    answer: "All our consultations are conducted via Google Meet for convenience and flexibility. After booking, you'll receive a confirmation email with the meeting link. Simply click the link at your scheduled time, and you'll be connected with our lawyer.",
    category: "Consultations",
  },
  {
    id: "10",
    question: "Is my information confidential?",
    answer: CONFIDENTIALITY_NOTICE,
    category: "Privacy",
  },
];

export default function FAQPage() {
  const faqs = [...fallbackFAQs, {id:"membership-fee", question:"Is my membership fee a deposit toward legal work?", answer: MEMBERSHIP_NOTICE, category:"Memberships"}];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map((faq) => faq.category).filter(Boolean))];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Help Center</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Find answers to common questions about our services, pricing, 
            and how we can help you.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* FAQs */}
          <Accordion type="single" collapsible className="editorial-list border-t border-border">
            {filteredFAQs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-border py-2"
              >
                <AccordionTrigger className="py-4 hover:no-underline">
                  <span className="font-display font-medium text-left text-foreground">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.category && (
                    <span className="inline-block mt-3 px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                      {faq.category}
                    </span>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-16 md:py-16 md:py-20 lg:py-24">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No questions found
              </h3>
              <p className="text-muted-foreground font-body">
                Try adjusting your search or contact us directly.
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="editorial-followup mt-12 pt-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground font-body mb-4">
              Can't find what you're looking for? We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-secondary hover:underline font-medium"
            >
              Contact us <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
