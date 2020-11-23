import {canUseDom} from '../utils/dom'

const unit = 'px'
const step = 2
export const keys = ['xs', 'sm', 'md', 'lg', 'xl']
export const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}

export function up (key) {
  const value = typeof values[key] === 'number' ? values[key] : key
  return `@media (min-width:${value}${unit})`
}

export function down (key) {
  const endIndex = keys.indexOf(key) + 1
  const upperbound = values[keys[endIndex]]

  if (endIndex === keys.length) {
    // xl down applies to all sizes
    return up('xs')
  }

  const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key
  return `@media (max-width:${value - step / 100}${unit})`
}

export function between (start, end) {
  const endIndex = keys.indexOf(end) + 1

  if (endIndex === keys.length) {
    return up(start)
  }

  return (
    `@media (min-width:${values[start]}${unit}) and ` +
        `(max-width:${values[keys[endIndex]] - step / 100}${unit})`
  )
}

export function only (key) {
  return between(key, key)
}

export function width (key) {
  return values[key]
}

export function current () {
  if (canUseDom) {
    const width = window.innerWidth
    for (let i = keys.length - 1; i >= 0; --i) {
      const bp = keys[i]
      if (values[bp] <= width) {
        return bp
      }
    }
  } else {
    return keys[0]
  }
}
