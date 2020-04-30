const User = require('./user')
const Product = require('./products')
const Cart = require('./cart')

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Cart
}
