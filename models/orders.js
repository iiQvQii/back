import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
  host: {
    type: mongoose.ObjectId,
    ref: 'hosts'
  },
  helper: {
    type: mongoose.ObjectId,
    ref: 'helpers'
  },
  job: {
    type: mongoose.ObjectId,
    ref: 'jobs'
  },
  review: {
    type: Number,
    required: true,
    default: 1
    // 1審核中/2通過/3未通過/4取消報名
  },
  answer: {
    type: String
    // required: true
  },
  applied_time: {
    type: Date,
    default: Date.now()
  }

}, { versionKey: false })
export default mongoose.model('orders', ordersSchema)
