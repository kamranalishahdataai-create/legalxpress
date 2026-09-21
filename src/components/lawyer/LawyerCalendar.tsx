import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isToday, isTomorrow, addDays, startOfDay, endOfDay } from "date-fns";
import { Calendar, Clock, User, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LawyerCalendarProps {
  lawyerId: string;
}

export function LawyerCalendar({ lawyerId }: LawyerCalendarProps) {
  const { data: consultations, isLoading } = useQuery({
    queryKey: ["lawyer-consultations", lawyerId],
    queryFn: async () => {
      const today = startOfDay(new Date());
      const nextWeek = endOfDay(addDays(today, 7));

      const { data, error } = await supabase
        .from("consultations")
        .select(`
          *,
          profiles:user_id (full_name, email, phone)
        `)
        .eq("lawyer_id", lawyerId)
        .gte("scheduled_at", today.toISOString())
        .lte("scheduled_at", nextWeek.toISOString())
        .order("scheduled_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMM d");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Group consultations by date
  const groupedConsultations = consultations?.reduce((acc, consultation) => {
    const dateKey = format(new Date(consultation.scheduled_at), "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(consultation);
    return acc;
  }, {} as Record<string, typeof consultations>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Consultations
        </CardTitle>
        <CardDescription>
          Your scheduled consultations for the next 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!consultations?.length ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No consultations scheduled for the next 7 days</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedConsultations || {}).map(([dateKey, dayConsultations]) => (
              <div key={dateKey}>
                <h3 className="font-medium text-sm text-muted-foreground mb-3">
                  {getDateLabel(dateKey)}
                </h3>
                <div className="space-y-3">
                  {dayConsultations?.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {format(new Date(consultation.scheduled_at), "h:mm a")}
                            </span>
                            <span className="text-muted-foreground">
                              ({consultation.duration_minutes} min)
                            </span>
                            <Badge className={getStatusColor(consultation.status || "pending")}>
                              {consultation.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {(consultation.profiles as { full_name?: string })?.full_name || "Unknown Client"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {consultation.service_type}
                          </p>
                        </div>
                        {consultation.google_meet_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={consultation.google_meet_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Join Meeting
                            </a>
                          </Button>
                        )}
                      </div>
                      {consultation.case_details && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {consultation.case_details}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
