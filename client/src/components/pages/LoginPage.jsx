import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {REGISTER_PATH} from "../../consts/routes"
import {login} from "../../reducers/authReducer"
import {clearError, makeRequest} from "../../reducers/requestReducer"
import classes from "../../styles/pages/LoginPage.module.css"
import {store} from "../../store"

export default function LoginPage() {
  const dispatch = useDispatch()
  const {isLoading, errorMessage} = useSelector((state) => state.requestReducer)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    if (errorMessage) alert(errorMessage)
    dispatch(clearError())
  }, [errorMessage])

  function doLogin() {
    dispatch(makeRequest(() => login(credentials)))
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
              value={credentials.username}
              onChange={(event) =>
                setCredentials({...credentials, username: event.target.value})
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

        <button className={classes.button} onClick={doLogin}>
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