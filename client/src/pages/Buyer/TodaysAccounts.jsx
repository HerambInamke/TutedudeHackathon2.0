// Today's Accounts page
// - Mobile-first: single column, large cards, touch-friendly
// - Dummy data for today's orders and totals
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { TrendingUp, TrendingDown, BadgeCheck, Loader2, Milk, Bread, Coffee, CreditCard, Wallet, User, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";

// Mock data for daily summary and orders
const DAILY_SUMMARY = {
  totalItems: 3,
  totalAmount: 200,
  suppliers: ["Sharma Milk Center", "Gupta Bakery"],
  paymentMode: "Unpaid",
  carryForward: 50, // positive means due, negative means advance
};

const ORDERS = [
  {
    supplier: "Sharma Milk Center",
    items: [
      { icon: <Milk className="text-blue-400" />, name: "Milk", qty: 1, unit: "L", price: 50 },
      { icon: <Bread className="text-yellow-500" />, name: "Bread", qty: 2, unit: "", price: 25 },
    ],
    status: "Unpaid",
    paymentMode: "Cash",
    paidAt: null,
  },
  {
    supplier: "Gupta Bakery",
    items: [
      { icon: <Coffee className="text-brown-600" />, name: "Tea", qty: 1, unit: "cup", price: 30 },
    ],
    status: "Paid",
    paymentMode: "UPI",
    paidAt: "2024-07-02 10:30",
  },
];

const BALANCE_ENTRIES = [
  { type: "credit", amount: 100, note: "Advance paid", date: "2024-07-01" },
  { type: "debit", amount: 50, note: "Milk order", date: "2024-07-02" },
];

const FILTERS = ["All", "Paid", "Unpaid"];

const TodaysAccounts = () => {
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState(ORDERS);
  const [balanceEntries] = useState(BALANCE_ENTRIES);

  // Payment handler
  const markAsPaid = (supplier) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.supplier === supplier ? { ...o, status: "Paid", paidAt: new Date().toLocaleString() } : o
      )
    );
  };

  // Filtered orders
  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  // Outstanding calculation
  const totalDue = orders
    .filter((o) => o.status === "Unpaid")
    .reduce(
      (sum, o) =>
        sum + o.items.reduce((s, i) => s + i.price * i.qty, 0),
      0
    );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 p-4 flex flex-col gap-6 md:ml-64">
        <Header title="Today's Khata" />
        {/* Daily Summary */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2 items-center mb-2">
          <div className="flex items-center gap-2 text-2xl font-bold text-blue-700">
            <Wallet className="text-orange-400" /> Total Due: ₹{totalDue}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <div className="flex items-center gap-1 text-lg"><User className="text-blue-400" /> Suppliers: {DAILY_SUMMARY.suppliers.join(", ")}</div>
            <div className="flex items-center gap-1 text-lg"><Calendar className="text-orange-400" /> Items: {DAILY_SUMMARY.totalItems}</div>
            <div className="flex items-center gap-1 text-lg"><CreditCard className="text-green-500" /> Payment: {DAILY_SUMMARY.paymentMode}</div>
            <div className="flex items-center gap-1 text-lg"><TrendingUp className="text-emerald-500" /> Carry Forward: <span className={DAILY_SUMMARY.carryForward > 0 ? "text-red-500" : "text-emerald-600"}>{DAILY_SUMMARY.carryForward > 0 ? `+₹${DAILY_SUMMARY.carryForward} due` : `-₹${-DAILY_SUMMARY.carryForward} advance`}</span></div>
          </div>
        </div>
        {/* Filters */}
        <div className="flex gap-2 justify-center mb-2">
          {FILTERS.map((f) => (
            <Button
              key={f}
              className={`px-4 py-1 rounded-full text-sm font-bold ${filter === f ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-200"}`}
              onClick={() => setFilter(f)}
              type="button"
            >
              {f}
            </Button>
          ))}
        </div>
        {/* Per Supplier Breakdown */}
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => {
            const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
            return (
              <div key={order.supplier} className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-1">
                  <User className="text-blue-400" /> {order.supplier}
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-base">
                    {item.icon}
                    <span className="font-bold">{item.qty}{item.unit && <span className="ml-1">{item.unit}</span>}</span>
                    <span className="text-gray-700">{item.name}</span>
                    <span className="ml-auto text-blue-600 font-bold">₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-lg">Total: ₹{total}</span>
                  <span className={`ml-4 px-2 py-1 rounded-full text-xs font-bold ${order.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{order.status}</span>
                  {order.status === "Paid" && order.paidAt && (
                    <span className="ml-2 text-xs text-gray-500">at {order.paidAt}</span>
                  )}
                  {order.status === "Unpaid" && (
                    <Button className="ml-auto px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold" onClick={() => markAsPaid(order.supplier)} type="button">Mark as Paid</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Running Balance Tracker */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2 mt-4">
          <div className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2"><Wallet className="text-orange-400" /> Running Balance</div>
          {balanceEntries.map((entry, idx) => (
            <div key={idx} className="flex items-center gap-2 text-base">
              {entry.type === "credit" ? <TrendingUp className="text-emerald-500" /> : <TrendingDown className="text-red-500" />}
              <span className={entry.type === "credit" ? "text-emerald-600 font-bold" : "text-red-500 font-bold"}>{entry.type === "credit" ? "+" : "-"}₹{entry.amount}</span>
              <span className="text-gray-700">{entry.note}</span>
              <span className="ml-auto text-xs text-gray-400">{entry.date}</span>
            </div>
          ))}
        </div>
        {/* Big Pay Now button if any dues */}
        {totalDue > 0 && (
          <Button className="fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600 text-white text-xl px-8 py-4 rounded-full shadow-lg flex items-center gap-2 z-50">
            <CreditCard size={28} /> Pay Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodaysAccounts; 