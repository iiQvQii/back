import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
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
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  role: {
    type: Number,
    required: true,
    defalut: 0
  },
  tokens: {
    type: [String]
  }
}, { versionKey: false })
export default mongoose.model('admins', adminSchema)
