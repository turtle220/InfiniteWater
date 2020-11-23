import React, { Component } from 'react'
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import cn from 'classnames'
import flow from 'lodash/flow'

import 'fullpage.js/dist/fullpage.css'
import {
  getHomepageSectionDestination,
  getHomepageSectionDirection,
  getHomepageSectionOrigin,
  getHomepageSectionState
} from '../../../selectors'
import HomeHero from './HomeHero'
import Slices from './Slices'
import Footer from '../../Footer'

class HomeDesktop extends Component {
  setHeroRef = (ref) => { this.heroRef = ref }
  setFooterRef = (ref) => { this.footerRef = ref }

  render () {
    const {classes, page, sectionState, sectionDestination, sectionDirection, sectionOrigin, isPageLoaded} = this.props

    if (!page) return null

    return [
      <div id='fullpage' key='fullpage'>
        <div id='home-section' className={cn('section', classes.section, 'loaded')} ref={this.setHeroRef}>
          <HomeHero page={page} destination={sectionDestination} />
        </div>
        {page.slices && page.slices.map((x, i) => <div key={i} id={`section-${i}`} className={cn('section', classes.section, {loaded: isPageLoaded})} />)}
        <div id='footer-section' className={cn('section', classes.section, {loaded: isPageLoaded})} ref={this.setFooterRef}>
          <Footer />
        </div>
      </div>,
      <Slices className={cn(classes.slices, {loaded: isPageLoaded})} key='slices' page={page} state={sectionState} destination={sectionDestination} direction={sectionDirection} origin={sectionOrigin} />
    ]
  }
}

const mapStateToProps = (state) => {
  return {
    sectionState: getHomepageSectionState(state),
    sectionDestination: getHomepageSectionDestination(state),
    sectionDirection: getHomepageSectionDirection(state),
    sectionOrigin: getHomepageSectionOrigin(state),
    isPageLoaded: true
    // isPageLoaded: isPageLoaded(state) // TODO: Find out how to not get the flicker on first load
  }
}

export default flow([
  injectSheet((theme) => (
    {
      section: {
        textAlign: 'center',
        fontSize: '3em',
        visibility: 'hidden',
        '&.loaded': {
          visibility: 'visible'
        }
      },
      slices: {
        visibility: 'hidden',
        '&.loaded': {
          visibility: 'visible'
        }
      }
    }
  )),
  connect(mapStateToProps)
])(HomeDesktop)
