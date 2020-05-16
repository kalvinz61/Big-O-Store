const router = require('express').Router()
const {isAdmin} = require('../middleware')

const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

module.exports = router

router.post('/product_image', isAdmin, async (req, res, next) => {
  try {
    const file = req.files.product_image
    const params = {
      Bucket: 'big-o-store-bucket',
      Key: file.name,
      Body: file.data
    }
    await s3.upload(params, function(err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully. ${data.Location}`)
      return res.status(200).json({location: data.Location})
    })
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})
