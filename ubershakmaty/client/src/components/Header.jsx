import React from "react"
import classes from "../styles/Header.module.css"
import mister from "../assets/mainPageImgs/mister.png"

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
                            <li><a href="./statistic.html">Личный кабинет</a></li>
                            <li><a href="#">Настройки</a></li>
                        </ul>
                    </nav>
                </div>  
            </div>
  )
}
