'use strict'

const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')

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
    Product.create({
      name: 'Borla Exhaust',
      price: 600.99,
      stock: 15,
      description:
        'Upgrading your factory exhaust system to a Borla stainless steel performance exhaust system with a more efficient and less restrictive design can improve sound (adding more enjoyment driving your vehicle) and increase engine horsepower and torque throughout the RPM range (allowing quicker acceleration to pass a vehicle or get to highway speeds quicker).',
      imageUrl: '/productImages/borla exhaust.jpg'
    }),
    Product.create({
      name: 'Cobb Tuning Exhaust',
      price: 800.99,
      stock: 20,
      description:
        'We combine our SS Non-Resonated 3" J-Pipe and Titanium Cat-Back exhaust to create the ultimate exhaust solution for you 2015+ WRX! Simple bolt-on installation of these components offers excellent power gains, outstanding build quality, and an impressive exhaust note. The Turboback includes the COBB SS 3" J-Pipe and the COBB 3" WRX Titanium Cat-Back Exhaust',
      imageUrl: '/productImages/Cobb Exhaust.jpg'
    }),
    Product.create({
      name: 'Big O Exhaust',
      price: 9999.99,
      stock: 50,
      description: 'Add 1000HP',
      imageUrl: '/productImages/Big o exhaust.jpg'
    }),
    Product.create({
      name: 'Hoosier Race Tire',
      price: 400.99,
      stock: 23,
      description: 'Add 1000HP',
      imageUrl: '/productImages/Big o exhaust.jpg'
    }),
    Product.create({
      name: 'Bridgestone Summer Tire',
      price: 150.99,
      stock: 12,
      description:
        'Bridgestone’s premiere performance tires are engineered to deliver a thrilling ride, no matter where the road takes you. Potenza performance tires provide dynamic handling, exceptional traction, and more responsiveness than standard passenger tires. Every element, from the tires’ tread pattern to their shoulder stiffness, has been engineered to keep you going further, faster, longer.',
      imageUrl: '/productImages/Bridgestone Summer Tire.png'
    }),
    Product.create({
      name: 'Falken All-Season Tire',
      price: 115.99,
      stock: 31,
      description:
        "For drivers who want a combination of sophisticated low-profile tires/large rim diameter wheels to enhance their vehicle's appearance with all-season versatility, including traction in light snow",
      imageUrl: '/productImages/Falken Tire.png'
    }),
    Product.create({
      name: 'Big-O Tire',
      price: 1000.99,
      stock: 12,
      description: 'Stickiest race tire ever',
      imageUrl: '/productImages/Big O Tire.png'
    }),
    Product.create({
      name: 'Big-O Turbo Kit',
      price: 15000.99,
      stock: 11,
      description: 'Add 1000HP',
      imageUrl: '/productImages/Big O Turbo Kit.png'
    }),
    Product.create({
      name: 'Big-O Flex Fuel Kit',
      price: 1500.99,
      stock: 2,
      description:
        'A complete plug and play solution enabling users to convert their vehicle to a Flex Fuel configuration without losing factory compensations. This is the easiest to use and most sophisticated Flex Fuel kit on the market. Utilizing OEM fuel and electronic connectors, the Ethanol Sensor Kit measures the ethanol content of fuel being fed to the motor. That data is then converted into a signal that the ECU can use for adjusting calibrations and to be displayed on a custom Accessport monitor',
      imageUrl: '/productImages/Big O Flex Fuel Kit.png'
    }),
    Product.create({
      name: 'Ohlins Coilovers',
      price: 2500.99,
      stock: 2,
      description:
        'Öhlins DEDICATED suspension systems offer race-level performance in a complete, ready-to-install package. Applications are shake rig developed and track validated with specific spring rates (manufactured by Swift to Öhlins specs), clicker settings, and ride height specifications. Öhlins looks at the entire performance picture when developing DEDICATED systems, as each is engineered to perform with proven track setups for each specific chassis.',
      imageUrl: '/productImages/Ohlins Coilovers.png'
    })
  ])

  await Promise.all([
    carts[0].addProduct(products[0]),
    carts[0].addProduct(products[1]),
    carts[0].addProduct(products[2]),
    carts[0].addProduct(products[3]),
    carts[0].addProduct(products[4]),
    carts[0].addProduct(products[5]),
    carts[0].addProduct(products[6]),
    carts[0].addProduct(products[7]),
    carts[1].addProduct(products[1]),
    carts[2].addProduct(products[3]),
    carts[2].addProduct(products[4]),
    carts[2].addProduct(products[6]),
    carts[3].addProduct(products[6]),
    carts[4].addProduct(products[5]),
    carts[4].addProduct(products[4])
  ])
  //updating a cart item quantity
  // await CartsProducts.findOne({
  //   where: {
  //     cartId: carts[0].id,
  //     productId: products[0].id
  //   }
  // }).then(foundCartItem => {
  //   foundCartItem.update({quantity: foundCartItem.quantity + 5})
  // })

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
