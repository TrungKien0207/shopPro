import express from 'express'
import {
  createCategories,
  deleteCategoryById,
  getCategory,
  getCategoryAd,
  getCategoryById,
  updateCategoryById,
} from '../controllers/categoriesController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, admin, createCategories).get(getCategory)

router.route('/adm').get(protect, admin, getCategoryAd)

router
  .route('/:id')
  .get(getCategoryById)
  .delete(deleteCategoryById)
  .put(protect, admin, updateCategoryById)

export default router
