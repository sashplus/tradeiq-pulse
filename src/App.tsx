import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthGuard } from "./components/auth/AuthGuard";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import TraderPerformance from "./pages/TraderPerformance";
import Signals from "./pages/Signals";
import News from "./pages/News";
import DataSources from "./pages/DataSources";
import Settings from "./pages/Settings";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <AuthGuard>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="/performance" element={
              <AuthGuard>
                <AppLayout>
                  <TraderPerformance />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="/signals" element={
              <AuthGuard>
                <AppLayout>
                  <Signals />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="/news" element={
              <AuthGuard>
                <AppLayout>
                  <News />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="/sources" element={
              <AuthGuard>
                <AppLayout>
                  <DataSources />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="/settings" element={
              <AuthGuard>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="/alerts" element={
              <AuthGuard>
                <AppLayout>
                  <Alerts />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="/profile" element={
              <AuthGuard>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
