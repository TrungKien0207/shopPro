import express from 'express'
import {
  createSupplier,
  deleteSupplierById,
  getSupplier,
  getSupplierAd,
  getSupplierById,
  updateSupplierById,
} from '../controllers/supplierController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, admin, createSupplier).get(getSupplier)

router.route('/adm').get(protect, admin, getSupplierAd)

router
  .route('/:id')
  .get(getSupplierById)
  .put(protect, admin, updateSupplierById)
  .delete(deleteSupplierById)

export default router
