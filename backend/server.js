import colors from 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { errorHandle, notFound } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use(notFound)
app.use(errorHandle)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
