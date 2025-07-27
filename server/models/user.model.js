// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },

    // --- Location coordinates ---
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },

    // --- Address fields ---
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    
    // --- Rating fields ---
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
    
    // --- Machine-readable location for calculations ---
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },

    // ... other fields like lpgLastBooked
}, { timestamps: true });

// This index is the magic that makes proximity searches fast!
userSchema.index({ location: '2dsphere' });
userSchema.index({ phoneNumber: 1 }); // Index for phone number lookups

module.exports = mongoose.model('User', userSchema);