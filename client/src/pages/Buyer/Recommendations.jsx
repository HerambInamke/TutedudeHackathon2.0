import React from "react";
import { Star, ArrowLeft, ShoppingCart, Milk, Candy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RECOMMENDATIONS = [
  { id: 1, icon: <Milk size={28} className="text-blue-400" />, text: "Order Milk for tomorrow" },
  { id: 2, icon: <Candy size={28} className="text-pink-400" />, text: "Add Sugar to your order" },
  { id: 3, icon: <ShoppingCart size={28} className="text-emerald-600" />, text: "Check out Other Products" },
];

export default function Recommendations() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={28} className="text-orange-400" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Star className="text-yellow-400" /> Recommendations</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {RECOMMENDATIONS.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
            {r.icon}
            <div className="font-bold text-lg text-gray-900">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 