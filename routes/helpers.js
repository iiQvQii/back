import express from 'express'
import { register } from '../controllers/admins.js'
import content from '../middleware/content.js'

const router = express.Router()

router.post('/register', content('application/json'), register)
export default router
