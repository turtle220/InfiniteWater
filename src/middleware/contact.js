import {SUBMIT_CONTACT_REQUEST, submitContactError, submitContactSuccess} from '../actions'
import {postContact} from '../api'

export default store => next => action => {
  if (action.type === SUBMIT_CONTACT_REQUEST) {
    postContact(action.payload)
      .then(data => {
        if (!data.ok) {
          store.dispatch(submitContactError('Oops, something has gone wrong. Please try again later.'))
          data.json().then(response => console.error(response))
        } else {
          store.dispatch(submitContactSuccess())
        }
      })
      .catch(() => store.dispatch(submitContactError('Oops, something has gone wrong. Please try again later.')))
  }
  return next(action)
}
