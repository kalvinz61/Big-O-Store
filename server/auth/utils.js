const User = require('../db/models/user')
const Cart = require('../db/models/cart')
const Product = require('../db/models/products')
const CartsProducts = require('../db/models/carts_products')

const createGuest = async () => {
  const user = await User.create() //set the new guest
  const newCart = await Cart.create({userId: user.id}) //assign a new cart to the new guest
  user.cartId = newCart.id // join them
  await user.save() //together
  return user
}

const mergeCartsOnLogin = async (req, user) => {
  const currentGuestCart = await Cart.findOne({
    where: {userId: req.user ? req.user.id : null},
    include: [Product]
  })
  const userCart = await Cart.findOne({where: {userId: user.id || null}})
  await currentGuestCart.get().products.forEach(async product => {
    try {
      // get the current relation in the join table to get its quantity
      const currentRelation = await CartsProducts.findOne({
        where: {cartId: currentGuestCart.id, productId: product.id}
      })

      // check if the relation already exists
      const existingRelation = await CartsProducts.findOne({
        where: {cartId: userCart.id, productId: product.id}
      })
      if (existingRelation) {
        // and update the quantity on the new one
        existingRelation.quantity = currentRelation.quantity
        await existingRelation.save()
      } else {
        // else create a new relation between the user that is about to log in and its cart
        // and assign to it the quantity from the old guest's cart relation
        await CartsProducts.create({
          cartId: userCart.id,
          productId: product.id,
          quantity: currentRelation.quantity
        })
      }
    } catch (ex) {
      console.log(ex)
    }
  })
}

const mergeCartsOnSignup = async (userCart, guestCart) => {
  await guestCart.get().products.forEach(async product => {
    try {
      // get the current relation in the join table to get the quantity
      const currentRelation = await CartsProducts.findOne({
        where: {cartId: guestCart.id, productId: product.id}
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
}

module.exports = {
  createGuest,
  mergeCartsOnLogin,
  mergeCartsOnSignup
}
