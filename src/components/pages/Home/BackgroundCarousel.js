import React, { Component } from 'react'
import injectSheet from 'react-jss'
import flow from 'lodash/flow'
import ResponsiveImage from '../../widgets/ResponsiveImage'
import {canUseDom} from '../../../utils/dom'
import {TweenLite, Linear, Power2} from 'gsap'

const DEFAULT_IMAGES_PER_PAGE = 2.2

class BackgroundCarousel extends Component {
  position = {
    x: 0,
    offset: 0
  }

  componentDidUpdate () {
    this.update()
  }

  componentWillUnmount () {
    if (this.tween) {
      this.tween.kill()
      this.tween = null
    }
  }

  update = () => {
    const {state, destination, origin, page, imagesPerPage = DEFAULT_IMAGES_PER_PAGE} = this.props

    // Used to calculate when to loop back to the start of the carousel
    this.width = (window.innerWidth / imagesPerPage) * page.images.length

    if (this.tween) {
      this.position.offset += this.position.x
      this.tween.kill()
    }

    if (state === 'enter' && (!destination || destination.index === 0)) {
      return
    }

    if (state === 'leave' && (!destination.isFirst && !origin.isFirst && !destination.isLast && !origin.isLast)) {
      this.tween = TweenLite.fromTo(this.position, 0.7, { x: 0 }, {
        x: window.innerWidth / 2,
        ease: Power2.easeInOut,
        onUpdate: this.onUpdatePosition
      })
    } else {
      this.tween = TweenLite.fromTo(this.position, 5, {x: 0}, {
        x: 200,
        ease: Linear.easeNone,
        onUpdate: this.onUpdatePosition,
        onComplete: () => {
          this.position.offset += this.position.x
          this.tween.restart()
        }
      })
    }
  }

  onUpdatePosition = () => {
    if ((this.position.offset + this.position.x) >= this.width) {
      var diff = this.position.offset - this.width
      this.position.offset = diff
    }
    var x = -(this.position.offset + this.position.x)
    this._carouselInnerRef.style.transform = `translate3d(${x}px, 0, 0)`
  }

  setCarouselInnerRef = (ref) => { this._carouselInnerRef = ref }
  setLastImageRef = (ref) => { this._lastImageRef = ref }

  render () {
    const {classes, page, imagesPerPage = DEFAULT_IMAGES_PER_PAGE} = this.props

    if (!page.images || page.images.length === 0) return null

    var paddedImages = page.images.slice(1, Math.ceil(imagesPerPage))

    return (
      <div className={classes.carouselContainer}>
        <div className={classes.carouselInnerContainer} ref={this.setCarouselInnerRef}>
          {page.images.map((x, i) => <ResponsiveImage key={i} className={classes.carouselImage} images={x.image.images} />)}
          <ResponsiveImage onRef={this.setLastImageRef} className={classes.carouselImage} images={page.images[0].image.images} />
          {paddedImages.map((x, i) => <ResponsiveImage key={`padded-${i}`} className={classes.carouselImage} images={x.image.images} />)}
        </div>
      </div>
    )
  }
}

export default flow([
  injectSheet((theme) => ({
    carouselContainer: {
      ...theme.mixin.expandAbsolutely(),
      overflow: 'hidden',
      '&:after': {
        ...theme.mixin.expandAbsolutely(),
        content: '""',
        opacity: 0.53,
        // backgroundColor: '#000'
        backgroundImage: 'linear-gradient(91deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.91))'
      }
    },
    carouselInnerContainer: {
      width: ({page, imagesPerPage = DEFAULT_IMAGES_PER_PAGE}) => canUseDom ? (window.innerWidth / imagesPerPage) * (page.images.length + Math.ceil(imagesPerPage)) : '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'visible'
    },
    carouselImage: {
      width: ({imagesPerPage = DEFAULT_IMAGES_PER_PAGE}) => canUseDom ? (window.innerWidth / imagesPerPage) : '40%'
    }
  }))
])(BackgroundCarousel)
