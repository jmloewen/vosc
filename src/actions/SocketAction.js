export const socketResponse = (response) => dispatch => {
  //action should be speak or show image instead of just 'response'
  dispatch({
    type: 'RECEIVE_SOCKET_RESPONSE',
    response
  })
}

export const textToSpeech = (detail) => dispatch => {
  console.log("textToSpeech")
  dispatch({
    type: 'SPEAK',
    detail:detail
  })
}

export const showImage = (detail) => dispatch => {
  console.log("showImage")
  dispatch({
    type: 'SHOW_IMAGE',
    detail:detail
  })
}
