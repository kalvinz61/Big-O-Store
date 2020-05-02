const router = require('express').Router()
const {Cart, Product} = require('../db/models')
//
// gets a cart for a user with the Products in it included
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.userId},
      include: [Product]
    })
    res.status(200).json(cart)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
