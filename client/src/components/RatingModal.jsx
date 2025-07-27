import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { Star, MessageSquare } from "lucide-react";

const RatingModal = ({ isOpen, onClose, onSuccess, orderData }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      // Get current user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error("User not found. Please login again.");
      }

      const ratingData = {
        productId: orderData.productId,
        orderId: orderData._id,
        rating,
        review,
        buyerId: user.id
      };

      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.data);
        onClose();
        // Reset form
        setRating(0);
        setReview("");
      } else {
        setError(data.message || "Failed to submit rating");
      }
    } catch (error) {
      console.error('Rating error:', error);
      setError(error.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`text-2xl transition-colors ${
            i <= (hoverRating || rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  const getRatingText = () => {
    if (rating === 0) return "Select rating";
    if (rating === 1) return "Poor";
    if (rating === 2) return "Fair";
    if (rating === 3) return "Good";
    if (rating === 4) return "Very Good";
    if (rating === 5) return "Excellent";
    return "";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate Your Experience">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">
            How was your experience with this product?
          </div>
          
          <div className="flex justify-center gap-1 mb-2">
            {renderStars()}
          </div>
          
          <div className="text-sm font-medium text-gray-900">
            {getRatingText()}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <MessageSquare size={16} className="text-blue-600" />
            Review (Optional)
          </label>
          <textarea
            className="p-2 border rounded text-base resize-none"
            placeholder="Share your experience with this product..."
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            maxLength={500}
            disabled={loading}
          />
          <div className="text-xs text-gray-500 text-right">
            {review.length}/500
          </div>
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
            disabled={loading || rating === 0}
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RatingModal; 