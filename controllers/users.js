import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import admins from '../models/admins.js'
import hosts from '../models/hosts.js'
import helpers from '../models/helpers.js'

// 管理員註冊+密碼加密
export const register = async (req, res) => {
  const password = req.body.password
  if (!password) {
    return res.status(400).send({ success: false, message: '缺少密碼欄位' })
  }
  if (password.length < 4) {
    return res.status(400).send({ success: false, message: '密碼必須 4 個字以上' })
  }
  if (password.length > 20) {
    return res.status(400).send({ success: false, message: '密碼必須 20 個字以下' })
  }
  if (!password.match(/^[A-Za-z0-9]+$/)) {
    return res.status(400).send({ success: false, message: '密碼格式錯誤' })
  }
  req.body.password = bcrypt.hashSync(password, 10)
  try {
    if (req.body.role === 0) {
      await admins.create(req.body)
    } else if (req.body.role === 1) {
      await hosts.create(req.body)
    } else {
      await helpers.create(req.body)
    }
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '此帳號已存在' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 登入
// jwt簽發
export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '5s' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(200).send({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        name: req.user.name,
        avatar: req.user.avatar,
        tel: req.user.tel,
        mobile: req.user.mobile,
        email: req.user.email,
        city: req.user.city,
        district: req.user.district,
        address: req.user.address,
        zipcode: req.user.zipcode,
        description: req.user.description,
        photos: req.user.photos,
        gender: req.user.gender,
        birth: req.user.birth,
        role: req.user.role
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET, { expiresIn: '5s' })
    req.user.token[idx] = token
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: token })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const getUser = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        name: req.user.name,
        avatar: req.user.avatar,
        tel: req.user.tel,
        mobile: req.user.mobile,
        email: req.user.email,
        city: req.user.city,
        district: req.user.district,
        address: req.user.address,
        zipcode: req.user.zipcode,
        description: req.user.description,
        photos: req.user.photos,
        gender: req.user.gender,
        birth: req.user.birth,
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editUserInfo = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      gender: req.body.gender,
      birth: req.body.birth,
      tel: req.body.tel,
      mobile: req.body.mobile,
      email: req.body.email,
      city: req.body.city,
      district: req.body.district,
      address: req.body.address,
      zipcode: req.body.zipcode,
      description: req.body.description
    }
    // 業主--------------------------------------
    if (req.body.role === '1') {
      // if (req.file) data.photos = req.file.path
      if (req.files.length !== 0) {
        data.photos = []
        for (let i = 0; i < req.files.length; i++) {
          data.photos.push(req.files[i].path)
        }
      }
      const result = await hosts.findByIdAndUpdate(req.user._id, data, { new: true })
      res.status(200).send({ success: true, message: '', result })
      // 小幫手---------------------------------------
    } else {
      if (req.files.length !== 0) {
        data.photos = []
        for (let i = 0; i < req.files.length; i++) {
          data.photos.push(req.files[i].path)
        }
      }
      const result = await helpers.findByIdAndUpdate(req.user._id, data, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
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
