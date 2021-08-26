import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_EMAIL_FAIL,
  USER_EMAIL_REQUEST,
  USER_EMAIL_RESET,
  USER_EMAIL_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_BALANCE_REQUEST,
  USER_BALANCE_SUCCESS,
  USER_BALANCE_FAIL,
  USER_BALANCE_RESET,
  USER_NOTIFICATION_REQUEST,
  USER_NOTIFICATION_SUCCESS,
  USER_NOTIFICATION_FAIL,
  USER_NOTIFICATION_RESET,
  USER_NOTIFICATIONS_REQUEST,
  USER_NOTIFICATIONS_SUCCESS,
  USER_NOTIFICATIONS_FAIL,
  USER_NOTIFICATIONS_RESET
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userEmailReducer = (state = { emailed: false }, action) => {
  switch (action.type) {
    case USER_EMAIL_REQUEST:
      return { loading: true }
    case USER_EMAIL_SUCCESS:
      return { loading: false, emailed: true }
    case USER_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    case USER_EMAIL_RESET:
      return {}
    default:
      return state
  }
}

export const userBalanceReducer = (state = { balance: 0 }, action) => {
  switch (action.type) {
    case USER_BALANCE_REQUEST:
      return { ...state, loading: true }
    case USER_BALANCE_SUCCESS:
      return { loading: false, balance: action.payload.balance }
    case USER_BALANCE_FAIL:
      return { loading: false, error: action.payload }
    case USER_BALANCE_RESET:
      return {}
    default:
      return state
  }
}

export const userNotificationReducer = (state = { notification: 0 }, action) => {
  switch (action.type) {
    case USER_NOTIFICATION_REQUEST:
      return { ...state, loading: true }
    case USER_NOTIFICATION_SUCCESS:
      return { loading: false, notification: action.payload.notification }
    case USER_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload }
    case USER_NOTIFICATION_RESET:
      return {}
    default:
      return state
  }
}

export const userNotificationsReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case USER_NOTIFICATIONS_REQUEST:
      return { loading: true, notifications: [] }
    case USER_NOTIFICATIONS_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        notifications: action.payload.notifications,
      }
    case USER_NOTIFICATIONS_FAIL:
      return { loading: false, error: action.payload }
    case USER_NOTIFICATIONS_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}
