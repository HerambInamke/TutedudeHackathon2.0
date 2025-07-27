import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Users, Tag, Package, Star } from 'lucide-react';
import { api } from '../utils/api';

const JoinGroupBuyModal = ({ isOpen, onClose, deal, onJoined }) => {
  const [pledgedQuantity, setPledgedQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Don't render if no deal is provided
  if (!deal) {
    return null;
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setPledgedQuantity(value);
    }
  };

  const handleJoin = async () => {
    setLoading(true);
    setError('');

    try {
      const joinData = {
        dealId: deal._id,
        buyerId: user.id,
        pledgedQuantity
      };

      const data = await api.groupBuy.join(joinData);

      if (data.success) {
        onJoined(data.data);
        onClose();
      } else {
        setError(data.message || 'Failed to join group buy deal');
      }
    } catch (error) {
      console.error('Join group buy deal error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalSavings = () => {
    if (!deal) return 0;
    const savingsPerUnit = deal.originalPrice - deal.discountedPrice;
    return savingsPerUnit * pledgedQuantity;
  };

  const progressPercentage = deal ? Math.min((deal.pledgedQuantity / deal.targetQuantity) * 100, 100) : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Group Buy Deal">
      <div className="space-y-4">
        {/* Deal Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{deal?.productName || 'Unknown Product'}</h3>
              <p className="text-sm text-gray-600">by {deal?.sellerId?.name || 'Unknown Seller'}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-600">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium">{deal?.sellerId?.rating || 0}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-600">Original Price</p>
              <p className="font-semibold text-gray-900">₹{deal?.originalPrice || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Discounted Price</p>
              <p className="font-semibold text-green-600">₹{deal?.discountedPrice || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-green-700 text-sm">
            <Tag size={16} />
            <span>Save ₹{((deal?.originalPrice || 0) - (deal?.discountedPrice || 0)).toFixed(2)} per {deal?.unit || 'unit'}</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">
              {deal?.pledgedQuantity || 0} / {deal?.targetQuantity || 0} {deal?.unit || 'unit'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(1)}% complete</p>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} />
          <span>{deal?.participants?.length || 0} participants</span>
        </div>

        {/* Quantity Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How much do you want to pledge?
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={pledgedQuantity}
              onChange={handleQuantityChange}
              min="1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600">{deal?.unit || 'unit'}</span>
          </div>
        </div>

        {/* Total Calculation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Cost:</span>
            <span className="font-semibold text-gray-900">₹{(pledgedQuantity * (deal?.discountedPrice || 0)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-600">Total Savings:</span>
            <span className="text-green-600 font-medium">₹{calculateTotalSavings().toFixed(2)}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="font-medium mb-1">Important:</p>
          <ul className="space-y-1">
            <li>• Your order will only be confirmed if the target quantity is met</li>
            <li>• If the target is not met, no charges will be made</li>
            <li>• You can't cancel your pledge once submitted</li>
            <li>• Deal closes automatically when target is reached</li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleJoin}
            className="flex-1"
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Deal'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default JoinGroupBuyModal; 