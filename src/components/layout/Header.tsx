import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Database, GitCompare, Map, Rocket } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/explore", label: "Explore", icon: Search },
    { path: "/compare", label: "Compare", icon: GitCompare },
    { path: "/gaps", label: "Gap Finder", icon: Map },
    { path: "/readiness", label: "Artemis Readiness", icon: Rocket },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Database className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Space Biology Knowledge Engine</h1>
              <p className="text-xs text-muted-foreground">NASA Bioscience Research Navigator</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
