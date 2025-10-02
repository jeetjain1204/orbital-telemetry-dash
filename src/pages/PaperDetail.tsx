import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Copy, ArrowLeft } from "lucide-react";
import { usePublication, useRelatedPublications } from "@/hooks/usePublications";
import { useToast } from "@/hooks/use-toast";

const PaperDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: publication, isLoading } = usePublication(id || "");
  const { data: relatedPublications } = useRelatedPublications(
    id || "",
    publication?.title || ""
  );

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Publication link copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3" />
        </main>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Publication not found</h2>
              <Button asChild>
                <Link to="/explore">Back to Explore</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/explore">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Explore
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-foreground leading-tight">
                    {publication.title}
                  </h1>
                  <Badge variant="secondary">{publication.source}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open(publication.url_main, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Full Text
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyLink(publication.url_main)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground">
                    This publication is available as open-access full text on PubMed Central.
                    Click "Open Full Text" above to read the complete article, including abstract,
                    methods, results, and references.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to Read & Cite</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Access</div>
                  <div className="text-xs text-muted-foreground">
                    Full text is hosted on PubMed Central (PMC), a free archive of biomedical literature.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Citation</div>
                  <div className="text-xs text-muted-foreground">
                    Use PMC's built-in citation tools to export references in your preferred format.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Direct Link</div>
                  <div className="text-xs text-muted-foreground break-all">
                    {publication.url_main}
                  </div>
                </div>
              </CardContent>
            </Card>

            {relatedPublications && relatedPublications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Publications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedPublications.map((related) => (
                      <Link
                        key={related.id}
                        to={`/papers/${related.id}`}
                        className="block p-3 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-colors"
                      >
                        <div className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                          {related.title}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {related.source}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PaperDetail;
