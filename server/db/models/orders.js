const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER, FLOAT, STRING} = Sequelize
const Order = db.define('order', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  },
  total: {
    type: FLOAT
  },
  shippingAddress: {
    type: STRING
  },
  payment: {
    type: STRING
  }
})

module.exports = Order
