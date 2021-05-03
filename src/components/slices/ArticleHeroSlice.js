import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
// import cn from 'classnames'
import ResponsiveImage from '../widgets/ResponsiveImage'
import Section from '../widgets/Section'
class ArticleHeroSlice extends PureComponent {
  render () {
    const {classes, page} = this.props

    return <Section className={classes.section} verticalPadding={false}>
      <div className={classes.content}>
        {page.hero_image && <ResponsiveImage images={page.hero_image.images} blur={page.hero_image.blur} aspect={1.4} className={classes.image} />}
        {page.article_video && <video style={{width: '100%', paddingTop: '15%', outline: 'none'}} controls> <source src={page.article_video.url} type='video/mp4' /> </video>}
        <h1 className={classes.title}>{page.title.text}</h1>
      </div>
    </Section>
  }
}

export default injectSheet(theme => ({
  section: {
    paddingBottom: 0
  },
  content: {
    maxWidth: 860,
    marginLeft: 'auto',
    marginRight: 'auto',
    ...theme.mixin.headerOffset('paddingTop')
  },
  image: {
    width: '100%',
    backgroundColor: 'white',
    // marginBottom: theme.spacing.md,
    [theme.breakpoints.up('sm')]: {
      // marginBottom: theme.spacing.lg
      backgroundColor: 'white'
    }
  },
  title: {
    marginBottom: 0,
    backgroundColor: 'white',
    padding: '3%'
  }
}))(ArticleHeroSlice)
