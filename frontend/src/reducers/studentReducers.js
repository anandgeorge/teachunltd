import {
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_RESET,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_FAIL,
  STUDENT_LIST_RESET,
  SCONTENT_LIST_REQUEST,
  SCONTENT_LIST_SUCCESS,
  SCONTENT_LIST_FAIL,
  SCONTENT_DETAILS_FAIL,
  SCONTENT_DETAILS_REQUEST,
  SCONTENT_DETAILS_SUCCESS,
  SCONTENT_CREATE_SUCCESS,
  SCONTENT_CREATE_REQUEST,
  SCONTENT_CREATE_FAIL,
  SCONTENT_CREATE_RESET,
  SCONTENT_UPDATE_REQUEST,
  SCONTENT_UPDATE_SUCCESS,
  SCONTENT_UPDATE_FAIL,
  SCONTENT_UPDATE_RESET,
  SCONTENT_DELETE_REQUEST,
  SCONTENT_DELETE_SUCCESS,
  SCONTENT_DELETE_FAIL,
} from '../constants/studentConstants'



export const studentDetailsReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, courses: action.payload }
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_DETAILS_RESET:
      return { courses: [] }
    default:
      return state
  }
}

export const studentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { loading: true }
    case STUDENT_LIST_SUCCESS:
      return { loading: false, students: action.payload }
    case STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_LIST_RESET:
      return { students: [] }
    default:
      return state
  }
}

export const studentContentReducer = (state = { contents: [] }, action) => {
  switch (action.type) {
    case SCONTENT_LIST_REQUEST:
      return { loading: true }
    case SCONTENT_LIST_SUCCESS:
      return { loading: false, contents: action.payload }
    case SCONTENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const scontentDetailsReducer = (
  state = { scontent: {} },
  action
) => {
  switch (action.type) {
    case SCONTENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SCONTENT_DETAILS_SUCCESS:
      return { loading: false, scontent: action.payload }
    case SCONTENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const scontentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SCONTENT_CREATE_REQUEST:
      return { loading: true }
    case SCONTENT_CREATE_SUCCESS:
      return { loading: false, success: true, scontent: action.payload }
    case SCONTENT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SCONTENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const scontentUpdateReducer = (state = { scontent: {} }, action) => {
  switch (action.type) {
    case SCONTENT_UPDATE_REQUEST:
      return { loading: true }
    case SCONTENT_UPDATE_SUCCESS:
      return { loading: false, success: true, scontent: action.payload }
    case SCONTENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SCONTENT_UPDATE_RESET:
      return { scontent: {} }
    default:
      return state
  }
}

export const scontentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SCONTENT_DELETE_REQUEST:
      return { loading: true }
    case SCONTENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SCONTENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}