import React, { Component } from 'react'
import injectSheet, {withTheme} from 'react-jss'
import {connect} from 'react-redux'
import cn from 'classnames'
import flow from 'lodash/flow'

import 'fullpage.js/dist/fullpage.css'
import HomeHero from './HomeHero'
import Footer from '../../Footer'
import ResponsiveImage from '../../widgets/ResponsiveImage'
import RichTextContainer from '../../widgets/RichTextContainer'
import CTA from '../../widgets/CTA'

import {leaveHomepageSection, enterHomepageSection} from '../../../actions'
import {getHomepageSectionDestination} from '../../../selectors'

class HomeMobile extends Component {
  render () {
    const {classes, page, destination, theme} = this.props

    if (!page) return null

    return (
      <div id='fullpage'>
        <div className={cn('section', classes.section)}>
          <HomeHero page={page} destination={destination} />
        </div>
        {page.slices.map((slice, i) => <div key={i} className={cn('section', classes.section)}>
          <ResponsiveImage className={classes.image} images={slice.mobile_background_image.images} />
          <div className={classes.content}>
            <div className={classes.contentPadding}>
              <h2>{slice.title1.text}</h2>
              <RichTextContainer content={slice.copy.html} highlight={theme.colors.skin} />
              <CTA className={classes.link} to={slice.call_to_action_link.url} text={slice.call_to_action_text || 'Read More'} />
            </div>
          </div>
        </div>
        )}
        <div className={cn('section', classes.section)}>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    destination: getHomepageSectionDestination(state)
  }
}

const mapDispactToProps = (dispatch) => {
  return {
    onLeaveSection: (origin, destination, direction) => {
      dispatch(leaveHomepageSection(origin, destination, direction))
    },
    onEnterSection: (origin, destination, direction) => {
      dispatch(enterHomepageSection(origin, destination, direction))
    }
  }
}

export default flow([
  injectSheet((theme) => (
    {
      section: {
        textAlign: 'center',
        fontSize: '3em',
        color: theme.colors.skin,
        ...theme.mixin.expandAbsolutely(),
        position: 'relative'
      },
      image: {
        ...theme.mixin.expandAbsolutely(),
        '&:after': {
          content: '""',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          ...theme.mixin.expandAbsolutely()
        }
      },
      footer: {
        minHeight: 320,
        color: theme.colors.skin
      },
      content: {
        ...theme.mixin.contentContainer(),
        position: 'relative',
        fontSize: theme.getRemValue(14),
        textAlign: 'left'
      },
      contentPadding: {
        paddingRight: '1.5rem'
      },
      link: {
        color: theme.colors.skin
      }
    }
  )),
  connect(mapStateToProps, mapDispactToProps),
  withTheme
])(HomeMobile)
