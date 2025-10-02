import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Database, FileSearch, Shield, Link as LinkIcon } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">About & Methods</h1>
          <p className="text-muted-foreground">
            Understanding our data, summarization approach, and limitations
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Database className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Data Sources</h2>
                  <p className="text-muted-foreground mb-4">
                    This platform integrates 608 NASA-funded bioscience publications with enriched metadata from multiple authoritative sources:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Base publication list from NASA Space Biology challenge repository</li>
                    <li>• Open Science Data Repository (OSDR/GeneLab) for datasets and omics data</li>
                    <li>• NASA Space Life Sciences Library for full-text access</li>
                    <li>• NASA Task Book for funding records and program context</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <FileSearch className="h-6 w-6 text-accent mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Summarization Policy</h2>
                  <p className="text-muted-foreground mb-4">
                    Each paper receives a structured 5-block AI-assisted summary:
                  </p>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. <strong>Context:</strong> Why the study matters</li>
                    <li>2. <strong>Methods:</strong> Model/organism, platform, sample size, design</li>
                    <li>3. <strong>Key Results:</strong> Objective findings with numbers and units</li>
                    <li>4. <strong>Limitations:</strong> Sample size, confounders, analog constraints</li>
                    <li>5. <strong>Mission Relevance:</strong> Implications for Moon/Mars planning</li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-4">
                    All summaries preserve numeric values verbatim, mark speculation clearly, and store provenance 
                    (section anchors) for verification.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="h-6 w-6 text-warning mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Credibility & Limitations</h2>
                  <p className="text-muted-foreground mb-4">
                    We prioritize transparency and trustworthiness:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• All summaries include confidence scores and evidence levels</li>
                    <li>• Source links and section provenance always visible</li>
                    <li>• AI assists summarization - always verify via original sources</li>
                    <li>• Coverage gaps identified and reported (not all papers have full enrichment)</li>
                    <li>• Last updated: March 2025 • Version: 1.0</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <LinkIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">External Resources</h2>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="https://osdr.nasa.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        NASA Open Science Data Repository →
                      </a>
                    </li>
                    <li>
                      <a href="https://lsda.jsc.nasa.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Space Life Sciences Library →
                      </a>
                    </li>
                    <li>
                      <a href="https://taskbook.nasaprs.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        NASA Task Book →
                      </a>
                    </li>
                  </ul>
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
