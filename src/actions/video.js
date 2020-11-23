export const PLAY_VIDEO = 'PLAY_VIDEO'
export const STOP_VIDEO = 'STOP_VIDEO'

export const OPEN_VIDEO_DIALOG = 'OPEN_VIDEO_DIALOG'
export const CLOSE_VIDEO_DIALOG = 'CLOSE_VIDEO_DIALOG'

export const playVideo = () => {
  return {type: PLAY_VIDEO}
}

export const stopVideo = () => {
  return {type: STOP_VIDEO}
}

export const openVideoDialog = () => {
  return {type: OPEN_VIDEO_DIALOG}
}

export const closeVideoDialog = () => {
  return {type: CLOSE_VIDEO_DIALOG}
}
