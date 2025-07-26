import React from "react";

const OrderMilk = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Milk</h2>
        <form className="flex flex-col gap-4">
          <input type="number" placeholder="Quantity (litres)" className="p-2 border rounded" />
          <input type="date" className="p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrderMilk; 