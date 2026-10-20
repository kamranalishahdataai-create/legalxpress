import { describe, it, expect } from "vitest";
import { priceMatchSchema } from "@/components/affiliates/PriceMatchForm";
const request = { full_name: "Test Request", email: "test@example.com", practice_area: "Corporate / Business Law", case_description: "Question about a quoted contract review", quoted_amount: "$300 + HST", scope_details: "Review a ten-page commercial contract", not_retained: true };
describe("Price quote eligibility", () => {
  it("accepts a written scope without identifying another lawyer", () => expect(priceMatchSchema.safeParse(request).success).toBe(true));
  it("rejects a request from someone who has retained a lawyer", () => expect(priceMatchSchema.safeParse({...request, not_retained: false}).success).toBe(false));
  it("requires the quoted work scope", () => expect(priceMatchSchema.safeParse({...request, scope_details: ""}).success).toBe(false));
});