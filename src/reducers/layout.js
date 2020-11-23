import {
  SET_LAYOUT_COLOR,
  LEAVE_HOMEPAGE_SECTION,
  ENTER_HOMEPAGE_SECTION,
  BREAKPOINT_CHANGED,
  PAGE_LOADED
} from '../actions'
import theme from '../styles/theme'

const initialState = {
  background: theme.colors.background,
  foreground: theme.colors.skin,
  homepage: null,
  isPageLoaded: false
}

const layout = (state = initialState, action) => {
  switch (action.type) {
    case BREAKPOINT_CHANGED:
      return {
        ...state,
        breakpoint: action.payload.breakpoint
      }
    case SET_LAYOUT_COLOR:
      return {
        ...state,
        ...action.payload
      }
    case LEAVE_HOMEPAGE_SECTION:
      return {
        ...state,
        homepage: {
          ...action.payload,
          state: 'leave'
        }
      }
    case ENTER_HOMEPAGE_SECTION:
      return {
        ...state,
        homepage: {
          ...action.payload,
          state: 'enter'
        }
      }
    case PAGE_LOADED:
      return {
        ...state,
        isPageLoaded: action.payload
      }
    default:
      return state
  }
}

export default layout
