const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
const Product = require('../db/models/products')
const CartsProducts = require('../db/models/carts_products')
module.exports = router

const createGuest = async () => {
  const user = await User.create() //set the new guest
  const newCart = await Cart.create({userId: user.id}) //assign a new cart to the new guest
  user.cartId = newCart.id // join them
  await user.save() //together
  return user
}

//create a new guest user and attach a new cart to it
router.post('/guest/new', async (req, res, next) => {
  try {
    const guest = await createGuest()
    return req.login(guest, err => (err ? next(err) : res.json(guest)))
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})

//retrieve the guest ID from localStorage and log it in
router.post('/guest/retrieve', async (req, res, next) => {
  if (req.user) {
    if (req.user.id !== req.body.guestID) {
      return res.status(200).json(req.user)
    }
  }
  try {
    const user = await User.findByPk(req.body.guestID)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (ex) {
    console.log(ex)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    console.log('GUEST SES', req.session)
    const user = await User.findOne({where: {email: req.body.email}})

    // //get the current guest's cart
    // const currentGuestCart = await Cart.findOne({
    //   where: { userId: req.user ? req.user.id : null },
    //   include: [Product]
    // })

    // //get the cart for the user that is about to log in
    // const userCart = await Cart.findOne({ where: { userId: user.id || null } })

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // // in the new user's cart, add each product that was in the guest's cart
      // await currentGuestCart.get().products.forEach(async product => {
      //   try {
      //     // get the current relation in the join table to get the quantity
      //     const currentRelation = await CartsProducts.findOne({
      //       where: { cartId: currentGuestCart.id, productId: product.id }
      //     })

      //     const existingRelation = await CartsProducts.findOne({
      //       where: { cartId: userCart.id, productId: product.id }
      //     })
      //     if (existingRelation) {
      //       // check if the relation already exists and update the quantity on the new one
      //       existingRelation.quantity = currentRelation.quantity
      //       await existingRelation.save()
      //     } else {
      //       // create a new relation between the user that is about to log in and its cart
      //       // and assign to it the quantity from the old guest's cart relation
      //       await CartsProducts.create({
      //         cartId: userCart.id,
      //         productId: product.id,
      //         quantity: currentRelation.quantity
      //       })
      //     }
      //   } catch (ex) {
      //     console.log(ex)
      //   }
      // })

      req.logout() //logs out the current guest user
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const userCart = await Cart.create({userId: user.id}) // create the new cart for the user

    //get the current guest's cart
    const currentGuestCart = await Cart.findOne({
      where: {userId: req.user ? req.user.id : null},
      include: [Product]
    })

    await currentGuestCart.get().products.forEach(async product => {
      try {
        // get the current relation in the join table to get the quantity
        const currentRelation = await CartsProducts.findOne({
          where: {cartId: currentGuestCart.id, productId: product.id}
        })
        // create a new relation between the user that is about to log in and its cart
        // and assign to it the quantity from the old guest's cart relation
        await CartsProducts.create({
          cartId: userCart.id,
          productId: product.id,
          quantity: currentRelation.quantity
        })
      } catch (ex) {
        console.log(ex)
      }
    })

    req.logout() //log out the current guest user
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

//this route will be sent the guestID from localStorage in req.body
router.post('/logout', (req, res, next) => {
  try {
    req.logout()
    req.session.destroy()
    res.redirect('/')
  } catch (ex) {
    console.log(ex)
  }
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
