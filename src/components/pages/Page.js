import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import forEach from 'lodash/forEach'
import last from 'lodash/last'
import first from 'lodash/first'

import RichTextSlice from '../slices/RichTextSlice'
import RichTextBlockSlice from '../slices/RichTextBlockSlice'
import TextWithImageSlice from '../slices/TextWithImageSlice'
import CTASlice from '../slices/CTASlice'
import FullWidthImageSlice from '../slices/FullWidthImageSlice'
import HeroSlice from '../slices/HeroSlice'
import TeamMemberSlice from '../slices/TeamMemberSlice'
import Articles from '../slices/Articles'
import ArticleHeroSlice from '../slices/ArticleHeroSlice'
import ContactUsSlice from '../slices/ContactUsSlice'
import VideoSlice from '../slices/VideoSlice'
import EmbedSlice from '../slices/EmbedSlice'

// import SmallFooter from '../SmallFooter'
import NewFooter from '../NewFooter'
import WavePattern from '../WavePattern'

const slices = {
  text_with_image_slice: (slice, key) => (
    <TextWithImageSlice key={key} slice={slice} />
  ),
  rich_text_slice: (slice, key) => <RichTextSlice key={key} slice={slice} />,
  rich_text_block_slice: (slice, key) => (
    <RichTextBlockSlice key={key} slice={slice} />
  ),
  cta_slice: (slice, key) => <CTASlice key={key} slice={slice} />,
  full_width_image_slice: (slice, key) => (
    <FullWidthImageSlice key={key} slice={slice} />
  ),
  hero_slice: (slice, key, page) => (
    <HeroSlice key={key} slice={slice} page={page} />
  ),
  team_member_slice: (slice, key, page) => (
    <TeamMemberSlice key={key} slice={slice} page={page} />
  ),
  articles: (slice, key, page) => (
    <Articles key={key} slice={slice} page={page} />
  ),
  article_hero: (slice, key, page) => (
    <ArticleHeroSlice key={key} slice={slice} page={page} />
  ),
  contact_us_slice: (slice, key, page) => (
    <ContactUsSlice key={key} slice={slice} page={page} />
  ),
  video_slice: (slice, key, page) => (
    <VideoSlice key={key} slice={slice} page={page} />
  ),
  embed_slice: (slice, key, page) => (
    <EmbedSlice key={key} slice={slice} page={page} />
  )
}

class Page extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectURL: ''
    }
  }

  addTopMargin = () => {
    const { page } = this.props
    return (
      page.type !== 'article' &&
      page.slices.length > 0 &&
      first(page.slices).type !== 'hero_slice'
    )
  }

  render () {
    const { classes, page } = this.props
    const pageSections = [{ slices: [], theme: page.theme }]

    if (
      page.type === 'article' &&
      !(first(page.slices) && first(page.slices).type === 'hero_slice')
    ) {
      pageSections[0].slices.push(slices['article_hero']({}, 0, page))
    }

    forEach(page.slices, (slice) => {
      var currentPage = last(pageSections)
      if (slice.type === 'color_switch_slice') {
        pageSections.push({
          slices: [],
          theme: currentPage.theme === 'dark' ? 'light' : 'dark'
        })
      } else if (
        slice.type === 'hero_slice' &&
        slice.hero_image &&
        slice.hero_image.images
      ) {
        // Hero slices is always dark
        const heroComponent = slices[slice.type](
          slice,
          currentPage.slices.length,
          page
        )
        pageSections.push({ slices: [], theme: 'dark' })
        last(pageSections).slices.push(heroComponent)
        pageSections.push({ slices: [], theme: currentPage.theme })
      } else {
        if (!slices[slice.type]) {
          console.error(`Unable to find slice ${slice.type}`)
        } else {
          currentPage.slices.push(
            slices[slice.type](slice, currentPage.slices.length, page)
          )
        }
      }
    })

    const pageClasses = cn(classes.page, {
      [classes.pageMargin]: this.addTopMargin(),
      'light-theme': page.theme === 'light'
    })

    const ch =
      typeof window !== 'undefined' && window.location.href.split('/')[3]

    if (ch === 'zh') {
      this.setState({ selectURL: page.url.split('/')[3] })
    } else {
      this.setState({ selectURL: page.url.split('/')[2] })
    }

    return [
      <div key='page' className={pageClasses}>
        {pageSections
          .filter((x) => x.slices.length > 0)
          .map((section, i) => (
            <div key={i} className={cn(classes.pageSection, section.theme)}>
              {i === 0 &&
                page.uid === 'technology' && ( // HACK
                  <div className={classes.patternContainer}>
                    <WavePattern />
                  </div>
                )}
              {section.slices}
            </div>
          ))}
      </div>,
      <div>
        {this.state.selectURL !== 'contact' && <NewFooter />}
      </div>
      // <SmallFooter
      //   key='footer'
      //   theme={
      //     pageSections
      //       ? last(pageSections).theme
      //       : page.theme === 'water'
      //         ? 'water'
      //         : 'light'
      //   }
      // />
    ]
  }
}

export default injectSheet((theme) => ({
  page: {
    flex: '0 1 auto',
    backgroundColor: theme.colors.background,
    '&.light-theme': {
      backgroundColor: theme.colors.skin
    }
  },
  pageMargin: {
    ...theme.mixin.headerOffset()
  },
  pageSection: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.skin,
    position: 'relative',
    '& li:before': {
      backgroundColor: theme.colors.skin
    },
    '&.water': {
      backgroundColor: theme.colors.water,
      color: 'black',
      '& li:before': {
        backgroundColor: theme.colors.primary
      }
    },
    '&.light': {
      backgroundColor: theme.colors.skin,
      color: theme.colors.primary,
      '& li:before': {
        backgroundColor: theme.colors.primary
      }
    },
    '& section:last-child': {
      marginBottom: 0
    }
  },
  patternContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: `calc(50% - 12rem)`,
    transform: 'translate(0, -50%)',
    opacity: 0.1,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}))(Page)
