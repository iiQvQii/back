export default (req, res, next) => {
  if (req.user.role !== 2) {
    res.status(403).send({ success: false, message: '無小幫手權限' })
  } else {
    next()
  }
}
