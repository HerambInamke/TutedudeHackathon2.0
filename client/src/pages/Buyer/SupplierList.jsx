import React from "react";
import { User } from "lucide-react";

const SupplierList = ({ suppliers, selectedSupplier, onSelect, loading }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col items-center gap-4 mb-4">
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="w-full flex flex-col gap-2">
        {loading ? (
          <div className="text-gray-500 flex items-center justify-center"><User className="mr-2" />...</div>
        ) : suppliers.length === 0 ? (
          <div className="text-gray-500 flex items-center justify-center"><User className="mr-2" />No sellers</div>
        ) : (
          suppliers.map((supplier) => (
            <button
              key={supplier.id}
              type="button"
              className={`flex flex-col items-start w-full p-3 rounded-xl border-2 transition shadow-sm text-left gap-1 ${
                selectedSupplier && selectedSupplier.id === supplier.id
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => onSelect(supplier)}
            >
              <span className="flex items-center gap-2">
                <User className="text-blue-400" size={28} />
                <span className="text-lg font-bold text-gray-900">{supplier.name}</span>
              </span>
              <span className="text-gray-700 text-sm">{supplier.address}</span>
              <span className="text-gray-700 text-sm">Contact: {supplier.contact}</span>
              <span className="text-blue-600 font-bold text-lg mt-1">₹{supplier.price}/L</span>
            </button>
          ))
        )}
      </div>
    </div>
  </div>
);

export default SupplierList; 