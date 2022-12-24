import React, {useState} from "react"
import {login} from "../../reducers/authReducer"
import authClasses from "../../styles/pages/AuthPage.module.css"
import {useDispatch} from "react-redux"
import {makeRequest} from "../../reducers/requestReducer"

export default function LoginForm({toggleAuth}) {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  function doLogin() {
    dispatch(makeRequest(() => login(credentials)))
  }

  return (
    <div className={authClasses.registerFormContainer}>
      <h1 className={authClasses.formTitle}>Вход</h1>
      <div className={authClasses.formFields}>
        <div className={authClasses.formField}>
          <input
            type="text"
            placeholder="Логин"
            value={credentials.username}
            onChange={(event) =>
              setCredentials({...credentials, username: event.target.value})
            }
          />
        </div>
        <div className={authClasses.formField}>
          <input
            type="password"
            placeholder="Пароль"
            value={credentials.password}
            onChange={(event) =>
              setCredentials({...credentials, password: event.target.value})
            }
          />
        </div>
      </div>
      <h2 className={authClasses.question}>
        <p style={{marginLeft: "70px"}}>
          Забыли пароль?
        </p>
      </h2>
      <button
        className={authClasses.button}
        style={{width: "162px"}}
        onClick={doLogin}
      >
        Войти
      </button>
      <div className={authClasses.divider}>или</div>
      <button className={authClasses.another}>
        <i className="bx bxl-google"></i>
        <p className={authClasses.register}>Войти с помощью Google</p>
      </button>
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