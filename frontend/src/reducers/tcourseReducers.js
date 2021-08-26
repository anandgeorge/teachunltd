import {
  TCOURSE_LIST_REQUEST,
  TCOURSE_LIST_SUCCESS,
  TCOURSE_LIST_FAIL,
  TCOURSE_DETAILS_REQUEST,
  TCOURSE_DETAILS_SUCCESS,
  TCOURSE_DETAILS_FAIL,
  TCOURSE_UPDATE_REQUEST,
  TCOURSE_UPDATE_SUCCESS,
  TCOURSE_UPDATE_FAIL,
  TCOURSE_UPDATE_RESET,
} from '../constants/tcourseConstants'

export const tcourseListReducer = (state = { tcourses: [] }, action) => {
  switch (action.type) {
    case TCOURSE_LIST_REQUEST:
      return { loading: true, tcourses: [] }
    case TCOURSE_LIST_SUCCESS:
      return {
        loading: false,
        tcourses: action.payload.tcourses,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case TCOURSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tcourseDetailsReducer = (
  state = { tcourse: {} },
  action
) => {
  switch (action.type) {
    case TCOURSE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case TCOURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload }
    case TCOURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tcourseUpdateReducer = (state = { tcourse: {} }, action) => {
  switch (action.type) {
    case TCOURSE_UPDATE_REQUEST:
      return { loading: true }
    case TCOURSE_UPDATE_SUCCESS:
      return { loading: false, success: true, course: action.payload }
    case TCOURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case TCOURSE_UPDATE_RESET:
      return { tcourse: {} }
    default:
      return state
  }
}
