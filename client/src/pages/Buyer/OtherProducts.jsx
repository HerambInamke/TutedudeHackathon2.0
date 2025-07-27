import React, { useState } from "react";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

const PRODUCTS = [
  { id: 1, name: "Sugar", unit: "kg", price: 45 },
  { id: 2, name: "Tea Powder", unit: "kg", price: 320 },
  { id: 3, name: "Potato", unit: "kg", price: 30 },
  { id: 4, name: "Pav", unit: "pack (6)", price: 25 },
  { id: 5, name: "Masala (Vada Pav)", unit: "pack", price: 40 },
  { id: 6, name: "Milk", unit: "L", price: 50 },
  { id: 7, name: "Coffee Powder", unit: "kg", price: 400 },
  { id: 8, name: "Snacks Mix", unit: "pack", price: 60 },
];

const OtherProducts = () => {
  const [quantities, setQuantities] = useState(PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
  const [showSummary, setShowSummary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, Number(value)) }));
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Order Other Products" />
      <form className="flex flex-col items-center justify-center flex-1 gap-6 p-4" onSubmit={handleOrder}>
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col items-center gap-4">
          <div className="text-lg font-semibold text-gray-900 mb-2">Select Products</div>
          <div className="w-full flex flex-col gap-3">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="flex items-center gap-2 justify-between">
                <span className="font-medium text-gray-800">{product.name}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  className="w-16 p-1 border rounded text-base text-center"
                  value={quantities[product.id]}
                  onChange={(e) => handleQtyChange(product.id, e.target.value)}
                />
                <span className="text-xs text-gray-500">{product.unit}</span>
                <span className="text-xs text-blue-600 font-bold">₹{product.price}/{product.unit}</span>
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full mt-4">
            Order Now
          </Button>
        </div>
      </form>
      {/* Order Summary Modal */}
      <Modal isOpen={showSummary} onClose={() => setShowSummary(false)} title="Order Summary">
        <div className="flex flex-col gap-2 p-2 text-gray-900">
          {selectedProducts.map((p) => (
            <div key={p.id} className="flex justify-between items-center">
              <span>{p.name} ({quantities[p.id]} {p.unit})</span>
              <span>₹{p.price * quantities[p.id]}</span>
            </div>
          ))}
          <div className="flex justify-between items-center font-bold mt-2">
            <span>Total:</span>
            <span className="text-blue-600">₹{total}</span>
          </div>
          <Button onClick={handleConfirm} className="w-full mt-2">
            Confirm Order
          </Button>
        </div>
      </Modal>
      {/* Success Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Order Placed!">
        <div className="flex flex-col items-center gap-2 p-2">
          <div className="text-gray-900 font-semibold">Your order was placed successfully!</div>
          <Button onClick={() => setShowModal(false)} className="mt-2 w-full">
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OtherProducts; 