import express from 'express'
import {
   deleteImage,
   uploadImage,
} from '../controllers/cloudinaryController.js'

const router = express.Router()

router.route('/').post(uploadImage).post(deleteImage)

export default router
