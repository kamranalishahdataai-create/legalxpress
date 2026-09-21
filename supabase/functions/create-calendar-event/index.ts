import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Google Calendar API helpers
async function getAccessToken(serviceAccountKey: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    iss: serviceAccountKey.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    sub: serviceAccountKey.client_email,
  }));

  const encoder = new TextEncoder();
  const signingInput = `${header}.${payload}`;

  // Import the private key
  const pemContents = serviceAccountKey.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\n/g, "");
  
  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(signingInput)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const jwt = `${header}.${payload}.${signatureB64}`;

  // Exchange JWT for access token
  const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResp.json();
  if (!tokenData.access_token) {
    throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const serviceAccountKeyRaw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    if (!serviceAccountKeyRaw) {
      throw new Error("Google Service Account Key not configured");
    }
    const serviceAccountKey = JSON.parse(serviceAccountKeyRaw);

    const { consultationId } = await req.json();
    if (!consultationId) {
      throw new Error("consultationId is required");
    }

    // Fetch consultation with user profile
    const { data: consultation, error: consultError } = await supabase
      .from("consultations")
      .select("*")
      .eq("id", consultationId)
      .single();

    if (consultError || !consultation) {
      throw new Error("Consultation not found");
    }

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("user_id", consultation.user_id)
      .single();

    // Find an available lawyer (first active lawyer)
    const { data: lawyers } = await supabase
      .from("lawyers")
      .select("*")
      .eq("is_active", true)
      .limit(1);

    const lawyer = lawyers?.[0];
    const calendarId = lawyer?.google_calendar_id || "primary";

    // Get access token
    const accessToken = await getAccessToken(serviceAccountKey);

    // Create Google Calendar event with Meet
    const startTime = new Date(consultation.scheduled_at);
    const endTime = new Date(startTime.getTime() + (consultation.duration_minutes || 30) * 60 * 1000);

    const event = {
      summary: `LegalXpress Consultation - ${consultation.service_type}`,
      description: `Free ${consultation.duration_minutes || 30}-minute consultation with ${profile?.full_name || "Client"}\n\nService: ${consultation.service_type}\n${consultation.case_details ? `\nCase Details: ${consultation.case_details}` : ""}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "America/Toronto",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "America/Toronto",
      },
      attendees: [
        ...(profile?.email ? [{ email: profile.email }] : []),
        ...(lawyer?.email ? [{ email: lawyer.email }] : []),
      ],
      conferenceData: {
        createRequest: {
          requestId: consultationId,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    };

    const calendarResp = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    const calendarData = await calendarResp.json();

    if (!calendarResp.ok) {
      console.error("Calendar API error:", calendarData);
      throw new Error(`Calendar API error: ${calendarData.error?.message || "Unknown error"}`);
    }

    const meetLink = calendarData.conferenceData?.entryPoints?.find(
      (ep: any) => ep.entryPointType === "video"
    )?.uri;

    // Update consultation with calendar event ID and Meet link
    const updateData: Record<string, any> = {
      google_calendar_event_id: calendarData.id,
      status: "confirmed",
    };
    if (meetLink) {
      updateData.google_meet_link = meetLink;
    }
    if (lawyer) {
      updateData.lawyer_id = lawyer.id;
    }

    await supabase
      .from("consultations")
      .update(updateData)
      .eq("id", consultationId);

    return new Response(
      JSON.stringify({
        success: true,
        meetLink: meetLink || null,
        eventId: calendarData.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("create-calendar-event error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to create calendar event",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
