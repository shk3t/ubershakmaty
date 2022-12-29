import React from "react"
import classes from "../../styles/pages/MainPage.module.css"
import friends from "../../assets/mainPageImgs/friends.png"
import DropDownButton from "../../components/buttons/DropDownButton"
import {TABLE_PATH, CHESS_BOARD_PATH} from "../../consts/routes"
import {Link} from "react-router-dom"

export default function MainPage() {
  return (
    <div className={classes.menu}>
      <div className={classes.newGame}>
        <nav>
          <ul>
            <li>
              <h2 className={classes.newGameText}>Новая игра</h2>
            </li>
            <li>
              <h2 className={classes.time}>Время</h2>
            </li>
          </ul>
        </nav>
        <div className={classes.dropdown}>
          <DropDownButton />
        </div>
        <div className={classes.choosen}>3 мин</div>
        <Link to={CHESS_BOARD_PATH}>
          <button className={classes.play}>Играть!</button>
        </Link>
      </div>
      <div>
        <div className={classes.playFriend}>
          <div className={classes.imgWrap}>
            <img src={friends} />
          </div>
          <button className={classes.playFriendButton}>
            <p>Играть с другом</p>
          </button>
        </div>
        <div className={classes.rating}>
          <h2 className={classes.msg}>
            Играй больше и <pre />
            повышай свой рейтинг!
          </h2>
          <Link to={TABLE_PATH}>
            <button className={classes.seeTable}>
              <p>Таблица лидеров</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
