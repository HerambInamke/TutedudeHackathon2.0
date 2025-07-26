import React from "react";

const MyOrders = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="py-2 px-4 border-b">#001</td>
            <td className="py-2 px-4 border-b">2024-06-01</td>
            <td className="py-2 px-4 border-b">2L</td>
            <td className="py-2 px-4 border-b">Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders; 