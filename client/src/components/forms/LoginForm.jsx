import React, {useState} from "react"
import {login} from "../../reducers/authReducer"
import authClasses from "../../styles/pages/AuthPage.module.css"
import {useDispatch} from "react-redux"
import {makeRequest} from "../../reducers/requestReducer"
import AuthInput from "../inputs/AuthInput"
import {LOGIN, useCredentials} from "../../hooks/useCredentials"

export default function LoginForm({toggleAuth}) {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useCredentials(LOGIN)

  function doLogin() {
    dispatch(makeRequest(() => login(credentials)))
  }

  return (
    <div className={authClasses.registerFormContainer}>
      <h1 className={authClasses.formTitle}>Вход</h1>
      <div className={authClasses.formFields}>
        {[{field: "email"}, {field: "password", type: "password"}].map(
          ({field, type}) => (
            <div key={field} className={authClasses.formField}>
              <AuthInput {...{field, type, credentials, setCredentials}} />
            </div>
          )
        )}
      </div>
      <h2 className={authClasses.question}>
        <p style={{marginLeft: "70px"}}>Забыли пароль?</p>
      </h2>
      <button
        className={authClasses.button}
        style={{width: "162px"}}
        onClick={doLogin}
      >
        Войти
      </button>
      <div className={authClasses.divider}>или</div>
      <div className="googleSignIn"></div>
      <h2 className={authClasses.question}>
        <p className={authClasses.createOne}>Еще нет аккаунта?</p>
      </h2>
      <button
        className={authClasses.enterButton}
        style={{width: "150px"}}
        onClick={toggleAuth}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}