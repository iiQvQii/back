// import jobs from '../models/jobs.js'
import orders from '../models/orders.js'

export const createOrder = async (req, res) => {
  try {
    const data = {
      host: '',
      helper: req.user._id,
      job: req.body._id,
      answer: req.body.answer
    }
    const result = await orders.create(data)
    res.status(200).send({ success: true, message: '', result: result._id })
  } catch (error) {
    console.log(error)
  }
}
