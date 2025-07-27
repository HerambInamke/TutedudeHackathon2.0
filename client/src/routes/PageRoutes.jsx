import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const BuyerDashboard = lazy(() => import("../pages/Buyer/BuyerDashboard"));
const OrderMilk = lazy(() => import("../pages/Buyer/OrderMilk"));
const MyOrders = lazy(() => import("../pages/Buyer/MyOrders"));
const SellerDashboard = lazy(() => import("../pages/Seller/SellerDashboard"));
const SplashPage = lazy(() => import("../pages/SplashPage"));
// const GroupBuy = lazy(() => import("../pages/Buyer/GroupBuy"));
const TodaysAccounts = lazy(() => import("../pages/Buyer/TodaysAccounts"));
const OtherProducts = lazy(() => import("../pages/Buyer/OtherProducts"));

const PageRoutes = () => (
  <Router>
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Routes>
        {/* Splash */}
        <Route path="/" element={<SplashPage />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Buyer */}
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/order-milk" element={<OrderMilk />} />
        <Route path="/buyer/my-orders" element={<MyOrders />} />
        {/* New: Group Buy and Today's Accounts */}
        {/* <Route path="/buyer/group-buy" element={<GroupBuy />} /> */}
        <Route path="/buyer/todays-accounts" element={<TodaysAccounts />} />
        <Route path="/buyer/other-products" element={<OtherProducts />} />
        {/* Seller */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        {/* Default route: redirect all unknown routes to splash */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default PageRoutes; 