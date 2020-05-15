const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, UUID, UUIDV4} = Sequelize

const Department = db.define('department', {
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
  }
})

module.exports = Department
