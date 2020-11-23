export const SET_LAYOUT_COLOR = 'SET_LAYOUT_COLOR'
export const PAGE_LOADED = 'PAGE_LOADED'
export const LEAVE_HOMEPAGE_SECTION = 'LEAVE_HOMEPAGE_SECTION'
export const ENTER_HOMEPAGE_SECTION = 'ENTER_HOMEPAGE_SECTION'
export const BREAKPOINT_CHANGED = 'BREAKPOINT_CHANGED'

export const setLayoutColor = (background, foreground) => {
  return {type: SET_LAYOUT_COLOR, payload: {background, foreground}}
}

export const leaveHomepageSection = (origin, destination, direction) => {
  return {type: LEAVE_HOMEPAGE_SECTION, payload: {origin, destination, direction}}
}

export const enterHomepageSection = (origin, destination, direction) => {
  return {type: ENTER_HOMEPAGE_SECTION, payload: {origin, destination, direction}}
}

export function breakpointChanged (breakpoint) {
  return {
    type: BREAKPOINT_CHANGED,
    payload: {
      breakpoint
    }
  }
}

export function setPageLoaded (ready) {
  return { type: PAGE_LOADED, payload: ready }
}
