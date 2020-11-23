import {
  TOGGLE_MENU,
  SET_FOREGROUND_COLOR,
  CONTENT_ROUTE,
  SHRINK_MENU
} from '../actions'

const initialState = {
  open: false,
  color: 'light',
  shrink: false
}

const menu = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        open: !state.open
      }
    case CONTENT_ROUTE:
      return {
        ...state,
        open: false,
        color: 'light'
      }
    case SET_FOREGROUND_COLOR:
      return {
        ...state,
        color: action.payload.color
      }
    case SHRINK_MENU:
      return {
        ...state,
        shrink: action.payload.shrink
      }
    default:
      return state
  }
}

export default menu
