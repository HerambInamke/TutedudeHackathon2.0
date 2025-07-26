// Today's Accounts page
// - Mobile-first: single column, large cards, touch-friendly
// - Dummy data for today's orders and totals
import React, { useState } from "react";
import { FileText, BadgeCheck, Loader2, Package2 } from "lucide-react";
import Header from "../../components/Header";

const DUMMY_ACCOUNTS = [
  {
    id: 1,
    product: "Milk",
    quantity: "5L",
    total: 250,
    status: "Delivered",
  },
  {
    id: 2,
    product: "Paneer",
    quantity: "1kg",
    total: 300,
    status: "Pending",
  },
];

const TodaysAccounts = () => {
  const [accounts] = useState(DUMMY_ACCOUNTS);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Today's Accounts" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 mb-1">
              <Package2 className="h-6 w-6 text-orange-400" />
              <span className="font-bold text-gray-900 text-lg">{acc.product}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-sm">Quantity: {acc.quantity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-sm">Total: <span className="font-bold text-blue-600">₹{acc.total}</span></span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {acc.status === "Delivered" ? (
                <BadgeCheck className="h-5 w-5 text-emerald-500" />
              ) : (
                <Loader2 className="h-5 w-5 text-orange-400 animate-spin" />
              )}
              <span className={`text-xs font-bold ${acc.status === "Delivered" ? "text-emerald-500" : "text-orange-400"}`}>{acc.status}</span>
            </div>
          </div>
        ))}
        {accounts.length === 0 && (
          <div className="text-center text-gray-500 py-8">No account entries for today.</div>
        )}
      </div>
    </div>
  );
};

export default TodaysAccounts; 