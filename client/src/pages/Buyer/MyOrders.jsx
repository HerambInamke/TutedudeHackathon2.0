// My Orders page
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Order cards are large, spaced, and readable on small screens
// - Layout is single column, max-w-xs for best fit on small screens
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import RatingModal from "../../components/RatingModal";
import { List, Star, User, Package, Calendar, Clock } from "lucide-react";
import { api } from "../../utils/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setError("User not found. Please login again.");
        return;
      }

      const response = await api.orders.getBuyerOrders(user.id);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSuccess = () => {
    loadOrders(); // Refresh orders to update rating status
  };

  const handleRateOrder = (order) => {
    setSelectedOrder(order);
    setShowRatingModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'delivered': return '🎉';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="My Orders" />
      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <List className="text-blue-600" size={24} />
            <span className="text-lg font-bold text-gray-900">Order History</span>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <div>No orders yet</div>
              <div className="text-sm">Place your first order from the Order Milk page</div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4"
                >
                  {/* Order Header */}
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
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  {/* Seller Information */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={14} className="text-blue-600" />
                      <span className="font-medium text-gray-900">{order.sellerId?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📞 {order.sellerId?.phoneNumber}</span>
                      {order.sellerId?.rating && (
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400" />
                          <span>{order.sellerId.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <div className="font-semibold text-green-600">₹{order.totalAmount}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <div className="font-medium">{formatDate(order.createdAt)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Delivery Date:</span>
                      <div className="font-medium">{formatDate(order.deliveryDate)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Time Slot:</span>
                      <div className="font-medium">{order.deliveryTimeSlot}</div>
                    </div>
                  </div>

                  {/* Rating Button for Delivered Orders */}
                  {order.status === 'delivered' && !order.isRated && (
                    <Button
                      onClick={() => handleRateOrder(order)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600"
                    >
                      <Star size={16} className="mr-2" />
                      Rate This Order
                    </Button>
                  )}

                  {order.status === 'delivered' && order.isRated && (
                    <div className="text-center py-2 text-sm text-green-600 bg-green-50 rounded">
                      ✅ Order Rated
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSuccess={handleRatingSuccess}
        orderData={selectedOrder}
      />
    </div>
  );
};

export default MyOrders; 