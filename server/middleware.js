export const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({message: 'Forbidden'})
  else next()
}
