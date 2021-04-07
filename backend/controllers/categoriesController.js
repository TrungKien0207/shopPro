import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Category from '../models/categoryModel.js'

//* @desc       Create Categories
//* @route      POST /api/Categories
//* @access     Private/Admin
const createCategories = asyncHandler(async (req, res) => {
  const createCategories = await Category.create({
    name: req.body.name,
    slug: slugify(req.body.name),
  })
  setTimeout(() => {
    res.status(201).json(createCategories)
  }, 2500)
})

//* @desc       Get all orders
//* @route      GET /api/orders
//* @access     Private
const getCategory = asyncHandler(async (req, res) => {
  const cat = await Category.find({})

  setTimeout(() => {
    res.json(cat)
  }, 200)
})

//* @desc       Get all orders
//* @route      GET /api/orders
//* @access     Private/Admin
const getCategoryAd = asyncHandler(async (req, res) => {
  const cat = await Category.find({})

  setTimeout(() => {
    res.json(cat)
  }, 200)
})

//* @desc       Get category by ID
//* @route      GET /api/category/:id
//* @access     Private
const getCategoryById = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id)

  if (cat) {
    setTimeout(() => {
      res.json(cat)
    }, 200)
  } else {
    res.status(404)
    throw new Error('Danh mục không tìm thấy')
  }
})

//* @desc       Delete category
//* @route      DELETE /api/category/:id
//* @access     Private
const deleteCategoryById = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id)

  if (cat) {
    await cat.remove()
    setTimeout(() => {
      res.json({ message: 'Danh mục đã được xoá' })
    }, 2500)
  } else {
    res.status(404)
    throw new Error('Danh mục không tìm thấy')
  }
})

//* @desc       Update category by ID
//* @route      PUT /api/category/:id
//* @access     Private/Admin
const updateCategoryById = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id)

  if (cat) {
    cat.name = req.body.name || cat.name
    const updateCat = await cat.save()
    setTimeout(() => {
      res.json({
        _id: updateCat._id,
        name: updateCat.name,
        slug: updateCat.slug,
      })
    }, 2500)
  } else {
    res.status(404)
    throw new Error('Danh mục không tìm thấy')
  }
})

export {
  createCategories,
  getCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
  getCategoryAd,
}
