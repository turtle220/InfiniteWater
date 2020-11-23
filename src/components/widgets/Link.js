import React from 'react'
import RouterLink from 'redux-first-router-link'

function fixExternalLinks (props) {
  if (props.to) {
    if (
      /^[a-z]+:/.test(props.to) || // e.g. http:// https:// mailto: tel:
      props.to.substr(0, 2) === '//'
    ) {
      // props.shouldDispatch = false isn't suitable because unfortunately BaseLink will still call
      // e.preventDefault() in that case. The only way to intercept the call to preventDefault is to
      // have a target set. This will make it out into the html but I guess that's ok.
      // We could also monkeypatch e.preventDefault to be a no-op but that seems worse
      if (!props.target) {
        props.target = '_blank'
      }
    }
  }
  if (props.target && props.target !== '_self') {
    props.rel = 'noopener noreferrer' // https://mathiasbynens.github.io/rel-noopener/
  }
  return props
}

export default ({children, ...rest}) => <RouterLink {...fixExternalLinks(rest)}>{children}</RouterLink>
