import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getBalance,
  getNotification,
  verifyEmail,
  resendEmail
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/balance/:id')
  .get(protect, getBalance)
router
  .route('/notification/:id')
  .get(protect, getNotification)

router
  .route('/verify/:email/:id')
  .get(verifyEmail)

router
  .route('/resend')
  .get(protect, resendEmail)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)


export default router
