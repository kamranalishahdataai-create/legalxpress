import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Briefcase, FileText, Users, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LawyerCasesProps {
  lawyerId: string;
}

export function LawyerCases({ lawyerId }: LawyerCasesProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const updateAssignment = async (id: string, patch: { status?: string; notes?: string }) => {
    const { error } = await supabase.from("lawyer_case_assignments").update(patch).eq("id", id);
    if (error) {
      toast({ title: "Could not update", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: patch.status ? `Case marked ${patch.status}` : "Notes saved" });
    queryClient.invalidateQueries({ queryKey: ["lawyer-assignments", lawyerId] });
  };
  const { data: assignments, isLoading } = useQuery({
    queryKey: ["lawyer-assignments", lawyerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_case_assignments")
        .select(`
          *,
          consultation:consultation_id (
            id, service_type, case_details, scheduled_at, status
          ),
          case_analysis:case_analysis_id (
            id, case_type, case_description, jurisdiction, created_at
          ),
          referral:referral_id (
            id, referred_name, referred_email, case_type, status
          )
        `)
        .eq("lawyer_id", lawyerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
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
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const pendingCases = assignments?.filter((a) => a.status === "pending") || [];
  const activeCases = assignments?.filter((a) => a.status === "active") || [];
  const completedCases = assignments?.filter((a) => a.status === "completed") || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-secondary/15 text-foreground border-secondary/20";
      case "active":
        return "bg-forest/10 text-forest border-forest/20";
      case "completed":
        return "bg-muted text-foreground border-border";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const renderAssignment = (assignment: (typeof assignments)[0]) => {
    const consultation = assignment.consultation as {
      service_type?: string;
      case_details?: string;
      scheduled_at?: string;
    } | null;
    const caseAnalysis = assignment.case_analysis as {
      case_type?: string;
      case_description?: string;
      jurisdiction?: string;
      created_at?: string;
    } | null;
    const referral = assignment.referral as {
      referred_name?: string;
      case_type?: string;
    } | null;

    return (
      <div
        key={assignment.id}
        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {consultation && <Users className="h-4 w-4 text-primary" />}
            {caseAnalysis && <FileText className="h-4 w-4 text-primary" />}
            {referral && <Briefcase className="h-4 w-4 text-primary" />}
            <span className="font-medium">
              {consultation?.service_type ||
                caseAnalysis?.case_type ||
                referral?.case_type ||
                "Case Assignment"}
            </span>
          </div>
          <Badge className={getStatusColor(assignment.status)}>
            {assignment.status}
          </Badge>
        </div>

        {consultation && (
          <div className="space-y-1 text-sm">
            {consultation.scheduled_at && (
              <p className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(new Date(consultation.scheduled_at), "MMM d, yyyy 'at' h:mm a")}
              </p>
            )}
            {consultation.case_details && (
              <p className="text-muted-foreground line-clamp-2 mt-2">
                {consultation.case_details}
              </p>
            )}
          </div>
        )}

        {caseAnalysis && (
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              Jurisdiction: {caseAnalysis.jurisdiction}
            </p>
            {caseAnalysis.case_description && (
              <p className="text-muted-foreground line-clamp-2 mt-2">
                {caseAnalysis.case_description}
              </p>
            )}
          </div>
        )}

        {referral && (
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              Referred Client: {referral.referred_name}
            </p>
          </div>
        )}

        <div className="mt-3 pt-3 border-t space-y-2">
          <Textarea
            rows={2}
            maxLength={2000}
            placeholder="Private case notes"
            value={notesDraft[assignment.id] ?? assignment.notes ?? ""}
            onChange={(e) => setNotesDraft((d) => ({ ...d, [assignment.id]: e.target.value }))}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => updateAssignment(assignment.id, { notes: notesDraft[assignment.id] ?? assignment.notes ?? "" })}>
              Save notes
            </Button>
            {assignment.status === "pending" && (
              <Button size="sm" onClick={() => updateAssignment(assignment.id, { status: "active" })}>Accept case</Button>
            )}
            {assignment.status !== "completed" && (
              <Button size="sm" variant="outline" onClick={() => updateAssignment(assignment.id, { status: "completed" })}>Mark completed</Button>
            )}
            {assignment.status === "completed" && (
              <Button size="sm" variant="ghost" onClick={() => updateAssignment(assignment.id, { status: "active" })}>Reopen</Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Case Assignments
        </CardTitle>
        <CardDescription>
          Cases and consultations assigned to you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              Pending ({pendingCases.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeCases.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCases.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingCases.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No pending cases
              </p>
            ) : (
              <div className="space-y-3">{pendingCases.map(renderAssignment)}</div>
            )}
          </TabsContent>

          <TabsContent value="active">
            {activeCases.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No active cases
              </p>
            ) : (
              <div className="space-y-3">{activeCases.map(renderAssignment)}</div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedCases.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No completed cases
              </p>
            ) : (
              <div className="space-y-3">{completedCases.map(renderAssignment)}</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
