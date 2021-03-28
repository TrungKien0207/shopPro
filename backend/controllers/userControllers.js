import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//* @desc       Auth users & get token
//* @route      GET /api/users/login
//* @access     Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      sex: user.sex,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
})

//* @desc       Register a new user
//* @route      POST /api/users
//* @access     Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, avatar, password } = req.body

  const user = await User.findOneAndUpdate(
    { email },
    { name, email, avatar, password },
    { new: true }
  )
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    const user = await User.create({
      name,
      email,
      avatar,
      password,
    })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }
})

//* @desc       Get user profile
//* @route      GET /api/users/profile
//* @access     Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  console.log(user)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      sex: user.sex,
      birthDay: user.birthDay,
      sex: user.sex,
      address: user.address,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* @desc       Update user profile
//* @route      PUT /api/users/profile
//* @access     Public
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.avatar = req.body.avatar || user.avatar
    user.birthDay = req.body.birthDay || user.birthDay
    user.sex = req.body.sex || user.sex
    user.birthDay = req.body.selectedDate || user.birthDay
    user.address = req.body.address || user.address
    if (req.body.password) {
      user.password = req.body.password
    }

    console.log('user', user)

    const updateUser = await user.save()

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      avatar: updateUser.avatar,
      birthDay: updateUser.birthDay,
      sex: updateUser.sex,
      address: updateUser.address,
      // '' +
      // updateUser.xa +
      // '' +
      // updateUser.huyen +
      // '' +
      // updateUser.thanhPho,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* @desc       Get all user
//* @route      GET /api/users
//* @access     Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  setTimeout(() => {
    res.json(users)
  }, 1000)
})

//* @desc       Delete user user
//* @route      DELETE /api/users/:id
//* @access     Private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* @desc       Get user by ID
//* @route      GET /api/users/:id
//* @access     Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* @desc       Update user by ID
//* @route      PUT /api/users/:id
//* @access     Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updateUser = await user.save()

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      avatar: updateUser.avatar,
      isAdmin: updateUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUsers,
  getUsersById,
  updateUser,
}
