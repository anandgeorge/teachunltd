import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Course.countDocuments({ tutor: req.user._id })
  const tcourses = await Course.find({ tutor: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  
  res.json({ tcourses, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const tcourse = await Course.findById(req.params.id)

  if (tcourse) {
    res.json(tcourse)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
    course.name = name
    course.price = price
    course.description = description
    course.image = image
    course.brand = brand
    course.category = category
    course.countInStock = countInStock

    const updatedCourse = await course.save()
    res.json(updatedCourse)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})



export {
  getCourses,
  getCourseById,
  updateCourse,
}
