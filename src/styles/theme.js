import mapValues from 'lodash/mapValues'
import * as breakpoints from './breakpoints'
import {round} from '../utils/math'

export const LINE_HEIGHT = 1.5
export const BASE_FONT_SIZE_PIXELS = 16

export function getRemValue (sizeInPixels) {
  return `${round(sizeInPixels / BASE_FONT_SIZE_PIXELS)}rem`
}

export const expandAbsolutely = () => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
})

export function centerAbsolute () {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

export function flexCenter (inline = false) {
  return {
    display: inline ? 'inline-flex' : 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export function afterFix () {
  return {
    '&:after': {
      clear: 'both',
      content: '""',
      display: 'table'
    }
  }
}

export function aspectRatio (ratio = 1) {
  return {
    position: 'relative',
    '&::before': {
      display: 'block',
      content: '""',
      paddingTop: `${100 / ratio}%`
    },
    '& > *': {
      ...expandAbsolutely
    }
  }
}

export const colors = {
  white: '#fff',
  primary: '#4d4e56',
  water: '#91adbc',
  dusk: '#cfabab',
  lemon: '#f4ddaf',
  skin: '#F5E5DA', // '#f1e1d3',
  background: '#4d4e56',
  overlay: 'rgba(0,0,0,0.35)'
}

const spacingFactors = {
  xs: 0.25,
  sm: 0.5,
  md: 1,
  lg: 2,
  xlg: 3
}
const spacing = mapValues(spacingFactors, factor => getRemValue(BASE_FONT_SIZE_PIXELS * LINE_HEIGHT * factor))
const spacingPx = mapValues(spacingFactors, factor => BASE_FONT_SIZE_PIXELS * LINE_HEIGHT * factor)
const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Montserrat, sans-serif'
}

export default {
  base: {
    fontSize: BASE_FONT_SIZE_PIXELS,
    lineHeight: LINE_HEIGHT
  },
  content: {
    width: 1440
  },
  zIndex: {
    header: 1000,
    menu: 999,
    homeHero: 1 // this is just to bring it to the front on ssr
  },
  fonts,
  breakpoints,
  colors: colors,
  getRemValue,
  spacingPx,
  spacing,
  text: {
    maxWidth: 640
  },
  mixin: {
    aspectRatio,
    afterFix,
    flexCenter,
    centerAbsolute,
    expandAbsolutely,
    imageOverlay: () => ({
      '&:after': {
        ...expandAbsolutely(),
        content: '""',
        backgroundColor: colors.overlay,
        backgroundBlendMode: 'multiply'
      }
    }),
    contentSidePadding: () => ({
      padding: [0, '1.5rem'],
      [breakpoints.up('sm')]: {
        padding: [0, '3rem']
      },
      [breakpoints.up('md')]: {
        padding: [0, '6.5rem']
      }
    }),
    headerOffset: (property = 'marginTop', func = (value) => value) => ({
      [property]: func('5rem'),
      [breakpoints.up('sm')]: {
        [property]: func('10rem')
      },
      [breakpoints.up('md')]: {
        [property]: func('12rem')
      }
    }),
    contentContainer: (top = 0, bottom = 0) => ({
      maxWidth: 1440,
      width: '100%',
      margin: 'auto',
      padding: [top, '1.5rem', bottom],
      [breakpoints.up('sm')]: {
        padding: [top, '3rem', bottom]
      },
      [breakpoints.up('md')]: {
        padding: [top, '6.5rem', bottom]
      }
    }),
    // TODO Remove this shit!!!!
    content: (func = (top, right, bottom, left) => [top, right, bottom, left]) => ({
      maxWidth: 1440,
      width: '100%',
      margin: 'auto',
      padding: func('0.5rem', '0.5rem', '0.5rem', '0.5rem'),
      [breakpoints.up('sm')]: {
        padding: func('1rem', '1rem', '1rem', '1rem')
      },
      [breakpoints.up('md')]: {
        padding: func('1.5rem', '3rem', '1.5rem', '3rem')
      }
    })
  }
}
