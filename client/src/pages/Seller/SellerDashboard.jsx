import React from "react";
import { Store } from "lucide-react";
import Header from "../../components/Header";

// Simple placeholder for seller dashboard
const SellerDashboard = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header title="Supplier Dashboard" />
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-4">
        <Store size={48} className="text-blue-600" />
        <div className="text-xl font-bold text-gray-900">Supplier Dashboard</div>
        <div className="text-gray-500 text-center">Features coming soon!</div>
      </div>
    </div>
  </div>
);

export default SellerDashboard; 