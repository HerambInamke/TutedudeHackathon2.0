const mongoose = require('mongoose');
const Transaction = require('../models/transaction.model');

// --- Function to add a new transaction ---
exports.addTransaction = async (req, res) => {
    try {
        const { userId, type, amount, category } = req.body;

        if (!userId || !type || !amount) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const newTransaction = new Transaction({ userId, type, amount, category });
        await newTransaction.save();

        res.status(201).json({ message: 'Transaction added successfully!', transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --- Function to get the daily profit/loss summary ---
exports.getDailySummary = async (req, res) => {
    try {
        const { userId, date } = req.query; // e.g., date=2025-07-26
        
        if (!userId || !date) {
            return res.status(400).json({ message: 'userId and date are required query parameters.'});
        }

        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const summary = await Transaction.aggregate([
            { $match: { 
                userId: new mongoose.Types.ObjectId(userId),
                date: { $gte: startOfDay, $lte: endOfDay }
            }},
            { $group: {
                _id: '$type',
                totalAmount: { $sum: '$amount' }
            }}
        ]);

        let totalIncome = 0;
        let totalExpense = 0;

        summary.forEach(group => {
            if (group._id === 'income') totalIncome = group.totalAmount;
            if (group._id === 'expense') totalExpense = group.totalAmount;
        });

        const profit = totalIncome - totalExpense;

        res.status(200).json({ date, totalIncome, totalExpense, profit });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};