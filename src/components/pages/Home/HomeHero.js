import React, { Component } from 'react'
import {connect} from 'react-redux'
import injectSheet from 'react-jss'
import flow from 'lodash/flow'
import RichTextContainer from '../../widgets/RichTextContainer'
import ResponsiveImage from '../../widgets/ResponsiveImage'
import {getRemValue} from '../../../styles/theme'
import SvgSymbol from '../../SVGSymbol'
import arrowDown from '../../../img/icons/arrow-down.svg'
import playButton from '../../../img/icons/play_button_iw.svg'
import {closeVideoDialog, openVideoDialog} from '../../../actions'
import {isPlayingVideo, isVideoDialogOpen} from '../../../selectors'
import {TweenLite} from 'gsap'

class HomeHero extends Component {
  _setVideoRef = (ref) => {
    this._video = ref
  }

  _setFullLengthVideoRef = (ref) => { this._fullLengthVideo = ref }
  _setFullLengthVideoContainerRef = (ref) => { this._fullLengthVideoContainerRef = ref }
  _setFullLengthVideoBackgroundRef = (ref) => { this._fullLengthVideoCBackgroundRef = ref }

  componentDidUpdate () {
    const {destination, isPlayingVideo} = this.props
    if (destination.isFirst && this._video) this._video.play()

    if (this._fullLengthVideo) {
      if (isPlayingVideo) {
        this._fullLengthVideo.play()
        TweenLite.to(this._fullLengthVideoContainerRef, 0.3, {'autoAlpha': 1})
        TweenLite.to(this._fullLengthVideoCBackgroundRef, 0.3, {'autoAlpha': 1})
      } else {
        this._fullLengthVideo.pause()
        TweenLite.to(this._fullLengthVideoContainerRef, 0.3, {'autoAlpha': 0})
        TweenLite.to(this._fullLengthVideoCBackgroundRef, 0.3, {'autoAlpha': 0})
      }
    }
  }

