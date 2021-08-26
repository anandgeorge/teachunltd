import express from 'express'
const router = express.Router()
import {
  getStudents,
  getStudentContentById,
  getContentByStudentId,
  getCoursesByStudentId,
  deleteStudentContent,
  updateStudentContent,
  createStudentContent
} from '../controllers/studentController.js'
import { protect, tutor } from '../middleware/authMiddleware.js'

router.route('/courses/:id').get(protect, getCoursesByStudentId)
router.route('/content').post(protect, tutor, createStudentContent)
router.route('/content/:id').get(protect, tutor, getStudentContentById)
  .delete(protect, tutor, deleteStudentContent)
  .put(protect, tutor, updateStudentContent)
router.route('/:courseId/:id').get(protect, getContentByStudentId)
router.route('/:id').get(protect, tutor, getStudents)


export default router
