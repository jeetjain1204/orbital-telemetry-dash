import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Calendar, Link as LinkIcon, CheckCircle2 } from "lucide-react";

const CoverageStats = () => {
  const stats = [
    { label: "Total Publications", value: "608", icon: Database },
    { label: "Summarized", value: "587", icon: CheckCircle2, badge: "96.5%" },
    { label: "Last Updated", value: "Mar 2025", icon: Calendar },
    { label: "External Links", value: "892", icon: LinkIcon },
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Data Coverage & Sources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive integration of NASA's bioscience research with enriched metadata from multiple authoritative sources
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-2 shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mb-1 text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                  {stat.badge && (
                    <Badge variant="secondary" className="mt-2">
                      {stat.badge}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-2 bg-card">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-medium text-foreground mb-1">OSDR (GeneLab)</div>
                <div className="text-xs text-muted-foreground">Open Science Data Repository with datasets and omics data</div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-1">Space Life Sciences Library</div>
                <div className="text-xs text-muted-foreground">NASA's comprehensive database of space biology publications</div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-1">Task Book</div>
                <div className="text-xs text-muted-foreground">Funding records linking publications to research programs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CoverageStats;
