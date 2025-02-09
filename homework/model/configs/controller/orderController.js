const { Order, OrderItem, Product } = require("../models");

exports.placeOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    const order = await Order.create({ userId, status: "pending" });

    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: "Product out of stock" });
      }
      await OrderItem.create({ orderId: order.id, productId: item.productId, quantity: item.quantity });
      await product.update({ stock: product.stock - item.quantity });
    }

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
