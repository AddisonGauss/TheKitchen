import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'Add',
    email: 'add@add.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: false,
  },
  {
    name: 'Gauss',
    email: 'gauss@gauss.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: false,
  },
  {
    name: 'larry',
    email: 'larry@larry.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: false,
  },
]

export default users
