import express from 'express'
import { register } from '../controllers/hosts.js'
import content from '../middleware/content.js'

const router = express.Router()

// app.use('/hosts', hostRouter)
router.post('/register', content('application/json'), register)

export default router
