import express from 'express'
const router = express.Router()
import {
  getCourses,
  getCourseById,
  updateCourse,
} from '../controllers/tcourseController.js'
import { protect, tutor } from '../middleware/authMiddleware.js'

router.route('/').get(protect, tutor, getCourses)
router
  .route('/:id')
  .get(getCourseById)
  .put(protect, tutor, updateCourse)

export default router
