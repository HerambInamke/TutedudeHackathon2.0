const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['milk', 'other'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: true,
        default: 'L' // L for liters, kg for kilograms, etc.
    },
    description: {
        type: String,
        default: ''
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    sellerRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, { timestamps: true });

// Indexes for efficient queries
productSchema.index({ sellerId: 1 });
productSchema.index({ category: 1 });
productSchema.index({ location: '2dsphere' });
productSchema.index({ isAvailable: 1 });

module.exports = mongoose.model('Product', productSchema);
