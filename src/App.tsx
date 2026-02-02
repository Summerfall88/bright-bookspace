import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReviewPage from "./pages/ReviewPage";
import ReviewsListPage from "./pages/ReviewsListPage";
import NotFound from "./pages/NotFound";

// Admin imports
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage";
import { DashboardPage } from "@/pages/admin/DashboardPage";
import { SectionsPage } from "@/pages/admin/SectionsPage";
import { SectionEditPage } from "@/pages/admin/SectionEditPage";
import { ReviewsAdminPage } from "@/pages/admin/ReviewsAdminPage";
import { ReviewEditPage } from "@/pages/admin/ReviewEditPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/reviews" element={<ReviewsListPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="sections" element={<SectionsPage />} />
            <Route path="sections/:id" element={<SectionEditPage />} />
            <Route path="reviews" element={<ReviewsAdminPage />} />
            <Route path="reviews/:id" element={<ReviewEditPage />} />
            {/* TODO: Add more admin routes */}
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
