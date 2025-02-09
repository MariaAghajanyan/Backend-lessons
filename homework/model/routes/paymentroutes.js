const express = require("express");
const { processPayment } = require("../controllers/paymentController");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, processPayment);

module.exports = router;
