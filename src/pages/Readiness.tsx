import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Readiness = () => {
  const riskAreas = [
    { name: "Bone Loss", evidence: "high", papers: 87, status: "well-studied" },
    { name: "Immune Dysregulation", evidence: "medium", papers: 52, status: "moderate" },
    { name: "Plant Growth Systems", evidence: "medium", papers: 45, status: "moderate" },
    { name: "Combined Stressor Effects", evidence: "low", papers: 12, status: "gap" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            Artemis Mission Readiness
          </h1>
          <p className="text-muted-foreground">
            Evidence summary by risk area for lunar and Mars mission planning
          </p>
        </div>

        <div className="space-y-4">
          {riskAreas.map((area) => (
            <Card key={area.name} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{area.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={area.status === "gap" ? "destructive" : area.status === "moderate" ? "secondary" : "default"}>
                      {area.evidence} evidence
                    </Badge>
                    <span className="text-sm font-normal text-muted-foreground">
                      {area.papers} papers
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {area.status === "gap" && (
                  <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-destructive mb-1">Knowledge Gap Identified</div>
                      <div className="text-muted-foreground">
                        Limited research on this critical risk area. Additional studies recommended before long-duration missions.
                      </div>
                    </div>
                  </div>
                )}
                {area.status === "well-studied" && (
                  <div className="text-sm text-muted-foreground">
                    Extensive evidence base with established countermeasures and monitoring protocols.
                  </div>
                )}
                {area.status === "moderate" && (
                  <div className="text-sm text-muted-foreground">
                    Solid foundation with some areas requiring additional investigation for long-duration missions.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Readiness;
