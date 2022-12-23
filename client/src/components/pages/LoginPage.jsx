import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {REGISTER_PATH} from "../../consts/routes"
import {loginAC} from "../../reducers/authReducer"
import {requestAC} from "../../reducers/requestReducer"
import classes from "../../styles/pages/LoginPage.module.css"

export default function LoginPage() {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    nickname: "",
    password: "",
  })

  function login() {
    dispatch(requestAC(() => loginAC(credentials)))
  }

  return (
    <main>
      <div className={classes.registerFormContainer}>
        <h1 className={classes.formTitle}>Вход</h1>

        <div className={classes.formFields}>
          <div className={classes.formField}>
            <input
              type="text"
              placeholder="Логин"
              value={credentials.nickname}
              onChange={(event) =>
                setCredentials({...credentials, nickname: event.target.value})
              }
            />
          </div>
          <div className={classes.formField}>
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
        <h2 className={classes.question}>
          <a href="#" className={classes.badMemory}>
            Забыли пароль?
          </a>
        </h2>

        <button className={classes.button} onClick={login}>
          Войти
        </button>
        <div className={classes.divider}>или</div>
        <div className={classes.another}>
          <i className="bx bxl-google"></i>
          <a href="#" className={classes.register}>
            Войти с помощью Google
          </a>
        </div>
        <div className={classes.another}>
          <i className="bx bxl-apple"></i>
          <a href="#" className={classes.register}>
            Войти с помощью Apple
          </a>
        </div>
        <div className={classes.another}>
          <i className="bx bxl-facebook"></i>
          <a href="#" className={classes.register}>
            Войти с помощью Facebook
          </a>
        </div>
        <h2 className={classes.question}>
          <a href="#" className={classes.createOne}>
            Еще нет аккаунта?
          </a>
        </h2>
        <Link to={REGISTER_PATH}>
          <button className={classes.enterButton}>Зарегистрироваться</button>
        </Link>
      </div>
    </main>
  )
}