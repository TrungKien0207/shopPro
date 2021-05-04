import express from 'express'
import {
  authUser,
  deleteUsers,
  getUserProfile,
  getUsers,
  getUsersById,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router
  .route('/:id')
  .get(protect, getUsersById)
  .delete(protect, admin, deleteUsers)
  .put(protect, admin, updateUser)

export default router
