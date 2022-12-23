import React, {useEffect, useState} from "react"
import classes from "../../styles/pages/RegisterPage.module.css"
import pawnImage from "../../assets/chessFigures/pawn_black.png"
import knightImage from "../../assets/chessFigures/knight_black.png"
import queenImage from "../../assets/chessFigures/queen_black.png"
import kingImage from "../../assets/chessFigures/king_black.png"
import {clearError, makeRequest, setError} from "../../reducers/requestReducer"
import {register} from "../../reducers/authReducer"
import {useDispatch, useSelector} from "react-redux"
import {LOGIN_PATH} from "../../consts/routes"
import {Link} from "react-router-dom"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const {isLoading, errorMessage} = useSelector((state) => state.requestReducer)
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  })

  // TODO merge RegisterPage with LoginPage
  useEffect(() => {
    // TODO make special message window for this purpose
    if (errorMessage) alert(errorMessage)
    dispatch(clearError())
  }, [errorMessage])

  function doRegister() {
    if (credentials.password === credentials.confirmedPassword) {
      dispatch(makeRequest(() => register(credentials)))
    } else {
      dispatch(setError("Passwords do not match"))
    }
  }

  return (
    <main>
      <div className={classes.registerFormContainer}>
        <h1 className={classes.formTitle}>Присоединяйся</h1>
        <h2 className={classes.formTitle}>И начинай играть в шахматы!</h2>
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
              type="text"
              placeholder="Электронная почта"
              value={credentials.email}
              onChange={(event) =>
                setCredentials({...credentials, email: event.target.value})
              }
            />
          </div>
          <div className={classes.formField}>
            <input
              type="password"
              placeholder="Пароль"
              value={credentials.password}
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  password: event.target.value,
                })
              }
            />
          </div>
          <div className={classes.formField}>
            <input
              type="password"
              placeholder="Подтвердить пароль"
              value={credentials.confirmedPassword}
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  confirmedPassword: event.target.value,
                })
              }
            />
          </div>
        </div>
        <h2 className={classes.question}>Для всех уровней!</h2>
        <div className={classes.icon}>
          <div className={classes.level}>
            <img src={pawnImage} />
          </div>
          <div className={classes.level}>
            <img src={knightImage} />
          </div>
          <div className={classes.level}>
            <img src={kingImage} />
          </div>
          <div className={classes.level}>
            <img src={queenImage} />
          </div>
        </div>
        <div className={`${classes.icon} ${classes.iconWords}`}>
          <div className={classes.words}>Новичок</div>
          <div className={classes.words}>Начальный</div>
          <div className={classes.words}>Средний</div>
          <div className={classes.words}>PRO</div>
        </div>
        <button className={classes.button} onClick={doRegister}>
          Зарегистрироваться
        </button>
        <div className={classes.divider}>или</div>
        <div className={classes.another}>
          <i className="bx bxl-google"></i>
          <a href="#" className={classes.register}>
            Зарегистрироваться с помощью Google
          </a>
        </div>
        <div className={classes.another}>
          <i className="bx bxl-apple"></i>
          <a href="#" className={classes.register}>
            Зарегистрироваться с помощью Apple
          </a>
        </div>
        <div className={classes.another}>
          <i className="bx bxl-facebook"></i>
          <a href="#" className={classes.register}>
            Зарегистрироваться с помощью Facebook
          </a>
        </div>
        <h2 className={classes.question}>
          <a href="#" className={classes.createOne}>
            Уже есть аккаунт?
          </a>
        </h2>
        <Link to={LOGIN_PATH}>
          <button className={classes.enterButton}>Войти</button>
        </Link>
      </div>
    </main>
  )
}