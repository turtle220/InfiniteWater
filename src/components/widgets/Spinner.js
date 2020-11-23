import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import {TweenMax, Linear} from 'gsap'

const WIDTH = 46
const HEIGHT = 12
const AMPLITUDE = 4

class Spinner extends PureComponent {
  componentDidMount () {
    const {animate = true, frequency = 3} = this.props
    this.wave = {
      amplitude: AMPLITUDE,
      frequency: frequency,
      offset: 0,
      points: this.createPoints(this.lineRef, AMPLITUDE / 2)
    }
    this.update()
    if (animate) {
      this.startAnimation()
    }
  }

  startAnimation = () => {
    TweenMax.fromTo(this.wave, 0.5, {offset: 0}, { offset: -0.35, ease: Linear.easeNone, onUpdate: this.update, repeat: -1 })
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
    for (var i = 0; i < this.wave.points.length; i++) {
      this.wave.points[i].update()
    }
  }

  setSvgRef = (ref) => { this.svgRef = ref }
  setLineRef = (ref) => { this.lineRef = ref }

  render () {
    const {classes, className} = this.props
    return <svg className={cn(classes.svg, className)} ref={this.setSvgRef}>
      <g>
        <polyline className={classes.wave} ref={this.setLineRef} />
      </g>
    </svg>
  }
}

export default injectSheet(theme => ({
  svg: {
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
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    stroke: 'currentColor'
  }
}))(Spinner)
