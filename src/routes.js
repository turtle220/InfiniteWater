import { NOT_FOUND } from 'redux-first-router'
import { fetchGlobal, fetchContent } from './api'
import { globalContentLoaded, pageContentLoaded } from './actions'
import { getGlobalContent, isNotFound, getCurrentLocation, getCurrentLocality, getCurrentPathWithoutLocality } from './selectors'
import { beginTask, endTask } from 'redux-nprogress'

export default {
  CONTENT_ROUTE: {
    path: '*',
    thunk: async (dispatch, getState) => {
      dispatch(beginTask())
      try {
        const notFound = isNotFound(getState())
        if (notFound) return

        const location = getCurrentLocation(getState())
        const locality = getCurrentLocality(getState())
        const global = getGlobalContent(getState())
        const path = getCurrentPathWithoutLocality(getState())
        if (!global) {
//	 const ggg = await fetchGlobal(locality)
//	dispatch(globalContentLoaded(ggg))
//	console.log(ggg)
          dispatch(globalContentLoaded(await fetchGlobal(locality)))
        }

        var pageContent = await fetchContent(path, locality)

        // We have moved location since the call was made to fetch the content, so just throw the data away
        if (location !== getCurrentLocation(getState())) return

        if (!pageContent || !pageContent.type) {
          return dispatch({ type: NOT_FOUND })
        }
        dispatch(pageContentLoaded(pageContent))
      } catch (ex) {
        console.error(ex)
        return dispatch({ type: NOT_FOUND })
      } finally {
        dispatch(endTask())
      }
    }
  }
}
