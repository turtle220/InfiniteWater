export const SUBSCRIBE_REQUEST = 'SUBSCRIBE_REQUEST'
export const SUBSCRIBE_ERROR = 'SUBSCRIBE_ERROR'
export const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS'
export const SUBSCRIBE_SET_VALID = 'SUBSCRIBE_SET_VALID'

export const subscribe = (email) => {
  return {type: SUBSCRIBE_REQUEST, payload: email}
}

export const subscribeError = (message) => {
  return {type: SUBSCRIBE_ERROR, payload: {message}}
}

export const subscribeSuccess = (message) => {
  return {type: SUBSCRIBE_SUCCESS, payload: {message}}
}

export const subscribeValid = (valid, message) => {
  return {type: SUBSCRIBE_SET_VALID, payload: {valid, message}}
}
