import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Lock, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

// Display metadata for the four subscription tiers. Prices/recurrence are the
// source of truth in Stripe; this is just what the summary card shows.
const plans = {
  essential: {
    name: "Essential",
    price: "$4.99",
    description: "Discounts on core legal services — perfect entry plan",
    features: [
      "50% off Notary Services",
      "50% off Simple Wills",
      "50% off Small Claims Litigation",
      "50% off Separation & Pre-Nup Agreements",
      "15% off all Affiliate Partner services",
      "Email support",
    ],
  },
  starter: {
    name: "Starter",
    price: "$6.99",
    description: "Essential legal tools to get you started",
    features: [
      "Everything in Essential, plus:",
      "1 AI Case Analysis per month",
      "1 contract download/month (PDF or Word)",
      "Free e-Notaries (in addition to 50% off in-person)",
    ],
  },
  professional: {
    name: "Professional",
    price: "$9.99",
    description: "Full-featured plan for complete legal coverage",
    features: [
      "Everything in Starter, plus:",
      "Up to 3 AI Case Analyses per month",
      "5 contract downloads/month (PDF or Word)",
      "Free in-person & e-Notaries",
      "Legal memos included",
      "Simple Wills included",
      "Priority processing",
    ],
  },
  executive: {
    name: "Executive",
    price: "$14.99",
    description: "Premium plan with unlimited access and maximum savings",
    features: [
      "Everything in Professional, plus:",
      "Unlimited AI Case Analyses",
      "Unlimited contract downloads (PDF or Word)",
      "50% off Complex Wills",
      "Free Demand Letters (up to 3 per year)",
      "Dedicated priority support",
    ],
  },
} as const;

type PlanKey = keyof typeof plans;

// Normalize legacy/aliased plan params to the four real tiers.
function normalizePlan(raw: string | null): PlanKey {
  const v = (raw || "").toLowerCase();
  if (v === "business") return "executive";
  if (v in plans) return v as PlanKey;
  return "essential";
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const planParam = searchParams.get("plan") || searchParams.get("bundle");
  const selectedKey = normalizePlan(planParam);
  const plan = plans[selectedKey];

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to start your subscription.",
      });
      navigate(`/login?redirect=/checkout?plan=${selectedKey}`);
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { plan: selectedKey, origin: window.location.origin },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url as string; // redirect to Stripe Checkout
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      console.error("checkout error:", err);
      toast({
        title: "Couldn't start checkout",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            to="/subscriptions"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-body text-sm">Back to plans</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  <CardTitle className="font-display">{plan.name} Plan</CardTitle>
                </div>
                <CardDescription className="font-body">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground font-body">/month</span>
                </div>

                <Separator />

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-sm font-body text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-body text-muted-foreground">Billed monthly</span>
                  <span className="font-display text-xl font-bold">{plan.price}/mo</span>
                </div>
              </CardContent>
            </Card>

            {/* Checkout action */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Secure Checkout
                </CardTitle>
                <CardDescription className="font-body">
                  You'll be redirected to Stripe to enter your payment details safely.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3 text-sm font-body text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-secondary shrink-0" />
                    Cancel anytime from your account
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-secondary shrink-0" />
                    Powered by Stripe — we never store your card
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-secondary shrink-0" />
                    Instant access after payment
                  </li>
                </ul>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Redirecting…"
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground font-body">
                  <Lock className="inline h-3 w-3 mr-1" />
                  Payments are processed securely by Stripe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
