import React, { useState, useEffect } from "react";
import { Store, Plus, Package, Star, MapPin, Phone, ShoppingCart, Clock, User, TrendingUp } from "lucide-react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import AddProductModal from "../../components/AddProductModal";
import CreateGroupBuyModal from "../../components/CreateGroupBuyModal";
import { api } from "../../utils/api";

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [groupBuyDeals, setGroupBuyDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [groupBuyLoading, setGroupBuyLoading] = useState(true);
  const [showMilkModal, setShowMilkModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showMilkGroupBuyModal, setShowMilkGroupBuyModal] = useState(false);
  const [showOtherGroupBuyModal, setShowOtherGroupBuyModal] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("products"); // "products", "orders", or "groupbuy"

  useEffect(() => {
    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      loadSellerProducts(userData.id);
      loadSellerOrders(userData.id);
      loadSellerGroupBuyDeals(userData.id);
    }
  }, []);

  const loadSellerProducts = async (sellerId) => {
    try {
      setLoading(true);
      const response = await api.products.getBySeller(sellerId);
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

  const loadSellerOrders = async (sellerId) => {
    try {
      setOrdersLoading(true);
      const response = await api.orders.getSellerOrders(sellerId);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setError("Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadSellerGroupBuyDeals = async (sellerId) => {
    try {
      setGroupBuyLoading(true);
      const data = await api.groupBuy.getUserDeals(sellerId);
      if (data.success) {
        setGroupBuyDeals(data.data.sellerDeals || []);
      }
    } catch (error) {
      console.error('Error loading group buy deals:', error);
      setError("Failed to load group buy deals");
    } finally {
      setGroupBuyLoading(false);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.products.delete(productId);
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert("Failed to delete product");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      // Refresh orders
      loadSellerOrders(user.id);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert("Failed to update order status");
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  const handleGroupBuyDealCreated = (newDeal) => {
    // Add the new deal to the list
    setGroupBuyDeals(prev => [newDeal, ...prev]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header title="Seller Dashboard" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500">Please login to access seller dashboard</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Seller Dashboard" />
      
      <div className="flex-1 p-4">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Store size={32} className="text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} />
                <span>{user.phoneNumber}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{user.addressLine1}, {user.state}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400" />
              <span>{user.rating || 0}/5 ({user.totalRatings || 0} ratings)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => setShowMilkModal(true)}
            className="flex items-center justify-center gap-2 py-4"
          >
            <Package size={20} />
            Supply Milk
          </Button>
          
          <Button
            onClick={() => setShowOtherModal(true)}
            className="flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700"
          >
            <Plus size={20} />
            Add Other Items
          </Button>
        </div>

        {/* Group Buy Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => setShowMilkGroupBuyModal(true)}
            className="flex items-center justify-center gap-2 py-4 bg-purple-600 hover:bg-purple-700"
          >
            <TrendingUp size={20} />
            Create Milk Group Buy
          </Button>
          
          <Button
            onClick={() => setShowOtherGroupBuyModal(true)}
            className="flex items-center justify-center gap-2 py-4 bg-orange-600 hover:bg-orange-700"
          >
            <TrendingUp size={20} />
            Create Product Group Buy
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "products"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            My Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "orders"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Incoming Orders ({orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length})
          </button>
          <button
            onClick={() => setActiveTab("groupbuy")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "groupbuy"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Group Buy Deals
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-4">
            {error}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={20} />
              My Products
            </h3>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <div>No products added yet</div>
                <div className="text-sm">Click the buttons above to add your first product</div>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <div className="text-sm text-gray-600">{product.category}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-green-600">₹{product.price}/{product.unit}</span>
                        <span className="text-gray-600">Stock: {product.stock} {product.unit}</span>
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
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingCart size={20} />
              Incoming Orders
            </h3>

            {ordersLoading ? (
              <div className="text-center py-8 text-gray-500">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                <div>No orders yet</div>
                <div className="text-sm">Orders will appear here when customers place them</div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {order.orderType === 'groupBuy' ? 'Group Buy Order' : order.productId?.name}
                        </h4>
                        <div className="text-sm text-gray-600">
                          Quantity: {order.quantity} {order.unit}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    {/* Buyer Information */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-blue-600" />
                        <span className="font-medium text-gray-900">{order.buyerId?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{order.buyerId?.phoneNumber}</span>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Total Amount:</span>
                        <div className="font-semibold text-green-600">₹{order.totalAmount}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Delivery Date:</span>
                        <div className="font-medium">{formatDate(order.deliveryDate)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Time Slot:</span>
                        <div className="font-medium">{order.deliveryTimeSlot}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Order Date:</span>
                        <div className="font-medium">{formatDate(order.createdAt)}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {order.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleUpdateOrderStatus(order._id, 'confirmed')}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          Confirm Order
                        </Button>
                        <Button
                          onClick={() => handleUpdateOrderStatus(order._id, 'cancelled')}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                          Cancel Order
                        </Button>
                      </div>
                    )}

                    {order.status === 'confirmed' && (
                      <Button
                        onClick={() => handleUpdateOrderStatus(order._id, 'delivered')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Mark as Delivered
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Group Buy Tab */}
        {activeTab === "groupbuy" && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              My Group Buy Deals
            </h3>

            {groupBuyLoading ? (
              <div className="text-center py-8 text-gray-500">Loading deals...</div>
            ) : groupBuyDeals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
                <div>No group buy deals created yet</div>
                <div className="text-sm">Create your first deal using the buttons above</div>
              </div>
            ) : (
              <div className="space-y-4">
                {groupBuyDeals.map((deal) => (
                  <div key={deal._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{deal.productName}</h4>
                        <div className="text-sm text-gray-600">{deal.category}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                        {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Original Price:</span>
                        <div className="font-semibold text-gray-900">₹{deal.originalPrice}/{deal.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Discounted Price:</span>
                        <div className="font-semibold text-green-600">₹{deal.discountedPrice}/{deal.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Target Quantity:</span>
                        <div className="font-medium">{deal.targetQuantity} {deal.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Pledged Quantity:</span>
                        <div className="font-medium">{deal.pledgedQuantity} {deal.unit}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs text-gray-600">
                          {Math.min((deal.pledgedQuantity / deal.targetQuantity) * 100, 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((deal.pledgedQuantity / deal.targetQuantity) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                          Participants: {deal.participants?.length || 0}
                        </span>
                        <span className="text-gray-600">
                          Created: {formatDate(deal.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    {deal.description && (
                      <div className="text-sm text-gray-600 mt-2">{deal.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Product Modals */}
      <AddProductModal
        isOpen={showMilkModal}
        onClose={() => setShowMilkModal(false)}
        onSuccess={handleProductAdded}
        category="milk"
      />
      
      <AddProductModal
        isOpen={showOtherModal}
        onClose={() => setShowOtherModal(false)}
        onSuccess={handleProductAdded}
        category="other"
      />

      {/* Group Buy Modals */}
      <CreateGroupBuyModal
        isOpen={showMilkGroupBuyModal}
        onClose={() => setShowMilkGroupBuyModal(false)}
        onDealCreated={handleGroupBuyDealCreated}
        category="milk"
      />
      
      <CreateGroupBuyModal
        isOpen={showOtherGroupBuyModal}
        onClose={() => setShowOtherGroupBuyModal(false)}
        onDealCreated={handleGroupBuyDealCreated}
        category="other"
      />
    </div>
  );
};

export default SellerDashboard; 