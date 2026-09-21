import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, AlertCircle, Sparkles, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
const caseTypes = [
  "Contract Dispute",
  "Shareholder Dispute",
  "Employment Dispute",
  "Procurement Challenge",
  "Real Estate Dispute",
  "Corporate Governance",
  "Breach of Fiduciary Duty",
  "Commercial Litigation",
  "Other",
];

const jurisdictions = [
  // Canada - Provinces
  { value: "alberta", label: "Alberta, Canada" },
  { value: "bc", label: "British Columbia, Canada" },
  { value: "manitoba", label: "Manitoba, Canada" },
  { value: "new_brunswick", label: "New Brunswick, Canada" },
  { value: "newfoundland", label: "Newfoundland and Labrador, Canada" },
  { value: "nova_scotia", label: "Nova Scotia, Canada" },
  { value: "ontario", label: "Ontario, Canada" },
  { value: "pei", label: "Prince Edward Island, Canada" },
  { value: "quebec", label: "Quebec, Canada" },
  { value: "saskatchewan", label: "Saskatchewan, Canada" },
  // Canada - Territories
  { value: "northwest_territories", label: "Northwest Territories, Canada" },
  { value: "nunavut", label: "Nunavut, Canada" },
  { value: "yukon", label: "Yukon, Canada" },
  { value: "federal_ca", label: "Federal (Canada)" },
];

interface AnalysisFormProps {
  caseType: string;
  setCaseType: (value: string) => void;
  jurisdiction: string;
  setJurisdiction: (value: string) => void;
  caseDescription: string;
  setCaseDescription: (value: string) => void;
  onAnalyze: () => void;
  analyzing: boolean;
}

export function AnalysisForm({
  caseType,
  setCaseType,
  jurisdiction,
  setJurisdiction,
  caseDescription,
  setCaseDescription,
  onAnalyze,
  analyzing,
}: AnalysisFormProps) {
  const navigate = useNavigate();

  const handlePaidAnalysis = () => {
    navigate("/checkout/case-analysis");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display">Describe Your Case</CardTitle>
        <CardDescription className="font-body">
          Provide details about your legal matter for AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="caseType" className="font-body">Case Type *</Label>
          <Select value={caseType} onValueChange={setCaseType}>
            <SelectTrigger>
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              {caseTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jurisdiction" className="font-body">Jurisdiction *</Label>
          <Select value={jurisdiction} onValueChange={setJurisdiction}>
            <SelectTrigger>
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              {jurisdictions.map((j) => (
                <SelectItem key={j.value} value={j.value}>
                  {j.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="caseDescription" className="font-body">
            Case Description *
          </Label>
          <Textarea
            id="caseDescription"
            placeholder="Describe your case in detail. Include relevant facts, parties involved, and the outcome you're seeking..."
            value={caseDescription}
            onChange={(e) => setCaseDescription(e.target.value)}
            rows={8}
          />
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border border-border flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground font-body">
            This analysis is for informational purposes only and does not 
            constitute legal advice. Results are based on AI analysis of 
            similar case law and should be reviewed with a qualified attorney.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full border-secondary text-secondary hover:bg-secondary/10"
            onClick={() => navigate("/case-analysis/preview")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Free Analysis Preview
          </Button>
          
          <Button
            className="w-full bg-secondary hover:bg-secondary/90"
            onClick={handlePaidAnalysis}
            disabled={analyzing}
          >
            {analyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Analyzing Case Law...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Analyze My Case (Paid)
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Free preview shows sample analysis. Full personalized analysis requires payment.
        </p>
      </CardContent>
    </Card>
  );
}
