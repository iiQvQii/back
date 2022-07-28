import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

import adminRouter from './routes/admins.js'
import hostRouter from './routes/hosts.js'
import helperRouter from './routes/helpers.js'

mongoose.connect(process.env.DB_URL)

const app = express()

app.use(express.json())
app.use('/admins', adminRouter)
app.use('/hosts', hostRouter)
app.use('/helpers', helperRouter)

app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running')
})
