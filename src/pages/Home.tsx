import Hero from "@/components/home/Hero";
import OrganismTiles from "@/components/home/OrganismTiles";
import CoverageStats from "@/components/home/CoverageStats";
import Header from "@/components/layout/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <OrganismTiles />
        <CoverageStats />
      </main>
    </div>
  );
};

export default Home;
