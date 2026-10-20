import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isToday, isTomorrow, addDays, startOfDay, subDays } from "date-fns";
import { Calendar, Clock, User, Video, Check, X, CheckCheck, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LawyerCalendarProps {
  lawyerId: string;
}

type Range = "upcoming" | "past";
type Status = "pending" | "confirmed" | "completed" | "cancelled";

export function LawyerCalendar({ lawyerId }: LawyerCalendarProps) {
  const [range, setRange] = useState<Range>("upcoming");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["lawyer-consultations", lawyerId, range],
    queryFn: async () => {
      const today = startOfDay(new Date());
      let q = supabase.from("consultations").select("*").eq("lawyer_id", lawyerId);
      q =
        range === "upcoming"
          ? q.gte("scheduled_at", today.toISOString()).lte("scheduled_at", addDays(today, 30).toISOString()).order("scheduled_at", { ascending: true })
          : q.lt("scheduled_at", today.toISOString()).gte("scheduled_at", subDays(today, 90).toISOString()).order("scheduled_at", { ascending: false });
      const { data: consultations, error } = await q;
      if (error) throw error;

      const ids = [...new Set((consultations ?? []).map((c) => c.user_id))];
      const { data: profiles } = ids.length
        ? await supabase.from("profiles").select("user_id, full_name, email, phone").in("user_id", ids)
        : { data: [] };
      const byUser = new Map((profiles ?? []).map((p) => [p.user_id, p]));
      return (consultations ?? []).map((c) => ({ ...c, client: byUser.get(c.user_id) }));
    },
  });

  const updateStatus = async (id: string, status: Status) => {
    const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Could not update", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Consultation ${status}` });
    queryClient.invalidateQueries({ queryKey: ["lawyer-consultations", lawyerId] });
    queryClient.invalidateQueries({ queryKey: ["lawyer-stats", lawyerId] });
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMM d");
  };

  const statusVariant: Record<string, string> = {
    confirmed: "bg-forest/10 text-forest border-forest/20",
    pending: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-muted text-foreground border-border",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const grouped = (data ?? []).reduce((acc, c) => {
    const key = format(new Date(c.scheduled_at), "yyyy-MM-dd");
    (acc[key] ||= []).push(c);
    return acc;
  }, {} as Record<string, NonNullable<typeof data>>);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Consultations
          </CardTitle>
          <CardDescription>
            {range === "upcoming" ? "Next 30 days" : "Last 90 days"}
          </CardDescription>
        </div>
        <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
        ) : !data?.length ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No consultations in this period</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([dateKey, list]) => (
              <div key={dateKey}>
                <h3 className="font-medium text-sm text-muted-foreground mb-3">{getDateLabel(dateKey)}</h3>
                <div className="space-y-3">
                  {list.map((c) => {
                    const status = c.status || "pending";
                    const open = status === "pending" || status === "confirmed";
                    return (
                      <div key={c.id} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-2 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{format(new Date(c.scheduled_at), "h:mm a")}</span>
                              <span className="text-muted-foreground">({c.duration_minutes ?? 30} min)</span>
                              <Badge variant="outline" className={statusVariant[status]}>{status}</Badge>
                              {c.is_free_consultation && <Badge variant="outline">Free</Badge>}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{c.client?.full_name || "Client"}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              {c.client?.email && (
                                <a href={`mailto:${c.client.email}`} className="flex items-center gap-1 hover:text-foreground">
                                  <Mail className="h-3 w-3" />{c.client.email}
                                </a>
                              )}
                              {c.client?.phone && (
                                <a href={`tel:${c.client.phone}`} className="flex items-center gap-1 hover:text-foreground">
                                  <Phone className="h-3 w-3" />{c.client.phone}
                                </a>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{c.service_type}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 sm:justify-end">
                            {c.google_meet_link ? (
                              <Button size="sm" asChild>
                                <a href={c.google_meet_link} target="_blank" rel="noopener noreferrer">
                                  <Video className="h-4 w-4 mr-2" />Join Meet
                                </a>
                              </Button>
                            ) : open ? (
                              <span className="text-xs text-muted-foreground self-center">No Meet link yet</span>
                            ) : null}
                            {status === "pending" && (
                              <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, "confirmed")}>
                                <Check className="h-4 w-4 mr-1" />Confirm
                              </Button>
                            )}
                            {open && (
                              <>
                                <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, "completed")}>
                                  <CheckCheck className="h-4 w-4 mr-1" />Complete
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => updateStatus(c.id, "cancelled")}>
                                  <X className="h-4 w-4 mr-1" />Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        {c.case_details && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{c.case_details}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
