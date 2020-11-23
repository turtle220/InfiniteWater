import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cookieParser from 'cookie-parser'
import createRenderMiddleware from './middleware/render'
import errorMiddleware from './middleware/error'
import apiRoute from './routes/apiRoute'
import cacheMiddleware from './middleware/cacheMiddleware'

export default function (options) {
  const router = express.Router()

  router.use(cookieParser())

  // Support post requests with body data (doesn't support multipart, use multer)
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({extended: true}))

  router.use(express.static(path.resolve(__dirname, '..', 'client')))

  router.use('/api', apiRoute)

  router.use('/', cacheMiddleware, createRenderMiddleware(options))

  router.use(errorMiddleware)

  return router
}
