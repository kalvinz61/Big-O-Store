const Sequelize = require('sequelize')
const db = require('../db')
const {FLOAT, STRING, UUID, UUIDV4} = Sequelize
const Order = db.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  total: {
    type: FLOAT
  },
  shippingAddress: {
    type: STRING
  },
  payment: {
    type: STRING
  },
  status: {
    type: STRING
  }
  // userId: {
  //   type: STRING,
  //   allowNull: false
  // }
})

module.exports = Order
