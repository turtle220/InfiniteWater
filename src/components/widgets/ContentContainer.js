import React, { Component } from 'react'
import injectSheet from 'react-jss'
import flow from 'lodash/flow'

class ContentContainer extends Component {
  render () {
    const {classes, children} = this.props
    return (
      <div className={classes.container}>
        {children}
      </div>
    )
  }
}

export default flow([
  injectSheet((theme) => (
    {
      container: {
        maxWidth: theme.content.width,
        margin: 'auto'
      }
    }
  ))
])(ContentContainer)
