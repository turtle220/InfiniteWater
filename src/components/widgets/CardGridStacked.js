import React, {Component} from 'react'
import cn from 'classnames'
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import flow from 'lodash/flow'
import Hammer from 'react-hammerjs'
import {SpringSystem, MathUtil} from 'rebound'
import {TweenLite, Power2, Elastic} from 'gsap'
import last from 'lodash/last'
import map from 'lodash/map'
import reverse from 'lodash/reverse'
import ResponsiveImage from './ResponsiveImage'
import RichTextContainer from './RichTextContainer'
import {CONTENT_ROUTE} from '../../actions'
import CTA from '../widgets/CTA'

const SCALE = 0.8
const OFFSET = 140

const getOffset = () => {
  return window.innerWidth <= 400 ? 60 : window.innerWidth <= 600 ? OFFSET / 2 : OFFSET
}

const lerp = (a, b, faction) => {
  return a + faction * (b - a)
}

class SwipableCard extends Component {
  componentDidMount () {
    const {top} = this.props
    TweenLite.set(this.ref, {scale: top ? 1 : SCALE, x: top ? 0 : getOffset()})
  }

  componentWillReceiveProps (newProps) {
    const {top} = newProps
    if (!top) {
      TweenLite.set(this.ref, {scale: SCALE, x: getOffset()})
    }
  }

  handlePan = (evnt) => {
    if (!this.ref) return
    if (!this.props.top) return
    if (Math.abs(evnt.velocityY) > Math.abs(evnt.velocityX)) return
    if (evnt.isFinal) return
    if (evnt.velocityX === 0) return

    if (this.props.onPan) this.props.onPan()

    window.requestAnimationFrame(this.updateTransform(evnt.deltaX))
  }

  updateTransform = (x) => () => {
    // this.ref.style.transform = `translate(${Math.min(Math.abs(x), this.ref.clientWidth / 2) * (x < 0 ? -1 : 1)}px, 0)`
    this.ref.style.transform = `translate(${x}px, 0)`
    this.ref.style.opacity = lerp(1, 0, Math.abs(x) / this.ref.clientWidth / 2)
  }

  handlePanEnd = (evnt) => {
    if (!this.props.top) return
    const elementBoundingBox = evnt.target.getBoundingClientRect()

    if (Math.abs(evnt.deltaX) > elementBoundingBox.width / 2) {
      const {onSwipe} = this.props
      if (onSwipe) onSwipe(evnt, this.ref)
    } else {
      // Spring back
      var springSystem = new SpringSystem()
      this.spring = springSystem.createSpring(50, 3)
      this.spring.addListener({
        onSpringUpdate: (spring) => {
          if (!this.ref) return
          var val = spring.getCurrentValue()
          // Interpolate the values
          val = MathUtil.mapValueInRange(val, 0, 1, evnt.deltaX, 0)
          this.ref.style.transform = `translate(${val}px, 0)`
          this.ref.style.opacity = lerp(1, 0.3, Math.abs(val) / this.ref.clientWidth / 2)
        },
        onSpringAtRest: () => {
          this.spring.destroy()
          this.spring = null
        }
      })

      this.spring.setEndValue(1)
    }
  }

  handlePanStart = (evnt) => {
    if (this.spring) this.spring.setAtRest()
  }

  setRef = (ref) => {
    if (!ref) { this.ref = null } else { this.ref = ref.domElement }
  }

  handleTap = () => {
    const {top, item, onNavigate} = this.props
    if (!top) return
    if (onNavigate) onNavigate(item)
  }

  render () {
    const {classes, item, top} = this.props

    return <Hammer direction='DIRECTION_HORIZONTAL'
      onTap={this.handleTap} onSwipe={this.handleSwipe}
      onPan={this.handlePan} onPanStart={this.handlePanStart}
      onPanEnd={this.handlePanEnd} ref={this.setRef}
      options={{threshold: 0, inputClass: 'TouchMouseInput'}}>
      <div className={classes.cell} onMouseDown={this.onMouseDown}>
        <ResponsiveImage images={item.hero_image.images} aspect={1} />
        {/* <RichTextContainer className={cn(classes.summary, {top})} content={item.summary.html} /> */}
      </div>
    </Hammer>
  }
}

