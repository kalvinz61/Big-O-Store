const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('../middleware')

const {Op} = require('sequelize')

//get ALL products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// filter products through keywords by name and brand
router.get('/:search', async (req, res, next) => {
  try {
    console.log('SEARCH', req.params.search)
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {name: {[Op.iLike]: '%' + req.params.search + '%'}},
          {category: {[Op.iLike]: '%' + req.params.search + '%'}}
        ]
      }
    })
    res.status(200).json(products)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//gets a single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.status(200).json(product)
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})

//TO DO
//add a new product through the site, with middleware to check if admin did it
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (ex) {
    console.log(ex)
  }
})

module.exports = router
