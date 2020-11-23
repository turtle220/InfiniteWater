export const SUBMIT_CONTACT_REQUEST = 'SUBMIT_CONTACT_REQUEST'
export const SUBMIT_CONTACT_SUCCESS = 'SUBMIT_CONTACT_SUCCESS'
export const SUBMIT_CONTACT_ERROR = 'SUBMIT_CONTACT_ERROR'

export const submitContact = (data) => {
  return {type: SUBMIT_CONTACT_REQUEST, payload: data}
}

export const submitContactSuccess = (content) => {
  return {type: SUBMIT_CONTACT_SUCCESS}
}

export const submitContactError = (error) => {
  return {type: SUBMIT_CONTACT_ERROR, payload: error}
}
