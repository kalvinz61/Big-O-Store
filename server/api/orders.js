const router = require('express').Router()
const {Order, CartsProducts, Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  await Order.findAll().then(order => res.send(order))
})

router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {
      orderId: req.body.orderId
    }
  })
})

module.exports = router
