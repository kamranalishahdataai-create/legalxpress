import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, RefreshCw, Calendar, Clock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type ConsultationStatus = Database["public"]["Enums"]["consultation_status"];

interface Consultation {
  id: string;
  service_type: string;
  scheduled_at: string;
  status: ConsultationStatus;
  is_free_consultation: boolean;
  case_details: string | null;
  duration_minutes: number | null;
  google_meet_link: string | null;
  user_id: string;
  created_at: string;
}

export function ConsultationsTable() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function fetchConsultations() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("consultations")
        .select("*")
        .order("scheduled_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setConsultations(data || []);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchConsultations();
  }, []);

  const filteredConsultations = consultations.filter(
    (consultation) =>
      consultation.service_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "pending":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "completed":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const viewConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setDialogOpen(true);
  };

  const updateStatus = async (newStatus: ConsultationStatus) => {
    if (!selectedConsultation) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from("consultations")
        .update({ status: newStatus })
        .eq("id", selectedConsultation.id);

      if (error) throw error;

      toast.success(`Consultation status updated to ${newStatus}`);
      setSelectedConsultation({ ...selectedConsultation, status: newStatus });
      fetchConsultations();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const upcomingCount = consultations.filter(
    (c) => new Date(c.scheduled_at) > new Date() && c.status !== "cancelled"
  ).length;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display">Consultations</CardTitle>
              <CardDescription className="font-body">
                Manage and view all consultation bookings
                {upcomingCount > 0 && (
                  <span className="ml-2 text-primary font-medium">
                    ({upcomingCount} upcoming)
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search consultations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchConsultations}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
          ) : filteredConsultations.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">{consultation.service_type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {formatDate(consultation.scheduled_at)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {consultation.duration_minutes || 30} min
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">
                          {consultation.is_free_consultation ? "Free" : "Paid"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewConsultation(consultation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No consultations found
            </div>
          )}
        </CardContent>
      </Card>

      {/* View/Edit Consultation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Consultation Details</DialogTitle>
            <DialogDescription className="font-body">
              View and manage consultation booking
            </DialogDescription>
          </DialogHeader>
          {selectedConsultation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-medium">{selectedConsultation.service_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedConsultation.duration_minutes || 30} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled For</p>
                  <p className="font-medium">{formatDate(selectedConsultation.scheduled_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge variant="outline">
                    {selectedConsultation.is_free_consultation ? "Free Consultation" : "Paid Consultation"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <Select
                  value={selectedConsultation.status}
                  onValueChange={(value) => updateStatus(value as ConsultationStatus)}
                  disabled={updating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedConsultation.case_details && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Case Details</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {selectedConsultation.case_details}
                  </p>
                </div>
              )}

              {selectedConsultation.google_meet_link && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Meeting Link</p>
                  <a
                    href={selectedConsultation.google_meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {selectedConsultation.google_meet_link}
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">User ID</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {selectedConsultation.user_id}
                </code>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
