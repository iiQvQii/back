import express from 'express'
import content from '../middleware/content.js'
import upload from '../middleware/upload.js'
import * as auth from '../middleware/auth.js'
import {
  createJob
} from '../controllers/jobs.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, upload, createJob)

export default router
