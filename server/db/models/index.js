const User = require('./user')
const Product = require('./products')
const Cart = require('./cart')
const CartsProducts = require('./carts_products')
const Guest = require('./guest')

Guest.hasOne(Cart)
Cart.belongsTo(Guest)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, {through: CartsProducts})
Product.belongsToMany(Cart, {through: CartsProducts})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Guest,
  Cart,
  CartsProducts
}
