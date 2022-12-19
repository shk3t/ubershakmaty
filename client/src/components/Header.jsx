import React from "react"
import classes from "../styles/Header.module.css"
import mister from "../assets/mainPageImgs/mister.png"
import { CHESS_BOARD_PATH, MAIN_PATH, STATISTIC_PATH, TABLE_PATH } from "../consts/routes"
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
                            <li><Link to="#">Настройки</Link></li>
                            <li><Link to={CHESS_BOARD_PATH}>ChessBoardPage</Link></li>
                            <li><Link to={TABLE_PATH}>TablePage</Link></li>
                        </ul>
                    </nav>
            </div>
        </div>

    )
}