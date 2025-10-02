import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCompare } from "lucide-react";

const Compare = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Compare Studies</h1>
          <p className="text-muted-foreground">
            Select 2-4 papers to compare findings, methodologies, and outcomes side-by-side
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Comparison Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center text-muted-foreground">
              <GitCompare className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Select papers from the Explore page to begin comparison</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Compare;
