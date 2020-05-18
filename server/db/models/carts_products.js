const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER} = Sequelize
const CartsProducts = db.define('carts_products', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
})
CartsProducts.getTotal = cartId => {
  CartsProducts.findAll({
    where: {
      cartId
    }
  })
}
module.exports = CartsProducts
