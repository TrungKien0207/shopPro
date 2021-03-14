import bcryptjs from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/images/alexa.jpg',
    password: bcryptjs.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Hoang Anh',
    email: 'HA@example.com',
    avatar: '/images/alexa.jpg',
    password: bcryptjs.hashSync('123456', 10),
  },

  {
    name: 'Trung Kien',
    email: 'TK@example.com',
    avatar: '/images/alexa.jpg',
    password: bcryptjs.hashSync('123456', 10),
  },
]

export default users
