import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import RichTextContainer from '../widgets/RichTextContainer'
import ResponsiveImage from '../widgets/ResponsiveImage'
import Section from '../widgets/Section'
import cn from 'classnames'
import CTA from '../widgets/CTA'

class TextWithImageSlice extends PureComponent {
  render () {
    const {classes, className, slice} = this.props

    return <Section>
      <div className={cn(classes.container, className)}>
        <div>
          <RichTextContainer className={classes.text} content={slice.text.html} />
          {slice.link_url && slice.link_text &&
            <CTA className={classes.link} text={slice.link_text} to={slice.link_url.url} target={slice.link_url.target} />
          }
        </div>
        {slice.items && slice.items.length > 0 &&
          <ResponsiveImage images={slice.items[0].image.images} imageClassName={classes.imageFullHeight} />
        }
      </div>
    </Section>
  }
}

export default injectSheet(theme => ({
  container: {
    alignItems: 'center',
    '& > *': {
      flex: '1 0 auto'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  text: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 400
    }
  },
  imageFullHeight: {
    position: 'static'
  },
  link: {
    color: theme.colors.water
  }
}))(TextWithImageSlice)
