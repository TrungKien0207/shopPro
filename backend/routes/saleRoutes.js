var express = require('express')
const {
   createSale,
   getSale,
   getSaleById,
   updateSaleById,
   deleteSaleById,
} = require('../controllers/saleController.js')

var { admin, protect } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').post(protect, admin, createSale).get(protect, admin, getSale)

router
   .route('/:id')
   .get(protect, admin, getSaleById)
   .put(protect, admin, updateSaleById)
   .delete(protect, admin, deleteSaleById)

module.exports = router
