const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS"
const CLEAR_ERRORS = "CLEAR_ERRORS"

const initialState = {
  isLoading: false,
  error: null,
}

export default function requestReducer(state = initialState, action) {
  const {error, isLoading} = action.payload || {}
  switch (action.type) {
    case UPDATE_REQUEST_STATUS:
      const newState = {...state}
      if (error) newState["error"] = error
      if (isLoading) newState["isLoading"] = isLoading
      return newState
    case CLEAR_ERRORS:
      return {...state, error: null}
    default:
      return state
  }
}

export const requestAction = (requestCallback) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_REQUEST_STATUS,
      payload: {isLoading: true},
    })
    await requestCallback()
    dispatch({
      type: UPDATE_REQUEST_STATUS,
      payload: {isLoading: false},
    })
    dispatch({type: CLOSE_MODAL})
  } catch (error) {
    dispatch({
      type: UPDATE_REQUEST_STATUS,
      payload: {messages, isLoading: false},
    })
  }
}

export const clearErrorsAction = () => (dispatch) => {
  dispatch({type: CLEAR_ERRORS})
}