const router = require('express').Router()
const {Product, Department, Category} = require('../db/models')
const {isAdmin} = require('../middleware')

const Fuse = require('fuse.js') //library for fuzzy searches

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
    const products = await Product.findAll({
      include: [Department, Category]
    })

    //fuzzy searching functions and options
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

router.get('/:type/:name', async (req, res, next) => {
  try {
    const type =
      req.params.type.toLowerCase() === 'department' ? Department : Category
    const typeName =
      req.params.type.toLowerCase() === 'department' ? 'department' : 'category'
    const typeId = (await type.findOne({
      where: {name: {[Op.iLike]: req.params.name}}
    })).id
    const products = await Product.findAll({
      where: {
        [`${typeName}Id`]: typeId
      }
    })

    console.log('FILTERED PRODUCTS HOPEFULLY', products)
    res.status(200).json(products)
  } catch (ex) {
    console.log(ex)
    next(ex)
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
