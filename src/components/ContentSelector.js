import React, {PureComponent} from 'react'
import {withTheme} from 'react-jss'
import { connect } from 'react-redux'
import NotFound from './NotFound'
import {getPage, getCurrentLocation, isNotFound} from '../selectors'
import Home from './pages/Home'
import Page from './pages/Page'
import flow from 'lodash/flow'
import {canUseDom} from '../utils/dom'
import get from 'lodash/get'

const components = {
  homepage: (props) => <Home {...props} />,
  page: (props) => <Page {...props} />,
  article: (props) => <Page {...props} />
}

class PageContent extends PureComponent {
  _updateScroll = () => {
    if (!canUseDom) return
    // This uses the session storage that is setup by the redux-first-router-restore-scroll package
    // We need to set this to manual as we are doing some transitions between pages
    var key = get(window, ['history', 'state', 'key'])
    if (!key) key = 'loadPage'
    const valueString = window.sessionStorage.getItem(`@@scroll|${key}`)
    if (valueString) {
      const value = JSON.parse(valueString)
      window.scrollTo(value[0], value[1])
    } else {
      window.scrollTo(0, 0)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.page !== this.props.page) {
      this._updateScroll()
    }
  }

  render () {
    const {page, notFound} = this.props

    if (notFound) return <NotFound />
    if (!page) return null
    const Component = components[page.type]
    if (!Component) return null

    return <Component page={page} />
  }
}

const mapStateToProps = (state) => {
  return {
    page: getPage(state),
    location: getCurrentLocation(state),
    notFound: isNotFound(state)
  }
}

export default flow([
  withTheme,
  connect(mapStateToProps)
])(PageContent)
