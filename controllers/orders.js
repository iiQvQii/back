// import jobs from '../models/jobs.js'
import jobs from '../models/jobs.js'
import orders from '../models/orders.js'

export const createOrder = async (req, res) => {
  try {
    const data = {
      host: '',
      helper: req.user._id,
      job: req.body.job,
      answer: req.body.answer
    }
    const thisJob = await jobs.findById(req.body.job)
    if (!thisJob.is_shown) {
      return res.status(400).send({ success: false, message: '此職缺已關閉' })
    }
    data.host = thisJob.host
    // 如果已報名過該工作則不能報名
    const canOrder = await orders.find({ helper: req.user._id, job: req.body.job })
    console.log(canOrder)
    if (canOrder.length > 0) {
      return res.status(400).send({ success: false, message: '已報名過該職缺，請至後台確認' })
    }
    // 增加報名人數
    thisJob.applied_num++
    thisJob.save()
    const result = await orders.create(data)
    res.status(200).send({ success: true, message: '', result })
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
      result = await orders.find({ host: req.user._id }).populate('host', '_id name').populate('helper', 'name avatar').populate('job')
      // 小幫手
    } else if (req.user.role === 2) {
      result = await orders.find({ helper: req.user._id }).populate('host', '_id name').populate('helper', 'name avatar').populate('job')
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

// 修改報名狀態(小幫手取消報名)
export const cancelOrder = async (req, res) => {
  try {
    const result = await orders.findByIdAndUpdate(req.body._id, { review: req.body.review }, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
