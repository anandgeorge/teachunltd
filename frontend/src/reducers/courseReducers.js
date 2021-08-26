import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  MYCOURSE_LIST_REQUEST,
  MYCOURSE_LIST_SUCCESS,
  MYCOURSE_LIST_FAIL,
  MYCOURSE_LIST_RESET,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_RESET,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
  CCONTENT_DELETE_REQUEST,
  CCONTENT_DELETE_SUCCESS,
  CCONTENT_DELETE_FAIL,
  CCONTENT_DELETE_RESET,
  COURSE_ACCEPT_REQUEST,
  COURSE_ACCEPT_SUCCESS,
  COURSE_ACCEPT_FAIL,
  COURSE_ACCEPT_RESET,  
  COURSE_CREATE_RESET,
  COURSE_CREATE_FAIL,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_REQUEST,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_RESET,
  COURSE_CREATE_REVIEW_REQUEST,
  COURSE_CREATE_REVIEW_SUCCESS,
  COURSE_CREATE_REVIEW_FAIL, 
  COURSE_CREATE_REVIEW_RESET,
  COURSE_TOP_REQUEST,
  COURSE_TOP_SUCCESS,
  COURSE_TOP_FAIL,
  COURSE_LIKE_REQUEST,
  COURSE_LIKE_SUCCESS,
  COURSE_LIKE_FAIL,
  COURSE_LIKE_RESET,
  COURSE_NOTIFY_REQUEST,
  COURSE_NOTIFY_SUCCESS,
  COURSE_NOTIFY_FAIL,
  COURSE_NOTIFY_RESET
} from '../constants/courseConstants'

export const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true, courses: [] }
    case COURSE_LIST_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const mycourseListReducer = (state = { mycourses: [] }, action) => {
  switch (action.type) {
    case MYCOURSE_LIST_REQUEST:
      return { loading: true, mycourses: [] }
    case MYCOURSE_LIST_SUCCESS:
      return {
        loading: false,
        mycourses: action.payload.courses,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case MYCOURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case MYCOURSE_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const ccontentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CCONTENT_DELETE_REQUEST:
      return { loading: true }
    case CCONTENT_DELETE_SUCCESS:
      return { loading: false, success: true, ids: action.payload }
    case CCONTENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case CCONTENT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const courseDetailsReducer = (state = { course: { reviews: [] } }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload }
    case COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_DETAILS_RESET:
      return { course: { reviews: [] } }
    default:
      return state
  }
}

export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true }
    case COURSE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case COURSE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseAcceptReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_ACCEPT_REQUEST:
      return { loading: true }
    case COURSE_ACCEPT_SUCCESS:
      return { loading: false, success: true }
    case COURSE_ACCEPT_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_ACCEPT_RESET:
      return { }
    default:
      return state
  }
}


export const courseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true }
    case COURSE_CREATE_SUCCESS:
      return { loading: false, success: true, course: action.payload }
    case COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const courseUpdateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return { loading: true }
    case COURSE_UPDATE_SUCCESS:
      return { loading: false, success: true, course: action.payload }
    case COURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_UPDATE_RESET:
      return { course: {} }
    default:
      return state
  }
}

export const courseLikeReducer = (state = { likesc: 0, cid: 0, likes:[] }, action) => {
  switch (action.type) {
    case COURSE_LIKE_REQUEST:
      return { loading: true }
    case COURSE_LIKE_SUCCESS:
      return { loading: false, success: true, likesc: action.payload.likesc, cid:action.payload.id, likes: action.payload.likes }
    case COURSE_LIKE_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_LIKE_RESET:
      return {}
    default:
      return state
  }
}

export const courseNotifyReducer = (state = { notifyc: 0, cid: 0, notify:[] }, action) => {
  switch (action.type) {
    case COURSE_NOTIFY_REQUEST:
      return { loading: true }
    case COURSE_NOTIFY_SUCCESS:
      return { loading: false, success: true, notifyc: action.payload.notifyc, cid:action.payload.id, notify: action.payload.notify }
    case COURSE_NOTIFY_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_NOTIFY_RESET:
      return {}
    default:
      return state
  }
}

export const courseReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case COURSE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case COURSE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case COURSE_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const courseTopRatedReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_TOP_REQUEST:
      return { loading: true, courses: [] }
    case COURSE_TOP_SUCCESS:
      return { loading: false, courses: action.payload }
    case COURSE_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
