import axios from 'axios'
import {
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_LIST_FAIL,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  SCONTENT_LIST_REQUEST,
  SCONTENT_LIST_SUCCESS,
  SCONTENT_LIST_FAIL,
  SCONTENT_DETAILS_FAIL,
  SCONTENT_DETAILS_REQUEST,
  SCONTENT_DETAILS_SUCCESS,
  SCONTENT_CREATE_REQUEST,
  SCONTENT_CREATE_SUCCESS,
  SCONTENT_CREATE_FAIL,
  SCONTENT_UPDATE_REQUEST,
  SCONTENT_UPDATE_SUCCESS,
  SCONTENT_UPDATE_FAIL,
  SCONTENT_DELETE_REQUEST,
  SCONTENT_DELETE_SUCCESS,
  SCONTENT_DELETE_FAIL,
} from '../constants/studentConstants'

import {
    USER_LOGOUT,
    USER_DETAILS_RESET,
    USER_LIST_RESET,
  } from '../constants/userConstants'

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/login'
  }

export const getStudentCourses = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/students/courses/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/students/courses/${id}`, config)

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
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
      type: STUDENT_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const getStudentContent = (courseId, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCONTENT_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/students/${courseId}/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/students/${courseId}/${id}`, config)

    dispatch({
      type: SCONTENT_LIST_SUCCESS,
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
      type: SCONTENT_LIST_FAIL,
      payload: message,
    })
  }
}


export const listStudents = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/students/${id}`, config);
    const { data } = await axios.get(`https://api.teachun.ltd/api/students/${id}`, config);

    dispatch({
      type: STUDENT_LIST_SUCCESS,
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
      type: STUDENT_LIST_FAIL,
      payload: message,
    })
  }
}

export const getStudentContentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCONTENT_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/students/content/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/students/content/${id}`, config)

    dispatch({
      type: SCONTENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SCONTENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createStudentContent = (courseId, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCONTENT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.post(`https://api.gurukul.best/api/students/content`, {courseId, id}, config)
    const { data } = await axios.post(`https://api.teachun.ltd/api/students/content`, {courseId, id}, config)

    dispatch({
      type: SCONTENT_CREATE_SUCCESS,
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
      type: SCONTENT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateStudentContent = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCONTENT_UPDATE_REQUEST,
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
      // `https://api.gurukul.best/api/students/content/${content._id}`,
      `https://api.teachun.ltd/api/students/content/${content._id}`,
      content,
      config
    )

    dispatch({
      type: SCONTENT_UPDATE_SUCCESS,
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
      type: SCONTENT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteStudentContent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCONTENT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // await axios.delete(`https://api.gurukul.best/api/students/content/${id}`, config)
    await axios.delete(`https://api.teachun.ltd/api/students/content/${id}`, config)

    dispatch({
      type: SCONTENT_DELETE_SUCCESS,
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
      type: SCONTENT_DELETE_FAIL,
      payload: message,
    })
  }
}