import {
  CONTENT_LIST_REQUEST,
  CONTENT_LIST_SUCCESS,
  CONTENT_LIST_FAIL,
  CONTENT_LIST_RESET,
  PENDING_LIST_REQUEST,
  PENDING_LIST_SUCCESS,
  PENDING_LIST_FAIL,  
  CONTENT_CREATE_RESET,
  CONTENT_CREATE_FAIL,
  CONTENT_CREATE_SUCCESS,
  CONTENT_CREATE_REQUEST,
  CONTENT_UPDATE_REQUEST,
  CONTENT_UPDATE_SUCCESS,
  CONTENT_UPDATE_FAIL,
  CONTENT_UPDATE_RESET,
  CONTENT_DELETE_REQUEST,
  CONTENT_DELETE_SUCCESS,
  CONTENT_DELETE_FAIL,
  CONTENT_ACCEPT_REQUEST,
  CONTENT_ACCEPT_SUCCESS,
  CONTENT_ACCEPT_FAIL,
  CONTENT_ACCEPT_RESET,
  CONTENT_DETAILS_REQUEST,
  CONTENT_DETAILS_SUCCESS,
  CONTENT_DETAILS_FAIL,
  JOIN_CLASS_REQUEST,
  JOIN_CLASS_SUCCESS,
  JOIN_CLASS_FAIL,
  CONTENT_SUBSCRIBE_REQUEST,
  CONTENT_SUBSCRIBE_SUCCESS,
  CONTENT_SUBSCRIBE_FAIL,
  CONTENT_SUBSCRIBE_RESET,
  CONTENT_LIKE_REQUEST,
  CONTENT_LIKE_SUCCESS,
  CONTENT_LIKE_FAIL,
  CONTENT_LIKE_RESET,
  CONTENT_PAY_REQUEST,
  CONTENT_PAY_SUCCESS,
  CONTENT_PAY_FAIL,
  CONTENT_PAY_RESET,
  CONTENT_UP_REQUEST,
  CONTENT_UP_SUCCESS,
  CONTENT_UP_FAIL,
  CONTENT_UP_RESET,
  CONTENT_DOWN_REQUEST,
  CONTENT_DOWN_SUCCESS,
  CONTENT_DOWN_FAIL,
  CONTENT_DOWN_RESET,
  CONTENT_ADD_REQUEST,
  CONTENT_ADD_SUCCESS,
  CONTENT_ADD_FAIL,
  CONTENT_ADD_RESET
} from '../constants/contentConstants'

export const contentListReducer = (state = { contents: [] }, action) => {
  switch (action.type) {
    case CONTENT_LIST_REQUEST:
      return { loading: true, contents: [] }
    case CONTENT_LIST_SUCCESS:
      return {
        loading: false,
        contents: action.payload.contents,
      }
    case CONTENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
    case CONTENT_LIST_RESET:
      return { contents: [] }
    }
}

export const pendingListReducer = (state = { pendings: [] }, action) => {
  switch (action.type) {
    case PENDING_LIST_REQUEST:
      return { loading: true, pendings: [] }
    case PENDING_LIST_SUCCESS:
      return {
        loading: false,
        pendings: action.payload.pendings,
      }
    case PENDING_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const contentDetailsReducer = (
  state = { content: {} },
  action
) => {
  switch (action.type) {
    case CONTENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CONTENT_DETAILS_SUCCESS:
      return { loading: false, content: action.payload }
    case CONTENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_CREATE_REQUEST:
      return { loading: true }
    case CONTENT_CREATE_SUCCESS:
      return { loading: false, success: true, content: action.payload }
    case CONTENT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const contentAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_ADD_REQUEST:
      return { loading: true }
    case CONTENT_ADD_SUCCESS:
      return { loading: false, success: true, content: action.payload.content, contentsArr: action.payload.contentsArr }
    case CONTENT_ADD_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const contentUpdateReducer = (state = { content: {} }, action) => {
  switch (action.type) {
    case CONTENT_UPDATE_REQUEST:
      return { loading: true }
    case CONTENT_UPDATE_SUCCESS:
      return { loading: false, success: true, content: action.payload }
    case CONTENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_UPDATE_RESET:
      return { content: {} }
    default:
      return state
  }
}

export const contentLikeReducer = (state = { likesc: 0, cid: 0, likes:[] }, action) => {
  switch (action.type) {
    case CONTENT_LIKE_REQUEST:
      return { loading: true }
    case CONTENT_LIKE_SUCCESS:
      return { loading: false, success: true, likesc: action.payload.likesc, cid:action.payload.id, likes: action.payload.likes }
    case CONTENT_LIKE_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_LIKE_RESET:
      return {}
    default:
      return state
  }
}

export const contentPayReducer = (state = { coins: 0, id:0, accepted: false }, action) => {
  switch (action.type) {
    case CONTENT_PAY_REQUEST:
      return { loading: true }
    case CONTENT_PAY_SUCCESS:
      return { loading: false, success: true, coins: action.payload.coins, id:action.payload.id, accepted: action.payload.accepted }
    case CONTENT_PAY_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const contentUpReducer = (state = { contentsArr: [], idx:0}, action) => {
  switch (action.type) {
    case CONTENT_UP_REQUEST:
      return { loading: true }
    case CONTENT_UP_SUCCESS:
      return { loading: false, success: true, contentsArr: action.payload.contentsArr, idx:action.payload.idx }
    case CONTENT_UP_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_UP_RESET:
      return {}
    default:
      return state
  }
}

export const contentDownReducer = (state = { contentsArr: [], idx:0}, action) => {
  switch (action.type) {
    case CONTENT_DOWN_REQUEST:
      return { loading: true }
    case CONTENT_DOWN_SUCCESS:
      return { loading: false, success: true, contentsArr: action.payload.contentsArr, idx:action.payload.idx }
    case CONTENT_DOWN_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_DOWN_RESET:
      return {}
    default:
      return state
  }
}

export const contentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_DELETE_REQUEST:
      return { loading: true }
    case CONTENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CONTENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contentAcceptReducer = (state = { content: {} }, action) => {
  switch (action.type) {
    case CONTENT_ACCEPT_REQUEST:
      return { loading: true }
    case CONTENT_ACCEPT_SUCCESS:
      return { loading: false, success: true, content: action.payload }
    case CONTENT_ACCEPT_FAIL:
      return { loading: false, error: action.payload }
    case CONTENT_ACCEPT_RESET:
      return { content: {} }
    default:
      return state
  }
}

export const contentSubscribeReducer = (state = { subscribers: [], balance:0, csid:0 }, action) => {
  switch (action.type) {
    case CONTENT_SUBSCRIBE_REQUEST:
      return { loading: true }
    case CONTENT_SUBSCRIBE_SUCCESS:
      return { loading: false, success: true, subscribers: action.payload.subscribers, balance: action.payload.balance, csid: action.payload.id }
    case CONTENT_SUBSCRIBE_FAIL:
      return { loading: false, error: action.payload }
      case CONTENT_SUBSCRIBE_RESET:
        return {}
      default:
      return state
  }
}


export const joinClassReducer = (
  state = { join: {} },
  action
) => {
  switch (action.type) {
    case JOIN_CLASS_REQUEST:
      return { ...state, loading: true }
    case JOIN_CLASS_SUCCESS:
      return { loading: false, join: action.payload }
    case JOIN_CLASS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
