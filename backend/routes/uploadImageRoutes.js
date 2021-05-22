import express from 'express'
import {
   deleteImage,
   uploadImage,
   uploadImageAvatar,
} from '../controllers/cloudinaryController.js'

const router = express.Router()

router.route('/').post(uploadImage).post(deleteImage)
router.route('/avatar').post(uploadImageAvatar)

export default router
