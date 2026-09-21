import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Authenticate caller
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Verify admin role using service role to bypass RLS for the check
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: isAdmin, error: roleError } = await adminClient.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (roleError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: "Forbidden: admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { referral_id } = await req.json();

    if (!referral_id || typeof referral_id !== "string") {
      return new Response(
        JSON.stringify({ error: "referral_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = adminClient;

    // Get the referral details
    const { data: referral, error: fetchError } = await supabase
      .from("community_referrals")
      .select("*")
      .eq("id", referral_id)
      .single();

    if (fetchError || !referral) {
      return new Response(
        JSON.stringify({ error: "Referral not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update the referral status to active
    const { error: updateError } = await supabase
      .from("community_referrals")
      .update({ draw_status: "active", status: "active" })
      .eq("id", referral_id);

    if (updateError) {
      throw updateError;
    }

    // Send notification email via Lovable API
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    
    if (lovableApiKey) {
      const emailResponse = await fetch("https://api.lovable.dev/v1/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableApiKey}`,
        },
        body: JSON.stringify({
          to: referral.referrer_email,
          subject: "Your Referral Has Been Approved! Choose Your Draw Month 🎉",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1a1a2e;">Great News, ${referral.referrer_name}!</h1>
              <p style="color: #444; font-size: 16px;">
                Your referral of <strong>${referral.referred_name}</strong> has been approved! 
                They've successfully connected with one of our lawyers.
              </p>
              <p style="color: #444; font-size: 16px;">
                Your draw entry is now <strong style="color: #16a34a;">active</strong>. 
                You'll be contacted to choose which month you'd like to enter the $250 gift card draw.
              </p>
              <p style="color: #444; font-size: 16px;">
                <strong>Remember:</strong> You can use one referral per month. If you have multiple 
                approved referrals, you can spread them across different months for more chances to win!
              </p>
              <div style="margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  The draw takes place at the end of each month. Winners are notified by email.
                </p>
              </div>
            </div>
          `,
          purpose: "transactional",
        }),
      });

      if (!emailResponse.ok) {
        console.error("Email send failed:", await emailResponse.text());
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Referral activated and notification sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
