const express = require('express');
const router = express.Router();
const { 
    addProduct, 
    getProducts, 
    getSellerProducts, 
    updateProduct, 
    deleteProduct 
} = require('../controller/product.controller');

// POST /api/products - Add new product (for sellers)
router.post('/', addProduct);

// GET /api/products - Get all available products (for buyers)
router.get('/', getProducts);

// GET /api/products/seller/:sellerId - Get products by specific seller
router.get('/seller/:sellerId', getSellerProducts);

// PUT /api/products/:productId - Update product
router.put('/:productId', updateProduct);

// DELETE /api/products/:productId - Delete product (soft delete)
router.delete('/:productId', deleteProduct);

module.exports = router; 