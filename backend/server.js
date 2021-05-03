import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import { errorHandle, notFound } from './middleware/errorMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { Server } from 'socket.io'

import { createServer } from 'http'

dotenv.config()

connectDB()

const app = express()

var server = createServer(app)
const io = new Server(server)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/supplier', supplierRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.get('/', (req, res) => {
  res.send('API is running...')
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandle)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
