import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WalletProvider } from "@/components/WalletProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollingBanner } from "@/components/ScrollingBanner";
import Index from "./pages/Index";
import Swap from "./pages/Swap";
import Pool from "./pages/Pool";
import Stake from "./pages/Stake";
import Tasks from "./pages/Tasks";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import KardiumSnake from "./pages/KardiumSnake";
import NotFound from "./pages/NotFound";
import "./lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="kardium-ui-theme">
      <WalletProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/swap" element={<Swap />} />
                  <Route path="/pool" element={<Pool />} />
                  <Route path="/stake" element={<Stake />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/kardiumsnake" element={<KardiumSnake />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/about" element={<About />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <ScrollingBanner />
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </WalletProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
