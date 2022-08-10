import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  publisher: {
    type: mongoose.ObjectId,
    ref: 'hosts'
  },
  title: {
    type: String,
    required: [true, '缺少職缺名稱'],
    maxlength: [20, '職缺名稱不得超過20字']
  },
  category: {
    type: String,
    enum: {
      values: ['專長換宿', '房務換宿', '餐廳換宿', '農業換宿', '水域換宿'],
      message: '職務分類錯誤'
    }
  },
  place: {
    type: String,
    enum: {
      values: ['專長換宿', '房務換宿', '餐廳換宿', '農業換宿', '水域換宿'],
      message: '職務分類錯誤'
    }
  },
  time: {
    type: Date
  },
  description: {
    type: String
  },
  welfare: {
    type: String,
    enum: {
      values: ['供餐', '房務換宿', '餐廳換宿', '農業換宿', '水域換宿'],
      message: '職務分類錯誤'
    }
  },
  publish_date: {
    type: Date
  },
  question: {
    type: String
  },
  isShown: {
    type: Boolean
  }

}, { versionKey: false })
export default mongoose.model('jobs', jobSchema)
