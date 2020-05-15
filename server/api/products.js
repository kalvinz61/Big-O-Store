const router = require('express').Router()
const {Product, Department, Category} = require('../db/models')
const {isAdmin} = require('../middleware')

const Fuse = require('fuse.js')

const {Op} = require('sequelize')

//get ALL products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [Department, Category]})
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
      include: [Department, Category]
      // where: {
      //   [Op.or]: [
      //     { name: { [Op.iLike]: '%' + req.params.search + '%' } },
      //     { category: { [Op.iLike]: '%' + req.params.search + '%' } }
      //   ]
      // }
    })
    const filterOptions = {
      threshold: 0.5,
      distance: 15,
      keys: ['name', 'category.name']
    }
    const fuse = new Fuse(products, filterOptions)
    const result = fuse.search(req.params.search).map(r => r.item)

    res.status(200).json(result)
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
