import React, { Component } from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import flow from 'lodash/flow'
import BackgroundCarousel from './BackgroundCarousel'
import theme from '../../../styles/theme'
import {TimelineLite, TweenLite} from 'gsap'
import {values} from '../../../styles/breakpoints'
import RichTextContainer from '../../widgets/RichTextContainer'
import CardGridStacked from '../../widgets/CardGridStacked'
import CTA from '../../widgets/CTA'

const COLORS = [
  {
    background: theme.colors.primary,
    foreground: theme.colors.skin,
    highlight: theme.colors.water
  },
  {
    background: theme.colors.water,
    foreground: theme.colors.skin,
    highlight: theme.colors.primary
  },
  {
    background: theme.colors.dusk,
    foreground: theme.colors.primary,
    highlight: theme.colors.water
  },
  {
    background: theme.colors.skin,
    foreground: theme.colors.primary,
    highlight: theme.colors.water
  }
]

class Slices extends Component {
  componentDidMount () {
    this.update()
  }

  componentDidUpdate () {
    this.update()
  }

  update = () => {
    const {page, state, destination, origin} = this.props

    if (!this.contentRef || !page) return

    const colors = this.getColors()
    const destinationSlice = page.slices[this.getDestinationSliceIndex()]
    const md = window.innerWidth < values['md']

    const isNewArticleSlice = (destinationSlice && destinationSlice.type === 'news_slice')

    TweenLite.to(this.contentRef, 0.5, {color: colors.foreground})

    if (isNewArticleSlice && (state === 'enter' || destination.isLast || origin.isLast)) {
      TweenLite.set(this.otherContentRef, {display: 'block'})
      TweenLite.to(this.otherContentRef, 0.7, {y: 0, autoAlpha: 1})
    } else {
      TweenLite.to(this.otherContentRef, 0.4, {autoAlpha: 0,
        onComplete: () => {
          if (!this.otherContentRef) return
          this.otherContentRef.style.display = 'none'
        }})
    }

    TweenLite.to(this.backgroundRef, 0.5, {
      backgroundColor: colors.background,
      width: md || isNewArticleSlice ? '100%' : '50%'
    })

    const contentItems = [
      this.innerContentRef.children[0],
      ...this.innerContentRef.children[1].children,
      this.innerContentRef.children[2]
    ]

    if (this.tweenContent) {
      this.tweenContent.kill()
    }
    this.tweenContent = new TimelineLite()

    if (origin.index === 0 || destination.index === 0) {
      this.tweenContent.set(contentItems, {y: 0, autoAlpha: 1}, 0)
      return
    }

    if (origin.index === page.slices.length + 1 || destination.index === page.slices.length + 1) {
      this.tweenContent.staggerTo(contentItems, 0.2, {y: 0, autoAlpha: 1}, 0)
      return
    }

    if (state === 'leave' && origin.index !== 0 && destination !== 0) {
      this.tweenContent.to(contentItems, 0.4, {y: -150, autoAlpha: 0})
    }
    if (state === 'enter' && origin.index !== 0) {
      this.tweenContent.staggerFromTo(contentItems, 0.2, {y: 50, autoAlpha: 0}, {y: 0, autoAlpha: 1}, 0.05)
    }
  }

  getCurrentSliceIndex = () => {
    const {page, destination, origin, state} = this.props
    if (!page || !destination) return 0
    const index = state === 'leave' ? origin.index : destination.index
    return Math.min(Math.max(index - 1, 0), page.slices.length - 1)
  }

  getDestinationSliceIndex = () => {
    const {page, destination} = this.props
    if (!page || !destination) return 0
    return Math.min(Math.max(destination.index - 1, 0), page.slices.length - 1)
  }

  getColors = () => {
    const {page, destination} = this.props

    if (!page || !destination) return COLORS[0]
    return COLORS[Math.min(Math.max(destination.index - 1, 0), page.slices.length - 1) % COLORS.length]
  }

