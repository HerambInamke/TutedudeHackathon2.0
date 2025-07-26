import React from "react";

const BuyerDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Buyer Dashboard</h1>
      <p className="mb-2">Welcome to your dashboard, Buyer!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Example cards or dashboard widgets can go here */}
        <div className="bg-white p-4 rounded shadow">Order Milk</div>
        <div className="bg-white p-4 rounded shadow">My Orders</div>
      </div>
    </div>
  );
};

export default BuyerDashboard; 