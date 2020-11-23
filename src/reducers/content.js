import {GLOBAL_CONTENT_LOADED, PAGE_CONTENT_LOADED, FONTS_LOADED} from '../actions'

const initialState = {
  global: null,
  page: null,
  fontsLoaded: null
}

const content = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_CONTENT_LOADED:
      return {
        ...state,
        global: action.payload
      }
    case PAGE_CONTENT_LOADED:
      return {
        ...state,
        page: action.payload
      }
    case FONTS_LOADED:
      return {
        ...state,
        fontsLoaded: action.payload
      }
    default:
      return state
  }
}

export default content
