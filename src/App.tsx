import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PaperDetail from "./pages/PaperDetail";
import Compare from "./pages/Compare";
import GapFinder from "./pages/GapFinder";
import Readiness from "./pages/Readiness";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/papers/:id" element={<PaperDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/gaps" element={<GapFinder />} />
          <Route path="/readiness" element={<Readiness />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
