import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

const Symbol = ({icon, classes, className, style, ref}) => {
  if (!icon) return null
  const [,, width, height] = icon.viewBox ? icon.viewBox.split(/\s+/) : []
  return <svg className={cn(classes.symbol, className)} width={width} height={height} ref={ref} style={style}>
    <use xlinkHref={`#${icon.id}`} />
  </svg>
}

Symbol.propTypes = {
  icon: PropTypes.object.isRequired,
  className: PropTypes.string
}
export default injectSheet({
  symbol: {
    fill: 'currentColor'
  }
})(Symbol)
