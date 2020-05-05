const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, UUID, UUIDV4, DECIMAL, INTEGER, TEXT} = Sequelize

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
    type: DECIMAL(8, 2),
    allowNull: false,
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0.01,
      max: 100000.99
    }
  },
  stock: {
    type: INTEGER,
    allowNull: false
  },
  description: {
    type: TEXT,
    defaultValue: '',
    validate: {
      len: [0, 1000]
    }
  }
})

module.exports = Product
