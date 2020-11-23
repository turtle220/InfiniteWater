import get from 'lodash/get'

export const isMenuOpen = (state) => state.menu.open
export const getMenuItems = (state) => get(state, ['content', 'global', 'menu'])
export const getMenuForegroundColor = (state) => get(state, ['menu', 'color'])
export const getMenuShrunk = (state) => get(state, ['menu', 'shrink'])
