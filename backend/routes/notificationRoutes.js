import { roundToNearestMinutes } from 'date-fns'
import express from 'express'
import { getNotifications } from '../controllers/userControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, admin, getNotifications)

export default router
