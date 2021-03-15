import React, { Component } from 'react'
import injectSheet, {withTheme} from 'react-jss'
import {connect} from 'react-redux'
import flow from 'lodash/flow'
import {Helmet} from 'react-helmet'
import global from '../styles/global'
import {getMetadata} from '../selectors'
import ContentSelector from './ContentSelector'
import Header from './Header'
import Menu from './Menu'
import { NProgress } from 'redux-nprogress'

class App extends Component {
  componentDidMount () {
    var script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-176089089-1https://js.hsforms.net/forms/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      window.dataLayer = window.dataLayer || []
      function gtag () { window.dataLayer.push(arguments) }
      gtag('js', new Date())

      gtag('config', 'UA-176089089-1')
    })
  }

  render () {
    const {classes, meta, theme} = this.props

    return (
      <div className={classes.container}>
        {meta && <Helmet>
          <title>{meta.title}</title>
          {meta.ogUrl && <link rel='canonical' href={meta.ogUrl} />}
          {meta.meta_title && <meta name='title' content={meta.meta_title} />}
          {meta.metaDescription && <meta name='description' content={meta.metaDescription} />}
          {meta.metaKeywords && <meta name='keywords' content={meta.metaKeywords} />}
          {meta.ogUrl && <meta property='og:url' content={meta.ogUrl} />}
          {meta.ogTitle && <meta property='og:title' content={meta.ogTitle} />}
          {meta.ogImage && [
            <meta property='og:image' content={meta.ogImage.url} key={0} />,
            <meta property='og:image:width' content={meta.ogImage.width} key={1} />,
            <meta property='og:image:height' content={meta.ogImage.height} key={2} />
          ]}
          {meta.ogDescription && <meta property='og:description' content={meta.ogDescription} />}
          {meta.ogSiteName && <meta property='og:site_name' content={meta.ogSiteName} />}

          {meta.ogImage && <meta name='twitter:card' content='summary_large_image' />}
          {meta.ogSiteName && <meta name='twitter:site' content={meta.ogSiteName} />}
          {meta.ogTitle && <meta name='twitter:title' content={meta.ogTitle} />}
          {meta.ogDescription && <meta name='twitter:description' content={meta.ogDescription} />}
          {meta.ogImage && <meta name='twitter:image' content={meta.ogImage.url} />}
        </Helmet>
        }
        <NProgress color={theme.colors.water} />
        <Header />
        <Menu />
        <ContentSelector />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    meta: getMetadata(state)
  }
}

export default flow([
  injectSheet((theme) => (
    {
      ...global(theme),
      container: {
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }
    }
  )),
  withTheme,
  connect(mapStateToProps)
])(App)
