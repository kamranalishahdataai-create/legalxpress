import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotifyLawyerRequest {
  lawyerId: string;
  notificationType: "new_consultation" | "case_assignment" | "reminder";
  consultationId?: string;
  assignmentId?: string;
  caseDetails?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { lawyerId, notificationType, consultationId, assignmentId, caseDetails }: NotifyLawyerRequest = await req.json();

    // Get lawyer details
    const { data: lawyer, error: lawyerError } = await supabase
      .from("lawyers")
      .select("*")
      .eq("id", lawyerId)
      .single();

    if (lawyerError || !lawyer) {
      throw new Error("Lawyer not found");
    }

    // Get consultation details if provided
    let consultation = null;
    if (consultationId) {
      const { data } = await supabase
        .from("consultations")
        .select(`
          *,
          profiles:user_id (full_name, email, phone)
        `)
        .eq("id", consultationId)
        .single();
      consultation = data;
    }

    // Build email content based on notification type
    let subject = "";
    let htmlContent = "";

    switch (notificationType) {
      case "new_consultation":
        subject = "New Consultation Scheduled - LegalXpress";
        htmlContent = `
          <h2>New Consultation Scheduled</h2>
          <p>Hello ${lawyer.full_name},</p>
          <p>A new consultation has been scheduled with you:</p>
          <ul>
            <li><strong>Client:</strong> ${(consultation?.profiles as { full_name?: string })?.full_name || "Unknown"}</li>
            <li><strong>Service:</strong> ${consultation?.service_type}</li>
            <li><strong>Date:</strong> ${consultation?.scheduled_at ? new Date(consultation.scheduled_at).toLocaleString() : "TBD"}</li>
            ${consultation?.google_meet_link ? `<li><strong>Meeting Link:</strong> <a href="${consultation.google_meet_link}">${consultation.google_meet_link}</a></li>` : ""}
          </ul>
          ${consultation?.case_details ? `<p><strong>Case Details:</strong></p><p>${consultation.case_details}</p>` : ""}
          <p>Please log in to your <a href="${Deno.env.get("SITE_URL") || "https://legaledge.com"}/lawyer-portal">Lawyer Portal</a> for more details.</p>
        `;
        break;

      case "case_assignment":
        subject = "New Case Assignment - LegalXpress";
        htmlContent = `
          <h2>New Case Assigned</h2>
          <p>Hello ${lawyer.full_name},</p>
          <p>A new case has been assigned to you.</p>
          ${caseDetails ? `<p><strong>Case Details:</strong></p><p>${caseDetails}</p>` : ""}
          <p>Please log in to your <a href="${Deno.env.get("SITE_URL") || "https://legaledge.com"}/lawyer-portal">Lawyer Portal</a> to review and take action.</p>
        `;
        break;

      case "reminder":
        subject = "Upcoming Consultation Reminder - LegalXpress";
        htmlContent = `
          <h2>Consultation Reminder</h2>
          <p>Hello ${lawyer.full_name},</p>
          <p>This is a reminder about your upcoming consultation:</p>
          <ul>
            <li><strong>Client:</strong> ${(consultation?.profiles as { full_name?: string })?.full_name || "Unknown"}</li>
            <li><strong>Service:</strong> ${consultation?.service_type}</li>
            <li><strong>Date:</strong> ${consultation?.scheduled_at ? new Date(consultation.scheduled_at).toLocaleString() : "TBD"}</li>
            ${consultation?.google_meet_link ? `<li><strong>Meeting Link:</strong> <a href="${consultation.google_meet_link}">${consultation.google_meet_link}</a></li>` : ""}
          </ul>
        `;
        break;
    }

    // For now, log the email content (in production, integrate with email service)
    console.log("Email notification to send:", {
      to: lawyer.email,
      subject,
      html: htmlContent,
    });

    // Update assignment to mark email as sent
    if (assignmentId) {
      await supabase
        .from("lawyer_case_assignments")
        .update({ email_sent_at: new Date().toISOString() })
        .eq("id", assignmentId);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification prepared" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("notify-lawyer error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Notification failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
