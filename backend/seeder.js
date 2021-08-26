import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import courses from './data/courses.js'
import contents from './data/contents.js'
import students from './data/students.js'
import User from './models/userModel.js'
import Course from './models/courseModel.js'
import Content from './models/contentModel.js'
import Student from './models/studentModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()
    await Content.deleteMany()

    const createdUsers = await User.insertMany(users)
    const tutorUser = createdUsers[2]._id
    const studentUser = createdUsers[1]._id

    const sampleCourses = courses.map((course) => {
      return { ...course, tutor: tutorUser }
    })

    var createdCourses = await Course.insertMany(sampleCourses)

    const contentCourse = createdCourses[0]._id

    const sampleContents = contents.map((content) => {
      return { ...content, tutor: tutorUser, course: contentCourse }
    })

    await Content.insertMany(sampleContents)

    const sampleStudents = students.map((student) => {
      return { ...student, tutor: tutorUser, course: contentCourse, student: studentUser }
    })

    await Student.insertMany(sampleStudents)


    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
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
