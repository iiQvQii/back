import express from 'express'
import { register } from '../controllers/hosts.js'
import content from '../middleware/content.js'

const router = express.Router()

router.post('/', content('application/json'), register)
export default router
