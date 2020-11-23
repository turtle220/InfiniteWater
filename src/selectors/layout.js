import get from 'lodash/get'
import {keys} from '../styles/breakpoints'

export const getCurrentBreakpoint = (state) => get(state, ['layout', 'breakpoint'])
export const isCurrentBreakpointAtLeast = (state, breakpoint) => keys.indexOf(getCurrentBreakpoint(state)) >= keys.indexOf(breakpoint)
export const isCurrentBreakpointAtMost = (state, breakpoint) => keys.indexOf(getCurrentBreakpoint(state)) <= keys.indexOf(breakpoint)

export const getHomepageSectionState = (state) => get(state, ['layout', 'homepage', 'state'])
export const getHomepageSectionDestination = (state) => get(state, ['layout', 'homepage', 'destination'])
export const getHomepageSectionDirection = (state) => get(state, ['layout', 'homepage', 'direction'])
export const getHomepageSectionOrigin = (state) => get(state, ['layout', 'homepage', 'origin'])

export const isPageLoaded = (state) => get(state, ['layout', 'isPageLoaded'])
