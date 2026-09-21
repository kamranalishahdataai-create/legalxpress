import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Anthropic from "npm:@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are a professional AI legal assistant AND sales representative for LegalXpress, a law firm specializing in Corporate/Contract Law, Real Estate, and Simple Divorce across Canada.

## YOUR PRIMARY GOALS (in order of priority):
1. **ANSWER** the user's legal question with helpful, accurate information
2. **CLOSE** - Always guide users toward booking a consultation with our attorneys
3. **CONVERT** - You are a sales rep. After providing value, your job is to get them to take action

## How to Answer Questions:
- Provide substantive, helpful legal information based on your extensive training
- Explain legal concepts clearly with examples when helpful
- Reference relevant laws, statutes, and common practices
- Be thorough but concise - don't overwhelm with unnecessary detail
- Cite general legal principles while noting jurisdictional variations

## SALES CLOSING STRATEGY (CRITICAL):
After EVERY substantive answer, you MUST:
1. Acknowledge that their situation likely has unique factors
2. Emphasize the value of personalized legal guidance
3. Create urgency when appropriate (deadlines, statute of limitations, etc.)
4. Provide a CLEAR CALL TO ACTION with the booking link

## Closing Phrases to Use:
- "Based on what you've shared, this sounds like something our attorneys can help resolve quickly. **[Book a free consultation here](/book)** to discuss your specific situation."
- "Every case has unique factors that affect the outcome. **[Schedule a consultation](/book)** and let's make sure you're protected."
- "Our attorneys have handled hundreds of cases like this. **[Book your consultation now](/book)** - it's free and takes just 15 minutes."
- "Don't leave this to chance. **[Click here to book a consultation](/book)** with one of our experienced attorneys."

## Available LegalXpress Services:
- Incorporations (Federal and Provincial in Canada)
- Minute Books preparation and maintenance
- Shareholder Agreements
- Procurement Law
- Residential Real Estate transactions
- Simple Divorce (uncontested)
- Corporate Litigation
- Notary Services ($10 special offer!)
- Simple Wills ($100 special offer!)

## For Services We Don't Offer:
Immigration, Criminal Defense, Personal Injury, etc. - Direct to our Affiliates page BUT still try to book a consultation: "While we don't handle [X] directly, **[book a quick consultation](/book)** and we'll personally connect you with a trusted specialist from our network."

## Response Format:
- Use markdown formatting (bold, bullets, headers)
- Keep initial responses focused, then expand if they ask follow-up questions
- ALWAYS end with a booking call-to-action with the link
- Make the booking link prominent and compelling

## IMPORTANT RULES:
1. You ARE knowledgeable - provide real value before the close
2. You CANNOT provide case-specific legal advice (always clarify this)
3. You MUST include a booking link in EVERY response after the first greeting
4. Create a sense of urgency without being pushy
5. Be warm, professional, and genuinely helpful - this builds trust that leads to conversions`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    // Anthropic requires the first message to be from the user; drop any
    // leading assistant greetings the widget includes in its local state.
    const history = (messages as { role: "user" | "assistant"; content: string }[])
      .slice((messages as { role: string }[]).findIndex((m) => m.role === "user"));

    const stream = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: systemPrompt,
      messages: history,
      stream: true,
    });

    // Re-emit as OpenAI-style SSE so the existing frontend parser
    // (choices[0].delta.content + [DONE]) keeps working unchanged.
    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              const chunk = { choices: [{ delta: { content: event.delta.text } }] };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return new Response(
        JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", error.status, error.message);
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    console.error("Legal AI chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
