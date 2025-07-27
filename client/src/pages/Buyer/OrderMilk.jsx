// Order Milk page
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs, buttons, and modals are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
// - Modal summary is scrollable if content overflows
import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { ShoppingCart, Calendar, Clock, Milk, User } from "lucide-react";

// Dummy milk price per litre
const MILK_PRICE = 50;
const TIME_SLOTS = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
];

// Mock function to simulate fetching suppliers with milk prices
const fetchSuppliers = async (latitude, longitude) => {
  // In a real app, fetch from `/api/suppliers?latitude=...&longitude=...`
  // For now, return mock data
  return [
    { id: 1, name: "Fresh Dairy", price: 48, address: "Street 1, Secunderabad" },
    { id: 2, name: "Happy Cows", price: 50, address: "Street 2, Secunderabad" },
    { id: 3, name: "Milkman & Sons", price: 47, address: "Street 3, Secunderabad" },
  ];
};

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
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);

  // Fetch suppliers on mount (mock location for now)
  useEffect(() => {
    const getSuppliers = async () => {
      setLoadingSuppliers(true);
      // Use mock coordinates for now
      const latitude = 17.4399;
      const longitude = 78.4983;
      const data = await fetchSuppliers(latitude, longitude);
      setSuppliers(data);
      setLoadingSuppliers(false);
    };
    getSuppliers();
  }, []);

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
    if (!selectedSupplier) {
      alert("Please select a supplier to order from.");
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
      <Header title=" " />
      <div className="flex flex-col items-center justify-center flex-1 gap-6 p-4">
        {/* Supplier Comparison Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col items-center gap-4 mb-4">
          <div className="flex flex-col items-center gap-2 w-full">
            <Milk size={48} className="text-blue-400 mb-2" />
            <div className="w-full flex flex-col gap-2">
              {loadingSuppliers ? (
                <div className="text-gray-500 flex items-center justify-center"><User className="mr-2" />...</div>
              ) : suppliers.length === 0 ? (
                <div className="text-gray-500 flex items-center justify-center"><User className="mr-2" />No sellers</div>
              ) : (
                suppliers.map((supplier) => (
                  <button
                    key={supplier.id}
                    type="button"
                    className={`flex items-center justify-between w-full p-3 rounded-xl border-2 transition shadow-sm text-left ${
                      selectedSupplier && selectedSupplier.id === supplier.id
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setSelectedSupplier(supplier)}
                  >
                    <span className="flex items-center gap-2">
                      <User className="text-blue-400" size={28} />
                      <span className="text-lg font-bold text-gray-900">{supplier.name}</span>
                    </span>
                    <span className="text-blue-600 font-bold text-lg">₹{supplier.price}/L</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Order Form */}
        <form
          className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col items-center gap-4"
          onSubmit={handleOrder}
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center justify-center gap-4 w-full mb-2">
              <button type="button" className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold" onClick={() => handleQtyClick(Math.max(1, quantity - 1))}>-</button>
              <span className="text-2xl font-bold text-gray-900 w-10 text-center">{quantity}</span>
              <button type="button" className="bg-orange-300 rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold text-white" onClick={() => handleQtyClick(quantity + 1)}>+</button>
              <Milk size={32} className="text-blue-400 ml-2" />
            </div>
            {/* Date picker */}
            <div className="w-full flex items-center gap-2 mt-2">
              <Calendar className="text-blue-600" size={24} />
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
              <Clock className="text-blue-600" size={24} />
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
              <span className="font-bold text-blue-600">₹{selectedSupplier ? selectedSupplier.price * quantity : "-"}</span>
            </div>
            <Button type="submit" className="w-full mt-4 flex items-center justify-center gap-2 text-lg">
              <ShoppingCart size={24} />
            </Button>
          </div>
        </form>
      </div>
      {/* Order Summary Modal */}
      <Modal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        title=" "
      >
        <div className="flex flex-col gap-2 p-2 text-gray-900">
          <div className="flex items-center gap-2">
            <Milk className="text-blue-400" size={28} />
            <span className="font-semibold">{selectedSupplier ? selectedSupplier.name : "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">₹{selectedSupplier ? selectedSupplier.price : "-"}/L</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{quantity}L</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            <span className="font-semibold">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-blue-600" size={20} />
            <span className="font-semibold">{timeSlot}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold">₹{selectedSupplier ? selectedSupplier.price * quantity : "-"}</span>
          </div>
          <Button onClick={handleConfirm} className="w-full mt-2 flex items-center justify-center gap-2 text-lg">
            <ShoppingCart size={24} />
          </Button>
        </div>
      </Modal>
      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title=" "
      >
        <div className="flex flex-col items-center gap-2 p-2">
          <Milk size={40} className="text-blue-400" />
          <div className="text-gray-900 font-semibold text-center">Order placed!</div>
          <Button onClick={() => setShowModal(false)} className="mt-2 w-full flex items-center justify-center gap-2 text-lg">
            <ShoppingCart size={24} />
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderMilk; 