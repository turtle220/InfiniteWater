import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import Section from '../widgets/Section'

class VideoSlice extends PureComponent {
  state = {
    inView: false
  }

  componentDidMount () {
    this.animationRequest = window.requestAnimationFrame(this.checkScrollPosition)
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.animationRequest)
  }

  checkScrollPosition = () => {
    if (this._videoRef) {
      if (this.isScrolledIntoView()) {
        if (!this.state.inView) {
          this.setState({inView: true})
          this._videoRef.play()
        }
      } else {
        if (this.state.inView) {
          this.setState({inView: false})
          this._videoRef.pause()
        }
      }
    }
    this.animationRequest = window.requestAnimationFrame(this.checkScrollPosition)
  }

  isScrolledIntoView = () => {
    var rect = this._videoRef.getBoundingClientRect()
    var elemTop = rect.top
    var elemBottom = rect.bottom

    var center = elemTop + ((elemBottom - elemTop) / 2)
    var isVisible = center < window.innerHeight && center >= 0
    return isVisible
  }

  setVideoRef = (ref) => { this._videoRef = ref }

  render () {
    const {classes, slice} = this.props
    return <Section className={classes.section}>
      <div className={classes.videoContainer}>
        <video muted className={classes.video} ref={this.setVideoRef} loop={slice.loop === 'Yes'} controls>
          <source src={slice.video.url} type='video/mp4' />
        </video>
      </div>
    </Section>
  }
}

export default injectSheet(theme => ({
  section: {
    paddingLeft: 0,
    paddingRight: 0
  },
  videoContainer: {
  },
  video: {
    width: '100%'
  }
}))(VideoSlice)
