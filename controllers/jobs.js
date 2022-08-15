import jobs from '../models/jobs.js'
import hosts from '../models/hosts.js'

export const createJob = async (req, res) => {
  try {
    let result = await hosts.findById(req.user._id, 'cart').populate('cart.product')
    result = await jobs.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      category: req.body.category
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
