const User = require('./user')
const Product = require('./products')
const Cart = require('./cart')
const CartsProducts = require('./carts_products')
const Order = require('./orders')
const OrdersProducts = require('./orders_products')
const Department = require('./departments')
const Category = require('./categories')

User.hasOne(Cart)
Cart.belongsTo(User)

Department.hasMany(Product)
Product.belongsTo(Department)
Category.hasMany(Product)
Product.belongsTo(Category)

Cart.belongsToMany(Product, {through: CartsProducts})
Product.belongsToMany(Cart, {through: CartsProducts})

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrdersProducts)
Product.hasMany(OrdersProducts)
OrdersProducts.belongsTo(Order)
OrdersProducts.belongsTo(Product)

// Order.belongsToMany(Product, {through: OrdersProducts})
// Product.belongsToMany(Order, {through: OrdersProducts})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Cart,
  CartsProducts,
  Order,
  OrdersProducts,
  Department,
  Category
}
