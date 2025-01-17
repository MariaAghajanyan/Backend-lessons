const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/:id/orders', customerController.getOrderHistory);

module.exports = router;
