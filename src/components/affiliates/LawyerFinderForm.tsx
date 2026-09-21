import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle2, MapPin, Send, Sparkles, Clock, AlertTriangle, Star, Tag, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const practiceAreas = [
  { value: "immigration", label: "Immigration Law" },
  { value: "criminal", label: "Criminal Defense" },
  { value: "personal-injury", label: "Personal Injury" },
  { value: "real-estate-commercial", label: "Commercial Real Estate" },
  { value: "bankruptcy", label: "Bankruptcy" },
  { value: "family", label: "Complex Family Law" },
  { value: "employment", label: "Employment Law" },
  { value: "insurance", label: "Insurance Claims" },
  { value: "other", label: "Other" },
];

interface AIRecommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface AIMatchResult {
  matchScore: number;
  complexity: string;
  estimatedTimeline: string;
  recommendations: AIRecommendation[];
  considerations: string[];
  suggestedSpecializations: string[];
}

export function LawyerFinderForm({ defaultPracticeArea }: { defaultPracticeArea?: string } = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiResult, setAiResult] = useState<AIMatchResult | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    practiceArea: defaultPracticeArea || "",
    location: "",
    caseDescription: "",
    urgency: "normal",
    preferredContact: "email",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call AI matching function
      const aiResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/match-affiliate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            practiceArea: formData.practiceArea,
            location: formData.location,
            caseDescription: formData.caseDescription,
            urgency: formData.urgency,
          }),
        }
      );

      let aiData: AIMatchResult | null = null;
      if (aiResponse.ok) {
        aiData = await aiResponse.json();
        setAiResult(aiData);
      }

      // Save to database
      const { error } = await supabase
        .from("lawyer_referral_requests")
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          practice_area: formData.practiceArea,
          location: formData.location,
          case_description: formData.caseDescription,
          urgency: formData.urgency,
          preferred_contact: formData.preferredContact,
          ai_recommendations: aiData as any,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Your request has been submitted with AI-powered recommendations!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && aiResult) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 mx-auto mb-4">
            <Sparkles className="h-10 w-10 text-secondary" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            AI Analysis Complete
          </h3>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Here are personalized recommendations based on your case details.
          </p>
        </div>

        {/* Match Score & Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Star className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="text-3xl font-display font-bold text-secondary">{aiResult.matchScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Match Score</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="text-lg font-display font-bold text-foreground capitalize">{aiResult.complexity}</div>
            <p className="text-xs text-muted-foreground mt-1">Case Complexity</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Clock className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="text-lg font-display font-bold text-foreground">{aiResult.estimatedTimeline}</div>
            <p className="text-xs text-muted-foreground mt-1">Est. Timeline</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-display font-semibold text-foreground">Recommendations</h4>
          {aiResult.recommendations.map((rec, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"} className="text-[10px]">
                  {rec.priority}
                </Badge>
                <span className="font-medium text-sm text-foreground">{rec.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </div>
          ))}
        </div>

        {/* Specializations */}
        {aiResult.suggestedSpecializations.length > 0 && (
          <div>
            <h4 className="font-display font-semibold text-foreground mb-2">Look for these specializations</h4>
            <div className="flex flex-wrap gap-2">
              {aiResult.suggestedSpecializations.map((spec, i) => (
                <Badge key={i} variant="outline" className="text-xs">{spec}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Considerations */}
        {aiResult.considerations.length > 0 && (
          <div>
            <h4 className="font-display font-semibold text-foreground mb-2">Key Considerations</h4>
            <ul className="space-y-1">
              {aiResult.considerations.map((c, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground mb-4">
            Our team will reach out within 24-48 hours with matched attorney profiles.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setAiResult(null);
              setFormData({
                fullName: "", email: "", phone: "", practiceArea: "",
                location: "", caseDescription: "", urgency: "normal", preferredContact: "email",
              });
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-secondary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
          Request Received!
        </h3>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-6">
          Our AI matching system is analyzing your case to find the best attorneys
          in your area. You'll receive recommendations within 24-48 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              fullName: "", email: "", phone: "", practiceArea: "",
              location: "", caseDescription: "", urgency: "normal", preferredContact: "email",
            });
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            required
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Your Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              required
              placeholder="City, State/Province"
              className="pl-10"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Practice Area Needed *</Label>
        <Select
          value={formData.practiceArea}
          onValueChange={(value) => setFormData({ ...formData, practiceArea: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select the type of legal help you need" />
          </SelectTrigger>
          <SelectContent>
            {practiceAreas.map((area) => (
              <SelectItem key={area.value} value={area.value}>
                {area.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="caseDescription">Describe Your Legal Situation *</Label>
        <Textarea
          id="caseDescription"
          required
          rows={4}
          placeholder="Please provide a brief description of your legal matter so we can match you with the right attorney..."
          value={formData.caseDescription}
          onChange={(e) => setFormData({ ...formData, caseDescription: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label>How urgent is your matter?</Label>
          <RadioGroup
            value={formData.urgency}
            onValueChange={(value) => setFormData({ ...formData, urgency: value })}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent" id="urgent" />
              <Label htmlFor="urgent" className="font-normal cursor-pointer">Urgent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal" className="font-normal cursor-pointer">Normal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="flexible" />
              <Label htmlFor="flexible" className="font-normal cursor-pointer">Flexible</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-3">
          <Label>Preferred Contact Method</Label>
          <RadioGroup
            value={formData.preferredContact}
            onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="contact-email" />
              <Label htmlFor="contact-email" className="font-normal cursor-pointer">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="contact-phone" />
              <Label htmlFor="contact-phone" className="font-normal cursor-pointer">Phone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="either" id="contact-either" />
              <Label htmlFor="contact-either" className="font-normal cursor-pointer">Either</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            AI is Analyzing Your Case...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Submit
          </>
        )}
      </Button>

      <div className="space-y-3 rounded-xl border border-secondary/30 bg-secondary/5 p-5">
        <div className="space-y-2">
          <Label htmlFor="promoCode" className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-secondary" />
            Promo Code
          </Label>
          <Input
            id="promoCode"
            placeholder="Enter your promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </div>
        <Button
          asChild
          type="button"
          size="lg"
          variant="outline"
          className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
        >
          <Link
            to={`/subscriptions${promoCode ? `?promo=${encodeURIComponent(promoCode)}` : ""}`}
          >
            <BadgePercent className="mr-2 h-4 w-4" />
            Activate Your 15% Discount
          </Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our privacy policy. Our AI will analyze your case
        and provide instant recommendations while we match you with qualified attorneys.
      </p>
    </form>
  );
}
