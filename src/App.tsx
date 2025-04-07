
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import TenantDashboard from "./pages/tenant/Dashboard";
import TenantPayments from "./pages/tenant/Payments";
import TenantPaymentHistory from "./pages/tenant/PaymentHistory";
import TenantMaintenance from "./pages/tenant/Maintenance";
import TenantDocuments from "./pages/tenant/Documents";
import TenantMoveOut from "./pages/tenant/MoveOut";
import TenantMessages from "./pages/tenant/Messages";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProperties from "./pages/admin/Properties";
import AdminTenants from "./pages/admin/Tenants";
import AdminPayments from "./pages/admin/Payments";
import AdminMaintenance from "./pages/admin/Maintenance";
import AdminMoveOut from "./pages/admin/MoveOut";
import AdminDocuments from "./pages/admin/Documents";
import AdminMessages from "./pages/admin/Messages";
import AdminAnalytics from "./pages/admin/Analytics";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Tenant Routes */}
            <Route path="/tenant" element={<TenantDashboard />} />
            <Route path="/tenant/payments" element={<TenantPayments />} />
            <Route path="/tenant/payment-history" element={<TenantPaymentHistory />} />
            <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
            <Route path="/tenant/documents" element={<TenantDocuments />} />
            <Route path="/tenant/move-out" element={<TenantMoveOut />} />
            <Route path="/tenant/messages" element={<TenantMessages />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/properties" element={<AdminProperties />} />
            <Route path="/admin/tenants" element={<AdminTenants />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/maintenance" element={<AdminMaintenance />} />
            <Route path="/admin/move-out" element={<AdminMoveOut />} />
            <Route path="/admin/documents" element={<AdminDocuments />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
