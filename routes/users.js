import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import { register, login, logout, getUser } from '../controllers/users.js'

const router = express.Router()

// 註冊/登入
// app.use('/users', usersRouter)
router.post('/register', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.get('/', auth.jwt, getUser)

// (查/刪)業主
// (查/刪)小幫手
// (查/刪)工作

// patch履歷
// (查/刪)報名

// patch履歷
// CRUD工作
// (查/改)報名
export default router
