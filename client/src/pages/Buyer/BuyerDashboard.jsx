// Buyer dashboard with 4 main actions
// - Mobile-first: single column, large IconCards, generous spacing
// - All buttons/cards are touch-friendly and readable on small screens
import React, { useState } from "react";
import { Package2, BadgeCheck, FileText, ShoppingCart, Soup, User, Star, Flame } from "lucide-react";
import IconCard from "../../components/IconCard";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

// Buyer dashboard with 4 main actions
const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title=" " />
      <div className="flex flex-col gap-6 p-4 flex-1">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <IconCard
              icon={<Package2 className="h-16 w-16 text-orange-400" />} // Milk
              onClick={() => navigate("/buyer/order-milk")}
            />
            <span className="mt-2 text-base font-bold text-gray-800 text-center">Order Milk</span>
          </div>
          <div className="flex flex-col items-center">
            <IconCard
              icon={<BadgeCheck className="h-16 w-16 text-blue-600" />} // My Orders
              onClick={() => navigate("/buyer/my-orders")}
            />
            <span className="mt-2 text-base font-bold text-gray-800 text-center">My Orders</span>
          </div>
          <div className="flex flex-col items-center">
            <IconCard
              icon={<FileText className="h-16 w-16 text-orange-400" />} // Today's Accounts
              onClick={() => navigate("/buyer/todays-accounts")}
            />
            <span className="mt-2 text-base font-bold text-gray-800 text-center">Today's Accounts</span>
          </div>
          <div className="flex flex-col items-center">
            <IconCard
              icon={<ShoppingCart className="h-16 w-16 text-emerald-600" />} // Other Products
              onClick={() => navigate("/buyer/other-products")}
            />
            <span className="mt-2 text-base font-bold text-gray-800 text-center">Other Products</span>
          </div>
        </div>
        {/* Extra actions */}
        <div className="flex flex-col gap-3 mt-8 px-2">
          <button
            onClick={() => navigate("/buyer/suppliers")}
            className="flex items-center gap-2 bg-white rounded-2xl shadow-md p-4 w-full text-base font-bold text-gray-900 justify-center active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <User className="text-blue-400" size={24} /> Suppliers Nearby
          </button>
          <button
            onClick={() => navigate("/buyer/recommendations")}
            className="flex items-center gap-2 bg-white rounded-2xl shadow-md p-4 w-full text-base font-bold text-gray-900 justify-center active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <Star className="text-yellow-400" size={24} /> Recommendations
          </button>
          <button
            onClick={() => navigate("/buyer/lpg-reminder")}
            className="flex items-center gap-2 bg-white rounded-2xl shadow-md p-4 w-full text-base font-bold text-gray-900 justify-center active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <Flame className="text-red-500" size={24} /> LPG Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard; 