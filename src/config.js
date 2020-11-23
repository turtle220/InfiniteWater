let apiURL = process.env.REACT_APP_API_URL || '/api'

export const setApiUrl = (host) => {
  apiURL = host
}

export const getApiUrl = () => {
  return apiURL
}

export const mailchimpUrl = () => {
  return process.env.REACT_APP_MAILCHIMP_URL
}

export const gtmId = () => {
  return process.env.REACT_APP_GTM_ID
}
