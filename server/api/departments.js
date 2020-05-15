const router = require('express').Router()
const {Department} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const departments = await Department.findAll()
    res.status(200).json(departments)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
