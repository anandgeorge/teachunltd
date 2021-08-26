import axios from 'axios'
import {
  CONTENT_LIST_REQUEST,
  CONTENT_LIST_SUCCESS,
  CONTENT_LIST_FAIL,
  PENDING_LIST_REQUEST,
  PENDING_LIST_SUCCESS,
  PENDING_LIST_FAIL,
  CONTENT_CREATE_REQUEST,
  CONTENT_CREATE_SUCCESS,
  CONTENT_CREATE_FAIL,
  CONTENT_UPDATE_REQUEST,
  CONTENT_UPDATE_SUCCESS,
  CONTENT_UPDATE_FAIL,
  CONTENT_DELETE_SUCCESS,
  CONTENT_DELETE_REQUEST,
  CONTENT_DELETE_FAIL,
  CONTENT_ACCEPT_SUCCESS,
  CONTENT_ACCEPT_REQUEST,
  CONTENT_ACCEPT_FAIL,
  CONTENT_DETAILS_SUCCESS,
  CONTENT_DETAILS_REQUEST,
  CONTENT_DETAILS_FAIL,
  JOIN_CLASS_REQUEST,
  JOIN_CLASS_SUCCESS,
  JOIN_CLASS_FAIL,
  CONTENT_SUBSCRIBE_REQUEST,
  CONTENT_SUBSCRIBE_SUCCESS,
  CONTENT_SUBSCRIBE_FAIL,
  CONTENT_LIKE_REQUEST,
  CONTENT_LIKE_SUCCESS,
  CONTENT_LIKE_FAIL,
  CONTENT_PAY_REQUEST,
  CONTENT_PAY_SUCCESS,
  CONTENT_PAY_FAIL,
  CONTENT_UP_REQUEST,
  CONTENT_UP_SUCCESS,
  CONTENT_UP_FAIL,
  CONTENT_DOWN_REQUEST,
  CONTENT_DOWN_SUCCESS,
  CONTENT_DOWN_FAIL,
  CONTENT_ADD_REQUEST,
  CONTENT_ADD_SUCCESS,
  CONTENT_ADD_FAIL,
} from '../constants/contentConstants'
import {
  USER_BALANCE_SUCCESS
} from '../constants/userConstants'
import { logout } from './userActions'

export const listContent = (id = '') => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: CONTENT_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    let config = {}

    if(userInfo && userInfo.token) {
      config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    }

    const { data } = await axios.get(
      // `https://api.gurukul.best/api/courses/${id}/content`
      // `https://api.teachun.ltd/api/courses/${id}/content`
      `https://api.teachun.ltd/api/courses/${id}/content`, config
    )

    dispatch({
      type: CONTENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONTENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPendingContent = () => async (
  dispatch
) => {
  try {
    dispatch({ type: PENDING_LIST_REQUEST })

    const { data } = await axios.get(
      // `https://api.gurukul.best/api/content/pending`
      `https://api.teachun.ltd/api/content/pending`
    )

    dispatch({
      type: PENDING_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PENDING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listContentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_DETAILS_REQUEST })

    // const { data } = await axios.get(`https://api.gurukul.best/api/content/${id}`)
    const { data } = await axios.get(`https://api.teachun.ltd/api/content/${id}`)

    dispatch({
      type: CONTENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONTENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const likeContent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_LIKE_REQUEST,
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
      `https://api.teachun.ltd/api/content/like/${id}`,
      {},
      config
    )

    dispatch({
      type: CONTENT_LIKE_SUCCESS,
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
      type: CONTENT_LIKE_FAIL,
      payload: message,
    })
  }
}

export const payContent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_PAY_REQUEST,
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
      // `https://api.teachun.ltd/api/content/pay/${id}`,
      `https://api.teachun.ltd/api/content/pay/${id}`,
      {},
      config
    )

    dispatch({
      type: CONTENT_PAY_SUCCESS,
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
      type: CONTENT_PAY_FAIL,
      payload: message,
    })
  }
}

