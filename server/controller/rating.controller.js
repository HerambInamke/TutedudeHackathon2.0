const Rating = require('../models/rating.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

// Add a rating for a product
const addRating = async (req, res) => {
    try {
        const { productId, orderId, rating, review } = req.body;
        const buyerId = req.body.buyerId; // This should come from authenticated user

        // Validate required fields
        if (!productId || !orderId || !rating || !buyerId) {
            return res.status(400).json({
                success: false,
                message: 'Required fields: productId, orderId, rating, buyerId'
            });
        }

        // Validate rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Check if order exists and belongs to buyer
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (order.buyerId.toString() !== buyerId) {
            return res.status(403).json({
                success: false,
                message: 'You can only rate your own orders'
            });
        }

        if (order.status !== 'delivered') {
            return res.status(400).json({
                success: false,
                message: 'You can only rate delivered orders'
            });
        }

        // Check if already rated
        const existingRating = await Rating.findOne({
            buyerId,
            productId,
            orderId
        });

        if (existingRating) {
            return res.status(400).json({
                success: false,
                message: 'You have already rated this order'
            });
        }

        // Create new rating
        const newRating = new Rating({
            productId,
            sellerId: order.sellerId,
            buyerId,
            rating,
            review: review || '',
            orderId
        });

        await newRating.save();

        // Update order as rated
        await Order.findByIdAndUpdate(orderId, { isRated: true });

        // Update product and seller ratings
        await updateProductAndSellerRatings(order.sellerId, productId);

        res.status(201).json({
            success: true,
            message: 'Rating added successfully',
            data: newRating
        });

    } catch (error) {
        console.error('Add rating error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get ratings for a product
const getProductRatings = async (req, res) => {
    try {
        const { productId } = req.params;

        const ratings = await Rating.find({ productId })
            .populate('buyerId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Ratings retrieved successfully',
            data: ratings
        });

    } catch (error) {
        console.error('Get product ratings error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get ratings for a seller
const getSellerRatings = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const ratings = await Rating.find({ sellerId })
            .populate('buyerId', 'name')
            .populate('productId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Seller ratings retrieved successfully',
            data: ratings
        });

    } catch (error) {
        console.error('Get seller ratings error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Helper function to update product and seller ratings
const updateProductAndSellerRatings = async (sellerId, productId) => {
    try {
        // Calculate average rating for the product
        const productRatings = await Rating.find({ productId });
        const productAvgRating = productRatings.length > 0 
            ? productRatings.reduce((sum, r) => sum + r.rating, 0) / productRatings.length 
            : 0;

        // Update product rating
        await Product.findByIdAndUpdate(productId, {
            sellerRating: Math.round(productAvgRating * 10) / 10, // Round to 1 decimal
            totalRatings: productRatings.length
        });

        // Calculate average rating for the seller (across all products)
        const sellerRatings = await Rating.find({ sellerId });
        const sellerAvgRating = sellerRatings.length > 0 
            ? sellerRatings.reduce((sum, r) => sum + r.rating, 0) / sellerRatings.length 
            : 0;

        // Update seller rating in user model
        await User.findByIdAndUpdate(sellerId, {
            rating: Math.round(sellerAvgRating * 10) / 10, // Round to 1 decimal
            totalRatings: sellerRatings.length
        });

    } catch (error) {
        console.error('Error updating ratings:', error);
    }
};

module.exports = {
    addRating,
    getProductRatings,
    getSellerRatings
}; 