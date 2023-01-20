const SET_REQUEST_STATUS = "SET_REQUEST_STATUS"
const CLEAR_REQUEST = "CLEAR_REQUEST"

const initialState = {
  isLoading: false,
  errorMessage: null,
  completedLabel: null,
}

export default function requestReducer(state = initialState, action) {
  const {errorMessage, isLoading, completedLabel} = action.payload || {}
  switch (action.type) {
    case SET_REQUEST_STATUS:
      if (isLoading) state["isLoading"] = isLoading
      if (errorMessage) state["errorMessage"] = errorMessage
      if (completedLabel) state["completedLabel"] = completedLabel
      return {...state}
    case CLEAR_REQUEST:
      return {...state, errorMessage: null, completedLabel: null}
    default:
      return state
  }
}

export const makeRequest =
  (requestCallback, completedLabel) => async (dispatch) => {
    try {
      dispatch({
        type: SET_REQUEST_STATUS,
        payload: {isLoading: true, completedLabel: null},
      })
      await dispatch(requestCallback())
      dispatch({
        type: SET_REQUEST_STATUS,
        payload: {isLoading: false, completedLabel},
      })
    } catch (error) {
      const errorData = JSON.stringify(error.response.data)
      dispatch({
        type: SET_REQUEST_STATUS,
        payload: {errorMessage: errorData, isLoading: false},
      })
    }
  }

export const setError = (errorMessage) => {
  return {type: SET_REQUEST_STATUS, payload: {errorMessage}}
}

export const clearRequest = () => {
  return {type: CLEAR_REQUEST}
}