import {createSelector} from 'reselect'
import get from 'lodash/get'
import { NOT_FOUND } from 'redux-first-router'

export const getGlobalContent = (state) => state.content.global
export const getCurrentPath = (state) => state.location.pathname
export const getCurrentLocation = (state) => state.location
export const isNotFound = (state) => get(state, ['location', 'type']) === NOT_FOUND
export const getPageType = (state) => get(state.content, ['page', 'type'])

export const getPage = (state) => state.content.page

export const getCurrentLocality = createSelector(
  getCurrentPath,
  (path) => {
    if (path.indexOf('/zh') === 0) {
      return 'zh'
    }
    return 'en'
  })

export const getCurrentPathWithoutLocality = createSelector(
  getCurrentPath,
  (path) => {
    if (path.indexOf('/zh') === 0 || path.indexOf('/en') === 0) {
      return path.substring(3) || '/'
    }
    return path
  })

export const getPageContent = createSelector(
  getGlobalContent,
  getPage,
  (global, page) => {
    const pageTiles = get(page, ['tiles'])
    const globalTiles = {...get(global, ['tiles'])}

    if (pageTiles) {
      for (var i = 0; i < pageTiles.length; i++) { globalTiles[i] = pageTiles[i] }
    }

    return {
      ...page,
      tiles: globalTiles,
      has_related_articles: pageTiles && pageTiles.length > 0
    }
  })

export const getSiteTitle = createSelector(
  getGlobalContent,
  (global) => get(global, ['site_title'])
)

export const getPageTitle = createSelector(
  getPageContent,
  getSiteTitle,
  (page, siteTitle) => {
    var title = get(page, ['title', 'text'], get(page, ['title']))
    if (!title || title === siteTitle) return siteTitle
    return `${siteTitle} - ${title}`
  }
)

function transformOpenGraphImage (image) {
  if (!get(image, 'url')) return null
  return {
    url: image.url,
    width: image.dimensions.width,
    height: image.dimensions.height
  }
}

function transformPageMetadata (page, global, path, title, siteTitle) {
  if (!global) return null

  return {
    title,
    meta_title: get(page, ['meta', 'meta_title']) || global.meta.meta_title,
    metaDescription: get(page, ['meta', 'meta_description']) || global.meta.meta_description,
    metaKeywords: get(page, ['meta', 'meta_keywords']) || global.meta.meta_keywords,
    ogUrl: global.site_url + path,
    ogTitle: get(page, ['meta', 'open_graph_title']) || title,
    ogDescription: get(page, ['meta', 'open_graph_description']) || global.meta.open_graph_description,
    ogImage: transformOpenGraphImage(get(page, ['meta', 'open_graph_image'])) ||
                transformOpenGraphImage(global.meta.open_graph_image),
    ogSiteName: siteTitle
  }
}

export const getMetadata = createSelector(
  getPageContent,
  getGlobalContent,
  getCurrentPath,
  getPageTitle,
  getSiteTitle,
  transformPageMetadata
)
