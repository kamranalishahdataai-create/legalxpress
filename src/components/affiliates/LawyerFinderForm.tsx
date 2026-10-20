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
  { value: "criminal", label: "Criminal Defence" },
  { value: "personal-injury", label: "Personal Injury" },
  { value: "real-estate-commercial", label: "Commercial Real Estate" },
  { value: "bankruptcy", label: "Bankruptcy" },
  { value: "family", label: "Complex Family Law" },
  { value: "employment", label: "Employment Law" },
  { value: "insurance", label: "Insurance Claims" },
  { value: "other", label: "Other" },
];

export function LawyerFinderForm({ defaultPracticeArea }: { defaultPracticeArea?: string } = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
          ai_recommendations: null,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Your referral request has been submitted.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          We will review whether your request is outside our practice, run a conflicts check and send professional contact details where available. You remain free to choose anyone.
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
              placeholder="City, Province"
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
        <Label htmlFor="caseDescription">Brief description (no confidential details) *</Label>
        <Textarea
          id="caseDescription"
          required
          rows={4}
          placeholder="State the area of help you need without sensitive details."
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
            Submitting request...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Submit
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you ask us to contact you about a referral and acknowledge our Privacy Policy. Do not include confidential details at this stage. LegalXpress does not receive or pay referral fees or commissions.
      </p>
    </form>
  );
}
