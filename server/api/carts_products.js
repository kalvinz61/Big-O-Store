const router = require('express').Router()
const {CartsProducts, Cart, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  await CartsProducts.findAll().then(products => res.send(products))
})

// router.post('/', async (req, res, next) => {
//   console.log(req.body)
//   const cart = await Cart.findOne({
//     where: {
//       userId: req.user.id
//     }
//   })
//   const foundItem = await CartsProducts.findOne({
//     where: {
//       cartId: cart.id,
//       productId: req.body.id
//     }
//   })
//   if (foundItem) {
//     foundItem
//       .update({quantity: foundItem.quantity + 1})
//       .then(updatedProduct => {
//         res.status(200).send(updatedProduct)
//       })
//   } else {
//     const product = await Product.findOne({where: {id: req.body.id}})
//     await cart.addProduct(product)
//     await Cart.findOne({
//       where: {
//         userId: req.user.id
//       },
//       include: [
//         {
//           model: Product
//         }
//       ]
//     }).then(updated => {
//       res.send(updated)
//     })
//   }
// })

router.delete('/', (req, res, next) => {
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
