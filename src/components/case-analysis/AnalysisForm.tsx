import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ResearchFilters } from "@/hooks/useCaseAnalysis";
import { KEYWORD_NOTICE, PACK_TERMS_SHORT, RESEARCH_PACK } from "@/data/caseResearch";

const areas: Record<string, string[]> = {
  "Contract Dispute": ["Breach of contract", "Damages", "Exclusion / limitation clauses", "Duty of honest performance", "Contract interpretation"],
  "Shareholder Dispute": ["Oppression remedy", "Shareholder agreement", "Valuation", "Buy-sell provisions"],
  "Employment Dispute": ["Wrongful dismissal", "Reasonable notice", "Constructive dismissal", "Restrictive covenants"],
  "Procurement Challenge": ["Contract A / tendering", "Bid compliance", "Duty of fairness", "Privilege clauses"],
  "Real Estate Dispute": ["Failed closing", "Deposit forfeiture", "Misrepresentation", "Specific performance"],
  "Corporate Governance": ["Directors' duties", "Business judgment rule", "Meetings and resolutions"],
  "Breach of Fiduciary Duty": ["Conflict of interest", "Disgorgement", "Corporate opportunity"],
  "Commercial Litigation": ["Summary judgment", "Unjust enrichment", "Negligent misrepresentation"],
};

const jurisdictions = [
  { value: "ontario", label: "Ontario" },
  { value: "federal_ca", label: "Federal (Canada)" },
  { value: "scc", label: "Supreme Court of Canada" },
  { value: "alberta", label: "Alberta" },
  { value: "bc", label: "British Columbia" },
  { value: "manitoba", label: "Manitoba" },
  { value: "new_brunswick", label: "New Brunswick" },
  { value: "newfoundland", label: "Newfoundland and Labrador" },
  { value: "nova_scotia", label: "Nova Scotia" },
  { value: "pei", label: "Prince Edward Island" },
  { value: "quebec", label: "Quebec" },
  { value: "saskatchewan", label: "Saskatchewan" },
  { value: "northwest_territories", label: "Northwest Territories" },
  { value: "nunavut", label: "Nunavut" },
  { value: "yukon", label: "Yukon" },
];
const courtLevels = [["any", "Any court level"], ["trial", "Trial courts"], ["appeal", "Courts of appeal"], ["scc", "Supreme Court of Canada"], ["tribunal", "Tribunals"]];
const dateRanges = [["any", "Any date"], ["5", "Last 5 years"], ["10", "Last 10 years"], ["20", "Last 20 years"]];
const partyTypes = [["any", "Any party"], ["individual", "Individual"], ["small_business", "Small business"], ["corporation", "Corporation"], ["public_body", "Government / public body"]];

interface AnalysisFormProps {
  filters: ResearchFilters;
  setFilters: (f: ResearchFilters) => void;
  onAnalyze: () => void;
  analyzing: boolean;
}

function FilterSelect({ id, label, value, onChange, options, placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; options: string[][]; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>{options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}

export function AnalysisForm({ filters, setFilters }: AnalysisFormProps) {
  const navigate = useNavigate();
  const set = (patch: Partial<ResearchFilters>) => setFilters({ ...filters, ...patch });
  const issues = filters.areaOfLaw ? areas[filters.areaOfLaw] ?? [] : [];
  const toggleIssue = (i: string) => set({ issues: filters.issues.includes(i) ? filters.issues.filter((x) => x !== i) : [...filters.issues, i] });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="font-display">Search the case law</CardTitle>
            <CardDescription>Choose filters to find published Canadian decisions on the same issue.</CardDescription>
          </div>
          <span className="hidden sm:inline-flex shrink-0 items-center rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Query builder</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FilterSelect id="area" label="Area of law *" value={filters.areaOfLaw} onChange={(v) => set({ areaOfLaw: v, issues: [] })} options={Object.keys(areas).map((a) => [a, a])} placeholder="Select area of law" />

        {issues.length > 0 && (
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Issues</legend>
            <div className="flex flex-wrap gap-2">
              {issues.map((i) => (
                <button key={i} type="button" onClick={() => toggleIssue(i)} aria-pressed={filters.issues.includes(i)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${filters.issues.includes(i) ? "border-secondary bg-secondary/15 text-foreground" : "border-border text-muted-foreground hover:border-secondary/50"}`}>
                  {i}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <FilterSelect id="jurisdiction" label="Jurisdiction *" value={filters.jurisdiction} onChange={(v) => set({ jurisdiction: v })} options={jurisdictions.map((j) => [j.value, j.label])} placeholder="Select jurisdiction" />
        <div className="grid sm:grid-cols-3 gap-4">
          <FilterSelect id="court" label="Court level" value={filters.courtLevel} onChange={(v) => set({ courtLevel: v })} options={courtLevels} />
          <FilterSelect id="dates" label="Date range" value={filters.dateRange} onChange={(v) => set({ dateRange: v })} options={dateRanges} />
          <FilterSelect id="party" label="Party type" value={filters.partyType} onChange={(v) => set({ partyType: v })} options={partyTypes} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Search keywords (optional)</Label>
          <Input id="keywords" maxLength={120} placeholder="e.g. late delivery, lost profits" value={filters.keywords} onChange={(e) => set({ keywords: e.target.value })} />
          <p className="text-xs text-muted-foreground">{KEYWORD_NOTICE} Do not enter names or identifying details.</p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button variant="outline" onClick={() => navigate("/case-analysis/preview")}>
            <FileSearch className="h-4 w-4 mr-2" /> See a sample report
          </Button>
          <Button onClick={() => navigate("/checkout/case-analysis")}>
            <Search className="h-4 w-4 mr-2" /> Get a {RESEARCH_PACK.reports}-report pack
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          ${RESEARCH_PACK.standardPrice.toFixed(2)} + HST standard · ${RESEARCH_PACK.memberPrice.toFixed(2)} + HST members. {PACK_TERMS_SHORT}
        </p>
      </CardContent>
    </Card>
  );
}
