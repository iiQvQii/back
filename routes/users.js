import express from 'express'
import content from '../middleware/content.js'
import * as upload from '../middleware/upload.js'
import * as auth from '../middleware/auth.js'
import {
  register,
  login,
  logout,
  getUser,
  getHelper,
  extend,
  editUserInfo,
  changeAvatar
} from '../controllers/users.js'

const router = express.Router()

// 註冊/登入
// app.use('/users', usersRouter)
router.post('/register', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.post('/extend', auth.jwt, extend) // 換發token

router.get('/', auth.jwt, getUser)
router.patch('/edit_info', content('multipart/form-data'), auth.jwt, upload.array, editUserInfo)

router.patch('/avatar', content('multipart/form-data'), auth.jwt, upload.single, changeAvatar)

// (查)業主
// (查/刪)小幫手
router.get('/helper/:id', auth.jwt, getHelper)

export default router
