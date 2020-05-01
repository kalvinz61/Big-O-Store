const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER} = Sequelize
const CartProducts = db.define('cartProducts', {
  quantity: {
    type: INTEGER
  }
})

module.exports = CartProducts
