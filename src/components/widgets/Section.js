import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import * as breakpoints from '../../styles/breakpoints'

class Section extends PureComponent {
  render () {
    const {classes, className, children, verticalPadding = true} = this.props
    return <section className={cn(classes.section, {[classes.verticalPadding]: verticalPadding}, className)} >
      {children}
    </section>
  }
}

export default injectSheet(theme => ({
  section: {
    ...theme.mixin.contentContainer(),
    '&::after': {
      content: '""',
      clear: 'both',
      display: 'table'
    }
  },
  verticalPadding: {
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    [breakpoints.up('md')]: {
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.lg
    }
  }
}))(Section)
