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
import notificationRoutes from './routes/notificationRoutes.js'
import uploadImageRoutes from './routes/uploadImageRoutes.js'
import bodyParser from 'body-parser'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
dotenv.config()
connectDB()

const app = express()
const https = http.createServer(app)
const io = new Server(https)
io.on('connection', (socket) => {
   console.log('socket', socket.id)
})
function getSocketIo() {
   return io
}
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(fileUpload())

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/supplier', supplierRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/uploadImages', uploadImageRoutes)

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
https.listen(
   PORT,
   console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
         .bold
   )
)

