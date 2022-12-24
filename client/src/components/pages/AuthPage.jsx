import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clearError} from "../../reducers/requestReducer"
import LoginForm from "../forms/LoginForm"
import RegisterForm from "../forms/RegisterForm"

export default function AuthPage() {
  const dispatch = useDispatch()
  const {isLoading, errorMessage} = useSelector((state) => state.requestReducer)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    // TODO make special message window for this purpose
    if (errorMessage) {
      alert(errorMessage)
      dispatch(clearError())
    }
  })

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