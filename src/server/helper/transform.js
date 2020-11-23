import { RichText } from 'prismic-dom'
import htmlSerializer from '../helper/htmlSerializer'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import linkResolver from '../helper/linkResolver'
import {createBase64Image} from '../helper/image'
import keys from 'lodash/keys'
import { URL } from 'url'
import queryString from 'query-string'

const META_FIELDS = ['meta_title', 'meta_keywords', 'meta_description', 'open_graph_title', 'open_graph_description', 'open_graph_image']

export const transformDocumentData = async (data, language) => {
  const result = {}

  for (let propertyName in data) {
    if (!data.hasOwnProperty(propertyName) || META_FIELDS.indexOf(propertyName) >= 0) {
      continue
    }

    const propertyValue = data[propertyName]

    if (isArray(propertyValue) && (propertyValue.length === 0 || propertyValue[0].hasOwnProperty('slice_type'))) {
      if (propertyValue.length === 0) continue
      result[propertyName === 'body' ? 'slices' : propertyName] = await transformDocumentSlices(propertyValue, language)
    } else {
      result[propertyName] = await transformDocumentDataItem(propertyValue, language)
    }
  }

  return result
}

export const transformDocumentDataItem = async (item, language) => {
  if (!item) return

  if (item.dimensions) {
    return transformImages(item)
  }

  if (item.link_type) { return transformLink(item, language) }

  if (item.embed_url) { return item }

  if (isArray(item)) {
    if (get(item, [0, 'type'])) {
      return {
        html: htmlSerializer(language)(item),
        text: RichText.asText(item).trim()
      }
    }
    var items = await Promise.all(item.map(i => transformDocumentData(i, language)))
    return items.filter(x => x)
  }

  if (keys(item).length === 0) {
    return undefined
  }
  return item
}

export const transformDocumentSlices = async (slices, language) => {
  var result = []

  for (var i = 0; i < slices.length; i++) {
    const slice = slices[i]
    const data = await transformDocumentData(slice.primary, language)
    const items = slice.items ? await Promise.all(slice.items.map(item => transformDocumentData(item, language))) : []
    result.push({
      type: slice.slice_type,
      ...data,
      items: items.filter(x => x && keys(x).length > 0)
    })
  }

  return result
}

export const transformImage = (sourceImage, width, height) => {
  if (!sourceImage || !sourceImage.url) return null

  var h = height || (width / sourceImage.dimensions.width) * sourceImage.dimensions.height
  const url = sourceImage.url.indexOf('?') >= 0
    ? sourceImage.url.substring(0, sourceImage.url.indexOf('?'))
    : sourceImage.url
  const qs = {
    ...queryString.parse(sourceImage.url.substring(sourceImage.url.indexOf('?'))),
    w: Math.round(width),
    h: Math.round(h)
  }
  const imgixUrl = url + '?' + queryString.stringify(qs)

  return {
    dimensions: {
      width: width,
      height: h,
      aspect: h / width
    },
    alt: sourceImage.alt,
    copyright: sourceImage.copyright,
    url: imgixUrl
  }
}

export const transformSvgImage = (sourceImage) => {
  return {
    dimensions: {
      width: sourceImage.dimensions.width,
      height: sourceImage.dimensions.height,
      aspect: sourceImage.dimensions.height / sourceImage.dimensions.width
    },
    alt: sourceImage.alt,
    copyright: sourceImage.copyright,
    url: sourceImage.url
  }
}

const isSvgImage = (url) => {
  const imageUrl = new URL(url)
  return imageUrl.pathname.endsWith('.svg')
}

export const transformImages = async (sourceImage) => {
  if (!sourceImage || !sourceImage.url) return null

  if (isSvgImage(sourceImage.url)) {
    return {
      images: [
        transformSvgImage(sourceImage)
      ]
    }
  }

  return {
    images: [
      transformImage(sourceImage, 300),
      transformImage(sourceImage, 400),
      transformImage(sourceImage, 800),
      transformImage(sourceImage, 1600),
      transformImage(sourceImage, 3200)
    ],
    blur: {
      ...transformImage(sourceImage, 8),
      data: sourceImage.disableData ? null
        : process.env.BLUR_DATA_ENCODING_ENABLED === 'true' ? await createBase64Image(transformImage(sourceImage, 8).url) : undefined
    }
  }
}

export const transformLink = (link, language) => {
  if (link.link_type === 'Any') return undefined
  switch (link.link_type) {
    case 'Web':
      return {
        ...link,
        url: link.url.replace(/http(s?):\/\/\//, '/') // Strip out the 'http:///'
      }
    case 'Media':
      return link
    default:
      return {
        link_type: link.link_type,
        uid: link.uid,
        id: link.id,
        url: linkResolver(language)(link)
      }
  }
}

export const transformMetadata = (document) => {
  const data = document.data
  if (!data) return {}
  let ogImage = get(data, ['open_graph_image'])
  if (!ogImage || !ogImage.url) {
    // If we do not have a open-graph-image, use the one for the hero item
    if (data.hero_image) {
      ogImage = transformImage(data.hero_image, 1200, 630)
    }
  }

  let metaTitle = get(data, ['meta_title'])
  if (!metaTitle) {
    metaTitle = get(data, ['title', 0, 'text'])
  }

  let openGraphTitle = get(data, ['open_graph_title'])

  if (!openGraphTitle) {
    openGraphTitle = metaTitle
  }

  let description = get(data, ['open_graph_description'])
  if (!description) {
    description = get(data, ['summary', 0, 'text'])
  }
  let metaDescription = get(data, ['meta_description'])
  if (!metaDescription) {
    metaDescription = get(data, ['summary', 0, 'text'])
  }

  return {
    meta_title: metaTitle,
    meta_keywords: get(data, ['meta_keywords', 'value']),
    meta_description: metaDescription,
    open_graph_title: openGraphTitle,
    open_graph_description: description,
    open_graph_image: ogImage
  }
}

export async function transform (content, language) {
  const data = await transformDocumentData(get(content, ['data']), language)

  return {
    type: content.type,
    uid: content.uid,
    id: content.id,
    lang: content.lang,
    url: linkResolver(language)(content),
    ...data,
    meta: transformMetadata(content)
  }
}

export async function transformAll (responses, language) {
  if (!responses) return null
  if (!Array.isArray(responses)) {
    responses = [responses]
  }
  const data = await Promise.all(responses.map(response => {
    if (response.results) {
      return Promise.all(response.results.map(item => transform(item, language)))
    } else {
      return transform(response, language)
    }
  }))

  const main = data[0]
  main.others = data.slice(1)

  return main
}
