const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER, DECIMAL} = Sequelize
const OrdersProducts = db.define('orders_products', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  },
  price: {
    type: DECIMAL(8, 2),
    allowNull: false,
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0.01,
      max: 100000.99
    }
  }
})

module.exports = OrdersProducts
