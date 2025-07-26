const User = require('../models/user.model');
const Product = require('../models/product.model');

exports.getNearbySuppliers = async (req, res) => {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
        return res.status(400).json({ message: 'Location coordinates are required.' });
    }

    try {
        const suppliers = await User.find({
            role: 'supplier',
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 5000 // Find suppliers within 5km
                }
            }
        });

        // Here you can add logic to fetch products for each supplier
        // For now, just returning the supplier list is a great start.
        res.status(200).json(suppliers);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};