  render () {
    const {classes, page, openVideoDialog, closeVideoDialog} = this.props

    if (!page) return null
    return (
      <div className={classes.hero}>
        {page.hero_image && page.hero_image.images &&
          <ResponsiveImage className={classes.backgroundImage} images={page.hero_image.images} blur={page.hero_image.blur} />
        }

        {page.hero_video &&
        <div className={classes.videoContainer}>
          <video autoPlay muted loop playsInline ref={this._setVideoRef} className={classes.video}>
            <source src={page.hero_video.url} type='video/mp4' />
            <p>Your browser does not support HTML5 video.</p>
          </video>
        </div>
        }

        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {page.hero_title && <h1 className={classes.title}>{page.hero_title.text}</h1>}
            <RichTextContainer className={classes.copy} content={page.hero_copy.html} />
            <button className={classes.button} onClick={openVideoDialog}>
              {page.play_video_text} <SvgSymbol icon={playButton} className={classes.playButton} />
            </button>
          </div>
        </div>
        <div className={classes.scrollMore}>
          <span>{page.scroll_text}</span>
          <SvgSymbol icon={arrowDown} />
        </div>

        {page.full_length_video_link &&
          <React.Fragment>
            <div className={classes.fullLengthVideoBackground} ref={this._setFullLengthVideoBackgroundRef} onClick={closeVideoDialog} />
            <div className={classes.fullLengthVideoContainer} ref={this._setFullLengthVideoContainerRef} onClick={closeVideoDialog}>
              <video controls ref={this._setFullLengthVideoRef} className={classes.fullLengthVideo} controlsList='nodownload'>
                <source src={page.full_length_video_link.url} type='video/mp4' />
                <p>Your browser does not support HTML5 video.</p>
              </video>
            </div>
          </React.Fragment>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isPlayingVideo: isPlayingVideo(state),
    isVideoDialogOpen: isVideoDialogOpen(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openVideoDialog: () => { dispatch(openVideoDialog()) },
    closeVideoDialog: () => { dispatch(closeVideoDialog()) }
  }
}

export default flow([
  injectSheet((theme) => (
    {
      hero: {
        ...theme.mixin.expandAbsolutely(),
        ...theme.mixin.flexCenter(),
        zIndex: theme.zIndex.homeHero,
        overflow: 'hidden',
        backgroundColor: theme.colors.background
      },
      backgroundImage: {
        ...theme.mixin.expandAbsolutely()
      },
      videoContainer: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        '&:after': {
          ...theme.mixin.expandAbsolutely(),
          content: '""',
          backgroundColor: theme.colors.overlay,
          backgroundBlendMode: 'multiply'
        }
      },
      video: {
        ...theme.mixin.expandAbsolutely(),
        margin: 'auto',
        minHeight: '50%',
        minWidth: '50%'
      },
      fullLengthVideoContainer: {
        ...theme.mixin.expandAbsolutely(),
        padding: theme.spacing.sm,
        opacity: 0,
        visibility: 'hidden',
        margin: 40
      },
      fullLengthVideoBackground: {
        ...theme.mixin.expandAbsolutely(),
        opacity: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      },
      fullLengthVideo: {
        ...theme.mixin.expandAbsolutely(),
        maxHeight: '100%',
        maxWidth: '100%',
        margin: 'auto',
        objectFit: 'contain'
      },
      contentContainer: {
        ...theme.mixin.contentContainer()
      },
      content: {
        paddingRight: '1.5rem',
        position: 'relative',
        textAlign: 'left',
        color: theme.colors.skin,
        fontSize: getRemValue(16),
        maxWidth: 800,
        '& a': {
          display: 'inline-block',
          color: theme.colors.skin,
          fontWeight: 400,
          '&:hover': {
            color: theme.colors.skin
          }
        }
      },
      title: {
        textShadow: '1px 1px 2px black, 0 0 25px, 0 0 5px #91adbc',
        lineHeight: 1.3,
        fontSize: theme.getRemValue(28),
        [theme.breakpoints.up('md')]: {
          fontSize: theme.getRemValue(36)
        }
      },
      copyContainer: {
        fontSize: theme.getRemValue(14),
        [theme.breakpoints.up('md')]: {
          fontSize: theme.getRemValue(16),
          maxWidth: 550
        },
        '& svg': {
          marginLeft: theme.spacing.sm
        }
      },
      copy: {
        maxWidth: 500,
        fontSize: '24px'
      },
      button: {
        fontSize: '24px',
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        color: 'inherit',
        borderStyle: 'none',
        '&:hover': {
          color: theme.colors.water
        },
        '& svg': {
          marginLeft: theme.spacing.sm
        }
      },
      scrollMore: {
        fontWeight: 700,
        fontSize: theme.getRemValue(14),
        position: 'absolute',
        color: theme.colors.skin,
        textTransform: 'uppercase',
        bottom: '0',
        left: '50%',
        transform: 'translate(-50%, 0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& svg': {
          animation: 'scroll 3s infinite',
          margin: [theme.spacing.xs, 0, theme.spacing.md],
          height: 30,
          [theme.breakpoints.up('md')]: {
            margin: [theme.spacing.sm, 0, theme.spacing.md],
            height: '100%'
          }
        }
      },
      '@keyframes scroll': {
        '0%': { opacity: 0 },
        '20%': { opacity: 1, transform: 'translateY(0)' },
        '40%': { opacity: 1 },
        '80%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 0, transform: 'translateY(10px)' }
      },
      link: {
        '& svg': {
          transition: 'transform 0.1s ease-in-out'
        },
        '&:hover svg': {
          transform: 'translate(5px, 0)'
        }
      },
      playButton: {
        width: 32,
        height: 32
      }
    }
  ))
])(connect(mapStateToProps, mapDispatchToProps)(HomeHero))
