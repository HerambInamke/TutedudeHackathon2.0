const Product = require('../models/product.model');
const User = require('../models/user.model');

// Add a new product (for sellers)
const addProduct = async (req, res) => {
    try {
        const { name, category, price, unit, description, stock } = req.body;
        const sellerId = req.body.sellerId; // This should come from authenticated user

        // Validate required fields
        if (!name || !category || price === undefined || !unit) {
            return res.status(400).json({
                success: false,
                message: 'Required fields: name, category, price, unit'
            });
        }

        // Validate category
        if (!['milk', 'other'].includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Category must be either "milk" or "other"'
            });
        }

        // Validate price
        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a positive number'
            });
        }

        // Get seller's location from user data
        const seller = await User.findById(sellerId);
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        // Create new product
        const product = new Product({
            sellerId,
            name,
            category,
            price,
            unit,
            description: description || '',
            stock: stock || 0,
            sellerRating: seller.rating || 0,
            totalRatings: seller.totalRatings || 0,
            location: {
                type: 'Point',
                coordinates: [seller.longitude, seller.latitude]
            }
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: product
        });

    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all products (for buyers)
const getProducts = async (req, res) => {
    try {
        const { category, latitude, longitude, maxDistance = 10000 } = req.query;

        let query = { isAvailable: true };

        // Filter by category if provided
        if (category && ['milk', 'other'].includes(category)) {
            query.category = category;
        }

        // Add location-based filtering if coordinates provided
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

        const products = await Product.find(query)
            .populate('sellerId', 'name phoneNumber addressLine1 state rating')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: products
        });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get products by seller
const getSellerProducts = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const products = await Product.find({ sellerId, isAvailable: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Seller products retrieved successfully',
            data: products
        });

    } catch (error) {
        console.error('Get seller products error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;

        // Remove fields that shouldn't be updated
        delete updateData.sellerId;
        delete updateData.location;
        delete updateData.sellerRating;
        delete updateData.totalRatings;

        const product = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });

    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Delete product (soft delete by setting isAvailable to false)
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findByIdAndUpdate(
            productId,
            { isAvailable: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getSellerProducts,
    updateProduct,
    deleteProduct
}; 