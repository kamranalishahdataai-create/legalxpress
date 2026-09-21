import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Lock, ArrowLeft, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const CaseAnalysisCheckout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to purchase your case analysis.",
        variant: "destructive",
      });
      navigate("/login?redirect=/checkout/case-analysis");
      return;
    }

    setIsProcessing(true);
    
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment successful!",
      description: "Your Case Analysis report is being generated. Check your portal for results.",
    });
    
    setIsProcessing(false);
    navigate("/portal");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const features = [
    "AI-powered analysis of your specific case",
    "Win probability based on similar precedents",
    "5+ relevant case citations with summaries",
    "Key factors affecting your case outcome",
    "Strategic recommendations from AI",
    "Downloadable legal memorandum",
  ];

  return (
    <Layout>
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-secondary" />
                  <CardTitle className="font-display">Case Analysis Report</CardTitle>
                </div>
                <CardDescription className="font-body">
                  Get a comprehensive AI-powered analysis of your legal case
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground">
                    $9.99
                  </span>
                  <span className="text-muted-foreground font-body">
                    /month
                  </span>
                </div>

                <Separator />

                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-sm font-body text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-body text-muted-foreground">Total</span>
                  <span className="font-display text-xl font-bold">$9.99/mo</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </CardTitle>
                <CardDescription className="font-body">
                  Enter your card information to complete purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cardNumber: formatCardNumber(e.target.value),
                        })
                      }
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={formData.cvc}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Subscribe $9.99/mo
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground font-body">
                    <Lock className="inline h-3 w-3 mr-1" />
                    Your payment information is secure and encrypted
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseAnalysisCheckout;
