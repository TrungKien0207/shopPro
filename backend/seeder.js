import dotenv from 'dotenv'
import colors from 'colors'
import mongoose from 'mongoose'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import Categories from './models/categoryModel.js'
import connectDB from './config/db.js'
import categories from './data/categories.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Categories.deleteMany()

    const createUsers = await User.insertMany(users)

    const adminUser = createUsers[0]._id

    const sampleCategories = categories.map((cat) => {
      return { ...cat, user: adminUser }
    })
    await Categories.insertMany(sampleCategories)

    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProduct)

    console.log('Data Imported.'.green.inverse)

    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Categories.deleteMany()

    console.log('Data Destroyed.'.red.inverse)

    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
