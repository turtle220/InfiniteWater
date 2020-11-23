import React, { Component } from 'react'
import {connect} from 'react-redux'

import 'fullpage.js/dist/fullpage.css'
import {getCurrentBreakpoint, isMenuOpen} from '../../../selectors'
import HomeMobile from './HomeMobile'
import HomeDesktop from './HomeDesktop'
import omit from 'lodash/omit'
import {enterHomepageSection, leaveHomepageSection, setPageLoaded} from '../../../actions'
import {values} from '../../../styles/breakpoints'
import PageIndicator from './PageIndicator'
import detectIt from 'detect-it'

class Home extends Component {
  componentWillUnmount () {
    if (this.fp) {
      this.fp.destroy('all')
      this.fp = null
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.fp) {
      this.fp.setAllowScrolling(!nextProps.isMenuOpen)
    }

    if (nextProps.breakpoint === this.props.breakpoint) return false
    if (!this.props.breakpoint) return true

    const nextBreakpoint = values[nextProps.breakpoint]
    const currentBreakpoint = values[this.props.breakpoint]
    if (nextBreakpoint <= values['sm'] && currentBreakpoint >= values['md']) {
      return true
    }
    if (nextBreakpoint >= values['md'] && currentBreakpoint <= values['sm']) {
      return true
    }
    return false
  }

  componentDidMount () {
    this.update()
  }

  componentDidUpdate () {
    this.update()
  }

  update = () => {
    if (this.running) return
    if (this.fp) {
      this.fp.destroy('all')
      this.fp = null
    }

    const {page} = this.props
    if (!page || !page.slices) return
    this.running = true
    import(/* webpackChunkName: 'fullpage' */ 'fullpage.js/dist/fullpage.extensions.min').then(module => {
      this.fp = module('#fullpage', {
        licenseKey: process.env.REACT_APP_FP_LICENCE, // 'OPEN-SOURCE-GPLV3-LICENSE'
        anchors: ['hero',
          ...page.slices.map((x, i) => x.anchor_name || i),
          'footer'],
        lazyLoading: false,
        scrollBar: detectIt.primaryInput === 'touch',
        easingcss3: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        onLeave: (origin, destination, direction) => {
          this.props.onLeaveSection(omit(origin, ['item']), omit(destination, ['item']), direction)
        },
        afterLoad: (origin, destination, direction) => {
          this.props.onEnterSection(omit(origin, ['item']), omit(destination, ['item']), direction)
        },
        afterRender: () => {},
        afterResize: (width, height) => {},
        afterResponsive: (isResponsive) => {},
        afterSlideLoad: (section, origin, destination, direction) => {},
        onSlideLeave: (section, origin, destination, direction) => {}
      })
      this.running = false
    })
  }

  onPageClicked = (index) => {
    if (this.fp) {
      this.fp.moveTo(index + 1)
    }
  }

  render () {
    const {page, breakpoint} = this.props
    if (!page) return null
    var isDesktop = (breakpoint !== 'sm' && breakpoint !== 'xs')
    return [
      isDesktop ? <HomeDesktop key='homeDesktop' page={page} /> : <HomeMobile key='homeMobile' page={page} />,
      <PageIndicator key='pageIndicator' page={page} onPageClicked={this.onPageClicked} />
    ]
  }
}

const mapStateToProps = (state) => {
  return {
    breakpoint: getCurrentBreakpoint(state),
    isMenuOpen: isMenuOpen(state)
  }
}

const mapDispachToProps = (dispatch) => {
  return {
    onLeaveSection: (origin, destination, direction) => {
      dispatch(leaveHomepageSection(origin, destination, direction))
    },
    onEnterSection: (origin, destination, direction) => {
      dispatch(enterHomepageSection(origin, destination, direction))
    },
    onPageLoaded: () => {
      dispatch(setPageLoaded(true))
    }
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Home)
