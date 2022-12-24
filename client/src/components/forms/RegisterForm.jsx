import React, {useState} from "react"
import authClasses from "../../styles/pages/AuthPage.module.css"
import registerClasses from "../../styles/forms/RegisterForm.module.css"
import pawnImage from "../../assets/chessFigures/pawn_black.png"
import knightImage from "../../assets/chessFigures/knight_black.png"
import queenImage from "../../assets/chessFigures/queen_black.png"
import kingImage from "../../assets/chessFigures/king_black.png"
import {register} from "../../reducers/authReducer"
import AuthService from "../../services/AuthService"
import {GOOGLE} from "../../consts/auth"
import {useDispatch} from "react-redux"
import {makeRequest, setError} from "../../reducers/requestReducer"

export default function RegisterForm({toggleAuth}) {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  })

  function doRegister() {
    if (credentials.password === credentials.confirmedPassword) {
      dispatch(makeRequest(() => register(credentials)))
    } else {
      dispatch(setError("Passwords do not match"))
    }
  }

  return (
    <div className={authClasses.registerFormContainer}>
      <h1 className={authClasses.formTitle}>Присоединяйся</h1>
      <h2 className={authClasses.formTitle}>И начинай играть в шахматы!</h2>
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
            type="text"
            placeholder="Электронная почта"
            value={credentials.email}
            onChange={(event) =>
              setCredentials({...credentials, email: event.target.value})
            }
          />
        </div>
        <div className={authClasses.formField}>
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
        <div className={authClasses.formField}>
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
      <h2 className={authClasses.question}>Для всех уровней!</h2>
      <div className={registerClasses.icon}>
        {[pawnImage, knightImage, kingImage, queenImage].map((image, index) => (
          <div key={index} className={registerClasses.level}>
            <img src={image} />
          </div>
        ))}
      </div>
      <div className={`${registerClasses.icon} ${registerClasses.iconWords}`}>
        {["Новичок", "Начальный", "Средний", "PRO"].map((word, index) => (
          <div className={registerClasses.words} key={index}>
            {word}
          </div>
        ))}
      </div>
      <button
        className={authClasses.button}
        style={{width: "202px"}}
        onClick={doRegister}
      >
        Зарегистрироваться
      </button>
      <div className={authClasses.divider}>или</div>
      <button
        className={authClasses.another}
        style={{width: "210px"}}
        onClick={() => AuthService.socialLogin(GOOGLE)}
      >
        <i className="bx bxl-google"></i>
        <p className={authClasses.register}>
          Зарегистрироваться с помощью Google
        </p>
      </button>
      <h2 className={authClasses.question}>
        <p className={authClasses.createOne}>Уже есть аккаунт?</p>
      </h2>
      <button
        className={authClasses.enterButton}
        onClick={toggleAuth}
      >
        Войти
      </button>
    </div>
  )
}