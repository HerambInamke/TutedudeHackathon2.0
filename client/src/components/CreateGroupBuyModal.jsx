import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Users, Clock, Tag, Package } from 'lucide-react';
import { api } from '../utils/api';

const CreateGroupBuyModal = ({ isOpen, onClose, onDealCreated, category = 'milk' }) => {
  const [formData, setFormData] = useState({
    productName: '',
    originalPrice: '',
    discountedPrice: '',
    unit: 'L',
    targetQuantity: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.productName || !formData.originalPrice || !formData.discountedPrice || 
          !formData.targetQuantity) {
        setError('Please fill in all required fields');
        return;
      }

      if (parseFloat(formData.discountedPrice) >= parseFloat(formData.originalPrice)) {
        setError('Discounted price must be less than original price');
        return;
      }

      if (parseInt(formData.targetQuantity) < 1) {
        setError('Target quantity must be at least 1');
        return;
      }

      const dealData = {
        sellerId: user.id,
        productName: formData.productName,
        category,
        originalPrice: parseFloat(formData.originalPrice),
        discountedPrice: parseFloat(formData.discountedPrice),
        unit: formData.unit,
        targetQuantity: parseInt(formData.targetQuantity),
        description: formData.description
      };

      const data = await api.groupBuy.create(dealData);

      if (data.success) {
        // Reset form
        setFormData({
          productName: '',
          originalPrice: '',
          discountedPrice: '',
          unit: 'L',
          targetQuantity: '',
          description: ''
        });
        onDealCreated(data.data);
        onClose();
      } else {
        setError(data.message || 'Failed to create group buy deal');
      }
    } catch (error) {
      console.error('Create group buy deal error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateSavings = () => {
    const original = parseFloat(formData.originalPrice) || 0;
    const discounted = parseFloat(formData.discountedPrice) || 0;
    if (original > 0 && discounted > 0) {
      const savings = original - discounted;
      const percentage = ((savings / original) * 100).toFixed(1);
      return { savings, percentage };
    }
    return { savings: 0, percentage: 0 };
  };

  const { savings, percentage } = calculateSavings();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Create ${category === 'milk' ? 'Milk' : 'Product'} Group Buy Deal`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder={`Enter ${category} product name`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Price (₹) *
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discounted Price (₹) *
            </label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {savings > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <div className="flex items-center gap-2 text-green-700">
              <Tag size={16} />
              <span className="font-medium">Savings: ₹{savings.toFixed(2)} ({percentage}% off)</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit *
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="L">Liters (L)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="pcs">Pieces (pcs)</option>
              <option value="dozen">Dozen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Quantity *
            </label>
            <input
              type="number"
              name="targetQuantity"
              value={formData.targetQuantity}
              onChange={handleInputChange}
              placeholder="50"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>



        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add any additional details about this deal..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Deal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGroupBuyModal; 