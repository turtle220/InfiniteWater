import {SUBSCRIBE_REQUEST, subscribeError, subscribeSuccess} from '../actions'
import {postSubscription} from '../api'

export default store => next => action => {
  if (action.type === SUBSCRIBE_REQUEST) {
    postSubscription(action.payload)
      .then(data => {
        if (!data.ok) {
          store.dispatch(subscribeError('Oops, something has gone wrong. Please try again later.'))
          data.json().then(response => console.error(response))
        } else {
          store.dispatch(subscribeSuccess())
        }
      })
      .catch(() => store.dispatch(subscribeError('Oops, something has gone wrong. Please try again later.')))
  }
  return next(action)
}
