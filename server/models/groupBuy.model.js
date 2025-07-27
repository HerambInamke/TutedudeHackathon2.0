const mongoose = require('mongoose');

const groupBuySchema = new mongoose.Schema({
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  productName: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['milk', 'other'], 
    required: true 
  },
  originalPrice: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  discountedPrice: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  unit: { 
    type: String, 
    required: true, 
    default: 'L' 
  },
  targetQuantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  pledgedQuantity: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  // Removed deadline - deals close when target is reached
  status: { 
    type: String, 
    enum: ['active', 'success', 'failed'], 
    default: 'active' 
  },
  description: { 
    type: String, 
    default: '' 
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
  },
  participants: [{
    buyerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    pledgedQuantity: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    pledgedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  successOrders: [{
    orderId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order' 
    },
    buyerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    quantity: { 
      type: Number 
    },
    totalAmount: { 
      type: Number 
    }
  }]
}, { 
  timestamps: true 
});

// Indexes for efficient queries
groupBuySchema.index({ sellerId: 1 });
groupBuySchema.index({ status: 1 });
groupBuySchema.index({ deadline: 1 });
groupBuySchema.index({ location: '2dsphere' });
groupBuySchema.index({ category: 1 });
groupBuySchema.index({ 'participants.buyerId': 1 });

// Virtual for progress percentage
groupBuySchema.virtual('progressPercentage').get(function() {
  return Math.min((this.pledgedQuantity / this.targetQuantity) * 100, 100);
});

// Virtual for time remaining - removed since no deadline

// Virtual for savings per unit
groupBuySchema.virtual('savingsPerUnit').get(function() {
  return this.originalPrice - this.discountedPrice;
});

// Virtual for total savings percentage
groupBuySchema.virtual('savingsPercentage').get(function() {
  return ((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100;
});

module.exports = mongoose.model('GroupBuy', groupBuySchema); 