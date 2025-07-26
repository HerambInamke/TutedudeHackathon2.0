import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const BuyerDashboard = lazy(() => import("../pages/Buyer/BuyerDashboard"));
const OrderMilk = lazy(() => import("../pages/Buyer/OrderMilk"));
const MyOrders = lazy(() => import("../pages/Buyer/MyOrders"));
const SellerDashboard = lazy(() => import("../pages/Seller/SellerDashboard"));

const PageRoutes = () => (
  <Router>
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Buyer */}
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/order-milk" element={<OrderMilk />} />
        <Route path="/buyer/my-orders" element={<MyOrders />} />
        {/* Seller */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default PageRoutes; 