import express from 'express'
const router = express.Router()
import {
  getContentById,
  deleteContent,
  updateContent,
  acceptContent,
  createContent,
  joinClass,
  getPendingContent,
  subscribeContent,
  likeContent,
  payContent,
  upContent,
  downContent,
  addContent
} from '../controllers/contentController.js'
import { protect, tutor } from '../middleware/authMiddleware.js'

router.route('/').post(protect, tutor, createContent)
router.route('/join/:id/:courseId').get(protect, joinClass)
router.route('/accept/:id')
  .put(protect, acceptContent)
router.route('/subscribe/:id')
  .put(protect, subscribeContent)  
router.route('/pending').get(getPendingContent)
router.route('/like/:id')
  .put(protect, likeContent)
router.route('/pay/:id')
  .put(protect, payContent)
router.route('/up/:cid/:idx')
  .put(protect, upContent)
router.route('/down/:cid/:idx')
  .put(protect, downContent)
router.route('/add')
  .post(protect, addContent)
router.route('/:id')
  .get(getContentById)
  .delete(protect, tutor, deleteContent)
  .put(protect, tutor, updateContent)

export default router
