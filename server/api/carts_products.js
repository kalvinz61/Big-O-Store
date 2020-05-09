const router = require('express').Router()
const {CartsProducts, Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  await CartsProducts.findAll().then(products => res.send(products))
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  const cart = await Cart.findOne({
    where: {
      userId: req.user.id
    }
  })
  CartsProducts.create({cartId: cart.id, productId: req.body.id})
})

router.delete('/', (req, res, next) => {
  console.log(req.body)
  CartsProducts.findOne({
    where: {
      cartId: req.body.cartId,
      productId: req.body.productId
    }
  }).then(cartItem => {
    cartItem.destroy()
    res.status(202).send('deleted item from cart')
  })
})

module.exports = router
