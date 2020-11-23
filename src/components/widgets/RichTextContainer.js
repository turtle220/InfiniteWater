import React, {PureComponent} from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import {CONTENT_ROUTE} from '../../actions'
import URL from '../../utils/url'
import injectSheet from 'react-jss'

class RichTextContainer extends PureComponent {
    // this handles the internal clicks
    _handleHtmlContentClick = (e) => {
      const {handleNavigate} = this.props

      if (e.defaultPrevented) {
        return
      }
      if (e.metaKey || e.ctrlKey || e.shiftKey) {
        return
      }
      if (e.button !== 0) {
        return
      }
      // Get the <a> element.
      var el = e.target
      while (el && el.nodeName !== 'A') {
        el = el.parentNode
      }
      // Ignore clicks from non-a elements.
      if (!el) {
        return
      }
      // Ignore the click if the element has a target.
      if (el.target && el.target !== '_self') {
        return
      }

      const targetUrl = new URL(el.href)
      const currentURL = new URL(window.location.href)

      // Ignore links that don't share a protocol and host wi
      // th ours.
      if (targetUrl.protocol !== currentURL.protocol || (targetUrl.host !== currentURL.host &&
            !targetUrl.pathname.startsWith(process.env.REACT_APP_API_URL))) {
        el.target = '_blank'
        return
      }

      // Prevent :focus from sticking; preventDefault() stops blur in some browsers
      el.blur()
      e.preventDefault()

      /// using the router, go to that url
      handleNavigate(targetUrl)
    }

    render () {
      const { classes, className, content } = this.props
      return <div className={cn(classes.container, className)}
        onClick={this._handleHtmlContentClick} dangerouslySetInnerHTML={{__html: content}} />
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavigate: (targetUrl) => {
      dispatch({ type: CONTENT_ROUTE, payload: [ targetUrl.pathname ] })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(theme => ({
  container: {
    fontSize: theme.getRemValue(14),
    [theme.breakpoints.up('md')]: {
      fontSize: theme.getRemValue(16)
    },
    '& .align-right': {
      display: 'block',
      textAlign: 'right'
    },
    '& .align-center': {
      display: 'block',
      textAlign: 'center'
    },
    '& .highlight': {
      color: ({highlight}) => highlight || theme.colors.water,
      fontWeight: 700
    },
    '& .quote': {
      fontSize: theme.getRemValue(16),
      [theme.breakpoints.up('md')]: {
        fontSize: theme.getRemValue(18)
      }
    },
    '& a': {
      color: 'inherit'
    },
    '& ul': {
      listStyle: 'none',
      fontWeight: 400,
      padding: [0, 0, 1, theme.spacing.md],
      [theme.breakpoints.up('md')]: {
        padding: [0, 0, 1, theme.spacing.lg]
      },
      '& li': {
        margin: [0, 0, theme.spacing.xs, 0],
        fontSize: theme.getRemValue(14),
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: `calc((${theme.getRemValue(14)} * 1.5 / 2) - 2px)`, // half the line height
          height: 4,
          width: 4,
          borderRadius: '50%',
          left: `-${(theme.spacingPx.md / 2) + 2}px`,
          [theme.breakpoints.up('md')]: {
            left: `-${(theme.spacingPx.lg / 2) + 2}px`
          }
        },
        [theme.breakpoints.up('md')]: {
          fontSize: theme.getRemValue(16),
          margin: [0, theme.spacing.md, theme.spacing.xs, 0],
          '&:before': {
            top: 'calc(0.75rem - 2px)' // half the line height
          }
        }
      }
    }
  }
}))(RichTextContainer))
