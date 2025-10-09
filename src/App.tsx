import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminCoupons from "./pages/admin/Coupons";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin Routes (no Navbar/Footer) */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/coupons" element={<AdminCoupons />} />
              <Route path="/admin/settings" element={<AdminSettings />} />

              {/* Public Routes (with Navbar/Footer) */}
              <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
              <Route path="/shop" element={<><Navbar /><Shop /><Footer /></>} />
              <Route path="/product/:id" element={<><Navbar /><ProductDetail /><Footer /></>} />
              <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
              <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /></>} />
              <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
              <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
              <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
              <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
              <Route path="/account" element={<><Navbar /><Account /><Footer /></>} />
              
              {/* 404 Route */}
              <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
