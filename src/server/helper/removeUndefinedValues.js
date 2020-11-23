const removeUndefinedValues = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(x => removeUndefinedValues(x))
  }

  var clone = {...obj}
  Object.keys(clone).forEach(key => {
    if (clone[key] && typeof clone[key] === 'object') {
      clone[key] = removeUndefinedValues(obj[key])
    } else if (obj[key] === undefined || obj[key] === null) {
      delete obj[key]
    }
  })
  return obj
}

export default removeUndefinedValues
