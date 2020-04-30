'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all([
    Product.create({name: 'Borla Exhaust', price: 600.0}),
    Product.create({name: 'Cobb Tuning Exhaust', price: 800.0}),
    Product.create({name: 'Big O Exhaust', price: 9999.99}),
    Product.create({name: 'Pirelli Race Tire', price: 200.0}),
    Product.create({name: 'Hankook Summer Tire', price: 150.0}),
    Product.create({name: 'Falken All-Season Tire', price: 115.0}),
    Product.create({name: 'Big-O Tire', price: 1000.0}),
    Product.create({name: 'Big-O Turbo Kit', price: 6000.0}),
    Product.create({name: 'Big-O E85 Kit', price: 1500.0})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
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
