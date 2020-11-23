import React, { Component } from 'react'
import {connect} from 'react-redux'
import injectSheet from 'react-jss'
import flow from 'lodash/flow'
import cn from 'classnames'
import Symbol from '../SVGSymbol'
import logo from '../../img/icons/logo.svg'
import {
  getCurrentBreakpoint,
  getGlobalContent,
  getHomepageSectionDestination,
  getPageContent,
  isMenuOpen,
  getMenuForegroundColor,
  getMenuShrunk,
  getCurrentLocality,
  getCurrentPathWithoutLocality
} from '../../selectors'
import {setMenuForegroundColor, shrinkMenu} from '../../actions'
import Hamburger from './Hamburger'
import Link from 'redux-first-router-link'
import {canUseDom} from '../../utils/dom'
import querySelectorAll from 'dom-helpers/query/querySelectorAll'
import throttle from 'lodash/throttle'
import forEach from 'lodash/forEach'

class Header extends Component {
  componentDidMount () {
    this.trottleCheck = throttle(this.check, 50)
    window.addEventListener('scroll', this.trottleCheck)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.trottleCheck)
  }

  componentDidUpdate () {
    this.check()
  }

  check = () => {
    const {foregroundColor, setForegroundColor, shrink, handleShrinkMenu} = this.props
    const headerBB = this.ref.getBoundingClientRect()
    var lightElements = querySelectorAll(document, '.light')

    if (lightElements.length === 0) {
      if (foregroundColor !== 'light') {
        setForegroundColor('light')
      }
    } else {
      forEach(lightElements, element => {
        const bb = element.getBoundingClientRect()
        if (bb.top < headerBB.bottom && bb.bottom > headerBB.top) {
          if (foregroundColor !== 'dark') {
            setForegroundColor('dark')
          }
        } else {
          if (foregroundColor !== 'light') {
            setForegroundColor('light')
          }
        }
      })
    }

    if (window.scrollY > 64 && !shrink) {
      handleShrinkMenu(true)
    } else if (window.scrollY <= 64 && shrink) {
      handleShrinkMenu(false)
    }
  }

  setRef = (ref) => { this.ref = ref }
  setHamburgerRef = (ref) => { this.hamburgerRef = ref }

  render () {
    const {classes, global, page, menuOpen, destination, breakpoint, foregroundColor, shrink, locality, path} = this.props
    const isLargeScreen = canUseDom && window.innerHeight > 1150 && window.innerHeight < 2000
    const isDesktop = (breakpoint !== 'sm' && breakpoint !== 'xs')
    // TODO: Fix the destination code
    const dark = menuOpen || foregroundColor === 'dark' ||
      (destination && page.type === 'homepage' && isDesktop && !isLargeScreen &&
        (destination.index === 3 || destination.index === 4))

    const hamburgerLight = (destination && page.type === 'homepage' && isDesktop && !isLargeScreen && (destination.index === 3 || destination.index === 2))

    return (
      <header className={cn(classes.container, classes.containerHeight, {dark: dark})}>
        <Link to={`/${locality === 'en' ? '' : locality}`} className={classes.logoContainer}>
          <div className={cn(classes.svgContainer, {dark: dark, hideBackground: menuOpen || !shrink})}>
            <Symbol icon={logo} className={classes.logo} />
          </div>
          <div className={cn(classes.title, {shrink: shrink && !menuOpen})} ref={this.setRef}>{global.title.text}</div>
        </Link>
        <div className={cn(classes.hamburgerContainer, {'light-theme': hamburgerLight})}>
          <div className={cn(classes.localityContainer, {shrink: shrink})}>
            <a className={cn({selected: !locality || locality === 'en'})} href={path}>ENG</a>
            <span>|</span>
            <a className={cn({selected: locality === 'zh'})} href={`/zh${path}`}>中文</a>
          </div>
          <Hamburger shrink={shrink} dark={dark} setRef={this.setHamburgerRef} global={global} />
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    global: getGlobalContent(state),
    menuOpen: isMenuOpen(state),
    destination: getHomepageSectionDestination(state),
    breakpoint: getCurrentBreakpoint(state),
    page: getPageContent(state),
    foregroundColor: getMenuForegroundColor(state),
    shrink: getMenuShrunk(state),
    locality: getCurrentLocality(state),
    path: getCurrentPathWithoutLocality(state)
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    setForegroundColor: (color) => { dispatch(setMenuForegroundColor(color)) },
    handleShrinkMenu: (shrink) => { dispatch(shrinkMenu(shrink)) }
  }
}

export default flow([
  injectSheet((theme) => (
    {
      container: {
        ...theme.mixin.contentContainer(),
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.header,
        color: theme.colors.skin,
        transition: 'color 300ms ease-in-out',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&.dark': {
          color: theme.colors.primary
        }
      },
      containerHeight: {
        marginTop: '1.5rem',
        height: '2rem',
        [theme.breakpoints.up('sm')]: {
          marginTop: '3rem',
          height: '4rem'
        },
        [theme.breakpoints.up('md')]: {
          marginTop: '4rem',
          height: '4rem'
        }
      },
      logoContainer: {
        height: 32,
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
        '&:hover': {
          color: 'inherit'
        },
        [theme.breakpoints.up('sm')]: {
          height: 64
        }
      },
      svgContainer: {
        position: 'relative',
        '&:before': {
          content: '""',
          transition: 'opacity 300ms ease-in-out',
          // background: `radial-gradient(${theme.colors.primary} 0%, rgba(0,0,0,0) 75%)`,
          opacity: 1,
          position: 'absolute',
          left: -10,
          right: -10,
          top: -10,
          bottom: -10
        },
        '&.dark:before': {
          opacity: 1
          // background: `radial-gradient(${theme.colors.skin} 0%, rgba(0,0,0,0) 75%)`
        },
        '&.hideBackground:before': {
          opacity: 0
        }
      },
      logo: {
        position: 'relative',
        marginTop: -4,
        width: 30,
        height: 20,
        [theme.breakpoints.up('sm')]: {
          marginTop: -8,
          width: 60,
          height: 40
        }
      },
      title: {
        fontWeight: 700,
        marginLeft: '1rem',
        fontSize: theme.getRemValue(16),
        transition: 'opacity 300ms ease-in-out',
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.getRemValue(20),
          marginLeft: '2rem'
        },
        '&.shrink': {
          opacity: 0
        }
      },
      hamburgerContainer: {
        ...theme.mixin.flexCenter(),
        '&.light-theme': {
          color: theme.colors.skin
        }
      },
      localityContainer: {
        transition: 'transform 300ms ease-in-out',
        transform: 'translate(-42px, 0)',
        [theme.breakpoints.up('sm')]: {
          transform: 'translate(-64px, 0)'
        },
        [theme.breakpoints.up('md')]: {
          transform: 'translate(-96px, 0)'
        },
        '&.shrink': {
          [theme.breakpoints.up('sm')]: {
            transform: 'translate(-32px, 0)'
          }
        },
        '& a': {
          fontSize: '0.6em',
          [theme.breakpoints.up('sm')]: {
            fontSize: '1em'
          },
          opacity: 0.5,
          color: 'inherit'
        },
        '& a.selected': {
          opacity: 1
        },
        '& span': {
          margin: [0, 8]
        }
      }
    }
  )),
  connect(mapStateToProps, mapStateToDispatch)
])(Header)
