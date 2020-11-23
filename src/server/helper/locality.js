import first from 'lodash/first'

export const getEnglishUid = (doc) => {
  if (doc.alternate_languages) {
    var lang = first(doc.alternate_languages.filter(x => x.lang.startsWith('en')))
    if (lang && lang.uid) {
      return lang.uid
    }
  }
  return doc.uid
}
