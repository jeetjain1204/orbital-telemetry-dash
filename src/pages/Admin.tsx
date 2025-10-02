import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePublicationStats, usePublications } from "@/hooks/usePublications";
import { importPublicationsFromCSV } from "@/utils/importCSV";
import { Database, Upload, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Admin = () => {
  const [csvData, setCsvData] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();
  
  const { data: stats, refetch: refetchStats } = usePublicationStats();
  const { data: publications, refetch: refetchPublications } = usePublications();

  const handleImport = async () => {
    if (!csvData.trim()) {
      toast({
        title: "Error",
        description: "Please paste CSV data first",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    
    try {
      const result = await importPublicationsFromCSV(csvData);
      
      if (result.success) {
        toast({
          title: "Import Successful",
          description: result.message,
        });
        setCsvData("");
        refetchStats();
        refetchPublications();
      } else {
        toast({
          title: "Import Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Import Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage publication data and view statistics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats?.total || 0}</div>
                  <div className="text-sm text-muted-foreground">Total Publications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                CSV Import
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Paste CSV data with "Title,Link" format. Duplicates (by url_main) will be ignored.
                </p>
                <Textarea
                  placeholder="Title,Link
Mice in Bion-M 1 space mission,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/
..."
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  rows={12}
                  className="font-mono text-xs"
                />
              </div>
              <Button
                onClick={handleImport}
                disabled={isImporting || !csvData.trim()}
                className="w-full"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import CSV
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Publications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {publications?.slice(0, 10).map((pub) => (
                      <TableRow key={pub.id}>
                        <TableCell className="font-medium text-sm max-w-[300px] truncate">
                          {pub.title}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            {pub.source}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
