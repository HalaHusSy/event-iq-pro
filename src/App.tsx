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
import Events from "./pages/Events.tsx";
import Platform from "./pages/Platform.tsx";
import ApiTest from "./pages/ApiTest.tsx";
import ApiDocs from "./pages/ApiDocs.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { BotnoiMount } from "./components/botnoi/BotnoiMount";

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
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<Events />} />
              <Route path="/widget" element={<Widget />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/visitor" element={
                <ProtectedRoute allowed={["visitor", "admin", "root"]}><Visitor /></ProtectedRoute>
              } />
              <Route path="/exhibitor" element={
                <ProtectedRoute allowed={["admin", "root"]}><Exhibitor /></ProtectedRoute>
              } />
              <Route path="/speaker" element={
                <ProtectedRoute allowed={["admin", "root"]}><Speaker /></ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowed={["admin", "root"]}><Admin /></ProtectedRoute>
              } />
              <Route path="/platform" element={
                <ProtectedRoute allowed={["root"]}><Platform /></ProtectedRoute>
              } />
              <Route path="/platform/api-test" element={
                <ProtectedRoute allowed={["root"]}><ApiTest /></ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BotnoiMount />
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
