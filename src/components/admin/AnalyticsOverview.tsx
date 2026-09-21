import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface MonthlyData {
  month: string;
  consultations: number;
  caseAnalyses: number;
}

interface JurisdictionData {
  name: string;
  value: number;
}

interface CaseTypeData {
  name: string;
  value: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#ef4444'];

export function AnalyticsOverview() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [jurisdictionData, setJurisdictionData] = useState<JurisdictionData[]>([]);
  const [caseTypeData, setCaseTypeData] = useState<CaseTypeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        // Fetch consultations for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const { data: consultations } = await supabase
          .from("consultations")
          .select("created_at")
          .gte("created_at", sixMonthsAgo.toISOString());

        const { data: caseAnalyses } = await supabase
          .from("case_analyses")
          .select("created_at, jurisdiction, case_type")
          .gte("created_at", sixMonthsAgo.toISOString());

        // Process monthly data
        const months: Record<string, { consultations: number; caseAnalyses: number }> = {};
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
          months[key] = { consultations: 0, caseAnalyses: 0 };
        }

        consultations?.forEach((c) => {
          const date = new Date(c.created_at);
          const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
          if (months[key]) {
            months[key].consultations++;
          }
        });

        caseAnalyses?.forEach((c) => {
          const date = new Date(c.created_at);
          const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
          if (months[key]) {
            months[key].caseAnalyses++;
          }
        });

        setMonthlyData(
          Object.entries(months).map(([month, data]) => ({
            month: month.split(' ')[0],
            ...data,
          }))
        );

        // Process jurisdiction data
        const jurisdictions: Record<string, number> = {};
        caseAnalyses?.forEach((c) => {
          jurisdictions[c.jurisdiction] = (jurisdictions[c.jurisdiction] || 0) + 1;
        });
        setJurisdictionData(
          Object.entries(jurisdictions)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6)
        );

        // Process case type data
        const caseTypes: Record<string, number> = {};
        caseAnalyses?.forEach((c) => {
          caseTypes[c.case_type] = (caseTypes[c.case_type] || 0) + 1;
        });
        setCaseTypeData(
          Object.entries(caseTypes)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6)
        );
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const chartConfig = {
    consultations: { label: "Consultations", color: "hsl(var(--primary))" },
    caseAnalyses: { label: "Case Analyses", color: "hsl(var(--secondary))" },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Monthly Activity Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="font-display">Monthly Activity</CardTitle>
          <CardDescription className="font-body">
            Consultations and case analyses over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="consultations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="caseAnalyses" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Jurisdiction Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Top Jurisdictions</CardTitle>
          <CardDescription className="font-body">
            Case analyses by jurisdiction
          </CardDescription>
        </CardHeader>
        <CardContent>
          {jurisdictionData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[250px]">
              <PieChart>
                <Pie
                  data={jurisdictionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {jurisdictionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Case Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Case Types</CardTitle>
          <CardDescription className="font-body">
            Distribution of legal case types
          </CardDescription>
        </CardHeader>
        <CardContent>
          {caseTypeData.length > 0 ? (
            <div className="space-y-3">
              {caseTypeData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground truncate max-w-[150px]">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.value / Math.max(...caseTypeData.map(d => d.value))) * 100}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
