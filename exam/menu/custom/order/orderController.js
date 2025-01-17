const fs = require('fs');
const path = require('path');

const menuFile = path.join(__dirname, '../data/menu.json');
const orderFile = path.join(__dirname, '../data/orders.json');

 const placeOrder = (req, res) => {
  const newOrder = req.body;

  
  if (!newOrder || !newOrder.items || !Array.isArray(newOrder.items) || newOrder.items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item.' });
  }

  fs.readFile(menuFile, 'utf8', (menuErr, menuData) => {
    if (menuErr) {
      return res.status(500).json({ error: 'Failed to read menu file.' });
    }

    const menu = JSON.parse(menuData);
    const menuItemsMap = menu.reduce((acc, item) => {
      acc[item.id] = item; 
      return acc;
    }, {});

    
    const invalidItems = newOrder.items.filter((orderItem) => !menuItemsMap[orderItem.menuId]);
    if (invalidItems.length > 0) {
      return res.status(400).json({ error: `Invalid menu item(s): ${invalidItems.map(item => item.menuId).join(', ')}` });
    }

    
    newOrder.totalPrice = newOrder.items.reduce((total, item) => {
      const menuItem = menuItemsMap[item.menuId];
      return total + menuItem.price * item.quantity;
    }, 0);

    newOrder.date = new Date().toISOString();

    fs.readFile(orderFile, 'utf8', (orderErr, orderData) => {
      if (orderErr) {
        return res.status(500).json({ error: 'Failed to read orders file.' });
      }

      const orders = JSON.parse(orderData);
      newOrder.id = `O${orders.length + 1}`; 
      orders.push(newOrder);

      fs.writeFile(orderFile, JSON.stringify(orders, null, 2), (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ error: 'Failed to save order.' });
        }
        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
      });
    });
  });
};
module.exports={placeOrder};
