import {
  OPEN_VIDEO_DIALOG,
  CLOSE_VIDEO_DIALOG,
  CONTENT_ROUTE,
  PLAY_VIDEO,
  STOP_VIDEO, LEAVE_HOMEPAGE_SECTION
} from '../actions'

const initialState = {
  videoDialogOpen: false,
  isPlaying: false
}

const video = (state = initialState, action) => {
  switch (action.type) {
    case CONTENT_ROUTE:
    case LEAVE_HOMEPAGE_SECTION:
      return {
        ...state,
        isPlaying: false,
        videoDialogOpen: false
      }
    case OPEN_VIDEO_DIALOG:
      return {
        ...state,
        isPlaying: true,
        videoDialogOpen: true
      }
    case STOP_VIDEO:
      return {
        ...state,
        isPlaying: false,
        videoDialogOpen: false
      }
    case PLAY_VIDEO:
      return {
        ...state,
        isPlaying: true
      }
    case CLOSE_VIDEO_DIALOG:
      return {
        ...state,
        isPlaying: false,
        videoDialogOpen: false
      }
    default:
      return state
  }
}

export default video
