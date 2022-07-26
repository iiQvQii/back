import mongoose from 'mongoose'
import validator from 'validator'

const hostSchema = new mongoose.Schema({
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
    maxlength: [15, '帳號必須 15 個字以下']
  },
  tel: {
    type: String
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
  city: {
    type: String
  },
  dist: {
    type: String,
    enum: {
      values: ['衣服', '包包'],
      message: '地址區錯誤'
    }
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  photos: {
    type: String
  },
  tokens: {
    type: [String]
  }
}, { versionKey: false })
export default mongoose.model('hosts', hostSchema)
