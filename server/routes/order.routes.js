const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    getBuyerOrders, 
    getSellerOrders, 
    updateOrderStatus 
} = require('../controller/order.controller');

// POST /api/orders - Create a new order
router.post('/', createOrder);

// GET /api/orders/buyer/:buyerId - Get orders for a buyer
router.get('/buyer/:buyerId', getBuyerOrders);

// GET /api/orders/seller/:sellerId - Get orders for a seller
router.get('/seller/:sellerId', getSellerOrders);

// PUT /api/orders/:orderId/status - Update order status
router.put('/:orderId/status', updateOrderStatus);

module.exports = router; 