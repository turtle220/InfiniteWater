import express from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'
import cacheMiddleware from '../middleware/cacheMiddleware'
import querystring from 'querystring'

const router = express.Router()

router.post('/',
  cacheMiddleware,
  asyncMiddleware(async (req, res, next) => {
    var postData = querystring.stringify({
      'email': req.body.email,
      'hs_context': JSON.stringify({
        'ipAddress': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        'pageUrl': 'https://www.infinitewater.com',
        'pageName': 'Newsletter Subscription From Website'
      })
    })

    // eslint-disable-next-line no-undef
    const response = await fetch(`https://forms.hubspot.com/uploads/form/v2/${process.env.HUBSPOT_ID}/${process.env.HUBSPOT_NEWSLETTER_FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      },
      body: postData
    })

    if (response.ok) {
      res.json({status: 'OK'})
    } else {
      res.status(500).json({message: 'Problem with the request to Hubspot'})
    }
  }
  ))

export default router
