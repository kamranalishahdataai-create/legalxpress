import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users, Gift, Trophy, Send, CheckCircle2, Heart, Star, Award, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const referralSchema = z.object({
  referrerName: z.string().trim().min(1, "Your name is required").max(100),
  referrerEmail: z.string().trim().email("Valid email required").max(255),
  referrerPhone: z.string().trim().optional(),
  referredName: z.string().trim().min(1, "Referral's name is required").max(100),
  referredEmail: z.string().trim().email("Valid email for referral required").max(255),
  referredPhone: z.string().trim().optional(),
  caseType: z.string().min(1, "Please select a case type"),
  notes: z.string().trim().max(500).optional(),
});

const caseTypes = [
  "Civil Litigation",
  "Contract Law",
  "Real Estate",
  "Business Law",
  "Employment Law",
  "Family Law",
  "Estate Planning",
  "Other",
];

export default function CommunityPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    referredName: "",
    referredEmail: "",
    referredPhone: "",
    caseType: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = referralSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("community_referrals").insert({
        referrer_name: formData.referrerName.trim(),
        referrer_email: formData.referrerEmail.trim(),
        referrer_phone: formData.referrerPhone.trim() || null,
        referred_name: formData.referredName.trim(),
        referred_email: formData.referredEmail.trim(),
        referred_phone: formData.referredPhone.trim() || null,
        case_type: formData.caseType,
        notes: formData.notes.trim() || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Referral Submitted!",
        description: "You're now entered in our monthly $250 gift card draw!",
      });
    } catch (error) {
      console.error("Error submitting referral:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      referrerName: "",
      referrerEmail: "",
      referrerPhone: "",
      referredName: "",
      referredEmail: "",
      referredPhone: "",
      caseType: "",
      notes: "",
    });
    setErrors({});
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Community Referral Program</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Help someone you know get the legal assistance they need and enter our 
            monthly draw for a chance to win a <span className="font-semibold">$250 gift card</span>!
          </p>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-6 bg-secondary/10 border-y border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">Monthly Drawing</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">$250 Gift Card Prize</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">Winner Announced Monthly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - How It Works */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Submit a Referral</h3>
                    <p className="text-muted-foreground">
                      Fill out the form with your details and the contact information of 
                      someone who needs legal assistance. Your referral starts in <span className="font-semibold text-foreground">pending</span> status.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Referral Engages with a Lawyer</h3>
                    <p className="text-muted-foreground">
                      Once your referral connects with one of our lawyers, your status moves 
                      from <span className="font-semibold text-foreground">pending</span> to <span className="font-semibold text-foreground">active</span> and you'll receive an email notification.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Choose Your Draw Month</h3>
                    <p className="text-muted-foreground">
                      Once active, you'll choose which month to enter the draw. Have multiple referrals? 
                      Spread them across different months — <span className="font-semibold text-foreground">one entry per month</span>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Monthly Draw</h3>
                    <p className="text-muted-foreground">
                      At the end of each month, one winner is selected from all active entries 
                      and wins the <span className="font-semibold text-foreground">$250 gift card</span>!
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Refer Card */}
              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Why Refer?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Help friends and family get quality legal assistance</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Chance to win $250 gift card every month</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>No limit on the number of referrals you can submit</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Multiple referrals = entries in multiple months (one per month)</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Email notification when your referral is approved</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right - Referral Form */}
            <div>
              <Card className="shadow-lg border-border/50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl">Submit a Referral</CardTitle>
                  <CardDescription>Enter your details and who you're referring</CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="mx-auto p-4 rounded-full bg-green-100 w-fit mb-4">
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-4">
                        Your referral has been submitted and is currently in <span className="font-semibold text-foreground">pending</span> status.
                      </p>
                      <p className="text-muted-foreground mb-6">
                        Once your referral engages with one of our lawyers, your status will change to 
                        <span className="font-semibold text-foreground"> active</span> and you'll receive an email to choose your draw month.
                      </p>
                      <Button onClick={resetForm}>
                        Submit Another Referral
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Your Information */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                          Your Information
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="referrerName">Your Name *</Label>
                            <Input
                              id="referrerName"
                              value={formData.referrerName}
                              onChange={(e) => handleInputChange("referrerName", e.target.value)}
                              placeholder="John Doe"
                              className={errors.referrerName ? "border-destructive" : ""}
                            />
                            {errors.referrerName && (
                              <p className="text-xs text-destructive">{errors.referrerName}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referrerEmail">Your Email *</Label>
                            <Input
                              id="referrerEmail"
                              type="email"
                              value={formData.referrerEmail}
                              onChange={(e) => handleInputChange("referrerEmail", e.target.value)}
                              placeholder="john@example.com"
                              className={errors.referrerEmail ? "border-destructive" : ""}
                            />
                            {errors.referrerEmail && (
                              <p className="text-xs text-destructive">{errors.referrerEmail}</p>
                            )}
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="referrerPhone">Your Phone (Optional)</Label>
                            <Input
                              id="referrerPhone"
                              type="tel"
                              value={formData.referrerPhone}
                              onChange={(e) => handleInputChange("referrerPhone", e.target.value)}
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Referral Information */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
                          Referral Information
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="referredName">Their Name *</Label>
                            <Input
                              id="referredName"
                              value={formData.referredName}
                              onChange={(e) => handleInputChange("referredName", e.target.value)}
                              placeholder="Jane Smith"
                              className={errors.referredName ? "border-destructive" : ""}
                            />
                            {errors.referredName && (
                              <p className="text-xs text-destructive">{errors.referredName}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referredEmail">Their Email *</Label>
                            <Input
                              id="referredEmail"
                              type="email"
                              value={formData.referredEmail}
                              onChange={(e) => handleInputChange("referredEmail", e.target.value)}
                              placeholder="jane@example.com"
                              className={errors.referredEmail ? "border-destructive" : ""}
                            />
                            {errors.referredEmail && (
                              <p className="text-xs text-destructive">{errors.referredEmail}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referredPhone">Their Phone (Optional)</Label>
                            <Input
                              id="referredPhone"
                              type="tel"
                              value={formData.referredPhone}
                              onChange={(e) => handleInputChange("referredPhone", e.target.value)}
                              placeholder="(555) 987-6543"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="caseType">Legal Matter *</Label>
                            <Select value={formData.caseType} onValueChange={(v) => handleInputChange("caseType", v)}>
                              <SelectTrigger className={errors.caseType ? "border-destructive" : ""}>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {caseTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.caseType && (
                              <p className="text-xs text-destructive">{errors.caseType}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          placeholder="Any additional information about their legal situation..."
                          rows={3}
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Referral
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
