import React, {useState} from "react"
import classes from "../../styles/pages/SettingsPage.module.css"
import {useDispatch} from "react-redux"
import {makeRequest, setError} from "../../reducers/requestReducer"
import GenericInput from "../inputs/GenericInput"
import {updateAuthUser} from "../../reducers/authReducer"
import useCompletedRequest from "../../hooks/useCompletedRequest"

export default function PasswordForm() {
  const dispatch = useDispatch()
  const emptyPasswords = {old: "", new: "", newAgain: ""}
  const [passwords, setPasswords] = useState(emptyPasswords)

  function updatePassword() {
    dispatch(
      makeRequest(
        () =>
          updateAuthUser({
            password: passwords.new,
            old_password: passwords.old,
          }),
        "UpdatePassword"
      )
    )
  }
  return
}
