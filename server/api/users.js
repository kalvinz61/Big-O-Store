const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('../middleware')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/update/name', async (req, res, next) => {
  const user = await User.findByPk(req.user.id)
  user.name = req.body.name
  await user.save()
  res.status(200).json(user)
})

// eslint-disable-next-line no-warning-comments
//TODO
// router.post('/update/email', async (req, res, next) => {
//   const user = await User.findByPk(req.user.id)
//   user.email = req.body.email;
//   await user.save()
//   res.status(200).json(user)
// })

router.post('/update/address', async (req, res, next) => {
  try {
    console.log('hitting route')
    const user = await User.findByPk(req.user.id)
    const newAddress = `${req.body.address}__${req.body.city}__${
      req.body.state
    }__${req.body.zip}__${req.body.country}`
    user.address = newAddress
    await user.save()
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    next(err)
  }
})
