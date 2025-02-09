const { Payment, Order } = require("../models");

exports.processPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await Payment.create({ orderId, amount, status: "success" });
    await order.update({ status: "paid" });

    res.status(200).json({ message: "Payment processed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
