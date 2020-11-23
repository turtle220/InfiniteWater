import {cache} from '../middleware/cacheMiddleware'
import first from 'lodash/first'

export const getFromCache = (key) => {
  return new Promise((resolve, reject) => {
    if (!cache) {
      resolve(null)
      return
    }
    cache.get(key, function (error, entries) {
      if (error || !entries || entries.length === 0) {
        resolve(null)
      } else {
        try {
          resolve(JSON.parse(first(entries).body))
        } catch (err) {
          reject(err)
        }
      }
    })
  })
}

const handleError = (error, added) => {
  if (error) {
    // TODO: Handle Error
  }
}

export const storeInCache = (key, data, expiry) => {
  if (!cache) return
  cache.add(key, JSON.stringify(data),
    { expire: expiry || parseInt(process.env.REDIS_CACHE_EXPIRY, 10), type: 'json' }, handleError)
}
