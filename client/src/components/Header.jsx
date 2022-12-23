import React from "react"
import classes from "../styles/Header.module.css"
import mister from "../assets/mainPageImgs/mister.png"
import {
  CHESS_BOARD_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  REGISTER_PATH,
  SETTINGS_PATH,
  STATISTIC_PATH,
  TABLE_PATH,
} from "../consts/routes"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {logoutAC} from "../reducers/authReducer"

export default function Header() {
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authReducer.authUser)

  return (
    <div>
      <div className={classes.panel}>
        <div className={classes.imgWrap}>
          <img className={classes.avatar} src={mister} />
        </div>
        <div className={classes.nickname}>Nick</div>
        <div className={classes.status}>В сети</div>
        <nav>
          <ul>
            <li>
              <Link to={MAIN_PATH}>Главная</Link>
            </li>
            <li>
              <Link to={CHESS_BOARD_PATH}>Игра</Link>
            </li>
            <li>
              <Link to={TABLE_PATH}>Рейтинг</Link>
            </li>
            {authUser ? (
              <div>
                <li>
                  <Link to={STATISTIC_PATH}>Статистика</Link>
                </li>
                <li>
                  <Link to={SETTINGS_PATH}>Настройки</Link>
                </li>
                <li>
                  <div onClick={() => dispatch(logoutAC())}>"Выйти"</div>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link to={LOGIN_PATH}>Войти</Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}