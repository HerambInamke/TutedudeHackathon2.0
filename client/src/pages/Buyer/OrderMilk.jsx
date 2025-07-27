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
import { ShoppingCart, Calendar, Clock, Star, MapPin, Phone, Package } from "lucide-react";
import { api } from "../../utils/api";

const TIME_SLOTS = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
];

const OrderMilk = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const params = {
        category: 'milk',
        latitude: user?.latitude,
        longitude: user?.longitude,
        maxDistance: 10000 // 10km radius
      };
      
      const response = await api.products.getAll(params);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setError("Failed to load products");
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

  // Show summary before placing order
  const handleOrder = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert("Please select a seller first.");
      return;
    }
    if (!quantity || quantity <= 0) {
      alert("Please select or enter a valid quantity.");
      return;
    }
    if (quantity > selectedProduct.stock) {
      alert(`Only ${selectedProduct.stock} ${selectedProduct.unit} available.`);
      return;
    }
    setShowSummary(true);
  };

  // Confirm order (show modal)
  const handleConfirm = async () => {
    try {
      // Get current user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert("User not found. Please login again.");
        return;
      }

      const orderData = {
        productId: selectedProduct._id,
        quantity,
        deliveryDate: date,
        deliveryTimeSlot: timeSlot,
        buyerId: user.id
      };

      const data = await api.orders.create(orderData);

      if (data.success) {
        setShowSummary(false);
        setShowModal(true);
        // Reset form
        setSelectedProduct(null);
        setQuantity(1);
        setCustomQty("");
      } else {
        alert(data.message || "Failed to place order");
      }
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
    if (!selectedProduct) return 0;
    return selectedProduct.price * quantity;
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
          <div className="text-center py-8 text-gray-500">Loading available sellers...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <div>No milk suppliers available nearby</div>
            <div className="text-sm">Try expanding your search area</div>
          </div>
        ) : (
          <>
            {/* Available Sellers */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={20} />
                Available Sellers
              </h3>
              
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      selectedProduct?._id === product._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <div className="text-sm text-gray-600">{product.sellerId?.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">₹{product.price}/{product.unit}</div>
                        <div className="text-sm text-gray-600">Stock: {product.stock} {product.unit}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-gray-600">{product.sellerId?.addressLine1}, {product.sellerId?.state}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getRatingStars(product.sellerRating)}
                        <span className="text-gray-600">({product.totalRatings})</span>
                      </div>
                    </div>
                    
                    {product.description && (
                      <div className="text-sm text-gray-600 mt-2">{product.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Form */}
            {selectedProduct && (
              <form
                className="bg-white rounded-2xl shadow-md p-6"
                onSubmit={handleOrder}
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart size={24} className="text-orange-400" />
                  <div>
                    <div className="font-semibold text-gray-900">Order from {selectedProduct.sellerId?.name}</div>
                    <div className="text-sm text-gray-600">₹{selectedProduct.price}/{selectedProduct.unit}</div>
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
                          {q}{selectedProduct.unit}
                        </button>
                      ))}
                    </div>
                    {/* Custom quantity input */}
                    <div className="w-full flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        placeholder={`Custom (${selectedProduct.unit})`}
                        className="flex-1 p-2 border rounded-2xl text-base"
                        value={customQty}
                        onChange={handleCustomQty}
                      />
                      <span className="text-gray-500 text-sm">{selectedProduct.unit}</span>
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

      {/* Order Summary Modal */}
      <Modal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        title="Order Summary"
      >
        <div className="flex flex-col gap-2 p-2 text-gray-900">
          <div className="flex items-center gap-2">
            <Package className="text-orange-400" size={20} />
            <span className="font-semibold">Product:</span> {selectedProduct?.name}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Seller:</span> {selectedProduct?.sellerId?.name}
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-orange-400" size={20} />
            <span className="font-semibold">Quantity:</span> {quantity} {selectedProduct?.unit}
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
            <span className="text-blue-600 font-bold">₹{calculateTotal()}</span>
          </div>
          <Button onClick={handleConfirm} className="w-full mt-2">
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
              <strong>{selectedProduct?.sellerId?.name}</strong> will contact you soon to confirm delivery.
            </div>
            <div className="text-xs text-gray-500">
              Order ID: {selectedProduct?._id?.slice(-8)}
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