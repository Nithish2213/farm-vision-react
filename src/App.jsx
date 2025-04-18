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
import ExpertConsultation from "./pages/ExpertConsultation";
import ExpertChat from "./pages/ExpertChat";
import MarketHome from "./pages/MarketHome";
import Market from "./pages/Market";
import ProductDetails from "./pages/ProductDetails";
import Delivery from "./pages/Delivery";
import Billing from "./pages/Billing";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackOrders from "./pages/TrackOrders";
import ManageProducts from "./pages/ManageProducts";
import Investment from "./pages/Investment";
import InvestmentDetails from "./pages/InvestmentDetails";
import InvestmentTracking from "./pages/InvestmentTracking";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";

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
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/scan-results" element={<ScanResults />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/expert-consultation" element={<ExpertConsultation />} />
          <Route path="/expert-chat/:expertId" element={<ExpertChat />} />
          
          {/* Market & Sales Routes */}
          <Route path="/market-home" element={<MarketHome />} />
          <Route path="/market" element={<Market />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/delivery/:id" element={<Delivery />} />
          <Route path="/billing/:id" element={<Billing />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/track-orders" element={<TrackOrders />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          
          {/* Investment Routes */}
          <Route path="/investment" element={<Investment />} />
          <Route path="/investment-details/:id" element={<InvestmentDetails />} />
          <Route path="/investment-tracking" element={<InvestmentTracking />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
