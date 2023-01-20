import jwtDecode from "jwt-decode"
import { BASE_URL } from "../consts/base"
import AuthService from "../services/AuthService"
import UserService from "../services/UserService"

const REGISTER = "REGISTER"
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const REFRESH_TOKENS = "REFRESH_TOKENS"
const UPDATE_AUTH_USER = "UPDATE_AUTH_USER"

const initialState = {authUser: null, accessToken: null}

export default function authReducer(state = initialState, action) {
  const {user, token} = action.payload || {}

  if (user && user.picture) {
    user.picture = BASE_URL + user.picture
  }

  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {authUser: user, accessToken: token}
    case LOGOUT:
      return initialState
    case REFRESH_TOKENS:
      return {...state, accessToken: token}
    case UPDATE_AUTH_USER:
      return {...state, authUser: user}
    default:
      return state
  }
}

export const register = (credentials) => async (dispatch) => {
  const {user, access_token: token} = await AuthService.register(credentials)
  dispatch({type: REGISTER, payload: {user, token}})
}

export const login = (credentials) => async (dispatch) => {
  const {user, access_token: token} = await AuthService.login(credentials)
  dispatch({type: LOGIN, payload: {user, token}})
}

export const socialLogin = (providerResponse) => async (dispatch) => {
  const credentials = jwtDecode(providerResponse.credential)
  const {user, access_token: token} = await AuthService.socialLogin(credentials)
  dispatch({type: LOGIN, payload: {user, token}})
}

export const logout = () => async (dispatch) => {
  await AuthService.logout()
  dispatch({type: LOGOUT})
}

export const refreshTokens = () => async (dispatch) => {
  const {access_token} = await AuthService.refreshTokens()
  dispatch({type: REFRESH_TOKENS, payload: {token: access_token}})
}

export const updateAuthUser = (data) => async (dispatch) => {
  const user = await UserService.updateAuthUser(data)
  dispatch({type: UPDATE_AUTH_USER, payload: {user}})
}