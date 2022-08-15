import express from 'express'
import content from '../middleware/content.js'
import * as upload from '../middleware/upload.js'
import * as auth from '../middleware/auth.js'
import hosts from '../middleware/hosts.js'
import {
  createJob
} from '../controllers/jobs.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, hosts, upload.array, createJob)

export default router
