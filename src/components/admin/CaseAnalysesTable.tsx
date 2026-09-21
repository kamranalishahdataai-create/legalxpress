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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface CaseAnalysis {
  id: string;
  case_type: string;
  jurisdiction: string;
  case_description: string;
  is_paid: boolean;
  created_at: string;
  preview_result: Json;
  full_result: Json;
  user_id: string | null;
}

export function CaseAnalysesTable() {
  const [analyses, setAnalyses] = useState<CaseAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState<CaseAnalysis | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function fetchAnalyses() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("case_analyses")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setAnalyses(data || []);
    } catch (error) {
      console.error("Error fetching case analyses:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const filteredAnalyses = analyses.filter(
    (analysis) =>
      analysis.case_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.case_description.toLowerCase().includes(searchQuery.toLowerCase())
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

  const viewAnalysis = (analysis: CaseAnalysis) => {
    setSelectedAnalysis(analysis);
    setDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display">Case Analyses</CardTitle>
              <CardDescription className="font-body">
                View and manage all AI case analyses
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchAnalyses}>
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
          ) : filteredAnalyses.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Jurisdiction</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnalyses.map((analysis) => (
                    <TableRow key={analysis.id}>
                      <TableCell className="font-medium">{analysis.case_type}</TableCell>
                      <TableCell>{analysis.jurisdiction}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                        {analysis.case_description}
                      </TableCell>
                      <TableCell>
                        <Badge variant={analysis.is_paid ? "default" : "secondary"}>
                          {analysis.is_paid ? "Paid" : "Preview"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {formatDate(analysis.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewAnalysis(analysis)}
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
              No case analyses found
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Analysis Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Case Analysis Details</DialogTitle>
            <DialogDescription className="font-body">
              Full details of the case analysis
            </DialogDescription>
          </DialogHeader>
          {selectedAnalysis && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Case Type</p>
                  <p className="font-medium">{selectedAnalysis.case_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jurisdiction</p>
                  <p className="font-medium">{selectedAnalysis.jurisdiction}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedAnalysis.is_paid ? "default" : "secondary"}>
                    {selectedAnalysis.is_paid ? "Paid" : "Preview"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(selectedAnalysis.created_at)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Case Description</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedAnalysis.case_description}</p>
              </div>

              {selectedAnalysis.full_result && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Analysis Result</p>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-64">
                    {JSON.stringify(selectedAnalysis.full_result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
