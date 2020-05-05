const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER} = Sequelize
const CartsProducts = db.define('carts_products', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
})

module.exports = CartsProducts
