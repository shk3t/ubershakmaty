const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS"
const SET_ERROR = "SET_ERROR"

const initialState = {
  isLoading: false,
  error: null,
}

export default function requestReducer(state = initialState, action) {
  const {error, isLoading} = action.payload || {}
  switch (action.type) {
    case UPDATE_REQUEST_STATUS:
      const newState = {...state}
      if (isLoading) newState["isLoading"] = isLoading
      if (error) newState["error"] = error
      return newState
    case SET_ERROR:
      return {...state, error}
    default:
      return state
  }
}

export const requestAC = (requestAcCallback) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_REQUEST_STATUS,
      payload: {isLoading: true},
    })
    dispatch(requestAcCallback())
    dispatch({
      type: UPDATE_REQUEST_STATUS,
      payload: {isLoading: false},
    })
  } catch (error) {
    dispatch({
      type: UPDATE_REQUEST_STATUS,
      payload: {error, isLoading: false},
    })
  }
}

export const setErrorAC = (error) => {
  return {type: SET_ERROR, payload: {error}}
}

export const clearErrorsAC = () => {
  return {type: SET_ERROR, payload: {error: null}}
}