const Sequelize = require('sequelize')
const db = require('../db')
const CartProducts = db.define('cartProducts', {})

module.exports = CartProducts
