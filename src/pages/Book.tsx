import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  CalendarIcon, 
  Clock, 
  Video, 
  DollarSign, 
  User,
  Mail,
  Phone,
  Building,
  FileText,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const serviceTypes = [
  "Incorporation",
  "Minute Book",
  "Shareholder Agreement",
  "Other Contract",
  "Procurement Law",
  "Residential Real Estate",
  "Simple Divorce",
  "Corporate Litigation",
  "General Consultation",
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export default function Book() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [serviceType, setServiceType] = useState<string>();
  const [caseDetails, setCaseDetails] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to create an account to book a consultation.",
        variant: "destructive",
      });
      navigate("/register");
      return;
    }

    if (!date || !time || !serviceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Combine date and time
    const [hours, minutes] = time.replace(/\s?(AM|PM)/i, "").split(":").map(Number);
    const isPM = time.includes("PM");
    const scheduledDate = new Date(date);
    scheduledDate.setHours(isPM && hours !== 12 ? hours + 12 : hours, minutes || 0);

    const consultationId = crypto.randomUUID();
    const { error } = await supabase.from("consultations").insert({
      id: consultationId,
      user_id: user.id,
      service_type: serviceType,
      case_details: caseDetails,
      scheduled_at: scheduledDate.toISOString(),
      duration_minutes: 30,
      is_free_consultation: true,
    });

    if (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your consultation. Please try again.",
        variant: "destructive",
      });
    } else {
      // Create Google Calendar event with Meet link
      try {
        const { data: calendarResult } = await supabase.functions.invoke("create-calendar-event", {
          body: { consultationId },
        });

        if (calendarResult?.meetLink) {
          toast({
            title: "Consultation Booked!",
            description: "Your Google Meet link has been created. Check your email for details.",
          });
        } else {
          toast({
            title: "Consultation Booked!",
            description: "You will receive a confirmation email with the meeting details shortly.",
          });
        }
      } catch (calError) {
        console.error("Calendar event creation failed:", calError);
        toast({
          title: "Consultation Booked!",
          description: "Booking confirmed. Meeting link will be sent via email.",
        });
      }
      setSubmitted(true);
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-lg text-center">
            <CardContent className="pt-12 pb-8">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <Check className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Consultation Booked!
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Your free 30-minute consultation has been scheduled. You will 
                receive a confirmation email with the Google Meet link shortly.
              </p>
              <div className="p-4 rounded-lg bg-muted/50 mb-6">
                <div className="text-sm text-muted-foreground font-body mb-2">Scheduled for:</div>
                <div className="font-display font-semibold text-foreground">
                  {date && format(date, "MMMM d, yyyy")} at {time}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 mb-6">
                <div className="text-sm text-muted-foreground font-body mb-1">After your free consultation:</div>
                <div className="flex items-baseline justify-center gap-2 text-foreground">
                  <span className="text-xl font-display font-bold">$375</span>
                  <span className="text-muted-foreground font-body">/hour</span>
                  <span className="text-muted-foreground font-body">or</span>
                  <span className="text-xl font-display font-bold">$200</span>
                  <span className="text-muted-foreground font-body">/30 min</span>
                </div>
              </div>
              <Button onClick={() => navigate("/portal")} className="w-full">
                Go to Portal
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Book Your Free Consultation
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Get 30 minutes of expert legal advice at no cost. 
            Choose your preferred date and time below.
          </p>
        </div>
      </section>

      {/* Pricing Banner */}
      <section className="py-6 bg-secondary/10 border-y border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">First 30 min FREE</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">Then $375/hr or $200/30 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-secondary" />
              <span className="font-body text-foreground">Google Meet video call</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full font-display font-bold",
                    step >= s
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "w-16 h-1 rounded-full",
                      step > s ? "bg-secondary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">
                {step === 1 && "Select Date & Time"}
                {step === 2 && "Your Information"}
                {step === 3 && "Case Details"}
              </CardTitle>
              <CardDescription className="font-body">
                {step === 1 && "Choose your preferred consultation slot"}
                {step === 2 && "Tell us about yourself"}
                {step === 3 && "Briefly describe your legal matter"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label className="font-body mb-3 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <Label className="font-body mb-3 block">Select Time</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={time === slot ? "default" : "outline"}
                            className={cn(
                              "w-full",
                              time === slot && "bg-secondary hover:bg-secondary/90"
                            )}
                            onClick={() => setTime(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceTypeStep1" className="font-body">Area of Law *</Label>
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger id="serviceTypeStep1">
                          <SelectValue placeholder="Select an area of law" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="caseDetailsStep1" className="font-body">
                        Brief Description of Your Case
                      </Label>
                      <Textarea
                        id="caseDetailsStep1"
                        placeholder="Please provide a brief overview of your situation..."
                        value={caseDetails}
                        onChange={(e) => setCaseDetails(e.target.value)}
                        rows={4}
                      />
                      <p className="text-sm text-muted-foreground font-body">
                        This helps us prepare for your consultation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="font-body">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-body">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="font-body">Company</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company"
                          placeholder="Your Company Inc."
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType" className="font-body">Service Type *</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caseDetails" className="font-body">
                      Brief Description of Your Legal Matter
                    </Label>
                    <Textarea
                      id="caseDetails"
                      placeholder="Please provide a brief overview of your situation..."
                      value={caseDetails}
                      onChange={(e) => setCaseDetails(e.target.value)}
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground font-body">
                      This helps us prepare for your consultation.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                {step < 3 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && (!date || !time)}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !serviceType}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    {loading ? "Booking..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
