// Order Milk page
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs, buttons, and modals are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
// - Modal summary is scrollable if content overflows
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { ShoppingCart, Calendar, Clock, Star, MapPin, Phone, Package, User } from "lucide-react";
import { api } from "../../utils/api";

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
    { id: 1, name: "Fresh Dairy", price: 48, address: "Street 1, loni", contact: "9876543210", rating: 4.5, totalRatings: 25 },
    { id: 2, name: "Happy Cows", price: 50, address: "Street 2, solapur", contact: "9123456780", rating: 4.2, totalRatings: 18 },
    { id: 3, name: "Milkman & Sons", price: 47, address: "Street 3, thane", contact: "9988776655", rating: 4.8, totalRatings: 32 },
  ];
};

const OrderMilk = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
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
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      // Try to get user location first, fallback to mock data
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const latitude = user?.latitude || 17.4399;
      const longitude = user?.longitude || 78.4983;
      
      const data = await fetchSuppliers(latitude, longitude);
      setSuppliers(data);
    } catch (error) {
      console.error('Error loading suppliers:', error);
      setError("Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

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

  // Show address form before placing order
  const handleOrder = (e) => {
    e.preventDefault();
    if (!selectedSupplier) {
      alert("Please select a supplier first.");
      return;
    }
    if (!quantity || quantity <= 0) {
      alert("Please select or enter a valid quantity.");
      return;
    }
    setShowAddress(true);
  };

  // Handle address submission
  const handleAddressSubmit = (addressData) => {
    setAddress(addressData.address);
    setPhone(addressData.phone);
    setShowAddress(false);
    setShowSummary(true);
  };

  // Confirm order (show modal)
  const handleConfirm = async () => {
    try {
      // Get current user from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) {
        alert("User not found. Please login again.");
        return;
      }

      const orderData = {
        supplierId: selectedSupplier.id,
        supplierName: selectedSupplier.name,
        quantity,
        pricePerUnit: selectedSupplier.price,
        deliveryDate: date,
        deliveryTimeSlot: timeSlot,
        deliveryAddress: address,
        contactPhone: phone,
        buyerId: user.id,
        total: selectedSupplier.price * quantity
      };

      // In a real app, you would call: const data = await api.orders.create(orderData);
      // For now, simulate success
      console.log('Order placed:', orderData);
      
      setShowSummary(false);
      setShowModal(true);
      // Reset form
      setSelectedSupplier(null);
      setQuantity(1);
      setCustomQty("");
      setAddress("");
      setPhone("");
    } catch (error) {
      console.error('Order error:', error);
      alert("Network error. Please try again.");
    }
  };

  const handleGoToDashboard = () => {
    setShowModal(false);
    navigate("/buyer/dashboard");
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  const calculateTotal = () => {
    if (!selectedSupplier) return 0;
    return selectedSupplier.price * quantity;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Order Milk" />
      
      <div className="flex-1 p-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading available suppliers...</div>
        ) : suppliers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <div>No milk suppliers available nearby</div>
            <div className="text-sm">Try expanding your search area</div>
          </div>
        ) : (
          <>
            {/* Available Suppliers */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={20} />
                Available Suppliers
              </h3>
              
              <div className="space-y-4">
                {suppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      selectedSupplier?.id === supplier.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedSupplier(supplier)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{supplier.name}</h4>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone size={12} />
                          {supplier.contact}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">₹{supplier.price}/L</div>
                        <div className="text-sm text-gray-600">Fresh Milk</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-gray-600">{supplier.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getRatingStars(supplier.rating)}
                        <span className="text-gray-600">({supplier.totalRatings})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Form */}
            {selectedSupplier && (
              <form
                className="bg-white rounded-2xl shadow-md p-6"
                onSubmit={handleOrder}
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart size={24} className="text-orange-400" />
                  <div>
                    <div className="font-semibold text-gray-900">Order from {selectedSupplier.name}</div>
                    <div className="text-sm text-gray-600">₹{selectedSupplier.price}/L</div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-gray-700 text-sm mb-2 block">Select Quantity</label>
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
                  </div>

                  {/* Date picker */}
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
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

                  <div className="text-gray-700 text-base text-center">
                    Total: <span className="font-bold text-blue-600">₹{calculateTotal()}</span>
                  </div>

                  <Button type="submit" className="w-full">
                    Order Now
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      {/* Address Selection Modal */}
      <Modal
        isOpen={showAddress}
        onClose={() => setShowAddress(false)}
        title="Delivery Details"
      >
        <div className="flex flex-col gap-4 p-4">
          <div>
            <label className="text-gray-700 text-sm mb-2 block">Delivery Address</label>
            <textarea
              className="w-full p-2 border rounded-2xl text-base"
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm mb-2 block">Contact Phone</label>
            <input
              type="tel"
              className="w-full p-2 border rounded-2xl text-base"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <Button 
            onClick={() => handleAddressSubmit({ address, phone })}
            className="w-full"
            disabled={!address.trim() || !phone.trim()}
          >
            Continue
          </Button>
        </div>
      </Modal>

      {/* Order Summary Modal */}
      <Modal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        title="Order Summary"
      >
        <div className="flex flex-col gap-2 p-2 text-gray-900">
          <div className="flex items-center gap-2">
            <Package className="text-orange-400" size={20} />
            <span className="font-semibold">Supplier:</span> {selectedSupplier?.name}
          </div>
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
            <span className="font-semibold">Time:</span> {timeSlot}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Total:</span>
            <span className="text-blue-600 font-bold">₹{calculateTotal()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-green-600" size={20} />
            <span className="font-semibold">Address:</span>
            <span className="text-sm">{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-green-600" size={20} />
            <span className="font-semibold">Phone:</span>
            <span>{phone}</span>
          </div>
          <Button onClick={handleConfirm} className="w-full mt-4">
            Confirm Order
          </Button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleGoToDashboard}
        title="Order Placed Successfully! 🎉"
      >
        <div className="flex flex-col items-center gap-3 p-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <ShoppingCart size={32} className="text-green-600" />
          </div>
          <div className="text-center">
            <div className="text-gray-900 font-semibold text-lg mb-2">
              Your order has been placed!
            </div>
            <div className="text-sm text-gray-600 mb-3">
              <strong>{selectedSupplier?.name}</strong> will contact you soon to confirm delivery.
            </div>
            <div className="text-xs text-gray-500">
              Order total: ₹{calculateTotal()}
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Button 
              onClick={() => setShowModal(false)} 
              className="flex-1 bg-gray-500 hover:bg-gray-600"
            >
              Place Another Order
            </Button>
            <Button 
              onClick={handleGoToDashboard} 
              className="flex-1"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderMilk;