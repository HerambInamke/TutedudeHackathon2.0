import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { Package, DollarSign, Info } from "lucide-react";

const AddProductModal = ({ isOpen, onClose, onSuccess, category = "milk" }) => {
  const [formData, setFormData] = useState({
    name: category === "milk" ? "Fresh Milk" : "",
    category: category,
    price: "",
    unit: category === "milk" ? "L" : "kg",
    description: "",
    stock: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get current user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error("User not found. Please login again.");
      }

      const productData = {
        ...formData,
        sellerId: user.id,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      };

      const data = await api.products.add(productData);

      if (data.success) {
        onSuccess(data.data);
        onClose();
        // Reset form
        setFormData({
          name: category === "milk" ? "Fresh Milk" : "",
          category: category,
          price: "",
          unit: category === "milk" ? "L" : "kg",
          description: "",
          stock: ""
        });
      } else {
        setError(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error('Add product error:', error);
      setError(error.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = () => {
    return category === "milk" ? "Supply Milk" : "Add Other Item";
  };

  const getCategoryIcon = () => {
    return category === "milk" ? "🥛" : "📦";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getCategoryTitle()}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Package size={16} className="text-blue-600" />
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="p-2 border rounded text-base"
            placeholder={category === "milk" ? "Fresh Milk" : "Product name"}
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <DollarSign size={16} className="text-green-600" />
            Price per {formData.unit}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">₹</span>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              className="flex-1 p-2 border rounded text-base"
              placeholder="0.00"
              value={formData.price}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <span className="text-gray-500 text-sm">per {formData.unit}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Package size={16} className="text-orange-600" />
            Unit
          </label>
          <select
            name="unit"
            className="p-2 border rounded text-base"
            value={formData.unit}
            onChange={handleInputChange}
            disabled={loading}
          >
            <option value="L">Liters (L)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="pcs">Pieces (pcs)</option>
            <option value="dozen">Dozen</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Package size={16} className="text-purple-600" />
            Available Stock ({formData.unit})
          </label>
          <input
            type="number"
            name="stock"
            min="0"
            className="p-2 border rounded text-base"
            placeholder="0"
            value={formData.stock}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Info size={16} className="text-gray-600" />
            Description (Optional)
          </label>
          <textarea
            name="description"
            className="p-2 border rounded text-base resize-none"
            placeholder="Add any additional details about your product..."
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div className="flex gap-2 mt-2">
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
            {loading ? "Adding..." : `Add ${category === "milk" ? "Milk" : "Product"}`}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal; 