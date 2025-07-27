const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { productId, quantity, deliveryDate, deliveryTimeSlot } = req.body;
        const buyerId = req.body.buyerId; // This should come from authenticated user

        // Validate required fields
        if (!productId || !quantity || !deliveryDate || !deliveryTimeSlot || !buyerId) {
            return res.status(400).json({
                success: false,
                message: 'Required fields: productId, quantity, deliveryDate, deliveryTimeSlot, buyerId'
            });
        }

        // Get product details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if product is available
        if (!product.isAvailable) {
            return res.status(400).json({
                success: false,
                message: 'Product is not available'
            });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} ${product.unit} available`
            });
        }

        // Get buyer location
        const buyer = await User.findById(buyerId);
        if (!buyer) {
            return res.status(404).json({
                success: false,
                message: 'Buyer not found'
            });
        }

        // Calculate total amount
        const totalAmount = product.price * quantity;

        // Create new order
        const order = new Order({
            buyerId,
            sellerId: product.sellerId,
            productId,
            quantity,
            unit: product.unit,
            pricePerUnit: product.price,
            totalAmount,
            deliveryDate: new Date(deliveryDate),
            deliveryTimeSlot,
            buyerLocation: {
                type: 'Point',
                coordinates: [buyer.longitude, buyer.latitude]
            }
        });

        await order.save();

        // Update product stock
        await Product.findByIdAndUpdate(productId, {
            stock: product.stock - quantity
        });

        // Populate order with product and seller details
        await order.populate([
            { path: 'productId', select: 'name category' },
            { path: 'sellerId', select: 'name phoneNumber' },
            { path: 'buyerId', select: 'name phoneNumber' }
        ]);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get orders for a buyer
const getBuyerOrders = async (req, res) => {
    try {
        const { buyerId } = req.params;

        const orders = await Order.find({ buyerId })
            .populate('productId', 'name category')
            .populate('sellerId', 'name phoneNumber rating')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders
        });

    } catch (error) {
        console.error('Get buyer orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get orders for a seller
const getSellerOrders = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const orders = await Order.find({ sellerId })
            .populate('productId', 'name category')
            .populate('buyerId', 'name phoneNumber')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders
        });

    } catch (error) {
        console.error('Get seller orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: pending, confirmed, delivered, cancelled'
            });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate([
            { path: 'productId', select: 'name category' },
            { path: 'sellerId', select: 'name phoneNumber' },
            { path: 'buyerId', select: 'name phoneNumber' }
        ]);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });

    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getBuyerOrders,
    getSellerOrders,
    updateOrderStatus
}; 