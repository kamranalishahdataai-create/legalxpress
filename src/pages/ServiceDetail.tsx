import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/servicesData";
import { ArrowRight, Check, ArrowLeft, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-body text-sm">All Services</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              {service.title}
            </h1>
          </div>
          <p className="text-xl text-primary-foreground/80 max-w-2xl font-body">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Description & Features */}
            <div>
              <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
                {service.description}
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                What's Included
              </h2>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                      <Check className="h-3.5 w-3.5 text-secondary" />
                    </div>
                    <span className="text-foreground font-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                asChild
              >
                <Link to={`/book?service=${service.slug}`}>
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            How We Help
          </h2>
          <div className="space-y-6">
            {service.details.map((detail, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 border border-border/50"
              >
                <p className="text-foreground font-body leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <MessageCircleQuestion className="h-6 w-6 text-secondary" />
            <h2 className="font-display text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {service.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="font-display text-foreground font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Book your free 30-minute consultation today and let us help you with{" "}
            {service.title.toLowerCase()}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              asChild
            >
              <Link to={`/book?service=${service.slug}`}>
                Book Free Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
