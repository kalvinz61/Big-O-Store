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

module.exports = router
