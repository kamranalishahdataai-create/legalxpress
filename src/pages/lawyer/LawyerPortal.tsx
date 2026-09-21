import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLawyer } from "@/hooks/useLawyer";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Briefcase, FileText, TrendingUp } from "lucide-react";
import { LawyerCalendar } from "@/components/lawyer/LawyerCalendar";
import { LawyerCases } from "@/components/lawyer/LawyerCases";
import { LawyerReports } from "@/components/lawyer/LawyerReports";
import { LawyerStats } from "@/components/lawyer/LawyerStats";

export default function LawyerPortal() {
  const { user, loading: authLoading } = useAuth();
  const { lawyer, isLawyer, loading: lawyerLoading } = useLawyer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!lawyerLoading && !isLawyer && user) {
      // Not a lawyer, redirect to client portal
      navigate("/portal");
    }
  }, [lawyerLoading, isLawyer, user, navigate]);

  if (authLoading || lawyerLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </Layout>
    );
  }

  if (!lawyer) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {lawyer.full_name}
          </h1>
          <p className="text-muted-foreground mt-1">
            LSO #{lawyer.lso_number} • {lawyer.practice_areas.join(", ")}
          </p>
        </div>

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Cases</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <LawyerCalendar lawyerId={lawyer.id} />
          </TabsContent>

          <TabsContent value="cases">
            <LawyerCases lawyerId={lawyer.id} />
          </TabsContent>

          <TabsContent value="reports">
            <LawyerReports />
          </TabsContent>

          <TabsContent value="stats">
            <LawyerStats lawyerId={lawyer.id} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
