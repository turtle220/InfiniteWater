const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((err) => {
        console.error(err)
        res.status(500).json({message: err.message, stack: process.env.NODE_ENV !== 'production' ? err.stack : 'hidden'})
      })
  }

export default asyncMiddleware
