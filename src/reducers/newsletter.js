import {
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_ERROR,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_SET_VALID
} from '../actions'

const initialState = {
  status: 'idle'
}

const newsletter = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_REQUEST:
      return {
        ...state,
        status: 'loading'
      }
    case SUBSCRIBE_ERROR:
      return {
        ...state,
        status: 'error',
        message: action.payload.message
      }
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.payload.message
      }
    case SUBSCRIBE_SET_VALID:
      return {
        ...state,
        status: action.payload.valid ? 'idle' : 'error',
        message: action.payload.message
      }
    default:
      return state
  }
}

export default newsletter
