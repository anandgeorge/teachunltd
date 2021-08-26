import axios from 'axios'
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  MYCOURSE_LIST_REQUEST,
  MYCOURSE_LIST_SUCCESS,
  MYCOURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_FAIL,
  CCONTENT_DELETE_SUCCESS,
  CCONTENT_DELETE_REQUEST,
  CCONTENT_DELETE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_ACCEPT_SUCCESS,
  COURSE_ACCEPT_REQUEST,
  COURSE_ACCEPT_FAIL,
  COURSE_CREATE_REVIEW_REQUEST,
  COURSE_CREATE_REVIEW_SUCCESS,
  COURSE_CREATE_REVIEW_FAIL,
  COURSE_TOP_REQUEST,
  COURSE_TOP_SUCCESS,
  COURSE_TOP_FAIL,
  COURSE_LIKE_REQUEST,
  COURSE_LIKE_SUCCESS,
  COURSE_LIKE_FAIL,
  COURSE_NOTIFY_REQUEST,
  COURSE_NOTIFY_SUCCESS,
  COURSE_NOTIFY_FAIL
} from '../constants/courseConstants'
import { logout } from './userActions'

export const listCourses = (keyword = '', pageNumber = '', id = '', admin = false) => async (
  dispatch
) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST })

    // let url = `https://api.gurukul.best/api/courses?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}`
    // let url = `/api/courses?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}`
    let domain = localStorage.getItem('domain');
    // let domain = 'bakedbytes';
    // let domain = 'app';
    let url = `https://api.teachun.ltd/api/courses?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}&domain=${domain}`
    if(admin) {
      // url = `https://api.gurukul.best/api/courses?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}&admin=true`
      // url = `/api/courses?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}&admin=true`
      url = `https://api.teachun.ltd/api/courses?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}&domain=${domain}&admin=true`
    }

    const { data } = await axios.get(
      url
    )

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyCourses = (keyword = '', pageNumber = '', id = '', admin = false) => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: MYCOURSE_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    let url = `https://api.teachun.ltd/api/courses/my?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}`
    if(admin) {
      url = `https://api.teachun.ltd/api/courses/my?keyword=${keyword}&pageNumber=${pageNumber}&id=${id}&admin=true`
    }

    const { data } = await axios.get(
      url,
      config
    )

    dispatch({
      type: MYCOURSE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MYCOURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST })

    // const { data } = await axios.get(`https://api.gurukul.best/api/courses/${id}`)
    const { data } = await axios.get(`https://api.teachun.ltd/api/courses/${id}`)

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // await axios.delete(`https://api.gurukul.best/api/courses/${id}`, config)
    await axios.delete(`https://api.teachun.ltd/api/courses/${id}`, config)

    dispatch({
      type: COURSE_DELETE_SUCCESS,
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
      type: COURSE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createCourse = (tutor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_CREATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    let domain = localStorage.getItem("domain");
    // console.log('In createCourse', config, tutor, domain);


    // const { data } = await axios.post(`https://api.gurukul.best/api/courses`, {tutor:tutor}, config)
    // const { data } = await axios.post(`https://api.teachun.ltd/api/courses`, {tutor:tutor}, config)
    const { data } = await axios.post(`https://api.teachun.ltd/api/courses`, {tutor:tutor, domain:domain}, config)

    dispatch({
      type: COURSE_CREATE_SUCCESS,
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
      type: COURSE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateCourse = (course) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_UPDATE_REQUEST,
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
      type: COURSE_UPDATE_SUCCESS,
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
      type: COURSE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const acceptCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_ACCEPT_REQUEST,
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
      // `https://api.teachun.ltd/api/courses/accept/${id}`,
      `https://api.teachun.ltd/api/courses/accept/${id}`,
      {},
      config
    )

    dispatch({
      type: COURSE_ACCEPT_SUCCESS,
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
      type: COURSE_ACCEPT_FAIL,
      payload: message,
    })
  }
}

export const likeCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_LIKE_REQUEST,
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
      // `https://api.gurukul.best/api/courses/like/${id}`,
      `https://api.teachun.ltd/api/courses/like/${id}`,
      {},
      config
    )

    dispatch({
      type: COURSE_LIKE_SUCCESS,
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
      type: COURSE_LIKE_FAIL,
      payload: message,
    })
  }
}

export const notifyCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_NOTIFY_REQUEST,
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
      // `https://api.gurukul.best/api/courses/accept/${id}`,
      `https://api.teachun.ltd/api/courses/notify/${id}`,
      {},
      config
    )

    dispatch({
      type: COURSE_NOTIFY_SUCCESS,
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
      type: COURSE_NOTIFY_FAIL,
      payload: message,
    })
  }
}

export const deleteCourseContent = (id, cid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CCONTENT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`https://api.teachun.ltd/api/courses/content/${id}/${cid}`, config)

    dispatch({
      type: CCONTENT_DELETE_SUCCESS,
      payload: {id:id, cid: cid}
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
      type: CCONTENT_DELETE_FAIL,
      payload: message,
    })
  }
}


export const createCourseReview = (courseId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COURSE_CREATE_REVIEW_REQUEST,
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

    // await axios.post(`https://api.gurukul.best/api/courses/${courseId}/reviews`, review, config)
    await axios.post(`https://api.teachun.ltd/api/courses/${courseId}/reviews`, review, config)

    dispatch({
      type: COURSE_CREATE_REVIEW_SUCCESS,
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
      type: COURSE_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_TOP_REQUEST })

    // const { data } = await axios.get(`https://api.gurukul.best/api/courses/top`)
    const { data } = await axios.get(`https://api.teachun.ltd/api/courses/top`)

    dispatch({
      type: COURSE_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COURSE_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
