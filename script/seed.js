'use strict'

const db = require('../server/db')
const {User, Product, Cart, CartsProducts} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'admin@gmail.com', password: 'admin', isAdmin: true}),
    User.create({email: 'murphy@gmail.com', password: '123'}),
    User.create(),
    User.create(),
    User.create()
  ])
  const carts = await Promise.all([
    Cart.create({userId: users[0].id}),
    Cart.create({userId: users[1].id}),
    Cart.create({userId: users[2].id}),
    Cart.create({userId: users[2].id}),
    Cart.create({userId: users[2].id})
  ])

  const products = await Promise.all([
    Product.create({name: 'Borla Exhaust', price: 600.99, stock: 15}),
    Product.create({name: 'Cobb Tuning Exhaust', price: 800.99, stock: 20}),
    Product.create({name: 'Big O Exhaust', price: 9999.99, stock: 50}),
    Product.create({name: 'Hoosier Race Tire', price: 400.99, stock: 23}),
    Product.create({name: 'Bridgestone Summer Tire', price: 150.99, stock: 12}),
    Product.create({name: 'Falken All-Season Tire', price: 115.99, stock: 31}),
    Product.create({name: 'Big-O Tire', price: 1000.99, stock: 12}),
    Product.create({name: 'Big-O Turbo Kit', price: 15000.99, stock: 11}),
    Product.create({name: 'Big-O Flex Fuel Kit', price: 1500.99, stock: 2}),
    Product.create({name: 'Ohlins Coilovers', price: 2500.99, stock: 2})
  ])

  await Promise.all([
    carts[0].addProduct(products[0]),
    carts[0].addProduct(products[2]),
    carts[1].addProduct(products[1]),
    carts[2].addProduct(products[3]),
    carts[2].addProduct(products[4]),
    carts[2].addProduct(products[6]),
    carts[3].addProduct(products[6]),
    carts[4].addProduct(products[5]),
    carts[4].addProduct(products[4])
  ])
  //updating a cart item quantity
  await CartsProducts.findOne({
    where: {
      cartId: carts[0].id,
      productId: products[0].id
    }
  }).then(foundCartItem => {
    foundCartItem.update({quantity: foundCartItem.quantity + 5})
  })

  // const log = await Cart.findOne({
  //   where: {id: carts[0].id},
  //   include: [Product]
  // })

  // console.log(log.get().products)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
