import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
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
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_BALANCE_REQUEST,
  USER_BALANCE_SUCCESS,
  USER_BALANCE_FAIL,
  USER_NOTIFICATION_REQUEST,
  USER_NOTIFICATION_SUCCESS,
  USER_NOTIFICATION_FAIL,
  USER_NOTIFICATIONS_REQUEST,
  USER_NOTIFICATIONS_SUCCESS,
  USER_NOTIFICATIONS_FAIL,
  USER_EMAIL_FAIL,
  USER_EMAIL_SUCCESS,
  USER_EMAIL_REQUEST,
  USER_EMAIL_RESET,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      // 'https://api.gurukul.best/api/users/login',
      'https://api.teachun.ltd/api/users/login',
      // '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    if(data.verified) {
      localStorage.setItem('userInfo', JSON.stringify(data))
    }

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })
  document.location.href = '/'
}

export const register = (name, email, password, username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    let domain = localStorage.getItem("domain");

    const { data } = await axios.post(
      // 'https://api.gurukul.best/api/users',
      'https://api.teachun.ltd/api/users',
      // '/api/users',
      { name, email, password, username, domain },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // localStorage.setItem('userInfo', JSON.stringify(data))
    // dispatch(logout())
    
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/users/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/users/${id}`, config)
    // const { data } = await axios.get(`/api/users/${id}`, config)

    // console.log('In user details', data);

    dispatch({
      type: USER_DETAILS_SUCCESS,
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
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const resendEmail = () => async (dispatch, getState) => {
  try {

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/users/${id}`, config)
    // const { data } = await axios.get(`https://api.teachun.ltd/api/users/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/users/resend`, config)

    dispatch(logout())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_EMAIL_FAIL,
      payload: message,
    })
  }
}

export const getUserBalance = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_BALANCE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/users/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/users/balance/${id}`, config)

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
      type: USER_BALANCE_FAIL,
      payload: message,
    })
  }
}

export const getUserNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_NOTIFICATION_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/users/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/users/notification/${id}`, config)

    dispatch({
      type: USER_NOTIFICATION_SUCCESS,
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
      type: USER_NOTIFICATION_FAIL,
      payload: message,
    })
  }
}

export const getUserNotifications = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_NOTIFICATIONS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/users/${id}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/users/notifications/${id}`, config)

    dispatch({
      type: USER_NOTIFICATIONS_SUCCESS,
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
      type: USER_NOTIFICATIONS_FAIL,
      payload: message,
    })
  }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    // const { data } = await axios.put(`https://api.gurukul.best/api/users/profile`, user, config)
    const { data } = await axios.put(`https://api.teachun.ltd/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}

export const listUsers = (type) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // const { data } = await axios.get(`https://api.gurukul.best/api/users?type=${type}`, config)
    const { data } = await axios.get(`https://api.teachun.ltd/api/users?type=${type}`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
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
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // await axios.delete(`https://api.gurukul.best/api/users/${id}`, config)
    await axios.delete(`https://api.teachun.ltd/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    // const { data } = await axios.put(`https://api.gurukul.best/api/users/${user._id}`, user, config)
    const { data } = await axios.put(`https://api.teachun.ltd/api/users/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}
