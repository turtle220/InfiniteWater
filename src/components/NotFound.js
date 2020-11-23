import React, {PureComponent} from 'react'
import injectSheet from 'react-jss'

class NotFound extends PureComponent {
  render () {
    const {classes} = this.props
    return <div className={classes.container}>
      <h1>404 - PAGE NOT FOUND</h1>
    </div>
  }
}

export default injectSheet(theme => (
  {
    container: {
      color: theme.colors.skin,
      marginTop: 120,
      textAlign: 'center',
      minHeight: 250
    }
  })
)(NotFound)
