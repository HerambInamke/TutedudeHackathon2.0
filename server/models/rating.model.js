const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        maxlength: 500,
        default: ''
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
}, { timestamps: true });

// Ensure one rating per buyer per product per order
ratingSchema.index({ buyerId: 1, productId: 1, orderId: 1 }, { unique: true });

// Index for efficient queries
ratingSchema.index({ productId: 1 });
ratingSchema.index({ sellerId: 1 });

module.exports = mongoose.model('Rating', ratingSchema); 