const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, UUID, UUIDV4, DECIMAL, INTEGER} = Sequelize

const Product = db.define('product', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DECIMAL(6, 2),
    allowNull: false,
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0.01,
      max: 9999.99
    }
  },
  stock: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports = Product
