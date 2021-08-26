import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'
import Content from '../models/contentModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const tutor = req.query.id ? {tutor: req.query.id} : {}
  const accepted = req.query.admin === 'true' ? {} : {accepted: true}
  const domain =  req.query.domain || 'app'

  console.log('req.query', req.query, keyword, tutor, accepted, domain);

  const count = await Course.countDocuments({ ...keyword, ...tutor, ...accepted, domain: domain})
  const courses = await Course.find({ ...keyword, ...tutor, ...accepted, domain:domain})
    .sort({_id:-1})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  
  res.json({ courses, page, pages: Math.ceil(count / pageSize) })
})

const getMyCourses = asyncHandler(async (req, res) => {
  // console.log('In getMyCourses', req.user, req.query);
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const tutor = req.query.id ? {tutor: req.query.id} : {}

  // console.log('req.query', req.query, keyword, tutor, accepted);

  const count = await Course.countDocuments({ ...keyword, ...tutor, tutor:req.user._id})
  const courses = await Course.find({ ...keyword, ...tutor, tutor:req.user._id})
    .sort({_id:-1})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  
  res.json({ courses, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    await course.remove()
    res.json({ message: 'Course removed' })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const deleteCourseContent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const cid = req.params.cid;
  const course = await Course.findById(req.params.cid)

  // console.log('Course contents', course.contents, cid, id);

  if (course && course.contents.indexOf(id) > -1) {
    course.contents.pull(id);
    course.accepted = false;
    course.changed = true;
    const updatedCourse = await course.save()
    res.json({ message: 'Content removed'});
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

const acceptCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  // console.log('In accept course', req.params.id, course);
  const contents = course.contents;

  if (course) {
    course.accepted = true
    course.changed = false

    await course.save()
    await Content.update({ _id: {$in:contents}}, {$set:{accepted:true}},{multi:true})

    res.json({})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  console.log('In createCourse', req.body);
  const course = new Course({
    name: 'Name the discourse',
    price: 0,
    tutor: req.user._id,
    username: req.user.username,
    image: '/images/sample.jpg',
    url: 'Url of tweet or reference',
    brand: 'Sample brand',
    category: 'Add a category',
    countInStock: 10,
    numReviews: 0,
    description: 'Introduce the discourse',
    live:'http://bbb.classroom.ltd/b/muj-urz-gis',
    accepted: false,
    domain: req.body.domain || 'app'
  })

  const createdCourse = await course.save()
  res.status(201).json(createdCourse)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const {
    name,
    // price,
    description,
    // image,
    // brand,
    category,
    // countInStock,
    url,
  } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
    course.name = name
    // course.price = price
    course.description = description
    // course.image = image
    // course.brand = brand
    course.category = category
    // course.countInStock = countInStock
    course.url = url

    const updatedCourse = await course.save()
    res.json(updatedCourse)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const likeCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    if(!course.likes) {
      course.likes = [];
    }
    course.likes.push(req.user._id)
    course.likesc++
    const updatedCourse = await course.save()
    res.json({likesc:course.likesc, id:req.params.id, likes: course.likes})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const notifyCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  if(!course.notify) {
    course.notify = [];
  }
  if (course) {
    course.notify.push(req.user._id)
    course.notifyc++
    const updatedCourse = await course.save()
    res.json({notifyc:course.notifyc, id:req.params.id, notify: course.notify})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createCourseReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
    const alreadyReviewed = course.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    course.reviews.push(review)

    course.numReviews = course.reviews.length

    course.rating =
      course.reviews.reduce((acc, item) => item.rating + acc, 0) /
      course.reviews.length

    await course.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({accepted:true}).sort({ rating: -1 }).limit(3)
  res.json(courses)
})

const getContentByCourseId = asyncHandler(async (req, res) => {
  // const contents = await Content.find({course:req.params.id})
  const course = await Course.findById(req.params.id)
  // console.log('Course', course);
  const ccontents = course.contents
  let contents = [];

  // console.log('Contents order', ccontents);

  let query = {}
  let queryIn = {};
  queryIn['$in'] = ccontents;
  query['_id'] = queryIn
  query['accepted'] = true;

  if(req.user && req.user._id.toString() === course.tutor.toString()) {
    delete query['accepted']
  }

  if(ccontents) {
    contents = await Content.find(query)
  }

  if (contents) {
    const finalContents = contents.sort((a,b) => ccontents.indexOf(a._id) - ccontents.indexOf(b._id))
    // console.log('Finalcontents', finalContents)
    res.json({contents:finalContents})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

export {
  getCourses,
  getMyCourses,
  getCourseById,
  deleteCourse,
  deleteCourseContent,
  createCourse,
  updateCourse,
  likeCourse,
  notifyCourse,
  createCourseReview,
  getTopCourses,
  getContentByCourseId,
  acceptCourse
}
