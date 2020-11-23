import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import Section from '../widgets/Section'
import ResponsiveImage from '../widgets/ResponsiveImage'

class FullWidthImageSlice extends PureComponent {
  render () {
    const {classes, slice} = this.props
    return <Section>
      <ResponsiveImage className={classes.image} images={slice.image.images} aspect={1 / slice.image.images[0].dimensions.aspect} />
    </Section>
  }
}

export default injectSheet(theme => ({
  image: {
    maxWidth: 800
  }
}))(FullWidthImageSlice)
