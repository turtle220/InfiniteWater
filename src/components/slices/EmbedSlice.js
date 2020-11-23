import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'
import Section from '../widgets/Section'

class EmbedSlice extends PureComponent {
  render () {
    const {classes, slice} = this.props
    return <Section className={classes.section} verticalPadding={false}>
      <div dangerouslySetInnerHTML={{ __html: slice.html.text }} />
    </Section>
  }
}

export default injectSheet(theme => ({
  section: {}
}))(EmbedSlice)
