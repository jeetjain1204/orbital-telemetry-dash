import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User, Rat, Leaf, Bug } from "lucide-react";

const organisms = [
  {
    id: "human",
    name: "Human",
    icon: User,
    count: 152,
    description: "Studies on astronaut health, adaptation, and countermeasures",
    color: "bg-blue-500",
  },
  {
    id: "rodent",
    name: "Rodent",
    icon: Rat,
    count: 234,
    description: "Mouse and rat models for microgravity and radiation effects",
    color: "bg-purple-500",
  },
  {
    id: "plant",
    name: "Plant",
    icon: Leaf,
    count: 142,
    description: "Plant growth, morphogenesis, and life support systems",
    color: "bg-green-500",
  },
  {
    id: "microbe",
    name: "Microbe",
    icon: Bug,
    count: 80,
    description: "Microbial behavior, biofilms, and spacecraft contamination",
    color: "bg-amber-500",
  },
];

const OrganismTiles = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
            Explore by Organism
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into research organized by biological model to understand space effects across different life forms
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organisms.map((organism) => {
            const Icon = organism.icon;
            return (
              <Link
                key={organism.id}
                to={`/explore?organism=${organism.id}`}
                className="group"
              >
                <Card className="h-full border-2 transition-all hover:shadow-hover hover:border-primary/50 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${organism.color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                      {organism.name}
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {organism.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {organism.count}
                      </span>
                      <span className="text-xs text-muted-foreground">studies</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrganismTiles;
