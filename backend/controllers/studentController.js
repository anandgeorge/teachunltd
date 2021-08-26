import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import Student from '../models/studentModel.js'
import Course from '../models/courseModel.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getStudents = asyncHandler(async (req, res) => {
  const orders = await Order.find({'orderItems.course':req.params.id}).select('user');
  if(orders && orders.length > 0) {
    const courseUsers = orders.map((order) => {
      return order.user;
    })

    // console.log('courseUsers', courseUsers);
    const users = await User.find({_id:{$in:courseUsers}})
    res.json(users)    
  }
  else {
    res.json([])
  }
})

const getCoursesByStudentId = asyncHandler(async (req, res) => {
  console.log('In get courses getCoursesByStudentId', req.params.id);
  const orders = await Order.find({user:req.params.id}).select('orderItems');
  if(orders && orders.length > 0) {
    let courseUsers = []
    orders.map((order) => {
      order.orderItems.map((item) => {
        courseUsers.push(item.course)
      })
    })

    console.log('courseUsers', courseUsers);
    const courses = await Course.find({_id:{$in:courseUsers}})
    res.json(courses)    
  }
  else {
    res.json([])
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getContentByStudentId = asyncHandler(async (req, res) => {
  console.log('Student', req.params.id, 'Course', req.params.courseId);
  const students = await Student.find({student:req.params.id, course: req.params.courseId})
  // const students = await Student.find({})

  // console.log('Students', students);
  
    if (students) {
      res.json(students)
    } else {
      res.json([])
    }
  })

  const getStudentContentById = asyncHandler(async (req, res) => {
    console.log('Student content id', req.params.id);
    const content = await Student.findById(req.params.id)
    
      if (content) {
        res.json(content)
      } else {
        res.json({})
      }
    })

const deleteStudentContent = asyncHandler(async (req, res) => {
  const content = await Student.findById(req.params.id)

  if (content) {
    await content.remove()
    res.json({ message: 'Content removed' })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})
  
const createStudentContent = asyncHandler(async (req, res) => {
  const content = new Student({
    name: 'Sample name',
    tutor: req.user._id,
    course: req.body.courseId,
    student: req.body.id,
    image: '/images/sample.jpg',
    url: 'sample-name',
    type: 'pdf'
  })

  const createdContent = await content.save()
  res.status(201).json(createdContent)
})

const updateStudentContent = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    url,
  } = req.body

  const content = await Student.findById(req.params.id)

  if (content) {
    content.name = name
    content.image = image
    content.url = url

    const updatedContent = await content.save()
    res.json(updatedContent)
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})
  


export {
  getStudents,
  getContentByStudentId,
  getCoursesByStudentId,
  getStudentContentById,
  createStudentContent,
  updateStudentContent,
  deleteStudentContent
}
