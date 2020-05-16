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

router.post('/', async (req, res, next) => {
  try {
    const {name, imageUrl} = req.body
    const department = await Department.create({name, imageUrl})
    res.status(201).json(department)
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})

module.exports = router
