import prismic from 'prismic-javascript'
import redisCache from 'express-redis-cache'

export const cache = process.env.REDIS_ENABLED === 'true' ? redisCache({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASSWORD,
  expire: parseInt(process.env.REDIS_CACHE_EXPIRY, 10)
}) : undefined

async function cacheMiddleware (req, res, next) {
  if (!cache ||
    req.cookies[prismic.previewCookie]) {
    next()
    return
  }

  // lets strip out the query string parameters, we do not want to cache on those for now
  res.express_redis_cache_name = req.originalUrl
  if (req.originalUrl.indexOf('?')) {
    res.express_redis_cache_name = req.originalUrl.substring(0, req.originalUrl.indexOf('?'))
  }

  // We do not what to cache all the gallery item urls
  if (req.originalUrl.indexOf('/gallery/') === 0) {
    // res.express_redis_cache_name = '/gallery';
    res.use_express_redis_cache = false
  }

  cache.route({expire: {'4xx': 1, '5xx': 1, 'xxx': parseInt(process.env.REDIS_CACHE_EXPIRY, 10)}})(req, res, next)
}

export const clearCache = (req, res, next, secret) => {
  if (process.env.REDIS_ENABLED === 'false') {
    res.json({status: 'OK', message: 'Redis disabled'})
    return
  }

  if (secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    res.json({status: 'ERROR', message: 'Invalid secret'})
    return
  }
  cache.get((error, entries) => {
    if (error) throw error
    entries.forEach(entry => {
      cache.del(entry.name, () => { console.log(`Delete cached entry '${entry.name}`) })
    })
  })
  res.json({status: 'OK', message: 'Cache Clearing'})
}

export default cacheMiddleware
