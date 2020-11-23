import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import ResponsiveImage from './widgets/ResponsiveImage'

class FloatingImages extends PureComponent {
  render () {
    const {classes, images} = this.props
    if (!images || images.length === 0) return null
    return images.map(image => <ResponsiveImage key={image.images[0].url} className={classes.image} images={image.images} blur={image.blur} aspect={1} />)
  }
}

export default injectSheet(theme => ({
  image: {
    width: '100%',
    marginBottom: theme.spacing.lg
  }
}))(FloatingImages)
