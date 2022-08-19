import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import helpers from '../middleware/helpers.js'
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  cancelOrder
} from '../controllers/orders.js'

const router = express.Router()

// app.use('/orders', jobsRouter)
router.post('/', content('application/json'), auth.jwt, helpers, createOrder)
router.get('/', auth.jwt, getAllOrders)
router.get('/my_orders', auth.jwt, getMyOrders)
// 改訂單狀態(通過不通過)
router.patch('/', content('application/json'), auth.jwt, helpers, cancelOrder)

export default router
