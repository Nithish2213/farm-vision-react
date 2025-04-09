
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerificationCode from "./pages/VerificationCode";
import ResetPassword from "./pages/ResetPassword";
import ResetSuccess from "./pages/ResetSuccess";
import Dashboard from "./pages/Dashboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import ScanResults from "./pages/ScanResults";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import MarketPlace from "./pages/MarketPlace";
import ProductDetails from "./pages/ProductDetails";
import DeliveryDetails from "./pages/DeliveryDetails";
import BillSummary from "./pages/BillSummary";
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";
import ManageProducts from "./pages/ManageProducts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/scan-results" element={<ScanResults />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/market" element={<MarketPlace />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/delivery-details/:id" element={<DeliveryDetails />} />
          <Route path="/bill-summary/:id" element={<BillSummary />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
