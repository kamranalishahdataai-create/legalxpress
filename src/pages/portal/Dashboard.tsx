import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  FileText, 
  Brain, 
  CreditCard, 
  Clock, 
  Video,
  ArrowRight,
  Star,
  Download
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ActiveConsultationTimer } from "@/components/consultation/ActiveConsultationTimer";
import { supabase } from "@/integrations/supabase/client";

interface Consultation {
  id: string;
  service_type: string;
  scheduled_at: string;
  status: string;
  is_free_consultation: boolean;
}

export default function PortalDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        // Fetch consultations
        const { data: consultData } = await supabase
          .from("consultations")
          .select("*")
          .eq("user_id", user.id)
          .order("scheduled_at", { ascending: false })
          .limit(5);

        if (consultData) {
          setConsultations(consultData);
        }

        // Check subscription
        const { data: subData } = await supabase
          .from("contract_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        setHasSubscription(!!subData);
      }
    }
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Welcome Back!
          </h1>
          <p className="text-primary-foreground/80 font-body">
            Manage your consultations, contracts, and legal matters in one place.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          {/* Active Consultation Timer */}
          <div className="mb-8">
            <ActiveConsultationTimer />
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Link to="/book" className="group">
              <Card className="card-hover h-full">
                <CardContent className="pt-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Book Consultation
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Schedule a meeting
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/contracts" className="group">
              <Card className="card-hover h-full">
                <CardContent className="pt-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Contract Library
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Browse templates
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/case-analysis" className="group">
              <Card className="card-hover h-full">
                <CardContent className="pt-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Brain className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Case Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    AI-powered insights
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/contact" className="group">
              <Card className="card-hover h-full">
                <CardContent className="pt-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <CreditCard className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Support
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Get help
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Consultations */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-display">My Consultations</CardTitle>
                    <CardDescription className="font-body">
                      Your upcoming and recent consultations
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/book">Book New</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {consultations.length > 0 ? (
                    <div className="space-y-4">
                      {consultations.map((consultation) => (
                        <div
                          key={consultation.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                              <Video className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground font-body">
                                {consultation.service_type}
                              </div>
                              <div className="text-sm text-muted-foreground font-body flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(consultation.scheduled_at)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {consultation.is_free_consultation && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                Free
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(consultation.status)}`}>
                              {consultation.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-display font-semibold text-foreground mb-2">
                        No consultations yet
                      </h4>
                      <p className="text-sm text-muted-foreground font-body mb-4">
                        Book your free 30-minute consultation today.
                      </p>
                      <Button size="sm" asChild>
                        <Link to="/book">Book Now</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subscription Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Contract Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  {hasSubscription ? (
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-3">
                        <Star className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        Active Subscription
                      </h4>
                      <p className="text-sm text-muted-foreground font-body mb-4">
                        Unlimited contract downloads
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/contracts">
                          <Download className="h-4 w-4 mr-2" />
                          Browse Contracts
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        No Active Subscription
                      </h4>
                      <p className="text-sm text-muted-foreground font-body mb-4">
                        Get unlimited access for just $4.99/month
                      </p>
                      <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                        <Link to="/checkout?plan=contracts">Subscribe Now</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pricing Reminder */}
              <Card className="bg-secondary/5 border-secondary/20">
                <CardContent className="pt-6">
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    Consultation Rates
                  </h4>
                  <p className="text-sm text-muted-foreground font-body mb-4">
                    After your free 30-minute consultation:
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-body">Per Hour</span>
                      <span className="font-display font-semibold text-foreground">$375</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-body">Per 30 Minutes</span>
                      <span className="font-display font-semibold text-foreground">$200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
