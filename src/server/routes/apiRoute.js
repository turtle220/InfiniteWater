import express from 'express'
import globalRoute from './globalRoute'
import contentRoute from './contentRoute'
import contactRoute from './contactRoute'
import subscribeRoute from './subscribeRoute'
import { clearCache } from '../middleware/cacheMiddleware'

const router = express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin ? req.headers.origin : '*')
  res.header('Access-Control-Allow-Credentials', 'true') // Credentials are used when previewing content (cookie)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

router.post('/clear_cache', (req, res, next) => {
  clearCache(req, res, next, req.body.secret)
})

router.get('/clear_cache/:secret', (req, res, next) => {
  clearCache(req, res, next, req.params.secret)
})

// Rout used by prismic to preview content
// router.use('/preview', previewRoute)

router.use('/global', globalRoute)
router.use('/content', contentRoute)

router.use('/contact', contactRoute)
router.use('/subscribe', subscribeRoute)

router.get('*', (req, res, next) => res.status(404).send({ error: 'Not Found' }))

export default router
