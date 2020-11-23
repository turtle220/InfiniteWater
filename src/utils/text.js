import width from 'dom-helpers/query/width'
import height from 'dom-helpers/query/height'
import style from 'dom-helpers/style'
import {round} from './math'

function innerDimension (el, dimension) {
  const outerLength = dimension(el)
  const paddingStart = parseFloat(style(el, dimension === height ? 'paddingTop' : 'paddingLeft'))
  const paddingEnd = parseFloat(style(el, dimension === height ? 'paddingBottom' : 'paddingRight'))
  return outerLength - paddingStart - paddingEnd
}

function innerSize (el) {
  return {
    width: innerDimension(el, width),
    height: innerDimension(el, height)
  }
}

export const fitText = (parentContainer, fontContainer, minFontSize, maxFontSize) => {
  var fontSize = maxFontSize

  const setFontSize = (reset = false) => {
    if (reset) {
      fontContainer.style.fontSize = `${maxFontSize}px`
    } else {
      fontSize -= 0.5
      fontSize = round(Math.max(fontSize, minFontSize))
      fontContainer.style.fontSize = `${fontSize}px`
    }
  }

  const checkContainerFits = () => {
    const parentSize = innerSize(parentContainer)
    const containerWidth = width(fontContainer)
    const containerHeight = height(fontContainer)
    return containerWidth <= parentSize.width &&
      containerHeight <= parentSize.height
  }

  setFontSize(true)

  // eslint-disable-next-line no-unmodified-loop-condition
  while (!checkContainerFits() && fontSize > minFontSize) {
    setFontSize()
  }

  return fontSize
}
