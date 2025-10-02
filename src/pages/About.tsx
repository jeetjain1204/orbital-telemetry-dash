import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicationStats } from "@/hooks/usePublications";

const About = () => {
  const { data: stats } = usePublicationStats();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">About & Data Guide</h1>
          <p className="text-muted-foreground">
            Understanding the database, how to use it, and known limitations
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What This App Is</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                The Space Biology Knowledge Engine is a searchable database of NASA-funded space biology publications.
                It provides instant access to over {stats?.total || 600} research papers with direct links to full open-access text.
              </p>
              <p>
                This tool helps scientists, program managers, and mission planners quickly find relevant research,
                identify knowledge gaps, and understand the current state of space biology research.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What the Database Contains</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="font-semibold mb-2">Current Coverage:</p>
              <ul>
                <li><strong>{stats?.total || 600}+ publications</strong> from PubMed Central (PMC)</li>
                <li>Publication titles with full-text search capability</li>
                <li>Direct links to open-access full text on PubMed Central</li>
                <li>Source attribution for all publications</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Data Source:</strong> All publications are hosted on PubMed Central, 
                a free full-text archive of biomedical and life sciences literature maintained by the 
                National Library of Medicine at the National Institutes of Health.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Known Limitations</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                <strong>Current limitations of this database:</strong>
              </p>
              <ul>
                <li>No abstracts or publication years displayed yet (coming soon)</li>
                <li>Some publications may be missing DOIs or additional metadata</li>
                <li>Search is currently limited to title-based full-text search</li>
                <li>Advanced filtering by organism, stressor, or system not yet available</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                We are continuously working to enhance the database with additional metadata, 
                AI-generated summaries, and advanced filtering capabilities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Use This App</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ol>
                <li>
                  <strong>Search:</strong> Use the search bar on the Explore page to find publications by keywords 
                  (e.g., "plant microgravity", "immune response", "bone loss")
                </li>
                <li>
                  <strong>Browse:</strong> View all publications sorted alphabetically or by recent additions
                </li>
                <li>
                  <strong>Open Full Text:</strong> Click "Open Full Text" to read the complete article on PubMed Central
                </li>
                <li>
                  <strong>Copy Links:</strong> Use the "Copy Link" button to save or share publication URLs
                </li>
                <li>
                  <strong>View Details:</strong> Click on any publication title to see more information and find related papers
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attribution & Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                <strong>Open-Access Publication Links:</strong> All full-text links direct to PubMed Central (PMC), 
                a service of the U.S. National Library of Medicine.
              </p>
              <p className="text-sm text-muted-foreground">
                PubMed Central provides free access to biomedical and life sciences literature. 
                When citing publications from this database, please use the citation tools available on PMC.
              </p>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Related NASA Resources:</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full justify-start"
                  >
                    <a 
                      href="https://osdr.nasa.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Open Science Data Repository (OSDR)
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full justify-start"
                  >
                    <a 
                      href="https://lsda.jsc.nasa.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      NASA Life Sciences Data Archive
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full justify-start"
                  >
                    <a 
                      href="https://taskbook.nasaprs.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      NASA Task Book (Funding Records)
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
