const express = require('express');
const router = express.Router();
const khaataController = require('../controller/khaata.controller');

// POST /api/khaata -> to add a new transaction
router.post('/khaata', khaataController.addTransaction);

// GET /api/khaata/summary -> to get the daily profit/loss
router.get('/khaata/summary', khaataController.getDailySummary);

module.exports = router;