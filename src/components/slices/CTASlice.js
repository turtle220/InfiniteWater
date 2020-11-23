import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import CTA from '../widgets/CTA'

class CTASlice extends PureComponent {
  render () {
    const {classes, slice} = this.props
    if (!slice.link_url) return

    return <section className={classes.section}>
      <CTA className={classes.link} text={slice.link_text} to={slice.link_url.url} target={slice.link_url.target} />
    </section>
  }
}

export default injectSheet(theme => ({
  section: {
    backgroundColor: theme.colors.water,
    textAlign: 'center',
    position: 'relative'
  },
  link: {
    color: theme.colors.skin,
    display: 'block',
    fontSize: theme.getRemValue(14),
    padding: [theme.spacing.md, theme.spacing.sm],
    [theme.breakpoints.up('md')]: {
      fontSize: theme.getRemValue(20),
      padding: [theme.spacing.lg, theme.spacing.sm]
    },
    '&:hover': {
      color: theme.colors.skin
    }
  }
}))(CTASlice)
