import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'anand@classroom.ltd',
    password: bcrypt.hashSync('Ucubj6ELGmyDWYF', 10),
    isAdmin: true,
  },
  {
    name: 'Bhargavi',
    email: 'aervabhargavi00@gmail.com',
    password: bcrypt.hashSync('kpDsh7ypkUxG39A', 10),
  },
  {
    name: 'Mujeeba Sultana',
    email: 'mujeebasultana7@gmail.com',
    password: bcrypt.hashSync('JGn6s6tYwHMuhwz', 10),
    isTutor: true,
  },
  {
    name: 'Alistair George',
    email: 'georgealistair910@gmail.com',
    password: bcrypt.hashSync('JGn6a6tYuHMaqwz', 10),
    isTutor: true,
  },
  {
    name: 'Ashwin George',
    email: 'ashgeorge@gmail.com',
    password: bcrypt.hashSync('kpDsh8ypeUe439A', 10),
  },
]

export default users
