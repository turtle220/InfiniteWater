import React from 'react'
import {renderToString} from 'react-dom/server'
import App from '../../components/App'
import asyncHandler from 'express-async-handler'
import {ThemeProvider, JssProvider, SheetsRegistry} from 'react-jss'
import {Helmet} from 'react-helmet'
import { Provider } from 'react-redux'
import theme from '../../styles/theme'
import configureStore from '../../universalStore'
import svgSprite from 'svg-sprite-loader/runtime/sprite.build'
import uniq from 'lodash/uniq'

function escapeAttr (s) {
  return s && s.replace('"', '&quot;')
}

function getCSS (clientStats) {
  const chunks = clientStats.chunks
    .filter(chunk => chunk.names[0] && chunk.initial)
    .sort((a, b) => {
      if (a.entry !== b.entry) {
        return b.entry ? 1 : -1
      } else {
        return b.id - a.id
      }
    })

  const files = []
  chunks.forEach(chunk => {
    [].concat(chunk.files).forEach(file => {
      // Some chunks may contain content hash in their names, for ex. 'main.css?1e7cac4e4d8b52fd5ccd2541146ef03f'.
      // We must proper handle such cases, so we use regexp testing here
      if (/.css($|\?)/.test(file)) {
        files.push(file)
      }
    })
  })

  // Duplicate css assets can occur on occasion if more than one chunk
  // requires the same css.
  return uniq(files).map(file =>
    `<link href="/${escapeAttr(file)}" rel="stylesheet">`
  )
}

const getState = (store) => {
  const preloadedState = store.getState()
  return JSON.stringify(preloadedState)
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Issue_with_plain_JSON.stringify_for_use_as_JavaScript
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
    .replace(/</g, '\\u003c')
}

async function render ({ clientStats, serverStats }, req, res) {
  // const css = getCSS(clientStats).join('')

  const helmet = Helmet.renderStatic()

  const sheets = new SheetsRegistry()

  const store = await configureStore(req, res)

  const css = getCSS(clientStats).join('')

  const html = renderToString(
    <Provider store={store}>
      <JssProvider registry={sheets}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </JssProvider>
    </Provider>)

  const spriteContent = svgSprite.stringify()

  const stateHtml = `<script>window.__PRELOADED_STATE__ = ${getState(store)};</script>`
  const styles = `<style type="text/css" id="server-side-styles">${sheets.toString()}</style>`
  // TODO: Add preload entries

  return '<!DOCTYPE html>' +
        '<html lang="en">' +
          '<head>' +
            '<meta charset="utf-8">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">' +
            '<link rel="manifest" href="/site.webmanifest">' +
            '<link rel="shortcut icon" href="/favicon.ico">' +
            '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">' +
            '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">' +
            '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">' +
            '<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">' +
            '<meta name="msapplication-TileColor" content="#ffc40d">' +
            '<meta name="theme-color" content="#000000">' +
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString() +
            css +
            styles +
          '</head>' +
          '<body>' +
            `<span id='server-side-sprites'>${spriteContent}</span>` +
            '<div id="root">' +
                html +
            '</div>' +
            stateHtml +
            `<script src="/${escapeAttr(clientStats.assetsByChunkName.main[0])}"></script>` +
            '<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/4527957.js"></script>' +
          '</body>' +
        '</html>'
}

export default function (options) {
  return asyncHandler(async (req, res) => {
    try {
      const html = await render(options, req, res)
      res.send(html)
    } catch (err) {
      console.error(err)
      res.status(500).send(err ? `<b>${err.message}</b><pre>${process.env.NODE_ENV !== 'production' ? err.stack : 'Stack Hidden'}</pre>` : 'Server error')
    }
  })
}
