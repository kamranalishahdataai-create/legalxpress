import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { FileText, Download, RefreshCw, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export function AdminReportsGenerator() {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(subMonths(new Date(), 1), "yyyy-MM")
  );
  const queryClient = useQueryClient();

  const { data: reports, isLoading } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("monthly_reports")
        .select("*")
        .order("report_month", { ascending: false })
        .limit(12);

      if (error) throw error;
      return data;
    },
  });

  const generateReportMutation = useMutation({
    mutationFn: async (month: string) => {
      const monthDate = new Date(month + "-01");
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);

      // Fetch consultations data
      const { data: consultations } = await supabase
        .from("consultations")
        .select("*")
        .gte("created_at", monthStart.toISOString())
        .lte("created_at", monthEnd.toISOString());

      // Fetch case analyses
      const { data: caseAnalyses } = await supabase
        .from("case_analyses")
        .select("*")
        .gte("created_at", monthStart.toISOString())
        .lte("created_at", monthEnd.toISOString());

      // Fetch referrals
      const { data: referrals } = await supabase
        .from("community_referrals")
        .select("*")
        .gte("created_at", monthStart.toISOString())
        .lte("created_at", monthEnd.toISOString());

      // Fetch analytics
      const { data: analytics } = await supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", monthStart.toISOString())
        .lte("created_at", monthEnd.toISOString());

      // Fetch promo spots counter
      const { data: promoData } = await supabase
        .from("promo_spots_counter")
        .select("spots_remaining, total_spots")
        .maybeSingle();

      // Aggregate report data
      const reportData = {
        period: {
          start: monthStart.toISOString(),
          end: monthEnd.toISOString(),
        },
        consultations: {
          total: consultations?.length || 0,
          byStatus: consultations?.reduce((acc, c) => {
            acc[c.status || "pending"] = (acc[c.status || "pending"] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          byService: consultations?.reduce((acc, c) => {
            acc[c.service_type] = (acc[c.service_type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        },
        caseAnalyses: {
          total: caseAnalyses?.length || 0,
          paid: caseAnalyses?.filter((c) => c.is_paid).length || 0,
          byJurisdiction: caseAnalyses?.reduce((acc, c) => {
            acc[c.jurisdiction] = (acc[c.jurisdiction] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        },
        referrals: {
          total: referrals?.length || 0,
          successful: referrals?.filter((r) => r.is_successful).length || 0,
          byStatus: referrals?.reduce((acc, r) => {
            acc[r.status] = (acc[r.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        },
        analytics: {
          totalEvents: analytics?.length || 0,
          pageViews: analytics?.filter((a) => a.event_type === "page_view").length || 0,
          uniqueSessions: new Set(analytics?.map((a) => a.session_id)).size,
        },
        promoSpots: {
          remaining: promoData?.spots_remaining ?? 500,
          total: promoData?.total_spots ?? 500,
          claimed: (promoData?.total_spots ?? 500) - (promoData?.spots_remaining ?? 500),
        },
        generatedAt: new Date().toISOString(),
      };

      // Save report to database
      const { error } = await supabase.from("monthly_reports").insert([{
        report_month: monthStart.toISOString().split("T")[0],
        report_type: "monthly_summary",
        report_data: reportData as unknown as Json,
        generated_by: (await supabase.auth.getUser()).data.user?.id,
      }]);

      if (error) throw error;
      return reportData;
    },
    onSuccess: () => {
      toast.success("Report generated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
    },
    onError: (error) => {
      toast.error("Failed to generate report: " + (error as Error).message);
    },
  });

  const downloadReport = (report: { report_data: unknown; report_month: string; report_type: string }) => {
    const dataStr = JSON.stringify(report.report_data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.report_type}-${format(new Date(report.report_month), "yyyy-MM")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (report: { report_data: unknown; report_month: string; report_type: string }) => {
    const data = report.report_data as {
      consultations?: { total?: number; byStatus?: Record<string, number> };
      caseAnalyses?: { total?: number; paid?: number };
      referrals?: { total?: number; successful?: number };
      analytics?: { totalEvents?: number; pageViews?: number; uniqueSessions?: number };
      promoSpots?: { remaining?: number; total?: number; claimed?: number };
    };
    
    const csvRows = [
      ["Metric", "Value"],
      ["Report Period", format(new Date(report.report_month), "MMMM yyyy")],
      ["Total Consultations", data.consultations?.total || 0],
      ["Total Case Analyses", data.caseAnalyses?.total || 0],
      ["Paid Case Analyses", data.caseAnalyses?.paid || 0],
      ["Total Referrals", data.referrals?.total || 0],
      ["Successful Referrals", data.referrals?.successful || 0],
      ["Total Page Views", data.analytics?.pageViews || 0],
      ["Unique Sessions", data.analytics?.uniqueSessions || 0],
      ["Promo Spots Remaining", data.promoSpots?.remaining ?? "N/A"],
      ["Promo Spots Claimed", data.promoSpots?.claimed ?? "N/A"],
      ["Promo Spots Total", data.promoSpots?.total ?? "N/A"],
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${format(new Date(report.report_month), "yyyy-MM")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate month options for the last 12 months
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      value: format(date, "yyyy-MM"),
      label: format(date, "MMMM yyyy"),
    };
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Monthly Reports
        </CardTitle>
        <CardDescription>
          Generate and download monthly activity reports
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Generator */}
        <div className="flex items-end gap-4 p-4 border rounded-lg bg-muted/50">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Select Month
            </label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => generateReportMutation.mutate(selectedMonth)}
            disabled={generateReportMutation.isPending}
          >
            {generateReportMutation.isPending ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileText className="h-4 w-4 mr-2" />
            )}
            Generate Report
          </Button>
        </div>

        {/* Existing Reports */}
        <div className="space-y-3">
          <h3 className="font-medium">Generated Reports</h3>
          {!reports?.length ? (
            <p className="text-center py-8 text-muted-foreground">
              No reports generated yet. Select a month and click Generate Report.
            </p>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {format(new Date(report.report_month), "MMMM yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {report.report_type.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCSV(report)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadReport(report)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    JSON
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
