import {getApiUrl} from '../config'
import compact from 'lodash/compact'

export const fetchGlobal = async (locality = 'en') => {
  let url = `${getApiUrl().toString()}/global/${locality}`
  return fetch(url, { // eslint-disable-line no-undef
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(data => data.json())
}

export const fetchContent = async (path, locality = 'en') => {
  const segments = compact(path.split('/'))
  if (segments[0] === 'news' && segments.length > 1) {
    segments[0] = 'news_article'
  }
  if (segments[0] === 'raffle') {
    segments.unshift('page')
  }
  segments.unshift(locality)
  segments.unshift('content')
  let url = `${getApiUrl().toString()}/${segments.join('/')}`
  return fetch(url, { // eslint-disable-line no-undef
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include'
  })
    .then(data => data.json())
}

export const post = async (path, data) => {
  let url = getApiUrl().toString() + path

  return fetch(url, { // eslint-disable-line no-undef
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const postContact = async (contact) => {
  return post('/contact', contact)
}

export const postSubscription = async (email) => {
  return post('/subscribe', {email})
}
