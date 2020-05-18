const router = require('express').Router()
const stripe = require('stripe')('sk_test_ncy3rZhXTb5fqripsS3IC5Ja00MP7ex6Y9')
router.get('/', (req, res, next) => {
  res.send('STRIPE')
})
//return client secret
router.post('/checkout', async (req, res, next) => {
  // safer to set price in back end instead of front end so users can't set their own price
  // const cart = await Cart.findOne({
  //     where: {
  //         userId: req.user.id
  //     }
  // })
  // const cartItems = await CartsProducts.findAll({
  //     where: {
  //         cartId: cart.id
  //     }
  // })
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: 'usd'
    })
    res.status(200).send(paymentIntent.client_secret)
  } catch (err) {
    res.status(500).send(err.message)
  }
})
module.exports = router
