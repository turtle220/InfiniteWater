import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import Link from './Link'
import Symbol from '../SVGSymbol'
import arrow from '../../img/icons/arrow.svg'
import cn from 'classnames'

class CTA extends PureComponent {
  render () {
    const {classes, className, theme, text, ...rest} = this.props
    console.log(this.props, '-------props:')
    // return <Link {...rest} className={cn(classes.link)} >{text}<Symbol icon={arrow} className={classes.arrow} /></Link>
    return <Link {...rest} className={cn(classes.link, className)} >{text}<Symbol icon={arrow} className={classes.arrow} /></Link>
  }
}

export default injectSheet(theme => ({
  link: {
    '&:hover $arrow': {
      transform: 'translate(5px, 0)'
    }
  },
  arrow: {
    marginLeft: theme.spacing.sm,
    transition: 'transform 0.1s ease-in-out'
  },
  
}))(CTA)