export const upContent = (cid, idx) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_UP_REQUEST,
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
      // `https://api.teachun.ltd/api/content/pay/${id}`,
      `https://api.teachun.ltd/api/content/up/${cid}/${idx}`,
      {},
      config
    )

    dispatch({
      type: CONTENT_UP_SUCCESS,
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
      type: CONTENT_UP_FAIL,
      payload: message,
    })
  }
}

export const downContent = (cid, idx) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_DOWN_REQUEST,
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
      // `https://api.teachun.ltd/api/content/pay/${id}`,
      `https://api.teachun.ltd/api/content/down/${cid}/${idx}`,
      {},
      config
    )

    dispatch({
      type: CONTENT_DOWN_SUCCESS,
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
      type: CONTENT_DOWN_FAIL,
      payload: message,
    })
  }
}


export const createContent = (type, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.post(`https://api.gurukul.best/api/content`, {type, id}, config)
    // const { data } = await axios.post(`https://api.teachun.ltd/api/content`, {type, id}, config)
    const { data } = await axios.post(`https://api.teachun.ltd/api/content`, {type, id}, config)
    // const { data } = await axios.post(`/api/content`, {type, id}, config)

    dispatch({
      type: CONTENT_CREATE_SUCCESS,
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
      type: CONTENT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const addContent = (id, idx) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_ADD_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.post(`https://api.gurukul.best/api/content`, {type, id}, config)
    // const { data } = await axios.post(`https://api.teachun.ltd/api/content`, {type, id}, config)
    // const { data } = await axios.post(`/api/content/add`, {id, idx}, config)
    const { data } = await axios.post(`https://api.teachun.ltd/api/content/add`, {id, idx}, config)

    // console.log('Data in ')

    dispatch({
      type: CONTENT_ADD_SUCCESS,
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
      type: CONTENT_ADD_FAIL,
      payload: message,
    })
  }
}

export const updateContent = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_UPDATE_REQUEST,
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
      // `https://api.gurukul.best/api/content/${content._id}`,
      // `https://api.teachun.ltd/api/content/${content._id}`,
      `https://api.teachun.ltd/api/content/${content._id}`,
      // `/api/content/${content._id}`,
      content,
      config
    )

    dispatch({
      type: CONTENT_UPDATE_SUCCESS,
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
      type: CONTENT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const subscribeContent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_SUBSCRIBE_REQUEST,
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
      // `https://api.gurukul.best/api/content/${content._id}`,
      // `https://api.teachun.ltd/api/content/subscribe/${id}`,
      `https://api.teachun.ltd/api/content/subscribe/${id}`,
      {},
      config
    )

    // console.log('Data in subscriber content')

    dispatch({
      type: CONTENT_SUBSCRIBE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_BALANCE_SUCCESS,
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
      type: CONTENT_SUBSCRIBE_FAIL,
      payload: message,
    })
  }
}

export const deleteContent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // await axios.delete(`https://api.gurukul.best/api/content/${id}`, config)
    await axios.delete(`https://api.teachun.ltd/api/content/${id}`, config)

    dispatch({
      type: CONTENT_DELETE_SUCCESS,
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
      type: CONTENT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const acceptContent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_ACCEPT_REQUEST,
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
      // `https://api.gurukul.best/api/content/accept/${id}`,
      `https://api.teachun.ltd/api/content/accept/${id}`,
      {},
      config
    )

    dispatch({
      type: CONTENT_ACCEPT_SUCCESS,
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
      type: CONTENT_ACCEPT_FAIL,
      payload: message,
    })
  }
}


export const joinClass = (id = '', courseId = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: JOIN_CLASS_REQUEST })
    // console.log('In join class')

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/content/join/${id}/${courseId}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/content/join/${id}/${courseId}`, config)

    dispatch({
      type: JOIN_CLASS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: JOIN_CLASS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}