import deepmerge from 'deepmerge'
import removeUndefinedValues from './removeUndefinedValues'

const emptyTarget = value => Array.isArray(value) ? [] : {}
const clone = (value, options) => deepmerge(emptyTarget(value), value, options)

const arrayMerge2 = (target, source, options) => {
  const destination = source.slice()

  target.forEach(function (e, i) {
    if (typeof destination[i] === 'undefined') {
      destination[i] = clone(e, options)
    } else {
      destination[i] = deepmerge(removeUndefinedValues(e), removeUndefinedValues(source[i]), options)
    }
  })
  return destination
}

export default arrayMerge2
