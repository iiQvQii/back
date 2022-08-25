import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})
// cloudinary.image('docs/models.jpg', { background: 'black', height: 250, width: 250, crop: 'pad' })

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  fileFilter(req, file, cb) {
    console.log(file, 'me')
    if (!file.mimetype.startsWith('image')) {
      // console.log('faild', file)

      cb(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

// const delete =

export const single = async (req, res, next) => {
  upload.single('avatar')(req, res, async error => {
    console.log(req.file, 'req.file')
    if (error instanceof multer.MulterError) {
      let message = '上傳失敗'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案格式錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      next()
    }
  })
}

export const array = async (req, res, next) => {
  // upload.single('photos')(req, res, async error => {
  upload.array('photos', 3)(req, res, async error => {
    console.log(req.files, 'req.files')
    if (error instanceof multer.MulterError) {
      let message = '上傳失敗'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案格式錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      next()
    }
  })
}
