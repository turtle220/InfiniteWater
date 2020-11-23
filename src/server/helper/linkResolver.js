import {getEnglishUid} from '../helper/locality'

const linkResolver = (language) => (doc, ctx) => {
  if (!doc.type) return undefined

  var url = ''
  if (language && language !== 'en') {
    url = `/${language}`
  }
  var uid = getEnglishUid(doc)
  switch (doc.type) {
    case 'page':
      if (!uid) return undefined
      url += `/${doc.type}/${uid || ''}`
      break
    case 'article':
      if (!uid) return undefined
      url += `/${doc.type}/${uid}`
      break
    case 'homepage':
      url += `/`
      break
    default:
      url += `/${doc.type}`
      break
  }

  return url
}

export default linkResolver
