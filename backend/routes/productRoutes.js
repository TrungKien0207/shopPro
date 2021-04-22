import express from 'express'
import {
  createProduct,
  createProductReview,
  deleteProduct,
  filterCategoriesProduct,
  filterPriceProduct,
  getCategoriesProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, createProductReview)
router.route('/top').get(getTopProducts)
router.route('/:id/category').get(getCategoriesProduct)

router.route('/filter/category').post(filterCategoriesProduct)
router.route('/filter/price').post(filterPriceProduct)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
