const express = require('express');
const router = express.Router();
const {
  createGroupBuyDeal,
  getActiveGroupBuyDeals,
  joinGroupBuyDeal,
  getUserGroupBuyDeals
} = require('../controller/groupBuy.controller');

// Create a new group buy deal (sellers only)
router.post('/', createGroupBuyDeal);

// Get all active group buy deals (buyers can see these)
router.get('/active', getActiveGroupBuyDeals);

// Join a group buy deal (buyers only)
router.post('/join', joinGroupBuyDeal);

// Get user's group buy deals (both as seller and participant)
router.get('/user/:userId', getUserGroupBuyDeals);

// Process expired deals endpoint removed - no longer needed

module.exports = router; 