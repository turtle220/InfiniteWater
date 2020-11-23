import React, { Component } from 'react'
import injectSheet from 'react-jss'
import flow from 'lodash/flow'
import cn from 'classnames'

import 'fullpage.js/dist/fullpage.css'

class Test extends Component {
  componentWillUnmount () {
    if (this.fp) {
      this.fp.destroy('all')
      this.fp = null
    }
  }

  componentDidMount () {
    import(/* webpackChunkName: 'fullpage' */ 'fullpage.js/dist/fullpage.extensions.min').then(module => {
      this.fp = module('#fullpage', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE', // TODO: Purchase a licence
        sectionsColor: ['#3b515c', '#4BBFC3', '#7BAABE', 'whitesmoke', 'red'],
        dragAndMove: true,
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour', 'footer'],
        onLeave: (origin, destination, direction) => {
          console.log('onLeave')
          console.log(origin)
          console.log(destination)
          console.log(direction)
          if (destination.index <= 1) {
            this.contentRef.style.backgroundColor = 'red'
          }
          if (destination.index === 2) {
            this.contentRef.style.backgroundColor = 'blue'
          }
          if (destination.index >= 3) {
            this.contentRef.style.backgroundColor = 'white'
          }
        },
        afterLoad: (origin, destination, direction) => {
          console.log('afterLoad')
          console.log(origin)
          console.log(destination)
          console.log(direction)
        },
        afterRender: () => { console.log('afterRender') },
        afterResize: (width, height) => {},
        afterResponsive: (isResponsive) => {},
        afterSlideLoad: (section, origin, destination, direction) => {},
        onSlideLeave: (section, origin, destination, direction) => {}
      })
      console.log(this.fp)
    })
  }

  setContentRef = (ref) => { this.contentRef = ref }

  render () {
    const {classes} = this.props
    return (
      <div id='fullpage'>
        <div className={cn('section', classes.section)}>
          <div className={classes.hero}>
            HERO
          </div>
        </div>
        <div className={cn('section', classes.section)}>
          <div ref={this.setContentRef} className={classes.content}>
            CONTENT
          </div>
        </div>
        <div className={cn('section', 'fp-auto-height', classes.section)} />
        <div className={cn('section', 'fp-auto-height', classes.section)} />
        <div className={cn('section', 'fp-auto-height', classes.section)}>
          <div className={classes.footer}>FOOTER</div>
        </div>
      </div>
    )
  }
}

export default flow([
  injectSheet((theme) => (
    {
      section: {
        textAlign: 'center',
        fontSize: '3em'
      },
      content: {
        transition: 'background-color 700ms ease-in-out'
        // minHeight: '100vh'
      },
      footer: {
        minHeight: 320
      },
      hero: {
        ...theme.mixin.expandAbsolutely(),
        ...theme.mixin.flexCenter()
      }
    }
  ))
])(Test)
