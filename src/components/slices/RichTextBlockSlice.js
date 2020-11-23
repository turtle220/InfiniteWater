import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import cn from 'classnames'
import RichTextContainer from '../widgets/RichTextContainer'
import Section from '../widgets/Section'
import CTA from '../widgets/CTA'

class RichTextBlockSlice extends PureComponent {
  render () {
    const {classes, slice} = this.props
    return <Section>
      <div className={classes.container}>
        {slice.items.map((slice, i) => <RichTextContainer key={i} className={cn(classes.textBlock, {[classes.flexEnd]: slice.align === 'bottom-right'})} content={slice.text && slice.text.html} />)}
        {slice.cta_link && slice.cta_link.url &&
          <div className={cn(classes.textBlock, classes.flexEnd)}>
            <CTA to={slice.cta_link.url} text={slice.cta_text} />
          </div>
        }
      </div>
    </Section>
  }
}

export default injectSheet(theme => ({
  container: {
    display: 'block',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: [0, `-${theme.spacing.md}`],
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    '& p:last-child': {
      marginBottom: 0
    }
  },
  textBlock: {
    [theme.breakpoints.up('md')]: {
      width: `calc(50% - ${theme.spacing.md} - ${theme.spacing.md})`,
      maxWidth: theme.text.maxWidth
    },
    marginLeft: theme.spacing.md,
    marginRight: theme.spacing.md
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    '& a': {
      color: 'inherit'
    }
  }
}))(RichTextBlockSlice)
