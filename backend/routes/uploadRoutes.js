import path from 'path'
import express from 'express'
import multer from 'multer'
import { uploadFile } from '../controllers/uploadController.js'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'content/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(filetypes, file, cb) {
  // const filetypes = /jpg|jpeg|png|pdf/
  console.log('File types', filetypes, file);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  console.log('Extname and mimetype', extname, mimetype);

  if (extname && mimetype) {
    console.log('mimetype', mimetype, extname);
    return cb(null, true)
  } else {
    cb('Please send correct file type!')
  }
}

const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(/jpg|jpeg|png/, file, cb)
  },
})

const uploadPdf = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(/pdf/, file, cb)
  },
})

const uploadAudio = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(/audio\/mpeg|mp3|audio\/ogg|ogg|audio\/wav|wav/, file, cb)
  },
})


router.post('/image', uploadImage.single('image'), (req, res) => {
  console.log('In uploadImage', req.file.path);
  uploadFile(req, res, 'image', `${req.file.path}`)
})

router.post('/pdf', uploadPdf.single('pdf'), (req, res) => {
  uploadFile(req, res, 'pdf', `${req.file.path}`)
})

router.post('/audio', uploadAudio.single('audio'), (req, res) => {
  console.log('In uploadaudio', req.file.path);
  uploadFile(req, res, 'audio', `${req.file.path}`)
})


export default router
