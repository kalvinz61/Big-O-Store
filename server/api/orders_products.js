const router = require('express').Router()
const {OrdersProducts} = require('../db/models')

router.post('/', async (req, res, next) => {
  await OrdersProducts.create(req.body)
    .then(products => res.send(products))
    .catch(next)
})

module.exports = router
