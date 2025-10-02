import { useState } from "react";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp } from "lucide-react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for initial view
  const mockResults = [
    {
      id: 1,
      title: "Effects of Microgravity on Bone Density in Rodent Models",
      year: 2023,
      tags: { organism: "rodent", stressor: "microgravity", system: "bone" },
      summary: "Study demonstrates significant bone mineral density loss in mice exposed to simulated microgravity, with recovery observed after exercise countermeasure protocol.",
      confidence: "high",
      evidenceLevel: "high",
    },
    {
      id: 2,
      title: "Arabidopsis Growth Patterns Under Spaceflight Conditions",
      year: 2022,
      tags: { organism: "plant", stressor: "microgravity", system: "plant_morphogenesis" },
      summary: "Altered root gravitropism and shoot morphology observed in Arabidopsis grown on ISS, suggesting fundamental changes in plant orientation mechanisms.",
      confidence: "high",
      evidenceLevel: "medium",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Filter Panel */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Organism</div>
                  <div className="space-y-1">
                    {["human", "rodent", "plant", "microbe"].map((org) => (
                      <label key={org} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span className="capitalize">{org}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Stressor</div>
                  <div className="space-y-1">
                    {["microgravity", "radiation", "isolation"].map((stress) => (
                      <label key={stress} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span className="capitalize">{stress}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Clear All
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Center: Search & Results */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search across all 608 publications..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4 text-sm text-muted-foreground">
              Showing {mockResults.length} of 608 publications
            </div>

            <div className="space-y-4">
              {mockResults.map((paper) => (
                <Card key={paper.id} className="hover:shadow-hover transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-foreground leading-tight flex-1">
                        {paper.title}
                      </h3>
                      <Badge variant="outline">{paper.year}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {paper.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{paper.tags.organism}</Badge>
                      <Badge variant="secondary">{paper.tags.stressor}</Badge>
                      <Badge variant="secondary">{paper.tags.system}</Badge>
                      <Badge className={paper.evidenceLevel === "high" ? "bg-accent" : "bg-warning"}>
                        {paper.evidenceLevel} evidence
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Insights Panel */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Top Consensus</div>
                  <div className="text-xs text-muted-foreground">
                    92% of studies show bone density loss under microgravity
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Emerging Trends</div>
                  <div className="text-xs text-muted-foreground">
                    Increased focus on plant-based life support systems (2020-2025)
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Open Questions</div>
                  <div className="text-xs text-muted-foreground">
                    Limited data on combined radiation + isolation effects in humans
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Explore;
