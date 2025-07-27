// Order Milk page
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs, buttons, and modals are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
// - Modal summary is scrollable if content overflows
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { ShoppingCart, Calendar, Clock, Star, MapPin, Phone, Package } from "lucide-react";
import { api } from "../../utils/api";
=======
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { ShoppingCart, Calendar, Clock, Milk, User } from "lucide-react";
<<<<<<< HEAD
>>>>>>> a0effacb7956357fa530931938566723480723a5
=======
import Sidebar from "../../components/Sidebar";
import AddressSelection from "../../components/AddressSelection";
import SupplierList from "./SupplierList";
import OrderForm from "./OrderForm";
>>>>>>> fba3abac8a5881ec0b79cf5ad99337649c8cfa19

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
<<<<<<< HEAD
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
=======
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
>>>>>>> a0effacb7956357fa530931938566723480723a5

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
<<<<<<< HEAD
    if (quantity > selectedProduct.stock) {
      alert(`Only ${selectedProduct.stock} ${selectedProduct.unit} available.`);
=======
    if (!selectedSupplier) {
      alert("Please select a supplier to order from.");
>>>>>>> a0effacb7956357fa530931938566723480723a5
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
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-100 flex flex-col">
<<<<<<< HEAD
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

=======
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
>>>>>>> a0effacb7956357fa530931938566723480723a5
=======
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
>>>>>>> fba3abac8a5881ec0b79cf5ad99337649c8cfa19
      {/* Order Summary Modal */}
      <Modal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        title=" "
      >
        <div className="flex flex-col gap-2 p-2 text-gray-900">
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <Package className="text-orange-400" size={20} />
            <span className="font-semibold">Product:</span> {selectedProduct?.name}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Seller:</span> {selectedProduct?.sellerId?.name}
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-orange-400" size={20} />
            <span className="font-semibold">Quantity:</span> {quantity} {selectedProduct?.unit}
=======
            <Milk className="text-blue-400" size={28} />
            <span className="font-semibold">{selectedSupplier ? selectedSupplier.name : "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">₹{selectedSupplier ? selectedSupplier.price : "-"}/L</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{quantity}L</span>
>>>>>>> a0effacb7956357fa530931938566723480723a5
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
<<<<<<< HEAD
            <span className="font-semibold">Total:</span>
            <span className="text-blue-600 font-bold">₹{calculateTotal()}</span>
=======
            <span className="text-blue-600 font-bold">₹{selectedSupplier ? selectedSupplier.price * quantity : "-"}</span>
>>>>>>> a0effacb7956357fa530931938566723480723a5
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
<<<<<<< HEAD
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
=======
        onClose={() => setShowModal(false)}
        title=" "
      >
        <div className="flex flex-col items-center gap-2 p-2">
          <Milk size={40} className="text-blue-400" />
          <div className="text-gray-900 font-semibold text-center">Order placed!</div>
          <Button onClick={() => setShowModal(false)} className="mt-2 w-full flex items-center justify-center gap-2 text-lg">
            <ShoppingCart size={24} />
          </Button>
>>>>>>> a0effacb7956357fa530931938566723480723a5
        </div>
      </Modal>
    </div>
  );
};

export default OrderMilk; 