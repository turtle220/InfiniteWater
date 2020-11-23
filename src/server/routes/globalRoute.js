import express from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'
import CmsApi from '../helper/cmsApi'
import {transformAll} from '../helper/transform'
import cacheMiddleware from '../middleware/cacheMiddleware'
import deepmerge from 'deepmerge'
import arrayMerge from '../helper/arrayMerge'
import removeUndefinedValues from '../helper/removeUndefinedValues'

const router = express.Router()

router.get(['/', '/:lang'],
  cacheMiddleware,
  asyncMiddleware(async (req, res, next) => {
    const lang = req.params.lang
    var api = new CmsApi()
    await api.init(req, lang)
    var global = await api.getGlobalContent()

    global = global.translated
      ? deepmerge(await transformAll(global.master, lang), await transformAll(removeUndefinedValues(global.translated), lang), {arrayMerge})
      : await transformAll(global.master, lang)
    res.json(global)
  })
)

export default router
