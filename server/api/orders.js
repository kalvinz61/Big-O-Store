const router = require('express').Router()
const {Order, Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  await Order.findAll({
    where: {
      orderId: req.order.id
    }
  }).then(order => res.send(order))
})

router.post('/', async (req, res, next) => {
  const cart = await Cart.findOne({
    where: {
      userId: req.user.id
    }
  })
  await Order.create({
    id: req.body.orderId,
    cartId: cart.id,
    productId: req.body.id
  }).then(newOrder => {
    res.status(201).send(newOrder)
  })
})

module.exports = router
