const router = require('express').Router()
const {Order, OrdersProducts} = require('../db/models')

router.get('/all', async (req, res, next) => {
  await Order.findAll({include: [{model: OrdersProducts}]})
    .then(order => res.send(order))
    .catch(next)
})

router.get('/', async (req, res, next) => {
  await Order.findAll({
    where: {userId: req.user.id},
    include: [{model: OrdersProducts}]
  })
    .then(order => res.send(order))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  await Order.findOne({
    where: {
      userId: req.body.userId,
      id: req.params.id
    },
    include: [{model: OrdersProducts}]
  })
    .then(order => res.send(order))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await Order.create({
    userId: req.user.id
  })
    .then(order => res.send(order))
    .catch(next)
})

module.exports = router
