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
    answer: "Your first consultation is completely free for 30 minutes. During this time, we'll discuss your legal matter, understand your needs, and provide initial guidance. You can book online, and we'll send you a Google Meet link. If you need more time after the free consultation, our rates are $375/hour or $200 for an additional 30 minutes.",
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
    answer: "We serve clients across Canada. Our legal team is qualified to handle matters in every Canadian province and territory, including federal matters.",
    category: "Services",
  },
  {
    id: "5",
    question: "How does the AI Case Analysis tool work?",
    answer: "Our AI-powered case analysis tool compares your case details against thousands of precedent cases from Canadian courts. It provides an estimated win rate and identifies similar cases. The free preview gives you a quick assessment, while the paid full report includes detailed strategy recommendations and case citations.",
    category: "Case Analysis",
  },
  {
    id: "6",
    question: "What's included in the $4.99/month contract subscription?",
    answer: "For $4.99 per month, you get unlimited access to our entire library of professionally drafted legal contracts. All templates are reviewed by licensed attorneys and are available for Canadian jurisdictions. You can download, customize, and use any contract as many times as you need.",
    category: "Contracts",
  },
  {
    id: "7",
    question: "Can I access my documents through the client portal?",
    answer: "Yes! Once you create an account, you'll have access to our full client portal. This includes viewing your consultations, downloading contracts (with subscription), tracking your case analysis results, and communicating with our team.",
    category: "Portal",
  },
  {
    id: "8",
    question: "What areas of law do you practice?",
    answer: "We specialize in corporate and contract law, including incorporations, minute books, shareholder agreements, procurement law, residential real estate, simple (non-litigated) divorce, and corporate litigation (non-trial). We focus on providing efficient, technology-driven legal services.",
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
    answer: "Absolutely. All client information is protected by solicitor-client privilege and our strict confidentiality policies. Our systems use enterprise-grade encryption, and we never share your information with third parties without your explicit consent.",
    category: "Privacy",
  },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFAQs);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchFAQs() {
      const { data } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (data && data.length > 0) {
        setFaqs(data);
      }
    }
    fetchFAQs();
  }, []);

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
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card rounded-xl border border-border/50 px-6"
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
          <div className="mt-12 p-8 glass rounded-2xl text-center">
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
