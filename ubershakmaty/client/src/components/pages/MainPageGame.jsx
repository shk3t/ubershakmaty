import React from "react"
import classes from "../../styles/pages/MainPageGame.module.css"
import friends from "../../assets/mainPageImgs/friends.png"
import DropDownButton from "../../components/buttons/DropDownButton"
import { STATISTIC_PATH } from "../../consts"
import {Link} from "react-router-dom"

export default function MainPageGame() {
    return (
        <div className={classes.menu}>
            <div className={classes.newGame}>
                <nav>
                    <ul>
                        <li><h2 className={classes.newGameText}>Новая игра</h2></li>
                        <li><h2 className={classes.time}>Время</h2></li>
                    </ul>
                </nav>
                <div className={classes.dropdown}>
                    <DropDownButton/>
                </div>
                <div className={classes.choosen}>3 мин</div>
                <button className={classes.play}>Играть!</button>
            
            </div>
            <div>
                <div className={classes.playFriend}>
                    <div className={classes.imgWrap}>
                        <img src={friends}/>
                    </div>
                    <button className={classes.playFriendButton}><p>Играть с другом</p></button>

                </div> 
                <div className={classes.rating}>
                    <h2 className={classes.msg}>Играй больше и <pre/>повышай свой рейтинг!</h2>
                    <button className={classes.seeTable}><Link to={STATISTIC_PATH}><p>Таблица лидеров</p></Link></button>
                </div>
            </div>
        </div>
    )
}
