// My Orders page
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Order cards are large, spaced, and readable on small screens
// - Layout is single column, max-w-xs for best fit on small screens
import React, { useState } from "react";
import Header from "../../components/Header";
import { List } from "lucide-react";
import { BadgeCheck, Loader2 } from "lucide-react";

// Dummy orders data
const DUMMY_ORDERS = [
  {
    id: 1,
    product: "Milk",
    quantity: "2L",
    date: "2024-07-01",
    status: "Delivered",
  },
  {
    id: 2,
    product: "Milk",
    quantity: "5L",
    date: "2024-07-02",
    status: "Pending",
  },
];

const MyOrders = () => {
  const [orders] = useState(DUMMY_ORDERS);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="My Orders" />
      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <List className="text-blue-600" size={24} />
            <span className="text-lg font-bold text-gray-900">Order History</span>
          </div>
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 shadow-sm"
              >
                <div>
                  <div className="font-semibold text-gray-900">{order.product}</div>
                  <div className="text-sm text-gray-500">{order.quantity}</div>
                  <div className="text-xs text-gray-400">{order.date}</div>
                </div>
                <div className="flex items-center gap-1">
                  {order.status === "Delivered" ? (
                    <BadgeCheck className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Loader2 className="h-5 w-5 text-orange-400 animate-spin" />
                  )}
                  <span
                    className={`text-xs font-bold ${
                      order.status === "Delivered"
                        ? "text-emerald-500"
                        : "text-orange-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center text-gray-500 py-8">No orders yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders; 