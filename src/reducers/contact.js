import {SUBMIT_CONTACT_REQUEST, SUBMIT_CONTACT_SUCCESS, SUBMIT_CONTACT_ERROR} from '../actions'

const initialState = {
  status: 'idle',
  message: null
}

const contact = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_CONTACT_REQUEST:
      return {
        ...state,
        status: 'loading'
      }
    case SUBMIT_CONTACT_SUCCESS:
      return {
        ...state,
        status: 'success'
      }
    case SUBMIT_CONTACT_ERROR:
      return {
        ...state,
        status: 'error',
        message: action.payload
      }
    default:
      return state
  }
}

export default contact
