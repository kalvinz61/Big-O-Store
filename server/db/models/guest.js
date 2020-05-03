const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4} = Sequelize

const Guest = db.define('guest', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  }
})

module.exports = Guest
