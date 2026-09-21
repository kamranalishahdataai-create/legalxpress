import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================================
// FREE CONTRACT TEMPLATE SOURCES — Canada only
// All sources are public-domain, government-issued, or openly licensed.
// No API key required.
//
// Canada sources used:
//  - Justice Laws (laws-lois.justice.gc.ca) — federal model agreements
//  - Innovation, Science and Economic Development Canada (ISED) — model IP / NDA
//  - Government of Canada PSPC — standard contract clauses (SACC Manual)
//  - Corporations Canada — shareholder / partnership guides
//  - Provincial ministries (Ontario, BC, Quebec) — leases, POA, family law
//  - Office of the Privacy Commissioner (OPC) — PIPEDA model clauses
//  - CLEO (Community Legal Education Ontario) — free legal forms
// ============================================================================

type ContractSource = { source: string; url: string; license: string; jurisdiction: "Canada" };

const FREE_CONTRACT_SOURCES: Record<string, ContractSource[]> = {
  "Non-Disclosure Agreement (NDA)": [
    { source: "Innovation Canada — Model NDA", url: "https://ised-isde.canada.ca/site/intellectual-property-strategy/en/model-non-disclosure-agreement", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
    { source: "CLEO Ontario — Confidentiality Forms", url: "https://www.cleo.on.ca/en", license: "CC BY-NC-SA", jurisdiction: "Canada" },
  ],
  "Independent Contractor Agreement": [
    { source: "Government of Canada — PSPC Standard Clauses (SACC)", url: "https://buyandsell.gc.ca/policy-and-guidelines/standard-acquisition-clauses-and-conditions-manual", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
  "Service Agreement": [
    { source: "PSPC Canada — Service Contract Clauses", url: "https://buyandsell.gc.ca/policy-and-guidelines/standard-acquisition-clauses-and-conditions-manual", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
  "Data Processing Agreement (DPA)": [
    { source: "OPC Canada — PIPEDA Model Clauses", url: "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda-compliance-help/", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
  "Employment Agreement": [
    { source: "Government of Canada — Employment Standards", url: "https://www.canada.ca/en/employment-social-development/services/labour-standards.html", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
    { source: "Ontario Ministry of Labour — ESA Guide", url: "https://www.ontario.ca/page/your-guide-employment-standards-act-0", license: "Open Government Licence — Ontario", jurisdiction: "Canada" },
  ],
  "Lease / Rental Agreement": [
    { source: "Ontario Standard Form Lease (Form 2229E)", url: "https://forms.mgcs.gov.on.ca/en/dataset/047-2229", license: "Open Government Licence — Ontario", jurisdiction: "Canada" },
    { source: "BC Residential Tenancy Agreement (RTB-1)", url: "https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/forms", license: "Open Government Licence — BC", jurisdiction: "Canada" },
    { source: "Quebec TAL Lease Form", url: "https://www.tal.gouv.qc.ca/en/useful-forms/the-mandatory-lease-form", license: "Open Government Licence — Quebec", jurisdiction: "Canada" },
  ],
  "Partnership Agreement": [
    { source: "Corporations Canada — Guides & Forms", url: "https://ised-isde.canada.ca/site/corporations-canada/en", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
  "Shareholders Agreement": [
    { source: "Corporations Canada Guides", url: "https://ised-isde.canada.ca/site/corporations-canada/en", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
  "Sales Agreement / Purchase Order": [
    { source: "PSPC Canada — Goods Purchase Clauses", url: "https://buyandsell.gc.ca/policy-and-guidelines/standard-acquisition-clauses-and-conditions-manual", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
  "Loan Agreement / Promissory Note": [
    { source: "Justice Laws — Interest Act", url: "https://laws-lois.justice.gc.ca/eng/acts/i-15/", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
  "Power of Attorney": [
    { source: "Ontario POA Forms (Office of the Public Guardian)", url: "https://www.ontario.ca/page/make-power-attorney", license: "Open Government Licence — Ontario", jurisdiction: "Canada" },
    { source: "BC Representation Agreement Forms", url: "https://www2.gov.bc.ca/gov/content/family-social-supports/seniors/financial-legal-matters/legal-planning-and-incapacity-planning", license: "Open Government Licence — BC", jurisdiction: "Canada" },
  ],
  "Last Will and Testament": [
    { source: "CLEO Ontario — Wills & Estates", url: "https://www.cleo.on.ca/en/publications/wills-estates", license: "CC BY-NC-SA", jurisdiction: "Canada" },
  ],
  "Prenuptial / Cohabitation Agreement": [
    { source: "Department of Justice Canada — Family Law", url: "https://www.justice.gc.ca/eng/fl-df/", license: "Open Government Licence — Canada", jurisdiction: "Canada" },
  ],
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { contractName } = await req.json();
    if (!contractName) {
      return new Response(JSON.stringify({ error: "contractName is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let curated = FREE_CONTRACT_SOURCES[contractName] || [];
    if (curated.length === 0) {
      const lower = contractName.toLowerCase();
      const match = Object.keys(FREE_CONTRACT_SOURCES).find((k) =>
        k.toLowerCase().includes(lower) || lower.includes(k.toLowerCase().split(" ")[0])
      );
      if (match) curated = FREE_CONTRACT_SOURCES[match];
    }

    return new Response(
      JSON.stringify({
        contractName,
        sources: curated,
        coverage: { canada: curated.length },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("fetch-free-contract error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
