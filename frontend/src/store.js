import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  courseListReducer,
  mycourseListReducer,
  courseDetailsReducer,
  courseDeleteReducer,
  ccontentDeleteReducer,
  courseAcceptReducer,
  courseCreateReducer,
  courseUpdateReducer,
  courseLikeReducer,
  courseReviewCreateReducer,
  courseTopRatedReducer,
  courseNotifyReducer,
} from './reducers/courseReducers'

import {
  tcourseListReducer,
  tcourseDetailsReducer,
  tcourseUpdateReducer,
} from './reducers/tcourseReducers'

import {
  contentListReducer,
  pendingListReducer,
  contentCreateReducer,
  contentUpdateReducer,
  contentDeleteReducer,
  contentDetailsReducer,
  joinClassReducer,
  contentAcceptReducer,
  contentSubscribeReducer,
  contentLikeReducer,
  contentPayReducer,
  contentUpReducer,
  contentDownReducer,
  contentAddReducer
} from './reducers/contentReducers'


import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userBalanceReducer,
  userNotificationReducer,
  userNotificationsReducer,
  userEmailReducer
} from './reducers/userReducers'
import {
  studentListReducer,
  studentDetailsReducer,
  studentContentReducer,
  scontentDetailsReducer,
  scontentCreateReducer,
  scontentUpdateReducer,
  scontentDeleteReducer,
} from './reducers/studentReducers'

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  courseList: courseListReducer,
  mycourseList: mycourseListReducer,
  courseDetails: courseDetailsReducer,
  courseDelete: courseDeleteReducer,
  courseAccept: courseAcceptReducer,
  courseCreate: courseCreateReducer,
  courseUpdate: courseUpdateReducer,
  courseLike: courseLikeReducer,
  courseNotify: courseNotifyReducer,
  courseReviewCreate: courseReviewCreateReducer,
  courseTopRated: courseTopRatedReducer,
  tcourseList: tcourseListReducer,
  tcourseDetails: tcourseDetailsReducer, 
  tcourseUpdateReducer: tcourseUpdateReducer, 
  contentList: contentListReducer,
  pendingList: pendingListReducer,
  contentCreate: contentCreateReducer,
  contentUpdate: contentUpdateReducer, 
  contentDelete: contentDeleteReducer,
  ccontentDelete: ccontentDeleteReducer,
  contentDetails: contentDetailsReducer,
  contentAccept: contentAcceptReducer,
  contentSubscribe: contentSubscribeReducer,
  contentLike: contentLikeReducer,
  contentPay: contentPayReducer,
  contentUp: contentUpReducer,
  contentDown: contentDownReducer,
  contentAdd: contentAddReducer,
  joinc: joinClassReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userBalance: userBalanceReducer,
  userNotification: userNotificationReducer,
  userNotifications: userNotificationsReducer,
  userEmail: userEmailReducer,
  studentList: studentListReducer,
  studentDetails: studentDetailsReducer,
  studentContent: studentContentReducer,
  scontentDetails: scontentDetailsReducer,
  scontentCreate: scontentCreateReducer,
  scontentUpdate: scontentUpdateReducer,
  scontentDelete: scontentDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
