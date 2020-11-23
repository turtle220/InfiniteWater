import prismic from 'prismic-javascript'
import first from 'lodash/first'
import forEach from 'lodash/forEach'

export default class cmsApi {
  init = async (req, lang) => {
    this._api = await prismic.getApi(process.env.PRISMIC_API, {req: req})
    this._ref = req.cookies[prismic.previewCookie]
    this._lang = lang === 'zh' ? 'zh-cn' : null
  }

  getContent = async (type, uid) => {
    if (!type) {
      var homepage = await this._getSingle('homepage')
      var articles = await this.getArticles('News Article', 0, 5)
      return {
        ...homepage,
        news_articles: articles
      }
    }

    if (!uid) {
      return this._getSingle(type)
    }

    var page = await this._getByUID(type, uid)
    var articlesSlice = first(page.master.data.body.filter(x => x.slice_type === 'articles'))
    if (articlesSlice) {
      page.articles = await this.getArticles(articlesSlice.primary.article_type)
    }
    return page
  }

  getGlobalContent = async () => {
    return this._getSingle('global')
  }

  getArticles = async (articleType, index = 0, limit = 1000) => {
    return this._getDocuments(
      prismic.Predicates.any('my.article.article_type', [articleType]),
      {
        orderings: '[document.first_publication_date desc, my.article.title]',
        pageSize: limit,
        page: index,
        ref: this._ref
      }
    )
  }

  getEmailTemplate = async () => {
    return this._getSingle('email_template')
  }

  _getSingle = async (type) => {
    return this._getDocument(prismic.Predicates.at('document.type', type))
  }

  _getByUID = async (type, uid) => {
    return this._getDocument(prismic.Predicates.at(`my.${type}.uid`, uid))
  }

  _getDocument = async (predicate, options) => {
    const prismicOptions = options || { ref: this._ref }
    const master = first((await this._api.query(predicate, prismicOptions)).results)
    if (this._lang && master.alternate_languages) {
      var alternateLanguage = first(master.alternate_languages.filter(x => x.lang === this._lang))
      // Gets the translated version of the document
      if (alternateLanguage) {
        const translated = await this._api.getByID(alternateLanguage.id)
        return {master, translated}
      }
    }
    return {master}
  }

  _getDocuments = async (predicate, options) => {
    const prismicOptions = options || { ref: this._ref }
    const master = await this._api.query(predicate, prismicOptions)
    if (this._lang) {
      const altLanguages = master.results.filter(x => x.alternate_languages && x.alternate_languages.length > 0).map(y => first(y.alternate_languages.filter(z => z.lang === this._lang)))
      const translatedItems = await this._api.getByIDs(altLanguages.map(x => x.id))
      const results = []
      forEach(master.results, i => {
        const altLanguage = first(i.alternate_languages.filter(z => z.lang === this._lang))
        if (altLanguage) {
          var translated = first(translatedItems.results.filter(x => x.id === altLanguage.id))
          results.push(translated || {})
        } else {
          results.push({})
        }
      })
      return {master, translated: {results: results}}
    }
    return {master}
  }
}
