const router = require('express').Router()
const nodemailer = require('nodemailer')
const {User} = require('../../db/models')
module.exports = router

router.post('/order_placed', async (req, res, next) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    })

    const userEmail = (await User.findByPk(req.user.id)).email

    await transporter.sendMail({
      from: '"Test sender" <test_sender@example.com>', // sender address
      to: `${userEmail}`, // list of receivers
      subject: 'Testing checkout', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    })
  } catch (ex) {
    console.log(ex)
    next(ex)
  }
})