  setContentRef = (ref) => { this.contentRef = ref }
  setOtherContentRef = (ref) => { this.otherContentRef = ref }
  setInnerContentRef = (ref) => { this.innerContentRef = ref }
  setBackgroundRef = (ref) => { this.backgroundRef = ref }

  render () {
    const {classes, className, page, state, destination, direction, origin} = this.props

    if (!destination) return null

    const currentSlice = page.slices[this.getCurrentSliceIndex()]

    const sendToBack = (destination.isLast || destination.isFirst) || ((origin.isLast || origin.isFirst) && state === 'leave')

    return (
      <div className={cn(classes.container, className, sendToBack && classes.sendToBack)}>
        <BackgroundCarousel page={page} imagesPerPage={2.2} state={state} destination={destination} direction={direction} origin={origin} />
        <div className={classes.contentContainer}>
          <div className={cn(classes.content, {large: currentSlice.type === 'news_slice'})} ref={this.setContentRef}>
            <div className={classes.contentBackground} ref={this.setBackgroundRef} />
            <div className={cn(classes.innerPadding, classes.inner, {large: currentSlice.type === 'news_slice'})} ref={this.setInnerContentRef}>
              <h2>{currentSlice.title1.text}</h2>
              <RichTextContainer content={currentSlice.copy.html} highlight={this.getColors().highlight} />
              <div><CTA to={currentSlice.call_to_action_link.url} text={currentSlice.call_to_action_text || 'Read More'} /></div>
            </div>
            <div ref={this.setOtherContentRef} className={classes.other}>
              {page.news_articles && <CardGridStacked items={page.news_articles} slice={currentSlice} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default flow([
  injectSheet((theme) => ({
    container: {
      ...theme.mixin.expandAbsolutely()
    },
    sendToBack: {
      zIndex: -1
    },
    contentContainer: {
      ...theme.mixin.content(),
      position: 'relative',
      height: '100%',
      alignItems: 'center',
      display: 'flex'
    },
    contentBackground: {
      ...theme.mixin.expandAbsolutely(),
      width: 'auto',
      backgroundColor: theme.colors.water,
      textAlign: 'left',
      '@media screen and ( min-height: 1150px )': {
        maxHeight: 900
      },
      [theme.breakpoints.up('md')]: {
        width: '50%',
        minWidth: 696
      }
    },
    content: {
      color: theme.colors.skin,
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column-reverse',
      width: '100%',
      textAlign: 'left',
      '&.large': {
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row'
        }
      },
      '@media screen and ( min-height: 1150px )': {
        maxHeight: 900
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
      },
      '& a': {
        color: 'inherit',
        '&:hover': {
          color: 'inherit'
        }
      }
    },
    innerPadding: {
      margin: '1rem',
      [theme.breakpoints.up('sm')]: {
        margin: '2rem'
      },
      [theme.breakpoints.up('md')]: {
        margin: '3.5rem'
      }
    },
    inner: {
      marginTop: 60,
      fontSize: theme.getRemValue(16),
      maxWidth: 430,
      position: 'relative',
      flex: '0 0 auto',
      [theme.breakpoints.up('sm')]: {
        marginTop: 150
      },
      [theme.breakpoints.up('md')]: {
        marginTop: '3.5rem',
        flex: '1 0 auto',
        alignSelf: 'flex-end'
      },
      '&.large': {
        alignSelf: 'center',
        fontSize: theme.getRemValue(12),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.getRemValue(16)
        }
      }
    },
    other: {
      padding: ['1rem', 70, '1rem', '2rem'],
      [theme.breakpoints.up('sm')]: {
        padding: ['2rem', 150, '2rem', '2rem']
      },
      [theme.breakpoints.up('md')]: {
        padding: ['2.5rem', 150, '2.5rem', '3.5rem'],
        alignItems: 'center'
      },
      fontSize: theme.getRemValue(16),
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      position: 'relative',
      textAlign: 'center',
      display: 'flex',
      alignSelf: 'center',
      '& p': {
        maxWidth: 400,
        margin: [0, 'auto']
      }
    },
    newsCarousel: {
      marginBottom: theme.spacing.md,
      maxWidth: 520
    }
  }))
])(Slices)
