import axios from 'axios'
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
} from '../constants/tcourseConstants'
import { logout } from './userActions'

export const listTutorCourses = (keyword = '', pageNumber = '') => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: TCOURSE_LIST_REQUEST })

    const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

    // const { data } = await axios.get(`https://api.gurukul.best/api/tcourses?keyword=${keyword}&pageNumber=${pageNumber}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/tcourses?keyword=${keyword}&pageNumber=${pageNumber}`, config)

    dispatch({
      type: TCOURSE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TCOURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TCOURSE_DETAILS_REQUEST })

    // const { data } = await axios.get(`https://api.gurukul.best/api/tcourses/${id}`)
    const { data } = await axios.get(`https://api.teachun.ltd/api/tcourses/${id}`)

    dispatch({
      type: TCOURSE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TCOURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCourse = (course) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TCOURSE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      // `https://api.gurukul.best/api/courses/${course._id}`,
      `https://api.teachun.ltd/api/courses/${course._id}`,
      course,
      config
    )

    dispatch({
      type: TCOURSE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TCOURSE_UPDATE_FAIL,
      payload: message,
    })
  }
}
