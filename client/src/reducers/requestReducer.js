const SET_REQUEST_STATUS = "SET_REQUEST_STATUS"
const CLEAR_REQUEST_ERROR = "CLEAR_REQUEST_ERROR"

const initialState = {
  isLoading: false,
  errorMessage: null,
}

export default function requestReducer(state = initialState, action) {
  const {errorMessage, isLoading} = action.payload || {}
  switch (action.type) {
    case SET_REQUEST_STATUS:
      const newState = {...state}
      if (isLoading) newState["isLoading"] = isLoading
      if (errorMessage) newState["errorMessage"] = errorMessage
      return newState
    case CLEAR_REQUEST_ERROR:
      return {...state, errorMessage: null}
    default:
      return state
  }
}

export const makeRequest = (requestAcCallback) => async (dispatch) => {
  try {
    dispatch({
      type: SET_REQUEST_STATUS,
      payload: {isLoading: true},
    })
    await dispatch(requestAcCallback())
    dispatch({
      type: SET_REQUEST_STATUS,
      payload: {isLoading: false},
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

export const clearError = () => {
  return {type: CLEAR_REQUEST_ERROR}
}