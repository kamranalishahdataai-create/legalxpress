import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Map plan slug -> Stripe Price ID (CAD, recurring monthly).
const PRICE_BY_PLAN: Record<string, string> = {
  essential: "price_1Tz06gBDS3YDfW9jEjOsw4he",
  starter: "price_1Tz06gBDS3YDfW9jM0JqMvL7",
  professional: "price_1Tz06hBDS3YDfW9jvP1vwKzq",
  executive: "price_1Tz06iBDS3YDfW9j8AsmXAEB",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan, origin } = await req.json();
    const priceId = PRICE_BY_PLAN[plan];
    if (!priceId) {
      return new Response(JSON.stringify({ error: "Unknown plan" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2024-06-20",
    });

    const siteUrl = origin || "https://legalxpress.ca";

    // Try to associate the checkout with the signed-in user (optional).
    let email: string | undefined;
    let userId: string | undefined;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );
        const { data } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
        email = data.user?.email ?? undefined;
        userId = data.user?.id ?? undefined;
      } catch (_) {
        // anonymous checkout is still allowed
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      client_reference_id: userId,
      metadata: { plan, user_id: userId ?? "" },
      subscription_data: { metadata: { plan, user_id: userId ?? "" } },
      allow_promotion_codes: true,
      // Managed Payments (on by default) requires a tax_code per product; disable
      // it here to use standard Checkout. Tax can be configured properly later.
      managed_payments: { enabled: false },
      success_url: `${siteUrl}/portal?checkout=success`,
      cancel_url: `${siteUrl}/subscriptions/${plan}?checkout=cancelled`,
    } as Stripe.Checkout.SessionCreateParams);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("create-checkout-session error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Checkout failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
