const fs = require('fs');
const path = require('path');

const orderFile = path.join(__dirname, '../data/orders.json');

const getOrderHistory = (req, res) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required.' });
  }

  fs.readFile(orderFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read orders file.' });
    }

    const orders = JSON.parse(data);
    const customerOrders = orders.filter((order) => order.customerId === customerId);

    if (customerOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this customer.' });
    }

    res.json(customerOrders);
  });
};
module.exports={getOrderHistory};
