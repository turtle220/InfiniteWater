import express from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'
import CmsApi from '../helper/cmsApi'
import { transformAll } from '../helper/transform'
import cacheMiddleware from '../middleware/cacheMiddleware'
import deepmerge from 'deepmerge'
import arrayMerge from '../helper/arrayMerge'
import removeUndefinedValues from '../helper/removeUndefinedValues'

const router = express.Router()

async function transformArticles (articles, language) {
  if (articles.translated) {
    return deepmerge(
      await transformAll(removeUndefinedValues(articles.master), language),
      await transformAll(removeUndefinedValues(articles.translated), language), {arrayMerge}
    )
  } else {
    return transformAll(articles.master, language)
  }
}

async function transformContent (content, language) {
  var result = {
    master: await transformAll(content.master, language),
    translated: content.translated && await transformAll(content.translated, language)
  }

  if (content.news_articles) {
    result.news_articles = await transformArticles(content.news_articles, language)
  }
  if (content.articles) {
    result.articles = await transformArticles(content.articles, language)
  }

  return result.translated ? {
    ...deepmerge(removeUndefinedValues(result.master, language), removeUndefinedValues(result.translated, language), {arrayMerge}),
    uid: result.master.uid,
    articles: result.articles,
    news_articles: result.news_articles
    // master_content: content
  } : {
    ...result.master,
    articles: result.articles,
    news_articles: result.news_articles
    // master_content: content
  }
}

router.get(['/', '/:lang', '/:lang/:type', '/:lang/:type/:uid'],
  cacheMiddleware,
  asyncMiddleware(async (req, res, next) => {
    const lang = req.params.lang
    var api = new CmsApi()
    // TODO Check the lang param, this will currently default to english for everything and will fill up the cache
    await api.init(req, lang)

    const content = await api.getContent(req.params.type, req.params.uid)

    if (!content) {
      res.status(404).send({error: 'Not Found'})
      return
    }

    // console.log(JSON.stringify(content, null, '  '))

    res.json(await transformContent(content, lang))
  }))

export default router
