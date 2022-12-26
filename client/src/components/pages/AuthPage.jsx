import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {GOOGLE_ACCOUNT_CLIENT_ID} from "../../consts/auth"
import {socialLogin} from "../../reducers/authReducer"
import {clearError} from "../../reducers/requestReducer"
import AuthService from "../../services/AuthService"
import LoginForm from "../forms/LoginForm"
import RegisterForm from "../forms/RegisterForm"

export default function AuthPage() {
  const dispatch = useDispatch()
  const {isLoading, errorMessage} = useSelector((state) => state.requestReducer)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    AuthService.SocialAccounts.initGoogle({
      client_id: GOOGLE_ACCOUNT_CLIENT_ID,
      callback: (response) => dispatch(socialLogin(response)),
    })
  }, [isLogin])

  useEffect(() => {
    // TODO make special message window for this purpose
    if (errorMessage) {
      alert(errorMessage)
      dispatch(clearError())
    }
  }, [errorMessage])

  function toggleAuth() {
    setIsLogin(!isLogin)
  }

  return (
    <main>
      {isLogin ? (
        <LoginForm toggleAuth={toggleAuth} />
      ) : (
        <RegisterForm toggleAuth={toggleAuth} />
      )}
    </main>
  )
}