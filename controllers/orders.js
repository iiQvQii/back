// import jobs from '../models/jobs.js'
import jobs from '../models/jobs.js'
import orders from '../models/orders.js'

export const createOrder = async (req, res) => {
  try {
    const data = {
      host: req.body.host,
      helper: req.user._id,
      job: req.body._id,
      answer: req.body.answer
    }
    const isShown = await jobs.findById(req.body._id)
    if (!isShown.is_shown) {
      return res.status(400).send({ success: false, message: '此職缺已關閉' })
    }
    const result = await orders.create(data)
    res.status(200).send({ success: true, message: '', result: result._id })
  } catch (error) {
    console.log(error)
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const result = await orders.find().populate('host', '_id name').populate('helper', '-account -password -tokens').populate('job')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 業主查 小幫手查
export const getMyOrders = async (req, res) => {
  try {
    let result
    // 業主
    if (req.user.role === 1) {
      result = await orders.find({ host: req.user._id }).populate('helper', 'name avatar').populate('job')
      // 小幫手
    } else if (req.user.role === 2) {
      result = await orders.find({ helper: req.user._id }).populate('helper', 'name avatar').populate('job')
      // console.log(req.user._id)
      // console.log(result)
    } else {
      result = await orders.find().populate('host', '_id name').populate('helper', '-account -password -tokens').populate('job')
    }
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
