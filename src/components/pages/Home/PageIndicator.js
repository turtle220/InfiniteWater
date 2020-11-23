import React, { Component } from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import {connect} from 'react-redux'

import {getHomepageSectionDestination} from '../../../selectors'

class PageIndicator extends Component {
  onPageClicked = (index) => () => {
    const {onPageClicked} = this.props
    if (onPageClicked) {
      onPageClicked(index)
    }
  }

  render () {
    const {classes, page, destination} = this.props
    if (!page || !destination) return null
    return <div className={classes.pageIndicator}>
      <div className={cn(classes.line, {selected: destination.isFirst})} onClick={this.onPageClicked(0)} />
      {page.slices.map((x, i) => <div key={i} className={cn(classes.line, {selected: i === destination.index - 1})} onClick={this.onPageClicked(i + 1)} />)}
      <div className={cn(classes.line, {selected: destination.isLast})} onClick={this.onPageClicked(page.slices.length + 1)} />
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    destination: getHomepageSectionDestination(state)
  }
}

export default injectSheet(theme => ({
  pageIndicator: {
    position: 'absolute',
    top: '50%',
    right: `calc(${theme.spacing.md} - 8px)`,
    transform: 'translate(0, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 16,
    [theme.breakpoints.up(1600)]: {
      right: theme.spacing.lg
    }
  },
  line: {
    height: 18,
    width: 8,
    opacity: 0.7,
    transition: 'all 0.4s ease-in-out',
    position: 'relative',
    cursor: 'pointer',
    '&.selected': {
      opacity: 1,
      width: 16
    },
    '&:hover': {
      opacity: 1,
      width: 16
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%', // close enough
      height: 2,
      backgroundColor: theme.colors.skin
    }
  }
}))(connect(mapStateToProps)(PageIndicator))
