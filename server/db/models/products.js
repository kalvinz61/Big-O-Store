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
      len: [0, 100000]
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: ''
  },
  height: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  width: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  length: {
    type: DECIMAL(4, 2),
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0.01,
      max: 9999.99
    }
  },
  partNumber: {
    type: STRING,
    defaultValue: '',
    allowNull: true
  },
  weight: {
    type: DECIMAL(4, 2),
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0.01,
      max: 9999.99
    }
  },
  rating: {
    type: DECIMAL(5, 2),
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0.0,
      max: 5.0
    }
  },
  brand: {
    type: STRING,
    defaultValue: ''
  },
  color: {
    type: STRING,
    defaultValue: ''
  }
})

module.exports = Product
