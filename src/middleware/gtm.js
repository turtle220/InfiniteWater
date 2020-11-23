import {CONTENT_ROUTE} from '../actions'
import {canUseDom} from '../utils/dom'

export default store => next => action => {
  if (!canUseDom) return next(action)
  if (action.type === CONTENT_ROUTE) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'pageView',
      path: action.payload[0]
    })
  }
  return next(action)
}
