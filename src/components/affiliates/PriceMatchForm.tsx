import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";

const priceMatchSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  practice_area: z.string().min(1, "Please select a practice area"),
  case_description: z.string().trim().min(10, "Please describe your question or case in at least 10 characters").max(2000),
  budget_range: z.string().min(1, "Please select a budget range"),
  quoted_lawyer_name: z.string().trim().min(1, "Please enter the lawyer's name who quoted you").max(150),
  quoted_law_firm: z.string().trim().max(200).optional().or(z.literal("")),
  quoted_amount: z.string().trim().min(1, "Please enter the quoted amount").max(50),
  quote_reference: z.string().trim().max(500).optional().or(z.literal("")),
  scope_details: z.string().trim().max(1000).optional().or(z.literal("")),
});

type PriceMatchFormData = z.infer<typeof priceMatchSchema>;

const practiceAreas = [
  "Immigration Law",
  "Criminal Defense",
  "Personal Injury",
  "Real Estate",
  "Bankruptcy",
  "Family Law",
  "Employment Law",
  "Insurance Claims",
  "Corporate / Business Law",
  "Other",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
];

export function PriceMatchForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PriceMatchFormData>({
    resolver: zodResolver(priceMatchSchema),
    defaultValues: {
      practice_area: "",
      budget_range: "",
    },
  });

  const onSubmit = async (data: PriceMatchFormData) => {
    try {
      const { error } = await supabase
        .from("price_match_requests" as any)
        .insert({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone || null,
          practice_area: data.practice_area,
          case_description: data.case_description,
          budget_range: data.budget_range,
          quoted_lawyer_name: data.quoted_lawyer_name,
          quoted_law_firm: data.quoted_law_firm || null,
          quoted_amount: data.quoted_amount,
          quote_reference: data.quote_reference || null,
          scope_details: data.scope_details || null,
        } as any);

      if (error) throw error;
      setSubmitted(true);
      toast.success("Price match request submitted successfully!");
    } catch (err) {
      console.error("Price match submission error:", err);
      toast.error("Failed to submit. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          Request Received!
        </h3>
        <p className="text-muted-foreground font-body max-w-md mx-auto">
          We'll review your case and budget, then reach out with a tailored quote or matched attorney within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pm-name">Full Name *</Label>
          <Input id="pm-name" placeholder="John Doe" {...register("full_name")} />
          {errors.full_name && <p className="text-sm text-destructive">{errors.full_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm-email">Email *</Label>
          <Input id="pm-email" type="email" placeholder="john@example.com" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pm-phone">Phone (optional)</Label>
          <Input id="pm-phone" type="tel" placeholder="(555) 123-4567" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label>Practice Area *</Label>
          <Select onValueChange={(val) => setValue("practice_area", val, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select practice area" />
            </SelectTrigger>
            <SelectContent>
              {practiceAreas.map((area) => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.practice_area && <p className="text-sm text-destructive">{errors.practice_area.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Budget Range *</Label>
        <Select onValueChange={(val) => setValue("budget_range", val, { shouldValidate: true })}>
          <SelectTrigger>
            <SelectValue placeholder="How much are you willing to spend?" />
          </SelectTrigger>
          <SelectContent>
            {budgetRanges.map((range) => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.budget_range && <p className="text-sm text-destructive">{errors.budget_range.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pm-case">Your Question or Case Description *</Label>
        <Textarea
          id="pm-case"
          placeholder="Briefly describe your legal question or matter, what outcome you're seeking, and any relevant details..."
          rows={4}
          {...register("case_description")}
        />
        {errors.case_description && <p className="text-sm text-destructive">{errors.case_description.message}</p>}
      </div>

      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5 space-y-4">
        <div>
          <h4 className="font-display font-semibold text-foreground">Quote From Another Lawyer</h4>
          <p className="text-sm text-muted-foreground font-body">
            To keep price matching accurate, please reference the lawyer who quoted you. We may verify the quote before matching.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pm-qlawyer">Quoting Lawyer's Name *</Label>
            <Input id="pm-qlawyer" placeholder="e.g. Jane Smith" {...register("quoted_lawyer_name")} />
            {errors.quoted_lawyer_name && <p className="text-sm text-destructive">{errors.quoted_lawyer_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pm-qfirm">Law Firm (optional)</Label>
            <Input id="pm-qfirm" placeholder="Firm name" {...register("quoted_law_firm")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pm-qamount">Quoted Amount *</Label>
          <Input id="pm-qamount" placeholder="e.g. $4,500 flat fee or $350/hr" {...register("quoted_amount")} />
          {errors.quoted_amount && <p className="text-sm text-destructive">{errors.quoted_amount.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pm-qref">Quote Reference (optional)</Label>
          <Textarea
            id="pm-qref"
            placeholder="Quote/reference number, date of quote, or how you received it (email, phone, in-person)..."
            rows={2}
            {...register("quote_reference")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pm-scope">Scope Details (optional)</Label>
        <Textarea
          id="pm-scope"
          placeholder="Any additional details about the scope of work you expect — e.g. number of court appearances, document reviews, negotiation sessions..."
          rows={3}
          {...register("scope_details")}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Price Match Request"
        )}
      </Button>
    </form>
  );
}
