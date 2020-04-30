const router = require('express').Router()
import Cart from '../db/models/cart'

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: {userId: req.params.userId}})
    res.status(200).json(cart)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
