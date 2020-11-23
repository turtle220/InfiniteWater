import linkResolver from './linkResolver'
import PrismicDOM from 'prismic-dom'

const htmlSerializer = (element, content) => {
  // Don't wrap images in a <p> tag
  if (element.type === 'image') {
    return `<img src="${element.url}" alt="${element.alt}">`
  }

  // Return null to stick with the default behavior
  return null
}

const serialize = (language) => (richTextField) => {
  return PrismicDOM.RichText.asHtml(richTextField, linkResolver(language), htmlSerializer)
}

export default serialize
