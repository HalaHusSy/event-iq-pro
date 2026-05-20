import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { RoleGate } from "@/lib/auth/RoleGate";
import Index from "./pages/Index.tsx";
import Visitor from "./pages/Visitor.tsx";
import Exhibitor from "./pages/Exhibitor.tsx";
import Speaker from "./pages/Speaker.tsx";
import Admin from "./pages/Admin.tsx";
import Widget from "./pages/Widget.tsx";
import Events from "./pages/Events.tsx";
import Platform from "./pages/Platform.tsx";
import Login from "./pages/Login.tsx";
import RootDashboard from "./pages/dashboard/RootDashboard.tsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.tsx";
import OrganizerDashboard from "./pages/dashboard/OrganizerDashboard.tsx";
import ExhibitorDashboard from "./pages/dashboard/ExhibitorDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import { BotnoiWidget } from "./components/botnoi/BotnoiWidget";

// Sensible defaults so a single hung request doesn't freeze the UI:
// - retry once only (default is 3 with exponential backoff = ~30s before giving up)
// - 30s stale time to dedupe rapid re-renders
// - no auto-refetch on tab focus (was causing perceived "stuck loading")
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 800,
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public marketing / demo pages */}
                <Route path="/" element={<Index />} />
                <Route path="/visitor" element={<Visitor />} />
                <Route path="/exhibitor" element={<Exhibitor />} />
                <Route path="/speaker" element={<Speaker />} />
                <Route path="/widget" element={<Widget />} />
                <Route path="/events" element={<Events />} />
                <Route path="/login" element={<Login />} />

                {/* Demo dashboards behind auth (mock data, real RBAC dashboards at /root and /dashboard/*) */}
                <Route
                  path="/admin"
                  element={
                    <RoleGate allow={["root", "admin"]}>
                      <Admin />
                    </RoleGate>
                  }
                />
                <Route
                  path="/platform"
                  element={
                    <RoleGate allow={["root"]}>
                      <Platform />
                    </RoleGate>
                  }
                />

                {/* RBAC dashboards */}
                <Route
                  path="/root"
                  element={
                    <RoleGate allow={["root"]}>
                      <RootDashboard />
                    </RoleGate>
                  }
                />
                <Route
                  path="/dashboard/admin"
                  element={
                    <RoleGate allow={["root", "admin"]}>
                      <AdminDashboard />
                    </RoleGate>
                  }
                />
                <Route
                  path="/organizer"
                  element={
                    <RoleGate allow={["root", "admin", "organizer"]}>
                      <OrganizerDashboard />
                    </RoleGate>
                  }
                />
                <Route
                  path="/dashboard/exhibitor"
                  element={
                    <RoleGate allow={["root", "admin", "organizer", "exhibitor"]}>
                      <ExhibitorDashboard />
                    </RoleGate>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <BotnoiWidget />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
