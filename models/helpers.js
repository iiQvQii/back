import mongoose from 'mongoose'
import validator from 'validator'

const helperSchema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, '缺少帳號欄位'],
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號必須 20 個字以下'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤']
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    maxlength: [15, '姓名必須 15 個字以下']
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ['male', 'female', 'rather not say'],
      message: '性別錯誤'
    }
  },
  birth: {
    type: Date
  },
  tel: {
    type: String,
    maxlength: [10, '連絡電話必須 10 個字以下']
  },
  mobile: {
    type: String,
    required: [true, '缺少手機欄位'],
    minlength: [10, '手機10碼'],
    maxlength: [10, '手機10碼']
  },
  email: {
    type: String,
    required: [true, '缺少欄位'],
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  description: {
    type: String
  },
  photos: {
    type: String
  },
  role: {
    type: Number,
    required: true,
    default: 2
  },
  tokens: {
    type: [String]
  }
}, { versionKey: false })
export default mongoose.model('heplers', helperSchema)
