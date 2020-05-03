const router = require('express').Router()
const Guest = require('../db/models/guest')
const Cart = require('../db/models/cart')
module.exports = router

//create a new guest and attach a new cart to it
router.post('/new', async (req, res, next) => {
  try {
    const guest = await Guest.create() //set the new guest
    const newCart = await Cart.create({guestId: guest.id}) //assign a new cart to the new guest
    guest.cartId = newCart.id // join them
    await guest.save() //together
    req.login(guest, err => (err ? next(err) : res.json(guest)))
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})

//get guest
router.get('/:id', async (req, res, next) => {
  try {
    const guest = await Guest.findByPk(req.params.id)
    res.status(200).json(guest)
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})
