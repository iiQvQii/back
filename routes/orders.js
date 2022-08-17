import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import helpers from '../middleware/helpers.js'
import {
  createOrder,
  getAllOrders,
  getMyOrders
} from '../controllers/orders.js'

const router = express.Router()

// app.use('/orders', jobsRouter)
router.post('/', content('application/json'), auth.jwt, helpers, createOrder)
router.get('/', auth.jwt, getAllOrders)
router.get('/my_orders', auth.jwt, getMyOrders)
// router.patch('/') 改訂單狀態(通過不通過)

export default router
