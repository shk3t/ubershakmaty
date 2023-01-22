import React, {useState} from "react"
import {login} from "../../reducers/authReducer"
import authClasses from "../../styles/pages/AuthPage.module.css"
import {useDispatch} from "react-redux"
import {makeRequest} from "../../reducers/requestReducer"
import GenericInput from "../inputs/GenericInput"
import Swal from "sweetalert2"

export default function LoginForm({toggleAuth}) {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

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
              <GenericInput
                {...{field, type, data: credentials, setData: setCredentials}}
              />
            </div>
          )
        )}
      </div>
      <h2 className={authClasses.question}>
        <button
          onClick={() => {
            Swal.fire({
              icon: "info",
              text: "You're such a loser..",
            })
          }}
        >
          <p style={{marginLeft: "70px"}}>Забыли пароль?</p>
        </button>
      </h2>
      <button
        className={authClasses.button}
        id='loginButton'
        style={{width: "202px"}}
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
        id="registerButton"
        style={{width: "150px"}}
        onClick={toggleAuth}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}
