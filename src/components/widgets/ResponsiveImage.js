import React, {Component} from 'react'
import cn from 'classnames'
import injectSheet from 'react-jss'

import compact from 'lodash/compact'
import find from 'lodash/find'
import last from 'lodash/last'
import first from 'lodash/first'

export function round (num) { return parseFloat(Math.round(num * 100) / 100).toFixed(2) }
const defaultImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

class ResponsiveImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectURL: ''
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // only change if the images change
    const {images, children, className, classes} = this.props

    if (first(images).url !== first(nextProps.images).url) {
      return true
    }
    if (children !== nextProps.children ||
            className !== nextProps.className ||
            classes !== nextProps.classes) {
      return true
    }
    return false
  }

  onImageLoaded = () => {
    if (this.props.onImageLoaded) {
      this.props.onImageLoaded()
    }
  }

  render () {
    const {images, blur, classes, className, imageClassName, aspect, children, onRef} = this.props
    console.log(images, '----------ResponsiveImage:')
    const mainImage = images && last(images)
    const hasWebp = find(images, image => image.url_webp)

    let sources = images ? compact([
      hasWebp ? <source key='webp' data-srcset={images.map(item => (`${item.url_webp} ${item.dimensions.width}w`))} type='image/webp' /> : null,
      <source key='jpg' data-srcset={images.map(item => (`${item.url} ${item.dimensions.width}w`))} />
    ]) : null

    const imageCss = cn({
      [classes.blurUp]: blur,
      lazyload: true,
      [classes.image]: true
    }, imageClassName)

    const ImageElement = (props) => (mainImage && <img data-sizes='auto' draggable='false'
      alt={mainImage ? mainImage.alt : ''}
      className={imageCss}
      src={defaultImage} // should be the source image to fallback on
      onLoad={this.onImageLoaded}
    />)

    const ImageElement1 = (props) => (mainImage && <img data-sizes='auto' draggable='false'
      alt={mainImage ? mainImage.alt : ''}
      style={{objectFit: 'contain'}}
      className={imageCss}
      src={defaultImage} // should be the source image to fallback on
      onLoad={this.onImageLoaded}
    />)

    return <div className={cn(classes.container, { [classes.fixedAspect]: aspect }, className)} ref={onRef}>
      {/* {blur && <img key='blur' src={blur.data ? blur.data : blur.url} className={classes.imageBlur} alt={mainImage ? mainImage.alt : ''} />} */}
      <picture>
        {/* <!--[if IE 9]><video style="display: none;"><![endif]--> */}
        {sources}
        {typeof window !== 'undefined' && window.location.href.split('/')[4] === 'world-water-day' ? <ImageElement1 />
          : typeof window !== 'undefined' && window.location.href.split('/')[5] === 'world-water-day' ? <ImageElement1 /> : <ImageElement />}
        {/* <!--[if IE 9]></video><![endif]--> */}
      </picture>
      {children}
    </div>
  }
}

const BLUR_PIXELS = 10

export default injectSheet((theme) => ({
  container: {
    // height: '300px',
    position: 'relative',
    width: '100%',
    display: 'block',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&::before': {
      display: 'block',
      content: '""'
    }
  },
  fixedAspect: {
    '&::before': {
      paddingTop: ({aspect}) => `${round(100 / aspect)}%`
    }
  },
  image: {
    userSelect: 'none',
    userDrag: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.3s',
    // objectFit: 'contain',
    pointerEvents: 'none',
    // fontFamily: '"object-fit: cover;"', // object-fit polyfill
    // transform: 'scale(1.1)'
  },
  imageBlur: {
    position: 'absolute',
    top: `0`,
    left: `0`,
    width: `100%`,
    height: `100%`,
    filter: `blur(${BLUR_PIXELS}px)`,
    objectFit: 'cover',
    fontFamily: '"object-fit: cover;"', // object-fit polyfill
    transform: 'scale(1.1)'
  },
  blurUp: {
    opacity: '0',
    transition: 'opacity 400ms',
    '&.lazyloaded': {
      opacity: '1'
    }
  },
  link: {
    textDecoration: 'none'
  }
}))(ResponsiveImage)
