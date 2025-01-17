const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
 
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
require('dotenv').config();
const express = require('express');
const path = require('path');

const menuFilePath = path.resolve(process.env.MENU_DATA_PATH);
console.log(`Menu Data Path: ${menuFilePath}`);

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
const PORT = process.env.APP_PORT || 3001;

app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
  