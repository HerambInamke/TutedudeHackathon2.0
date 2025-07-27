import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import JoinGroupBuyModal from "../../components/JoinGroupBuyModal";
import { Users, Clock, Tag, Package, Star, MapPin, Phone, TrendingUp, Filter } from "lucide-react";
import { api } from "../../utils/api";

const GroupBuy = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [category, setCategory] = useState('all');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadDeals();
  }, [category]);

  const loadDeals = async () => {
    try {
      setLoading(true);
      console.log('Loading deals for user:', user);
      
      const params = {
        buyerId: user.id
      };
      
      // Only add location if available
      if (user.latitude && user.longitude) {
        params.latitude = user.latitude;
        params.longitude = user.longitude;
      }
      
      if (category !== 'all') {
        params.category = category;
      }

      console.log('API params:', params);
      const data = await api.groupBuy.getActive(params);
      console.log('API response:', data);

      if (data.success) {
        setDeals(data.data);
      } else {
        setError(data.message || 'Failed to load deals');
      }
    } catch (error) {
      console.error('Load deals error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinDeal = (deal) => {
    setSelectedDeal(deal);
    setShowJoinModal(true);
  };

  const handleCloseJoinModal = () => {
    setShowJoinModal(false);
    setSelectedDeal(null);
  };

  const handleJoined = (updatedDeal) => {
    setDeals(prev => prev.map(deal => 
      deal._id === updatedDeal._id ? updatedDeal : deal
    ));
  };

  // Removed formatTimeRemaining function since no deadline

  const getProgressPercentage = (pledged, target) => {
    return Math.min((pledged / target) * 100, 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'success': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'success': return '✅';
      case 'failed': return '❌';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Group Buy Deals" />
      
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              category === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            All Deals
          </button>
          <button
            onClick={() => setCategory('milk')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              category === 'milk' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Milk
          </button>
          <button
            onClick={() => setCategory('other')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              category === 'other' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Other Items
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : deals.length > 0 ? (
          deals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-orange-400" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{deal.productName}</h3>
                    <p className="text-sm text-gray-600">by {deal.sellerId?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500" fill="currentColor" />
                  <span className="text-sm font-medium">{deal.sellerId?.rating || 0}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <span className="text-gray-500 line-through">₹{deal.originalPrice}</span>
                  <span className="text-green-600 font-bold ml-2">₹{deal.discountedPrice}</span>
                  <span className="text-gray-500">/{deal.unit}</span>
                </div>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Save ₹{(deal.originalPrice - deal.discountedPrice).toFixed(2)}
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">
                    {deal.pledgedQuantity} / {deal.targetQuantity} {deal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(deal.pledgedQuantity, deal.targetQuantity)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {getProgressPercentage(deal.pledgedQuantity, deal.targetQuantity).toFixed(1)}% complete
                </p>
              </div>

              {/* Participants */}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users size={16} />
                <span>{deal.participants?.length || 0} participants</span>
              </div>

              {/* Status & Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-lg">{getStatusIcon(deal.status)}</span>
                  <span className={`text-sm font-medium ${getStatusColor(deal.status)}`}>
                    {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                  </span>
                </div>
                
                {deal.status === 'active' && !deal.userParticipation && (
                  <Button 
                    onClick={() => handleJoinDeal(deal)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Join Deal
                  </Button>
                )}
                
                {deal.userParticipation && (
                  <div className="text-green-600 text-sm font-medium">
                    You pledged {deal.userParticipation.pledgedQuantity} {deal.unit}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No group buy deals available</p>
            <p className="text-sm">Check back later for new deals!</p>
          </div>
        )}
      </div>

      {/* Join Modal */}
      {selectedDeal && (
        <JoinGroupBuyModal
          isOpen={showJoinModal}
          onClose={handleCloseJoinModal}
          deal={selectedDeal}
          onJoined={handleJoined}
        />
      )}
    </div>
  );
};

export default GroupBuy; 