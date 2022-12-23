import React from "react"
import classes from "../styles/Header.module.css"
import mister from "../assets/mainPageImgs/mister.png"
import { CHESS_BOARD_PATH, LOGIN_PATH, MAIN_PATH, REGISTER_PATH, SETTINGS_PATH, STATISTIC_PATH, TABLE_PATH } from "../consts/routes"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <div>
            <div className={classes.panel}>
                <div className={classes.imgWrap}>
                    <img className={classes.avatar} src={mister}/>
                </div>
                <div className={classes.nickname}>Nick</div>
                <div className={classes.status}>В сети</div>
                    <nav>
                        <ul>
                            <li><Link to={MAIN_PATH}>Главная станица</Link></li>
                            <li><Link to={STATISTIC_PATH}>Личный кабинет</Link></li>
                            <li><Link to={CHESS_BOARD_PATH}>ChessBoardPage</Link></li>
                            <li><Link to={TABLE_PATH}>TablePage</Link></li>
                            <li><Link to={LOGIN_PATH}>LoginPage</Link></li>
                            <li><Link to={REGISTER_PATH}>RegisterPage</Link></li>
                            <li><Link to={SETTINGS_PATH}>SettingsPage</Link></li>
                        </ul>
                    </nav>
            </div>
        </div>

    )
}