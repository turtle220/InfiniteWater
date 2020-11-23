import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
// import History from 'history/createBrowserHistory'
import history from './history'
import { ThemeProvider } from 'react-jss'
import {gtmId} from './config'

import theme from './styles/theme'
import createStore from './store'
import {updateFontsStatus, REHYDRATED} from './actions'

import App from './components/App'

import WebFont from 'webfontloader'
import TagManager from 'react-gtm-module'

// This needs to be added here as it will not run on the server
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/respimg/ls.respimg'
import 'lazysizes/plugins/object-fit/ls.object-fit'
import 'lazysizes'

TagManager.initialize({ gtmId: gtmId() })

const { store } = createStore(history)

const rootEl = document.getElementById('root')

WebFont.load({
  custom: {
    families: ['Montserrat:n3,n4,n7']
  },
  loading: () => { store.dispatch(updateFontsStatus('loading')) }, // Other events fontactive, fontinactive, fontloading: (familyName, fvd)
  active: () => { store.dispatch(updateFontsStatus('active')) },
  inactive: () => { store.dispatch(updateFontsStatus('inactive')) }
})

const render = (App) => <ReduxProvider store={store}>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
</ReduxProvider>

ReactDOM.hydrate(render(App), rootEl,
  () => {
    // We don't need the static css any more once we have launched our application.
    const ssStyles = document.getElementById('server-side-styles')
    if (ssStyles) {
      ssStyles.parentNode.removeChild(ssStyles)
      store.dispatch({ type: REHYDRATED })
    }
  }
)

if (module.hot) {
  module.hot.accept('./components/App', function () {
    const App = require('./components/App').default
    ReactDOM.render(render(App), rootEl)
  })
}
