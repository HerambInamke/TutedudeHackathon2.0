const express = require('express');
const router = express.Router();
const supplierController = require('../controller/supplier.controller');

router.get('/suppliers', supplierController.getNearbySuppliers);

module.exports = router;