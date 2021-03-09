import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import ResponsiveImage from '../widgets/ResponsiveImage'
import RichTextContainer from '../widgets/RichTextContainer'
import Section from '../widgets/Section'
import Tabs from '../Tabs'

class HeroSlice extends PureComponent {
  hasHeroImage = () => {
    const {slice} = this.props
    return slice.hero_image && slice.hero_image.images
  }

  render () {
    const {classes, slice} = this.props

    return <div className={cn(classes.section, {withHeroImage: this.hasHeroImage()})}>
      {this.hasHeroImage() &&
      <ResponsiveImage images={slice.hero_image.images} blur={slice.hero_image.blur} aspect={2.2} className={classes.image} />
      }
      <Section className={classes.contentContainer}>
        <div className={classes.content}>
          <div className={classes.titleAndCopy}>
            <h1>{slice.hero_title.text}</h1>
            {slice.hero_text && <RichTextContainer content={slice.hero_text.html} className={classes.copy} />}
          </div>
          <Tabs tabs={slice.items} theme={this.hasHeroImage() ? 'dark-theme' : 'light-theme'} />
        </div>
      </Section>
    </div>
  }
}

export default injectSheet(theme => ({
  section: {
    position: 'relative',
    '&.withHeroImage $contentContainer': {
      color: theme.colors.skin,
      minHeight: 440,
      [theme.breakpoints.up('md')]: {
        minHeight: 660
      }
    }
  },
  image: {
    ...theme.mixin.expandAbsolutely(),
    '&:after': {
      ...theme.mixin.expandAbsolutely(),
      backgroundImage: 'linear-gradient(to right, #000000, rgba(0, 0, 0, 0.3))',
      opacity: 0.59,
      backgroundBlendMode: 'multiply',
      content: '""'
    }
  },
  contentContainer: {
    ...theme.mixin.headerOffset('paddingTop'),
    position: 'relative',
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  content: {
    // flex: '1 0 auto'
  },
  titleAndCopy: {
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.text.maxWidth
    }
  },
  copy: {
    '& > *:last-child': {
      marginBottom: 0
    }
  },
  floatingImagesContainer: {
    height: 0,
    flex: '1 0 0',
    maxWidth: 600,
    width: '40vw',
    display: 'none',
    marginLeft: 'auto',
    position: 'absolute',
    right: '6.5rem',
    bottom: '-3rem',
    paddingLeft: '3rem',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}))(HeroSlice)
