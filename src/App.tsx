import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a QueryClient instance for React Query (data fetching/caching)
const queryClient = new QueryClient();

const App = () => (
  // Provide React Query context to the app
  <QueryClientProvider client={queryClient}>
    {/* Provide tooltip context to the app (for all tooltips) */}
    <TooltipProvider>
      {/* Custom toast notification system (shadcn) */}
      <Toaster />
      {/* Sonner toast notification system (alternative, for compatibility) */}
      <Sonner />
      {/* Set up client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Main page route */}
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;