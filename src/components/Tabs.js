import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import cn from 'classnames'
import Link from './widgets/Link'
import {getCurrentLocation} from '../selectors'
import filter from 'lodash/filter'
import Spinner from './widgets/Spinner'
import elementResizeDetectorMaker from 'element-resize-detector'
import {fitText} from '../utils/text'

class Tabs extends PureComponent {
  componentDidMount () {
    if (this.boundingBox) {
      this.fit()
      this.erd = elementResizeDetectorMaker({ strategy: 'scroll' })
      this.erd.listenTo(this.boundingBox, this.fit)
    }
  }

  componentDidUpdate () {
    this.fit()
  }

  componentWillUnmount () {
    if (this.erd && this.boundingBox) {
      this.erd.removeAllListeners(this.boundingBox)
    }
  }

  fit = () => {
    if (!this.boundingBox || !this.listRef) return
    fitText(this.boundingBox, this.listRef, 8, 16)
  }

  setBoundingBox = (ref) => { this.boundingBox = ref }
  setListRef = (ref) => { this.listRef = ref }

  render () {
    const {classes, tabs, location, theme = 'dark-theme'} = this.props
    if (!tabs || tabs.length === 0 || Object.keys(tabs[0]).length === 0) return null

    return <nav className={cn(classes.container, theme)}>
      <div className={classes.boundingBox} ref={this.setBoundingBox}>
        <ul className={classes.list} ref={this.setListRef}>
          {filter(tabs, x => x.tab_link).map((tab, i) => <li key={i}>
            {/* <div>{location.pathname }</div> */}
            <Spinner className={cn(classes.wave, {selected: location.pathname === tab.tab_link.url})} animate={false} frequency={20} width={350} />
            <Link className={cn(location.pathname === tab.tab_link.url && 'selected')} to={tab.tab_link.url} target={tab.tab_link.target}>{tab.tab_title}</Link>
          </li>)}
        </ul>
      </div>
    </nav>
  }
}

const mapStateToProps = (state) => {
  return {
    location: getCurrentLocation(state)
  }
}

export default injectSheet(theme => ({
  container: {
    marginTop: theme.spacing.md,
    '&.light-theme a': {
      color: theme.colors.primary,
      '&:hover': {
        color: theme.colors.water
      },
      '&.selected': {
        color: theme.colors.water
      }
    },
    '&.dark-theme a': {
      color: theme.colors.skin,
      '&:hover': {
        color: theme.colors.water
      },
      '&.selected': {
        color: theme.colors.water
      }
    }
  },
  boundingBox: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: 32 + 15 // height + transition
    },
    '&.columnLayout': {
      height: 'auto'
    },
    '&.columnLayout $list': {
      flexDirection: 'column',
      display: 'inline-block',
      position: 'static'
    },
    '&.columnLayout $list li': {
      display: 'table',
      marginBottom: theme.spacing.md
    }
  },
  list: {
    bottom: 0,
    padding: 0,
    margin: [theme.spacing.lg, 0, 0],
    display: 'inline-block',
    flexDirection: 'column',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      position: 'absolute',
      flexDirection: 'row'
    },
    '& li': {
      fontSize: 'inherit',
      marginRight: theme.spacing.md,
      marginBottom: theme.spacing.md,
      whiteSpace: 'nowrap',
      position: 'relative',
      // maxWidth: 200,
      display: 'table',
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing.lg,
        marginBottom: 0
      }
    },
    '& li:last-child': {
      marginRight: 0
    },
    '& a': {
      fontSize: 'inherit',
      transition: 'transform 0.15s ease-in-out',
      display: 'block',
      '&.selected': {
        fontWeight: 700,
        transform: 'translate(0, -15px)'
      }
    }
  },
  wave: {
    pointerEvents: 'none',
    color: theme.colors.water,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    transform: 'none',
    transition: 'opacity 0.15s ease-in-out',
    '&.selected': {
      opacity: 1
    }
  }
}))(connect(mapStateToProps)(Tabs))
