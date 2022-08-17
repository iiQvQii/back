import express from 'express'
import content from '../middleware/content.js'
import * as upload from '../middleware/upload.js'
import * as auth from '../middleware/auth.js'
import hosts from '../middleware/hosts.js'
import {
  createJob,
  getShownJobs,
  getJob,
  getMyJobs,
  getSearchJobs,
  editJob
} from '../controllers/jobs.js'

const router = express.Router()

// app.use('/jobs', jobsRouter)
router.post('/', content('multipart/form-data'), auth.jwt, hosts, upload.array, createJob)
router.patch('/:id', content('multipart/form-data'), auth.jwt, hosts, upload.array, editJob)
router.get('/', auth.jwt, getShownJobs)
router.get('/my_job', auth.jwt, getMyJobs)
router.get('/search/:id', auth.jwt, getSearchJobs)
router.get('/:id', auth.jwt, getJob)

export default router
