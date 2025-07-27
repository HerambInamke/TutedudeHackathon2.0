const GroupBuy = require('../models/groupBuy.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

// Create a new group buy deal
const createGroupBuyDeal = async (req, res) => {
  try {
    const {
      productName,
      category,
      originalPrice,
      discountedPrice,
      unit,
      targetQuantity,
      description
    } = req.body;

    const sellerId = req.body.sellerId;

    // Validation
    if (!productName || !category || !originalPrice || !discountedPrice || 
        !targetQuantity || !sellerId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (discountedPrice >= originalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Discounted price must be less than original price'
      });
    }

    if (targetQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Target quantity must be at least 1'
      });
    }

    // Get seller location
    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    const groupBuyDeal = new GroupBuy({
      sellerId,
      productName,
      category,
      originalPrice,
      discountedPrice,
      unit,
      targetQuantity,
      description: description || '',
      location: {
        type: 'Point',
        coordinates: [seller.longitude, seller.latitude]
      }
    });

    await groupBuyDeal.save();

    res.status(201).json({
      success: true,
      message: 'Group buy deal created successfully',
      data: groupBuyDeal
    });

  } catch (error) {
    console.error('Create group buy deal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all active group buy deals
const getActiveGroupBuyDeals = async (req, res) => {
  try {
    const { latitude, longitude, category, maxDistance = 10000 } = req.query;
    const buyerId = req.query.buyerId;

    let query = { status: 'active' };

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Location-based filtering
    if (latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      };
    }

    const deals = await GroupBuy.find(query)
      .populate('sellerId', 'name phoneNumber rating totalRatings')
      .populate('participants.buyerId', 'name')
      .sort({ createdAt: -1 });

    // Add user participation info if buyerId is provided
    if (buyerId) {
      deals.forEach(deal => {
        deal.userParticipation = deal.participants.find(
          p => p.buyerId._id.toString() === buyerId
        );
      });
    }

    res.status(200).json({
      success: true,
      data: deals
    });

  } catch (error) {
    console.error('Get active deals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Join a group buy deal
const joinGroupBuyDeal = async (req, res) => {
  try {
    const { dealId, buyerId, pledgedQuantity } = req.body;

    if (!dealId || !buyerId || !pledgedQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (pledgedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Pledged quantity must be at least 1'
      });
    }

    const deal = await GroupBuy.findById(dealId);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Group buy deal not found'
      });
    }

    if (deal.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This deal is no longer active'
      });
    }

    // Check if user already participated
    const existingParticipation = deal.participants.find(
      p => p.buyerId.toString() === buyerId
    );

    if (existingParticipation) {
      return res.status(400).json({
        success: false,
        message: 'You have already joined this deal'
      });
    }

    // Add participant
    deal.participants.push({
      buyerId,
      pledgedQuantity,
      pledgedAt: new Date()
    });

    deal.pledgedQuantity += pledgedQuantity;
    
    // Check if target is reached and automatically close the deal
    if (deal.pledgedQuantity >= deal.targetQuantity) {
      deal.status = 'success';
      // Process the successful deal immediately
      await processSuccessfulDeal(deal);
    }
    
    await deal.save();

    res.status(200).json({
      success: true,
      message: 'Successfully joined the group buy deal',
      data: deal
    });

  } catch (error) {
    console.error('Join group buy deal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user's group buy deals (as seller or participant)
const getUserGroupBuyDeals = async (req, res) => {
  try {
    const { userId } = req.params;

    const sellerDeals = await GroupBuy.find({ sellerId: userId })
      .populate('sellerId', 'name phoneNumber')
      .populate('participants.buyerId', 'name phoneNumber')
      .sort({ createdAt: -1 });

    const participantDeals = await GroupBuy.find({
      'participants.buyerId': userId
    })
      .populate('sellerId', 'name phoneNumber')
      .populate('participants.buyerId', 'name phoneNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        sellerDeals,
        participantDeals
      }
    });

  } catch (error) {
    console.error('Get user group buy deals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Process expired deals - removed since no deadline

// Helper function to process successful deals
const processSuccessfulDeal = async (deal) => {
  try {
    deal.status = 'success';
    
    for (const participant of deal.participants) {
      const order = new Order({
        buyerId: participant.buyerId._id,
        sellerId: deal.sellerId,
        // productId is optional for group buy orders
        quantity: participant.pledgedQuantity,
        unit: deal.unit,
        pricePerUnit: deal.discountedPrice,
        totalAmount: participant.pledgedQuantity * deal.discountedPrice,
        deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        deliveryTimeSlot: '09:00-12:00',
        status: 'confirmed',
        orderType: 'groupBuy',
        groupBuyDealId: deal._id
      });

      const savedOrder = await order.save();
      
      deal.successOrders.push({
        orderId: savedOrder._id,
        buyerId: participant.buyerId._id,
        quantity: participant.pledgedQuantity,
        totalAmount: participant.pledgedQuantity * deal.discountedPrice
      });
    }

    await deal.save();
    console.log(`Deal ${deal._id} succeeded - created ${deal.participants.length} orders`);

  } catch (error) {
    console.error('Process successful deal error:', error);
  }
};

module.exports = {
  createGroupBuyDeal,
  getActiveGroupBuyDeals,
  joinGroupBuyDeal,
  getUserGroupBuyDeals
}; 