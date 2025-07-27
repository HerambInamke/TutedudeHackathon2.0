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
import Sidebar from "../../components/Sidebar";
import AddressSelection from "../../components/AddressSelection";
import SupplierList from "./SupplierList";
import OrderForm from "./OrderForm";

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
    { id: 1, name: "Fresh Dairy", price: 48, address: "Street 1, loni", contact: "9876543210" },
    { id: 2, name: "Happy Cows", price: 50, address: "Street 2, solapur", contact: "9123456780" },
    { id: 3, name: "Milkman & Sons", price: 47, address: "Street 3, thane", contact: "9988776655" },
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
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

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
    setShowAddress(true);
  };

  // Handle address submission
  const handleAddressSubmit = ({ address, phone }) => {
    setAddress(address);
    setPhone(phone);
    setShowAddress(false);
    setShowSummary(true);
  };

  // Confirm order (show modal)
  const handleConfirm = () => {
    setShowSummary(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-1 gap-10 p-6 md:ml-64">
        <SupplierList
          suppliers={suppliers}
          selectedSupplier={selectedSupplier}
          onSelect={setSelectedSupplier}
          loading={loadingSuppliers}
        />
        <OrderForm
          quantity={quantity}
          setQuantity={setQuantity}
          date={date}
          setDate={setDate}
          timeSlot={timeSlot}
          setTimeSlot={setTimeSlot}
          onOrder={handleOrder}
          selectedSupplier={selectedSupplier}
        />
      </div>
      {/* Address Selection Modal */}
      <Modal
        isOpen={showAddress}
        onClose={() => setShowAddress(false)}
        title="Delivery Details"
      >
        <AddressSelection
          initialAddress={address}
          initialPhone={phone}
          onSubmit={handleAddressSubmit}
        />
      </Modal>
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
          <div className="flex items-center gap-2">
            <span className="font-semibold">Address:</span>
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Phone:</span>
            <span>{phone}</span>
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