import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  FileText, 
  Brain, 
  Users, 
  TrendingUp,
  Calendar,
  DollarSign,
  Activity,
  Flame
} from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsOverview } from "@/components/admin/AnalyticsOverview";
import { CaseAnalysesTable } from "@/components/admin/CaseAnalysesTable";
import { ContractTemplatesTable } from "@/components/admin/ContractTemplatesTable";
import { AdminReportsGenerator } from "@/components/admin/AdminReportsGenerator";
import { ConsultationsTable } from "@/components/admin/ConsultationsTable";

interface Stats {
  totalUsers: number;
  totalCaseAnalyses: number;
  totalConsultations: number;
  totalContractDownloads: number;
  recentConsultations: number;
  activeSubscriptions: number;
  promoSpotsRemaining: number;
  promoTotalSpots: number;
}

export default function AdminDashboard() {
  const { isAdmin, loading, user } = useAdmin();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCaseAnalyses: 0,
    totalConsultations: 0,
    totalContractDownloads: 0,
    recentConsultations: 0,
    activeSubscriptions: 0,
    promoSpotsRemaining: 500,
    promoTotalSpots: 500,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (!loading && user && !isAdmin) {
      navigate("/portal");
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    async function fetchStats() {
      if (!isAdmin) return;

      try {
        // Fetch profiles count (users)
        const { count: usersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Fetch case analyses count
        const { count: casesCount } = await supabase
          .from("case_analyses")
          .select("*", { count: "exact", head: true });

        // Fetch consultations count
        const { count: consultationsCount } = await supabase
          .from("consultations")
          .select("*", { count: "exact", head: true });

        // Fetch contract templates total downloads
        const { data: contractsData } = await supabase
          .from("contract_templates")
          .select("download_count");

        const totalDownloads = contractsData?.reduce(
          (acc, curr) => acc + (curr.download_count || 0),
          0
        ) || 0;

        // Fetch recent consultations (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const { count: recentCount } = await supabase
          .from("consultations")
          .select("*", { count: "exact", head: true })
          .gte("created_at", weekAgo.toISOString());

        // Fetch active subscriptions
        const { count: subsCount } = await supabase
          .from("contract_subscriptions")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true);

        // Fetch promo spots counter
        const { data: promoData } = await supabase
          .from("promo_spots_counter")
          .select("spots_remaining, total_spots")
          .maybeSingle();

        setStats({
          totalUsers: usersCount || 0,
          totalCaseAnalyses: casesCount || 0,
          totalConsultations: consultationsCount || 0,
          totalContractDownloads: totalDownloads,
          recentConsultations: recentCount || 0,
          activeSubscriptions: subsCount || 0,
          promoSpotsRemaining: promoData?.spots_remaining ?? 500,
          promoTotalSpots: promoData?.total_spots ?? 500,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setStatsLoading(false);
      }
    }

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary-foreground" />
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                Admin Dashboard
              </h1>
              <p className="text-primary-foreground/80 font-body text-sm">
                Manage your platform, view analytics, and oversee operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {statsLoading ? "..." : stats.totalUsers}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {statsLoading ? "..." : stats.totalCaseAnalyses}
                    </p>
                    <p className="text-xs text-muted-foreground">Case Analyses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {statsLoading ? "..." : stats.totalConsultations}
                    </p>
                    <p className="text-xs text-muted-foreground">Consultations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {statsLoading ? "..." : stats.totalContractDownloads}
                    </p>
                    <p className="text-xs text-muted-foreground">Downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                    <Activity className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {statsLoading ? "..." : stats.recentConsultations}
                    </p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {statsLoading ? "..." : stats.activeSubscriptions}
                    </p>
                    <p className="text-xs text-muted-foreground">Subscriptions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <Flame className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {statsLoading ? "..." : `${stats.promoSpotsRemaining}/${stats.promoTotalSpots}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Promo Spots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="cases" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Cases</span>
              </TabsTrigger>
              <TabsTrigger value="contracts" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Contracts</span>
              </TabsTrigger>
              <TabsTrigger value="consultations" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Consults</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics">
              <AnalyticsOverview />
            </TabsContent>

            <TabsContent value="cases">
              <CaseAnalysesTable />
            </TabsContent>

            <TabsContent value="contracts">
              <ContractTemplatesTable />
            </TabsContent>

            <TabsContent value="consultations">
              <ConsultationsTable />
            </TabsContent>

            <TabsContent value="reports">
              <AdminReportsGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
