import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Heritage from "./pages/Heritage";
import StateExploration from "./pages/StateExploration";
import Adventure from "./pages/Adventure";
import Alerts from "./pages/Alerts";
import Innovation from "./pages/Innovation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/heritage" element={<Heritage />} />
          <Route path="/exploration" element={<StateExploration />} />
          <Route path="/adventure" element={<Adventure />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/innovation" element={<Innovation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;