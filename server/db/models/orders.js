const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER, FLOAT, STRING, UUID} = Sequelize
const Order = db.define('order', {
  orderNumber: {
    type: UUID,
    defaultValue: null
  },
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
