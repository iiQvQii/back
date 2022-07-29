import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import { register, login } from '../controllers/admins.js'

const router = express.Router()

// 註冊/登入/(查/刪)業主/(查/刪)小幫手/(查/刪)工作
// app.use('/admins', adminRouter)
router.post('/register', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)

export default router
