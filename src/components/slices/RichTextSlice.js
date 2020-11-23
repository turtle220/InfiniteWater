import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import RichTextContainer from '../widgets/RichTextContainer'
import Section from '../widgets/Section'
import cn from 'classnames'
import CTA from '../widgets/CTA'
import get from 'lodash/get'
import FloatingImages from '../FloatingImages'

class RichTextSlice extends PureComponent {
  render () {
    const {classes, className, slice} = this.props

    const fullWidth = slice.columns === 'Full Width'
    const splitIntoColumn = slice.columns === '2'

    const hasImages = !!get(slice, ['items', 0, 'image', 'images'])

    return <Section>
      <div className={cn(splitIntoColumn ? classes.columns : fullWidth ? classes.fullWidth : classes.container, className)}>
        <div className={cn(hasImages && classes.floatLeft)}>
          {slice.text && <RichTextContainer className={cn(classes.text, splitIntoColumn && classes.textColumns)} content={slice.text.html} />}
          {slice.link_url && slice.link_text &&
          <CTA className={cn(classes.link, {withMargin: slice.text && slice.text.text})} text={slice.link_text} to={slice.link_url.url} target={slice.link_url.target} />
          }
        </div>
        {hasImages &&
        <div className={classes.floatRight}>
          <FloatingImages images={slice.items.map(x => x.image)} />
        </div>
        }
      </div>
    </Section>
  }
}

export default injectSheet(theme => ({
  floatLeft: {
    float: 'left',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      maxWidth: theme.text.maxWidth
    }
  },
  floatRight: {
    float: 'right',
    width: '50%',
    paddingLeft: theme.spacing.lg,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  container: {
    '&::after': {
      content: '""',
      clear: 'both',
      display: 'table'
    }
  },
  fullWidth: {
    width: '100%',
    maxWidth: 860,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  columns: {
    columns: '400px 2',
    margin: [0, `-${theme.spacing.md}`],
    '& > *': {
      [theme.breakpoints.up('md')]: {
        maxWidth: theme.text.maxWidth
      }
    }
  },
  text: {
    '& > *:last-child': {
      marginBottom: 0
    }
  },
  textColumns: {
    '& > *': {
      marginLeft: theme.spacing.md,
      marginRight: theme.spacing.md
    }
  },
  link: {
    display: 'block',
    color: theme.colors.water,
    '&.withMargin': {
      marginTop: theme.spacing.md
    }
  }
}))(RichTextSlice)
