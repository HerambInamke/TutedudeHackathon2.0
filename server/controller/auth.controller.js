const User = require('../models/user.model');

// Signup - Create new user with location
const signup = async (req, res) => {
    try {
        const { name, phoneNumber, addressLine1, addressLine2, state, pincode, latitude, longitude, role } = req.body;

        // Validate required fields
        if (!name || !phoneNumber || !addressLine1 || !state || !pincode || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Required fields: name, phoneNumber, addressLine1, state, pincode, latitude, longitude'
            });
        }

        // Validate phone number format
        if (!/^[0-9]{10}$/.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid 10-digit phone number'
            });
        }

        // Validate pincode format (6 digits)
        if (!/^[0-9]{6}$/.test(pincode)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid 6-digit pincode'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this phone number already exists'
            });
        }

        // Create new user
        const user = new User({
            name,
            phoneNumber,
            addressLine1,
            addressLine2: addressLine2 || '',
            state,
            pincode,
            latitude,
            longitude,
            role: role || 'buyer',
            location: {
                type: 'Point',
                coordinates: [longitude, latitude] // MongoDB expects [longitude, latitude]
            }
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role,
                addressLine1: user.addressLine1,
                addressLine2: user.addressLine2,
                state: user.state,
                pincode: user.pincode,
                latitude: user.latitude,
                longitude: user.longitude
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Login - Find user by phone number
const login = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        // Validate phone number
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        if (!/^[0-9]{10}$/.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid 10-digit phone number'
            });
        }

        // Find user by phone number
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Please sign up first'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role,
                addressLine1: user.addressLine1,
                addressLine2: user.addressLine2,
                state: user.state,
                pincode: user.pincode,
                latitude: user.latitude,
                longitude: user.longitude
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    signup,
    login
}; 