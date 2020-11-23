import {canUseDom} from '../utils/dom'
import {breakpointChanged, REHYDRATED} from '../actions'
import {getCurrentBreakpoint} from '../selectors'
import {current} from '../styles/breakpoints'

export default store => {
  const check = () => {
    const bp = current()
    const prev = getCurrentBreakpoint(store.getState())
    if (bp !== prev) {
      store.dispatch(breakpointChanged(bp))
    }
  }
  if (canUseDom) {
    window.addEventListener('resize', check)
  }

  return next => action => {
    const ret = next(action)
    if (action.type === REHYDRATED) {
      check()
    }
    return ret
  }
}
