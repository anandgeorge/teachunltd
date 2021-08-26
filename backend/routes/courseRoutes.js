import express from 'express'
const router = express.Router()
import {
  getCourses,
  getMyCourses,
  getCourseById,
  deleteCourse,
  deleteCourseContent,
  createCourse,
  updateCourse,
  createCourseReview,
  getTopCourses,
  getContentByCourseId,
  acceptCourse,
  likeCourse,
  notifyCourse
} from '../controllers/courseController.js'
import { protect, admin, check, tutor } from '../middleware/authMiddleware.js'

// router.route('/').get(getCourses).post(protect, admin, createCourse)
router.route('/').get(getCourses).post(protect, tutor, createCourse)
router.route('/my').get(protect, getMyCourses)
router.route('/:id/reviews').post(protect, createCourseReview)
router.get('/top', getTopCourses)
router.route('/accept/:id')
  .put(protect, acceptCourse)
router.route('/like/:id')
  .put(protect, likeCourse)
router.route('/notify/:id')
  .put(protect, notifyCourse)
router.route('/content/:id/:cid')
  .delete(protect, tutor, deleteCourseContent)
router.get('/:id/content', check, getContentByCourseId)
router
  .route('/:id')
  .get(getCourseById)
  // .delete(protect, admin, deleteCourse)
  .delete(protect, tutor, deleteCourse)
  // .put(protect, admin, updateCourse)
  .put(protect, tutor, updateCourse)

export default router
