import express from 'express'
import { register } from '../controllers/helpers.js'
import content from '../middleware/content.js'

const router = express.Router()

router.post('/', content('application/json'), register)
export default router
