const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order");
const User = require("./user");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
});

Payment.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });
Payment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Payment;
