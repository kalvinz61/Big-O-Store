const router = require('express').Router()
const {isAdmin} = require('../middleware')
const {
  Order,
  OrdersProducts,
  Cart,
  CartsProducts,
  Product
} = require('../db/models')

router.get('/all', isAdmin, async (req, res, next) => {
  await Order.findAll({
    include: [Product]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/mine', async (req, res, next) => {
  const orders = await Order.findAll({
    where: {userId: req.user.id},
    include: [Product]
  })
  res.status(200).json(orders)
})

router.get('/:id', async (req, res, next) => {
  await Order.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    },
    include: [Product]
  })
    .then(order => res.send(order))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  const order = await Order.create({
    userId: req.user.id
  })
  const cart = await Cart.findOne({where: {userId: req.user.id}})
  const cartProducts = await CartsProducts.findAll({where: {cartId: cart.id}})
  cartProducts.forEach(async product => {
    const prod = await Product.findOne({where: {id: product.productId}})
    await OrdersProducts.create({
      orderId: order.id,
      productId: product.productId,
      quantity: product.quantity,
      price: prod.price
    })
    await product.destroy()
  })
  const responseOrder = await Order.findOne({
    where: {id: order.id},
    include: [Product]
  })
  res.send(responseOrder)
})

module.exports = router
