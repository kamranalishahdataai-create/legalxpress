import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
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
    review_text:
      "LegalXpress made our incorporation process seamless. Their attention to detail exceeded our expectations.",
  },
  {
    id: "2",
    client_name: "Michael Chen",
    client_company: "Chen Properties",
    rating: 5,
    review_text:
      "The real estate transaction was handled professionally from start to finish. Will definitely use again.",
  },
  {
    id: "3",
    client_name: "Jennifer Adams",
    client_company: "Adams Consulting",
    rating: 5,
    review_text:
      "Their shareholder agreement expertise saved us from potential future conflicts. Very thorough!",
  },
];

export function ReviewsTeaser() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (data && data.length > 0) {
        setReviews(data.slice(0, 3));
      }
    }
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-secondary font-body tracking-widest uppercase mb-3">
            Trusted by Clients
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Real Results. Real People.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 border border-border/50 flex flex-col"
            >
              <Quote className="h-6 w-6 text-secondary/30 mb-3" />
              <p className="text-foreground font-body text-sm leading-relaxed flex-1 mb-4">
                "{review.review_text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold text-xs">
                  {review.client_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium text-foreground font-body text-sm">
                    {review.client_name}
                  </div>
                  {review.client_company && (
                    <div className="text-xs text-muted-foreground font-body">
                      {review.client_company}
                    </div>
                  )}
                </div>
                <div className="flex gap-0.5 ml-auto">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
