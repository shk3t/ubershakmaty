import {useState} from "react"

export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"

export function useCredentials(type) {
  const initialState =
    type === REGISTER
      ? {
          nickname: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }
      : {
          email: "",
          password: "",
        }

  return useState(initialState)
}