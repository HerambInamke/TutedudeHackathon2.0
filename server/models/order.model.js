const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
      productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false // Made optional for group buy orders
  },
    quantity: {
        type: Number,
        required: true,
        min: 0.1
    },
    unit: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true,
        min: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    deliveryTimeSlot: {
        type: String,
        required: true
    },
      status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderType: {
    type: String,
    enum: ['regular', 'groupBuy'],
    default: 'regular'
  },
  groupBuyDealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupBuy'
  },
  isRated: {
    type: Boolean,
    default: false
  },
    buyerLocation: {
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
orderSchema.index({ buyerId: 1 });
orderSchema.index({ sellerId: 1 });
orderSchema.index({ productId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ deliveryDate: 1 });

module.exports = mongoose.model('Order', orderSchema);