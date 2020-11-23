export const TOGGLE_MENU = 'TOGGLE_MENU'
export const SET_FOREGROUND_COLOR = 'SET_FOREGROUND_COLOR'
export const SHRINK_MENU = 'SHRINK_MENU'

export const toggleMenu = () => {
  return {type: TOGGLE_MENU}
}

export const setMenuForegroundColor = (color) => {
  return {type: SET_FOREGROUND_COLOR, payload: {color}}
}

export const shrinkMenu = (shrink) => {
  return {type: SHRINK_MENU, payload: {shrink}}
}
