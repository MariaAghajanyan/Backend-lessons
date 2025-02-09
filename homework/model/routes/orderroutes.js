const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, placeOrder);
router.get("/", authenticate, getUserOrders);

module.exports = router;
