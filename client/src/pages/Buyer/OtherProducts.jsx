import React, { useState } from "react";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Sidebar from "../../components/Sidebar";
import { Milk, Coffee, Candy, Bread, Soup, ShoppingCart, Leaf, EggFried, Smile, Cookie, CupSoda, Apple, Carrot, ShoppingBasket } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Tea Leaves", icon: <Leaf size={36} className="text-green-600" />, unit: "100g", price: 30 },
  { id: 2, name: "Sugar", icon: <Candy size={36} className="text-pink-400" />, unit: "kg", price: 45 },
  { id: 3, name: "Ginger", icon: <Carrot size={36} className="text-orange-700" />, unit: "100g", price: 20 },
  { id: 4, name: "Biscuits", icon: <Cookie size={36} className="text-yellow-500" />, unit: "pack", price: 25 },
  { id: 5, name: "Milk", icon: <Milk size={36} className="text-blue-400" />, unit: "L", price: 50 },
  { id: 6, name: "Coffee Powder", icon: <Coffee size={36} className="text-brown-600" />, unit: "100g", price: 40 },
  { id: 7, name: "Snacks Mix", icon: <Smile size={36} className="text-emerald-400" />, unit: "pack", price: 60 },
  { id: 8, name: "Apple", icon: <Apple size={36} className="text-red-500" />, unit: "each", price: 15 },
  { id: 9, name: "Soft Drink", icon: <CupSoda size={36} className="text-cyan-500" />, unit: "bottle", price: 20 },
  { id: 10, name: "Bread", icon: <Bread size={36} className="text-yellow-500" />, unit: "pack (6)", price: 25 },
  { id: 11, name: "Masala (Vada Pav)", icon: <Soup size={36} className="text-orange-500" />, unit: "pack", price: 40 },
  { id: 12, name: "Potato", icon: <EggFried size={36} className="text-yellow-700" />, unit: "kg", price: 30 },
  { id: 13, name: "Basket Combo", icon: <ShoppingBasket size={36} className="text-blue-700" />, unit: "combo", price: 120 },
];

const OtherProducts = () => {
  const [quantities, setQuantities] = useState(PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
  const [showSummary, setShowSummary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const hasQty = Object.values(quantities).some((q) => q > 0);
    if (!hasQty) {
      alert("Please select at least one product.");
      return;
    }
    setShowSummary(true);
  };

  const handleConfirm = () => {
    setShowSummary(false);
    setShowModal(true);
  };

  const selectedProducts = PRODUCTS.filter((p) => quantities[p.id] > 0);
  const total = selectedProducts.reduce((sum, p) => sum + p.price * quantities[p.id], 0);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-1 gap-6 p-4 md:ml-64">
        <Header title="Other Products" />
        <form className="flex flex-col items-center justify-center flex-1 gap-6 p-4" onSubmit={handleOrder}>
          <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-xs flex flex-col items-center gap-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="flex flex-col items-center justify-center gap-2 p-2">
                  <div>{product.icon}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <button type="button" className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold" onClick={() => handleQtyChange(product.id, -1)}>-</button>
                    <span className="text-xl font-bold text-gray-900 w-6 text-center">{quantities[product.id]}</span>
                    <button type="button" className="bg-orange-300 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold text-white" onClick={() => handleQtyChange(product.id, 1)}>+</button>
                  </div>
                  <span className="text-xs text-blue-600 font-bold">₹{product.price}/{product.unit}</span>
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 text-lg">
              <ShoppingCart size={24} />
            </Button>
          </div>
        </form>
        {/* Order Summary Modal */}
        <Modal isOpen={showSummary} onClose={() => setShowSummary(false)} title=" ">
          <div className="flex flex-col gap-2 p-2 text-gray-900">
            {selectedProducts.map((p) => (
              <div key={p.id} className="flex justify-between items-center">
                <span className="flex items-center gap-2">{p.icon} {quantities[p.id]} {p.unit}</span>
                <span>₹{p.price * quantities[p.id]}</span>
              </div>
            ))}
            <div className="flex justify-between items-center font-bold mt-2">
              <span>Total:</span>
              <span className="text-blue-600">₹{total}</span>
            </div>
            <Button onClick={handleConfirm} className="w-full mt-2 flex items-center justify-center gap-2 text-lg">
              <ShoppingCart size={24} />
            </Button>
          </div>
        </Modal>
        {/* Success Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title=" ">
          <div className="flex flex-col items-center gap-2 p-2">
            <Smile size={40} className="text-emerald-400" />
            <div className="text-gray-900 font-semibold text-center">Order placed!</div>
            <Button onClick={() => setShowModal(false)} className="mt-2 w-full flex items-center justify-center gap-2 text-lg">
              <ShoppingCart size={24} />
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default OtherProducts; 