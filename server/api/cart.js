const router = require('express').Router()
const {Cart, Product} = require('../db/models')
//
// gets a cart for a user with the Products in it included
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.user.id},
      include: [Product]
    })
    res.status(200).json(cart)
  } catch (err) {
    console.log(err)
  }
})

//add a new product to the cart
router.post('/add', async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {userId: req.user.id}
    })
    // this means the user wasn't logged in and instead we have to find a cart with guestId
    if (!cart) cart = await Cart.findOne({where: {guestId: req.user.id}})

    res.status(200).json({message: 'Product added successfully'})
  } catch (ex) {
    console.log(ex)
  }
})

module.exports = router
