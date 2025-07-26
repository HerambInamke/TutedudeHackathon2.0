// Order Milk page
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs, buttons, and modals are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
// - Modal summary is scrollable if content overflows
import React, { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { ShoppingCart, Calendar, Clock } from "lucide-react";

// Dummy milk price per litre
const MILK_PRICE = 50;
const TIME_SLOTS = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
];

const OrderMilk = () => {
  const [quantity, setQuantity] = useState(1);
  const [customQty, setCustomQty] = useState("");
  const [date, setDate] = useState(() => {
    // Default to today in yyyy-mm-dd
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [showSummary, setShowSummary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle quantity selection (preset or custom)
  const handleQtyClick = (q) => {
    setQuantity(q);
    setCustomQty("");
  };

  // Handle custom quantity input
  const handleCustomQty = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setCustomQty(val);
    setQuantity(Number(val) || 0);
  };

  // Show summary before placing order
  const handleOrder = (e) => {
    e.preventDefault();
    if (!quantity || quantity <= 0) {
      alert("Please select or enter a valid quantity.");
      return;
    }
    setShowSummary(true);
  };

  // Confirm order (show modal)
  const handleConfirm = () => {
    setShowSummary(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Order Milk" />
      <form
        className="flex flex-col items-center justify-center flex-1 gap-6 p-4"
        onSubmit={handleOrder}
      >
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col items-center gap-4">
          <ShoppingCart size={40} className="text-orange-400 mb-2" />
          <div className="text-lg font-semibold text-gray-900 mb-2">Select Quantity</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {[1, 2, 5, 10].map((q) => (
              <button
                key={q}
                type="button"
                className={`px-4 py-2 rounded-2xl border-2 font-bold text-lg shadow-sm transition ${
                  quantity === q && !customQty
                    ? "bg-orange-400 text-white border-orange-400"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onClick={() => handleQtyClick(q)}
              >
                {q}L
              </button>
            ))}
          </div>
          {/* Custom quantity input */}
          <div className="w-full flex items-center gap-2 mt-2">
            <input
              type="number"
              min="0.1"
              step="0.1"
              placeholder="Custom (L)"
              className="flex-1 p-2 border rounded-2xl text-base"
              value={customQty}
              onChange={handleCustomQty}
            />
            <span className="text-gray-500 text-sm">L</span>
          </div>
          {/* Date picker */}
          <div className="w-full flex items-center gap-2 mt-2">
            <Calendar className="text-blue-600" size={20} />
            <input
              type="date"
              className="flex-1 p-2 border rounded-2xl text-base"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          {/* Time slot dropdown */}
          <div className="w-full flex items-center gap-2 mt-2">
            <Clock className="text-blue-600" size={20} />
            <select
              className="flex-1 p-2 border rounded-2xl text-base"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="text-gray-700 text-base mt-2">
            Price: <span className="font-bold text-blue-600">₹{MILK_PRICE * quantity}</span>
          </div>
          <Button type="submit" className="w-full mt-4">
            Order Now
          </Button>
        </div>
      </form>
      {/* Order Summary Modal */}
      <Modal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        title="Order Summary"
      >
        <div className="flex flex-col gap-2 p-2 text-gray-900">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-orange-400" size={20} />
            <span className="font-semibold">Quantity:</span> {quantity}L
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            <span className="font-semibold">Date:</span> {date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-blue-600" size={20} />
            <span className="font-semibold">Time Slot:</span> {timeSlot}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Total:</span>
            <span className="text-blue-600 font-bold">₹{MILK_PRICE * quantity}</span>
          </div>
          <Button onClick={handleConfirm} className="w-full mt-2">
            Confirm Order
          </Button>
        </div>
      </Modal>
      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Order Placed!"
      >
        <div className="flex flex-col items-center gap-2 p-2">
          <ShoppingCart size={32} className="text-emerald-400" />
          <div className="text-gray-900 font-semibold">Your milk order was placed successfully!</div>
          <Button onClick={() => setShowModal(false)} className="mt-2 w-full">
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderMilk; 