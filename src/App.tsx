import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ApplicationProvider } from "@/contexts/ApplicationContext";

// User Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import RecommendScheme from "./pages/RecommendScheme";
import SchemeDetails from "./pages/SchemeDetails";
import SchemeApplication from "./pages/SchemeApplication";
import ApplicationHistory from "./pages/ApplicationHistory";
import ProfileSettings from "./pages/ProfileSettings";

// Layouts
import UserLayout from "./layouts/UserLayout";
import SagLayout from "./layouts/SagLayout";
import FinanceLayout from "./layouts/FinanceLayout";

// Protected Routes
import ProtectedRoute from "./utils/ProtectedRoute";
import SagProtectedRoute from "./utils/SagProtectedRoute";
import FinanceProtectedRoute from "./utils/FinanceProtectedRoute";

// SAG Pages
import SagRegister from "./pages/sag/SagRegister";
import SagLogin from "./pages/sag/SagLogin";
import SagDashboard from "./pages/sag/SagDashboard";
import SagApplications from "./pages/sag/SagApplications";
import SagApplicationDetail from "./pages/sag/SagApplicationDetail";
import SagApproved from "./pages/sag/SagApproved";

// Finance Pages
import FinanceRegister from "./pages/finance/FinanceRegister";
import FinanceLogin from "./pages/finance/FinanceLogin";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import FinanceApplications from "./pages/finance/FinanceApplications";
import FinanceApproved from "./pages/finance/FinanceApproved";
import FinanceRejected from "./pages/finance/FinanceRejected";
import FinanceWaiting from "./pages/finance/FinanceWaiting";
import FinanceDisbursed from "./pages/finance/FinanceDisbursed";
import FinanceSchemes from "./pages/finance/FinanceSchemes";
import FinanceSettings from "./pages/finance/FinanceSettings";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ApplicationProvider>
          <BrowserRouter>
            <Routes>
              {/* HOME */}
              <Route path="/" element={<Index />} />

              {/* USER FLOW */}
              <Route path="/register" element={<UserRegister />} />
              <Route path="/login" element={<UserLogin />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<UserDashboard />} />
                <Route path="recommend" element={<RecommendScheme />} />
                <Route path="history" element={<ApplicationHistory />} />
                <Route path="profile" element={<ProfileSettings />} />
              </Route>
              <Route path="/scheme/:id" element={<SchemeDetails />} />
              <Route path="/apply/:id" element={<SchemeApplication />} />

              {/* SAG FLOW */}
              <Route path="/sag/register" element={<SagRegister />} />
              <Route path="/sag/login" element={<SagLogin />} />
              <Route
                path="/sag"
                element={
                  <SagProtectedRoute>
                    <SagLayout />
                  </SagProtectedRoute>
                }
              >
                <Route path="dashboard" element={<SagDashboard />} />
                <Route path="applications" element={<SagApplications />} />
                <Route path="application/:id" element={<SagApplicationDetail />} />
                <Route path="approved" element={<SagApproved />} />
              </Route>

              {/* FINANCE FLOW */}
              <Route path="/register/finance" element={<FinanceRegister />} />
              <Route path="/login/finance" element={<FinanceLogin />} />
              <Route
                path="/dashboard/finance"
                element={
                  <FinanceProtectedRoute>
                    <FinanceLayout />
                  </FinanceProtectedRoute>
                }
              >
                <Route index element={<FinanceDashboard />} />
                <Route path="finance-applications" element={<FinanceApplications />} />
                <Route path="approved" element={<FinanceApproved />} />
                <Route path="rejected" element={<FinanceRejected />} />
                <Route path="waiting" element={<FinanceWaiting />} />
                <Route path="disbursed" element={<FinanceDisbursed />} />
                <Route path="schemes" element={<FinanceSchemes />} />
                <Route path="settings" element={<FinanceSettings />} />
              </Route>

              {/* FALLBACK */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ApplicationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;