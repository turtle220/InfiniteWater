import React, { Component } from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import injectSheet from 'react-jss'
import flow from 'lodash/flow'
import {TweenLite} from 'gsap'
import {toggleMenu} from '../../actions'
import {isMenuOpen} from '../../selectors'
import detectIt from 'detect-it'

const WIDTH = 36
const HEIGHT = 32
const AMPLITUDE = 4

class Hamburger extends Component {
  componentDidMount () {
    const padding = HEIGHT / 3
    this.wave = {
      amplitude: AMPLITUDE,
      frequency: 3,
      offset: 0,
      top: this.createPoints(this.line1Ref, AMPLITUDE / 2),
      middle: this.createPoints(this.line2Ref, padding + AMPLITUDE / 2),
      bottom: this.createPoints(this.line3Ref, (padding * 2) + AMPLITUDE / 2)
    }
    this.update()
    this.updateState(this.props)
  }

  componentDidUpdate () {
    this.updateState(this.props)
  }

  createPoints = (lineRef, yOffset = 0) => {
    const {width = WIDTH, segments = 100} = this.props

    var points = []

    var interval = width / segments

    for (var i = 0; i <= segments; i++) {
      var period = i / segments
      var svgPoint = lineRef.points.appendItem(this.svgRef.createSVGPoint())

      svgPoint.x = i * interval
      svgPoint.y = yOffset

      var point = {
        period: period,
        point: svgPoint,
        yOffset: yOffset
      }
      point.update = this.updatePoint(point)
      points.push(point)
    }
    return points
  }

  updatePoint = (point) => () => {
    var cycle = -Math.sin((point.period + this.wave.offset) * this.wave.frequency * Math.PI * 2)
    var height = this.wave.amplitude / 2

    point.point.y = cycle * height + AMPLITUDE + point.yOffset
  }

  update = () => {
    var len = this.wave.top.length

    for (var i = 0; i < len; i++) {
      this.wave.top[i].update()
      this.wave.middle[i].update()
      this.wave.bottom[i].update()
    }
  }

  updateState = (props) => {
    const {menuOpen} = props

    if (menuOpen) {
      TweenLite.to(this.line2Ref, 0.2, {opacity: 0})
      TweenLite.to(this.line1Ref, 0.2, {y: 10.5, rotation: 45, transformOrigin: '50% 50%'})
      TweenLite.to(this.line3Ref, 0.2, {y: -10.5, rotation: -45, transformOrigin: '50% 50%'})
      TweenLite.to(this.wave, 1, { offset: -0.5, amplitude: 0, onUpdate: this.update })
    } else {
      TweenLite.to(this.line2Ref, 0.2, {opacity: 1})
      TweenLite.to(this.line1Ref, 0.2, {rotation: 0, y: 0, transformOrigin: '50% 50%'})
      TweenLite.to(this.line3Ref, 0.2, {rotation: 0, y: 0, transformOrigin: '50% 50%'})
      if (!this.over) {
        this.handleMouseLeave()
      }
    }
  }

  setSvgRef = (ref) => { this.svgRef = ref }
  setLine1Ref = (ref) => { this.line1Ref = ref }
  setLine2Ref = (ref) => { this.line2Ref = ref }
  setLine3Ref = (ref) => { this.line3Ref = ref }

  handleMouseEnter = () => {
    if (detectIt.primaryInput === 'touch') return
    this.over = true
    TweenLite.to(this.wave, 1, { offset: -0.5, amplitude: 0, onUpdate: this.update })
  }

  handleMouseLeave = () => {
    const {menuOpen} = this.props
    this.over = false
    if (!menuOpen) {
      TweenLite.to(this.wave, 1, {offset: 0, amplitude: 4, onUpdate: this.update})
    }
  }

  render () {
    const {classes, global, handleToggleMenu, dark = false, shrink, menuOpen, setRef} = this.props

    return (
      <div ref={setRef} className={classes.container} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={handleToggleMenu}>
        <div className={cn(classes.svgContainer, {dark, shrink, hideBackground: menuOpen || !shrink})}>
          <svg className={classes.svg} ref={this.setSvgRef} >
            <g>
              <polyline className={classes.wave} ref={this.setLine1Ref} />
              <polyline className={classes.wave} ref={this.setLine2Ref} />
              <polyline className={classes.wave} ref={this.setLine3Ref} />
            </g>
          </svg>
        </div>
        <div className={cn(classes.text, {shrink})}>{global.menu_title}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuOpen: isMenuOpen(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleMenu: () => dispatch(toggleMenu())
  }
}

export default flow([
  injectSheet((theme) => (
    {
      container: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      },
      svgContainer: {
        display: 'flex',
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        right: '100%',
        transition: 'right 300ms ease-in-out',
        '&.shrink': {
          right: '0%'
        },
        '&:before': {
          content: '""',
          transition: 'opacity 300ms ease-in-out',
          // background: `radial-gradient(${theme.colors.primary} 0%, rgba(0,0,0,0) 65%)`,
          opacity: 0.5,
          position: 'absolute',
          left: -10,
          right: -10,
          top: -10,
          bottom: -10
        },
        '&.dark:before': {
          // background: `radial-gradient(${theme.colors.skin} 0%, rgba(0,0,0,0) 65%)`
        },
        '&.hideBackground:before': {
          opacity: 0
        }
      },
      svg: {
        position: 'relative',
        width: WIDTH,
        height: HEIGHT,
        transform: 'scale(0.8)',
        [theme.breakpoints.up('sm')]: {
          transform: 'none'
        }
      },
      wave: {
        fill: 'none',
        strokeWidth: 2,
        stroke: 'currentColor'
        // strokeLinecap: 'round',
        // strokeLinejoin: 'round'
      },
      text: {
        fontWeight: 700,
        fontSize: theme.getRemValue(14),
        marginLeft: theme.spacing.sm,
        display: 'none',
        transition: 'opacity 300ms ease-in-out',
        [theme.breakpoints.up('sm')]: {
          display: 'block'
        },
        '&.shrink': {
          opacity: 0
        }
      }
    }
  )),
  connect(mapStateToProps, mapDispatchToProps)
])(Hamburger)
