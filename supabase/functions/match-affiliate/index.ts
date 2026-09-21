import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Anthropic from "npm:@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { practiceArea, location, caseDescription, urgency } = await req.json();

    if (!practiceArea || !location || !caseDescription) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const systemPrompt = `You are a legal referral specialist for LegalXpress. Based on a client's legal needs, location, and case description, provide AI-powered recommendations for finding the right attorney.

You must respond using the provide_recommendations function with structured data.

Provide:
1. A match score (1-100) indicating how well our network can serve this need
2. 3 specific recommendations tailored to their situation
3. Key considerations for their case type and jurisdiction
4. Estimated timeline for their type of matter
5. A brief assessment of case complexity (simple, moderate, complex)`;

    const userPrompt = `Client needs help with:
Practice Area: ${practiceArea}
Location: ${location}
Urgency: ${urgency || "normal"}

Case Description:
${caseDescription}

Provide tailored recommendations for finding the right legal professional.`;

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    let response;
    try {
      response = await client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 16000,
        thinking: { type: "adaptive" },
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
        output_config: {
          format: {
            type: "json_schema",
            schema: {
              type: "object",
              properties: {
                matchScore: {
                  type: "number",
                  description: "Match confidence score 1-100",
                },
                complexity: {
                  type: "string",
                  enum: ["simple", "moderate", "complex"],
                  description: "Case complexity assessment",
                },
                estimatedTimeline: {
                  type: "string",
                  description: "Estimated timeline for this type of matter (e.g., '2-4 weeks', '3-6 months')",
                },
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string", description: "Short recommendation title" },
                      description: { type: "string", description: "Detailed recommendation" },
                      priority: { type: "string", enum: ["high", "medium", "low"] },
                    },
                    required: ["title", "description", "priority"],
                    additionalProperties: false,
                  },
                },
                considerations: {
                  type: "array",
                  items: { type: "string" },
                  description: "Key considerations for their case",
                },
                suggestedSpecializations: {
                  type: "array",
                  items: { type: "string" },
                  description: "Specific lawyer specializations to look for",
                },
              },
              required: ["matchScore", "complexity", "estimatedTimeline", "recommendations", "considerations", "suggestedSpecializations"],
              additionalProperties: false,
            },
          },
        },
      });
    } catch (aiError) {
      if (aiError instanceof Anthropic.RateLimitError) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiError instanceof Anthropic.APIError) {
        console.error("Anthropic API error:", aiError.status, aiError.message);
      }
      throw new Error("AI matching failed");
    }

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("Invalid AI response format");
    }

    const recommendations = JSON.parse(textBlock.text);

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("match-affiliate error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Matching failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
