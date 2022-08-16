import express from 'express'
import content from '../middleware/content.js'
import * as upload from '../middleware/upload.js'
import * as auth from '../middleware/auth.js'
import hosts from '../middleware/hosts.js'
import {
  createJob,
  getShownJobs,
  getJob,
  getMyJobs
} from '../controllers/jobs.js'

const router = express.Router()

// app.use('/jobs', jobsRouter)
router.post('/', content('multipart/form-data'), auth.jwt, hosts, upload.array, createJob)
router.get('/', auth.jwt, getShownJobs)
router.get('/:id', auth.jwt, getJob)
router.get('/my_job', auth.jwt, getMyJobs)

export default router
