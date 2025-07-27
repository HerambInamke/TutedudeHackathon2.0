const express = require('express');
const router = express.Router();
const { 
    addRating, 
    getProductRatings, 
    getSellerRatings 
} = require('../controller/rating.controller');

// POST /api/ratings - Add a rating for a product
router.post('/', addRating);

// GET /api/ratings/product/:productId - Get ratings for a specific product
router.get('/product/:productId', getProductRatings);

// GET /api/ratings/seller/:sellerId - Get ratings for a specific seller
router.get('/seller/:sellerId', getSellerRatings);

module.exports = router; 