import express from 'express'
import asyncHandler from 'express-async-handler'
import http from 'http'
import { Server } from 'socket.io'
import Log from '../models/logModel.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

const app = express()
const https = http.createServer(app)
const io = new Server(https)

async function updateStock(id, quantity) {
   const product = await Product.findById(id)

   product.countInStock = product.countInStock - quantity

   await product.save()
}

//* @desc       Create new order
//* @route      POST /api/order
//* @access     private
const addOrderItems = asyncHandler(async (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
   } = req.body

   if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
   } else {
      try {
         const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
         })
         console.log('order', order)
         order.orderItems.map(async (item) => {
            const p = item.product
            const q = item.qty

            const product = await Product.findById(p)

            product.countInStock = product.countInStock - q
            product.sold = product.sold + q

            await product.save()
         })

         const createdOrder = await order.save()

         //* CREATE LOG
         const log = new Log({
            userId: req.user._id,
            rootId: createdOrder._id,
            type: 'create order',
         })

         await log.save()

         //* PUSH NOTIFICATION
         const orderByUser = await User.findById(
            '6083833b80fa5e3fa0952dd7',
            'notifications'
         )

         orderByUser.notifications.newNotifications++
         orderByUser.notifications.list.push({ logId: log })
         await orderByUser.save()
         io.on('connection', (socket) => {
            console.log('socket', socket.id)
            socket.emit('create order', {
               user: req.user._id,
               orderId: createdOrder._id,
               content: createdOrder,
            })
         })

         res.status(201).json(createdOrder)
      } catch (error) {
         console.log(error)
      }
   }
})

//* @desc       Get order by ID
//* @route      GET /api/orders/:id
//* @access     private
const getOrderById = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
   )

   if (order) {
      setTimeout(() => {
         res.json(order)
      }, 1000)
   } else {
      res.status(404)
      throw new Error('Order not found')
   }
})

//* @desc       Update order to paid
//* @route      GET /api/orders/:id/pay
//* @access     private
const updateOrderToPaid = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)

   if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
         id: req.body.id,
         status: req.body.status,
         update_time: req.body.update_time,
         email_address: req.body.payer.email_address,
      }

      const updatedOrder = await order.save()

      res.json(updatedOrder)
   } else {
      res.status(404)
      throw new Error('Order not found')
   }
})

//* @desc       Update order to delivered
//* @route      GET /api/orders/:id/deliver
//* @access     Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)

   // console.log('Delivered', order)

   if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      const updatedOrder = await order.save()

      res.json(updatedOrder)
   } else {
      res.status(404)
      throw new Error('Order not found')
   }
})

//* @desc       Get logged in user orders
//* @route      GET /api/orders/myorders
//* @access     Private
const getMyOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
   })
   setTimeout(() => {
      res.json(orders)
   }, 200)
})

//* @desc       Get all orders
//* @route      GET /api/orders
//* @access     Private/Admin
const getOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'id name')

   let totalAmount = 0

   orders.forEach((order) => {
      totalAmount += order.totalPrice
   })

   setTimeout(() => {
      res.json({ orders, totalAmount })
   }, 100)
})

//* @desc       Delete orders
//* @route      DELETE /api/orders/:id
//* @access     Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)

   if (order) {
      await order.remove()
      res.json({ message: 'Order removed' })
   } else {
      res.status(404)
      throw new Error('Order not found')
   }
})

//* @desc       Update orders status
//* @route      PUT /api/orders/:id
//* @access     Private/Admin
const updateStatus = asyncHandler(async (req, res) => {
   const { orderStatus } = req.body

   // console.log(req.body)

   const order = await Order.findById(req.params.id)

   async function updateStock(id, quantity) {
      const product = await Product.findById(id)

      product.stock = product.stock - quantity
      await product.save()
   }

   // console.log('order', order)

   try {
      let updateOrderStatus = await Order.findByIdAndUpdate(
         order,
         {
            orderStatus,
         },
         { new: true }
      ).exec()
      setTimeout(() => {
         res.status(200).json({
            updateOrderStatus,
            message: 'Update Success Order Status',
         })
      }, 2000)
   } catch (error) {
      res.status(404)
      throw new Error('Order not found')
   }
})

//* @desc       Update orders status
//* @route      PUT /api/orders/:id
//* @access     Private
const updateStatusByMember = asyncHandler(async (req, res) => {
   const { _id, orderStatus } = req.body

   const order = await Order.findById(_id)

   console.log(req.body)

   // console.log('order', order)

   try {
      let updateOrderStatus = await Order.findByIdAndUpdate(
         order,
         {
            orderStatus,
         },
         { new: true }
      ).exec()
      setTimeout(() => {
         res.status(200).json({
            updateOrderStatus,
            message: 'Update Success Order Status',
         })
      }, 2000)
   } catch (error) {
      res.status(404)
      throw new Error('Order not found')
   }
})

export {
   addOrderItems,
   getOrderById,
   updateOrderToPaid,
   getMyOrders,
   getOrders,
   updateOrderToDelivered,
   deleteOrder,
   updateStatus,
   updateStatusByMember,
}
