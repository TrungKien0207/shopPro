import express from 'express'
import { orderStatisticalByDate } from '../controllers/consultController.js'
import {
   addOrderItems,
   deleteOrder,
   getMyOrders,
   getOrderById,
   getOrders,
   updateOrderToDelivered,
   updateOrderToPaid,
   updateStatus,
   updateStatusByMember,
} from '../controllers/orderControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)
router
   .route('/:id')
   .get(protect, getOrderById)
   .delete(protect, admin, deleteOrder)
   .put(protect, updateStatusByMember)
   .put(protect, admin, updateStatus)

router.route('/consult').post(protect, admin, orderStatisticalByDate)

router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, updateOrderToDelivered)

export default router
