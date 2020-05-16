const router = require('express').Router()
const {Category} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, imageUrl} = req.body
    const category = await Category.create({name, imageUrl})
    res.status(201).json(category)
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})

module.exports = router
