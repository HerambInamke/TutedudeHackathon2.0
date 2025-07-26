import React from "react";

const SellerDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Seller Dashboard</h1>
      <p className="mb-2">Welcome to your dashboard, Seller!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Example cards or dashboard widgets can go here */}
        <div className="bg-white p-4 rounded shadow">Today's Orders</div>
        <div className="bg-white p-4 rounded shadow">Inventory</div>
      </div>
    </div>
  );
};

export default SellerDashboard; 