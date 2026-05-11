import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import Index from "./pages/Index.tsx";
import Visitor from "./pages/Visitor.tsx";
import Exhibitor from "./pages/Exhibitor.tsx";
import Speaker from "./pages/Speaker.tsx";
import Admin from "./pages/Admin.tsx";
import Widget from "./pages/Widget.tsx";
import NotFound from "./pages/NotFound.tsx";
import { BotnoiWidget } from "./components/botnoi/BotnoiWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/visitor" element={<Visitor />} />
              <Route path="/exhibitor" element={<Exhibitor />} />
              <Route path="/speaker" element={<Speaker />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/widget" element={<Widget />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BotnoiWidget />
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
