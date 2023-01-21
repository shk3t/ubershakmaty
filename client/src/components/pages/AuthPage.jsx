import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {GOOGLE_ACCOUNT_CLIENT_ID} from "../../consts/auth"
import useErrorMessage from "../../hooks/useErrorMessage"
import {socialLogin} from "../../reducers/authReducer"
import AuthService from "../../services/AuthService"
import LoginForm from "../forms/LoginForm"
import RegisterForm from "../forms/RegisterForm"

export default function AuthPage() {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    AuthService.SocialAccounts.initGoogle({
      client_id: GOOGLE_ACCOUNT_CLIENT_ID,
      callback: (response) => dispatch(socialLogin(response)),
    })
  }, [isLogin])

  useErrorMessage()

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