class CardGridStacked extends Component {
  state = {
    items: [],
    height: -1
  }

  componentDidMount () {
    this.setState({
      items: reverse(this.props.items)
    })
  }

  handleSwipe = (index) => (evnt, ref) => {
    TweenLite.fromTo(ref, 0.25, {x: evnt.deltaX}, {x: window.innerWidth * (evnt.deltaX < 0 ? -1 : 1), opacity: 0, ease: Power2.easeInOut, onComplete: this.onSwipeCompete(index, ref)})
    if (this._girdContainer.children.length > 1) {
      this.bounceTween = TweenLite.to(this._girdContainer.children[this._girdContainer.children.length - 2], 1, {
        scale: 1,
        x: 0,
        ease: Elastic.easeOut.config(0.5, 0.3)
      })
    }
  }

  handlePan = (index) => () => {
    if (this.bounceTween) {
      // Cancels the bounce in animation otherwise it will jitter
      this.bounceTween.kill()
    }
  }

  onSwipeCompete = (index, ref) => () => {
    TweenLite.set(ref, {scale: SCALE, x: getOffset(), opacity: 1})

    var items = [
      last(this.state.items),
      ...this.state.items.slice(0, this.state.items.length - 1)
    ]
    this.setState({items})
  }

  _setGirdContainer = (ref) => { this._girdContainer = ref }

  onNextClick = (e) => {
    this.handleSwipe(0)({deltaX: 0}, this._girdContainer.children[this._girdContainer.children.length - 1])
    e.preventDefault()
    e.stopPropagation()
  }

  render () {
    const {classes, variation, color, handleNavigate, slice} = this.props
    const {items, height} = this.state

    var cards = items && map(items, (item, i) => {
      return <SwipableCard key={item.id} classes={classes}
        top={i === items.length - 1}
        item={item}
        variation={variation}
        color={color}
        onSwipe={this.handleSwipe(i)}
        onPan={this.handlePan(i)}
        onNavigate={handleNavigate}
      />
    })

    return <div>
      <div className={classes.pager}>
        <CTA to='/' onClick={this.onNextClick} text={slice.next_article_text || 'Next article'} />
      </div>
      <div className={cn(classes.container)} style={{height: height}} ref={this._setGirdContainer}>
        {cards}
      </div>
    </div>
  }
}

const mapSTateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavigate: (item) => {
      dispatch({ type: CONTENT_ROUTE, payload: [ item.url ] })
    }
  }
}

export default flow([
  injectSheet((theme) => ({
    container: {
      position: 'relative',
      width: '100%',
      cursor: 'pointer',
      maxWidth: 500,
      paddingTop: '100%'
    },
    cell: {
      width: '100%',
      display: 'inline-block',
      outline: 'none',
      border: 'none',
      position: 'absolute',
      left: 0,
      top: 0
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    },
    summary: {
      opacity: 0,
      marginTop: theme.spacing.sm,
      fontSize: theme.getRemValue(12),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.getRemValue(16),
        marginTop: theme.spacing.md
      },
      '&.top': {
        opacity: 1
      }
    },
    pageButtons: {
      width: 24,
      height: 24,
      cursor: 'pointer',
      opacity: 0.7,
      '&:hover': {
        opacity: 1
      }
    },
    pager: {
      textAlign: 'left',
      position: 'absolute',
      transform: 'translateY(calc(-100% - 8px))',
      marginBottom: theme.spacing.sm,
      '& svg': {
        margin: [0, theme.spacing.xs]
      }
    },
    prev: {
      extend: 'pageButtons',
      transform: 'rotate(90deg)'
    },
    next: {
      extend: 'pageButtons',
      transform: 'rotate(-90deg)'
    }
  })),
  connect(mapSTateToProps, mapDispatchToProps)
])(CardGridStacked)
