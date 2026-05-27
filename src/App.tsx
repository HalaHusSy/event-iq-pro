import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { RoleGate } from "@/lib/auth/RoleGate";
import { SiteAssistant } from "./components/assistant/SiteAssistant";
import { VersionChecker } from "./components/VersionChecker";

// Lazy-load every route — each becomes its own chunk so the initial bundle
// only ships the landing page + shared providers (was a single 1.4 MB chunk).
const Index = lazy(() => import("./pages/Index.tsx"));
const Visitor = lazy(() => import("./pages/Visitor.tsx"));
const Exhibitor = lazy(() => import("./pages/Exhibitor.tsx"));
const Speaker = lazy(() => import("./pages/Speaker.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Widget = lazy(() => import("./pages/Widget.tsx"));
const Events = lazy(() => import("./pages/Events.tsx"));
const Platform = lazy(() => import("./pages/Platform.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const RootDashboard = lazy(() => import("./pages/dashboard/RootDashboard.tsx"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard.tsx"));
const OrganizerDashboard = lazy(() => import("./pages/dashboard/OrganizerDashboard.tsx"));
const ExhibitorDashboard = lazy(() => import("./pages/dashboard/ExhibitorDashboard.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const RouteFallback = () => (
  <div className="grid place-items-center min-h-screen">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);

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
              <Suspense fallback={<RouteFallback />}>
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
              </Suspense>
              <SiteAssistant />
              <VersionChecker />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
