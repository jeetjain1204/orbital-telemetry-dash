import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Copy } from "lucide-react";
import { usePublications, usePublicationStats } from "@/hooks/usePublications";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "recent">("title");
  const { toast } = useToast();

  const { data: publications, isLoading } = usePublications(searchQuery, sortBy);
  const { data: stats } = usePublicationStats();

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Publication link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Center: Search & Results */}
          <div className="lg:col-span-2">
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Try 'plant microgravity', 'immune', 'bone loss'..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {isLoading ? (
                    "Loading..."
                  ) : (
                    <>
                      Showing {publications?.length || 0} of {stats?.total || 0} publications
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === "title" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("title")}
                  >
                    A-Z
                  </Button>
                  <Button
                    variant={sortBy === "recent" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("recent")}
                  >
                    Recently Added
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))
              ) : publications && publications.length > 0 ? (
                publications.map((paper) => (
                  <Card key={paper.id} className="hover:shadow-hover transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Link to={`/papers/${paper.id}`}>
                          <h3 className="text-lg font-semibold text-foreground leading-tight hover:text-primary transition-colors">
                            {paper.title}
                          </h3>
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Badge variant="secondary">{paper.source}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(paper.url_main, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open Full Text
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyLink(paper.url_main)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No publications found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try different search terms or clear your search
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Example searches: "plant microgravity", "immune", "bone loss"
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right: Help Panel */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Database Coverage</div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stats?.total || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Space Biology publications from PubMed Central
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Search Tips</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Search by topic: "microgravity", "radiation"</li>
                    <li>• Search by organism: "plant", "rodent", "human"</li>
                    <li>• Search by system: "bone", "immune", "muscle"</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Data Source</div>
                  <div className="text-xs text-muted-foreground">
                    All publications link to full open-access text on PubMed Central (PMC)
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Explore;
