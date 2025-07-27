import React from "react";
import { User, MapPin, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dummy data for suppliers
const SUPPLIERS = [
  { id: 1, name: "Fresh Dairy", address: "Street 1, Secunderabad" },
  { id: 2, name: "Happy Cows", address: "Street 2, Secunderabad" },
  { id: 3, name: "Milkman & Sons", address: "Street 3, Secunderabad" },
];

export default function SuppliersList() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={28} className="text-orange-400" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Suppliers Nearby</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {SUPPLIERS.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
            <User size={36} className="text-blue-400" />
            <div>
              <div className="font-bold text-lg text-gray-900">{s.name}</div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={16} /> {s.address}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 