// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ['vendor', 'supplier'], default: 'vendor' },

    // --- Machine-readable location for calculations ---
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },

    // --- Human-readable address for display ---
    address: {
        line1: { type: String },
        city: { type: String, default: 'Secunderabad' },
        pincode: { type: String },
        landmark: { type: String }
    },
    
    // ... other fields like lpgLastBooked
}, { timestamps: true });

// This index is the magic that makes proximity searches fast!
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);