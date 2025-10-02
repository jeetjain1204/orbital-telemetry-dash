import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";

const GapFinder = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gap Finder</h1>
          <p className="text-muted-foreground">
            Visual matrix of research density showing well-studied areas and knowledge gaps
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Research Density Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center text-muted-foreground">
              <Map className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Interactive gap analysis visualization coming soon</p>
              <p className="text-sm mt-2">System × Stressor heatmap with thin area identification</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GapFinder;
