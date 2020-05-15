const {User} = require('./db/models')

const isAdmin = (req, res, next) => {
  const dbUser = User.findByPk(req.user.id)
  if (!dbUser.isAdmin) return res.status(403).json({message: 'Forbidden'})
  else next()
}

module.exports = {
  isAdmin
}
