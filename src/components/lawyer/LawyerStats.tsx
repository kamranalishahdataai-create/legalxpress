import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import { TrendingUp, Users, Calendar, CheckCircle } from "lucide-react";

interface LawyerStatsProps {
  lawyerId: string;
}

export function LawyerStats({ lawyerId }: LawyerStatsProps) {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const { data: stats, isLoading } = useQuery({
    queryKey: ["lawyer-stats", lawyerId],
    queryFn: async () => {
      // Get this month's consultations
      const { count: thisMonthConsultations } = await supabase
        .from("consultations")
        .select("*", { count: "exact", head: true })
        .eq("lawyer_id", lawyerId)
        .gte("scheduled_at", thisMonthStart.toISOString())
        .lte("scheduled_at", thisMonthEnd.toISOString());

      // Get last month's consultations for comparison
      const { count: lastMonthConsultations } = await supabase
        .from("consultations")
        .select("*", { count: "exact", head: true })
        .eq("lawyer_id", lawyerId)
        .gte("scheduled_at", lastMonthStart.toISOString())
        .lte("scheduled_at", lastMonthEnd.toISOString());

      // Get completed consultations
      const { count: completedCount } = await supabase
        .from("consultations")
        .select("*", { count: "exact", head: true })
        .eq("lawyer_id", lawyerId)
        .eq("status", "completed");

      // Get total unique clients
      const { data: clients } = await supabase
        .from("consultations")
        .select("user_id")
        .eq("lawyer_id", lawyerId);

      const uniqueClients = new Set(clients?.map((c) => c.user_id)).size;

      // Get pending assignments
      const { count: pendingAssignments } = await supabase
        .from("lawyer_case_assignments")
        .select("*", { count: "exact", head: true })
        .eq("lawyer_id", lawyerId)
        .eq("status", "pending");

      return {
        thisMonthConsultations: thisMonthConsultations || 0,
        lastMonthConsultations: lastMonthConsultations || 0,
        completedCount: completedCount || 0,
        uniqueClients,
        pendingAssignments: pendingAssignments || 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const monthlyChange = stats
    ? stats.thisMonthConsultations - stats.lastMonthConsultations
    : 0;
  const monthlyChangePercent = stats?.lastMonthConsultations
    ? Math.round((monthlyChange / stats.lastMonthConsultations) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month's Consultations
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.thisMonthConsultations}
            </div>
            <p className="text-xs text-muted-foreground">
              {monthlyChange >= 0 ? "+" : ""}
              {monthlyChange} from last month
              {monthlyChangePercent !== 0 && ` (${monthlyChangePercent}%)`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.uniqueClients}</div>
            <p className="text-xs text-muted-foreground">Unique clients served</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Consultations
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completedCount}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
