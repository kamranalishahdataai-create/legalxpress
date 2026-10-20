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

export const priceMatchSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  practice_area: z.string().min(1, "Please select a practice area"),
  case_description: z.string().trim().min(10, "Please describe your question or case in at least 10 characters").max(2000),
  budget_range: z.string().optional(),
  quoted_amount: z.string().trim().min(1, "Please enter the quoted amount").max(50),
  quote_reference: z.string().trim().max(500).optional().or(z.literal("")),
  scope_details: z.string().trim().min(10, "Please describe the quoted scope of work").max(1000),
  not_retained: z.literal(true, { errorMap: () => ({message: "Confirm you have not retained a lawyer for this matter"}) }),
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
          budget_range: data.budget_range || "Not provided",
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
          We will review the quoted scope and contact you with our fee for comparable work. We do not contact the lawyer who quoted you.
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
        <Label htmlFor="pm-case">Your question *</Label>
        <Textarea
          id="pm-case"
          placeholder="Brief question only; please do not include confidential or third-party details."
          rows={4}
          {...register("case_description")}
        />
        {errors.case_description && <p className="text-sm text-destructive">{errors.case_description.message}</p>}
      </div>

      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5 space-y-4">
        <div>
          <h4 className="font-display font-semibold text-foreground">Quote From Another Lawyer</h4>
          <p className="text-sm text-muted-foreground font-body">
            Share the scope and amount. Do not include the other lawyer’s name; we do not contact them.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pm-qamount">Quoted Amount *</Label>
          <Input id="pm-qamount" placeholder="e.g. $4,500 flat fee or $350/hr" {...register("quoted_amount")} />
          {errors.quoted_amount && <p className="text-sm text-destructive">{errors.quoted_amount.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pm-qref">Were HST and disbursements included? (optional)</Label>
          <Textarea
            id="pm-qref"
            placeholder="State whether HST, filing fees and disbursements were included in the quote."
            rows={2}
            {...register("quote_reference")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pm-scope">Scope of work quoted *</Label>
        <Textarea
          id="pm-scope"
          placeholder="Any additional details about the scope of work you expect — e.g. number of court appearances, document reviews, negotiation sessions..."
          rows={3}
          {...register("scope_details")}
        />
      </div>

      <div className="space-y-2"><label className="flex items-start gap-3 text-sm"><input type="checkbox" {...register("not_retained")} className="mt-1" />I have a written quote and have not retained a lawyer for this matter.</label>{errors.not_retained && <p className="text-sm text-destructive">{errors.not_retained.message}</p>}</div>
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
