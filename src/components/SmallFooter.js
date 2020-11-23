import React, {Component} from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import injectSheet from 'react-jss'
import {getGlobalContent} from '../selectors'
import flow from 'lodash/flow'
import Link from './widgets/Link'

class SmallFooter extends Component {
  render () {
    const {classes, theme, global} = this.props

    if (!global) return null
    return <footer className={cn(classes.footer, theme === 'dark' && 'dark-theme')}>
      <div className={classes.footerContainer}>
        {global.contact_us_link && <div className={classes.linkContainer}>
          <Link to={global.contact_us_link.url} target={global.contact_us_link.target}>{global.contact_us_text}</Link>
        </div>
        }
        <div className={classes.container}>
          {global.phone && <a href={`tel:${global.phone}`}>{global.phone}</a>}
          {global.email && <a href={`mailto:${global.email}`}>{global.email}</a>}
        </div>
      </div>
    </footer>
  }
}

const mapStateToProps = (state) => {
  return {
    global: getGlobalContent(state)
  }
}

export default flow([
  injectSheet(theme => ({
    footer: {
      color: theme.colors.skin,
      backgroundColor: theme.colors.skin,
      fontSize: theme.getRemValue(16),
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      [theme.breakpoints.up('md')]: {
        paddingTop: '3rem',
        paddingBottom: '3rem'
      },
      '&.dark-theme': {
        backgroundColor: theme.colors.primary
      },
      '& a': {
        color: theme.colors.primary,
        fontSize: theme.getRemValue(12),
        fontWeight: 400,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.getRemValue(14)
        }
      },
      '&.dark-theme a': {
        color: theme.colors.skin
      }
    },
    footerContainer: {
      ...theme.mixin.contentContainer(),
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex'
    },
    linkContainer: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block'
      },
      '& a': {
        fontWeight: 700
      }
    },
    container: {
      flex: '1 0 auto',
      margin: [theme.spacing.sm, `-${theme.spacing.xs}`],
      '& > *': {
        margin: [0, theme.spacing.xs]
      },
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
        margin: [theme.spacing.md, `-${theme.spacing.md}`],
        '& > *': {
          margin: [0, theme.spacing.md]
        }
      }
    }
  })),
  connect(mapStateToProps)
])(SmallFooter)
