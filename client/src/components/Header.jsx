import React from "react"
import classes from "../styles/Header.module.css"
import mister from "../assets/mainPageImgs/mister.png"
import {
  CHESS_BOARD_PATH,
  AUTH_PATH,
  MAIN_PATH,
  SETTINGS_PATH,
  STATISTIC_PATH,
  TABLE_PATH,
} from "../consts/routes"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../reducers/authReducer"

export default function Header() {
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authReducer.authUser)
  const gameId = useSelector((state) => state.gameReducer.gameId)

  return (
    <div>
      <div className={classes.panel}>
        <div className={classes.imgWrap}>
          <img
            className={classes.avatar}
            src={(authUser && authUser.picture) || mister}
            alt="avatar"
          />
        </div>
        <div className={classes.username}>
          {authUser ? authUser.nickname : "Guest"}
        </div>
        <div className={classes.status}>В сети</div>
        <nav>
          <ul>
            <li>
              <Link to={MAIN_PATH}>Главная</Link>
            </li>
            {/* TODO сделать эндпойнт для возвращения в игру */}
            {gameId && (
              <li>
                <Link to={CHESS_BOARD_PATH}>Игра</Link>
              </li>
            )}
            <li>
              <Link to={TABLE_PATH}>Рейтинг</Link>
            </li>
            {authUser ? (
              <>
                <li>
                  <Link to={STATISTIC_PATH}>Статистика</Link>
                </li>
                <li>
                  <Link to={SETTINGS_PATH}>Настройки</Link>
                </li>
                <li>
                  <Link onClick={() => dispatch(logout())}>Выйти</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={AUTH_PATH}>Войти</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}