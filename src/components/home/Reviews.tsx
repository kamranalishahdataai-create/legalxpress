import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  client_name: string;
  client_company: string | null;
  rating: number;
  review_text: string;
}

const fallbackReviews: Review[] = [
  {
    id: "1",
    client_name: "Sarah Mitchell",
    client_company: "TechStart Inc.",
    rating: 5,
    review_text: "LegalXpress made our incorporation process seamless. Their attention to detail exceeded our expectations.",
  },
  {
    id: "2",
    client_name: "Michael Chen",
    client_company: "Chen Properties",
    rating: 5,
    review_text: "The real estate transaction was handled professionally from start to finish. Will definitely use again.",
  },
  {
    id: "3",
    client_name: "Jennifer Adams",
    client_company: "Adams Consulting",
    rating: 5,
    review_text: "Their shareholder agreement expertise saved us from potential future conflicts. Very thorough!",
  },
];

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (data && data.length > 0) {
        setReviews(data);
      }
    }
    fetchReviews();
  }, []);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-light mb-4">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium font-body">Client Testimonials</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What Our Clients Say
          </h2>
        </div>

        {/* Single Review Card */}
        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-xl p-6 border border-border/50 text-center">
            <Quote className="h-8 w-8 text-secondary/30 mx-auto mb-4" />
            <p className="text-foreground font-body mb-6 leading-relaxed">
              "{reviews[currentIndex]?.review_text}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm">
                {reviews[currentIndex]?.client_name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground font-body text-sm">
                  {reviews[currentIndex]?.client_name}
                </div>
                {reviews[currentIndex]?.client_company && (
                  <div className="text-xs text-muted-foreground font-body">
                    {reviews[currentIndex]?.client_company}
                  </div>
                )}
              </div>
              <div className="flex gap-0.5 ml-2">
                {Array.from({ length: reviews[currentIndex]?.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" size="icon" onClick={prevReview}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextReview}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="sm" asChild>
            <a href="/portal/reviews">Share Your Review</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
