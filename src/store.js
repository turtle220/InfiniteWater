import { createStore, applyMiddleware, compose as defaultCompose, combineReducers } from 'redux'
import { connectRoutes } from 'redux-first-router'
import restoreScroll from 'redux-first-router-restore-scroll'
import routes from './routes'
import {canUseDom} from './utils/dom'
import reducers from './reducers'
import { nprogressMiddleware } from 'redux-nprogress'
import layoutMiddleware from './middleware/layout'
import newsletterMiddleware from './middleware/newsletter'
import gtmMiddleware from './middleware/gtm'
import contactMiddleware from './middleware/contact'
// import querySerializer from 'query-string'

export default (history) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routes,
    {
      // querySerializer,
      restoreScroll: canUseDom && restoreScroll({ manual: true })
    }
  )

  let compose = defaultCompose
  /* global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:false */
  if (process.env.NODE_ENV !== 'production' && typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    // in development mode, if you install the Redux Devtools extension (see https://github.com/zalmoxisus/redux-devtools-extension)
    // then this will connect to the dev tools and allow you to inspect Redux state
    // TEMPORARILY DISABLE UNTIL REDUX DEV TOOLS BUG IS FIXED
    compose = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }

  const rootReducer = combineReducers({
    ...reducers,
    location: reducer
  })
  const middlewares = applyMiddleware(
    middleware,
    nprogressMiddleware(),
    layoutMiddleware,
    newsletterMiddleware,
    gtmMiddleware,
    contactMiddleware
    // middleware goes here
  )
  const enhancers = compose(enhancer, middlewares)

  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined
  if (preloadedState) {
    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__
  }

  // Create Redux store with initial state, if specified
  const store = createStore(rootReducer, preloadedState, enhancers)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      const reducers = require('./reducers/index')
      const rootReducer = combineReducers({ ...reducers, location: reducer })
      store.replaceReducer(rootReducer)
    })
  }

  return { store, thunk }
}
