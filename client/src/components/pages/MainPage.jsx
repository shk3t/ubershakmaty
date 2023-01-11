import React from "react"
import classes from "../../styles/pages/MainPage.module.css"
import friends from "../../assets/mainPageImgs/friends.png"
import DropDownButton from "../../components/buttons/DropDownButton"
import {TABLE_PATH, CHESS_BOARD_PATH} from "../../consts/routes"
import {useState} from "react"
import {initGame} from "../../reducers/gameReducer"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";
import Swal from "sweetalert2"

export default function MainPage() {
  const authUser = useSelector((state) => state.authReducer.authUser)
  const accessToken = useSelector((state) => state.authReducer.accessToken)
  const [timeMode, setTimeMode] = useState("3 | 2");
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
          <DropDownButton setTime={setTimeMode} />
        </div>
        <div className={classes.choosen}>{timeMode}</div>
        <Link to={CHESS_BOARD_PATH}>
          <button
            className={classes.play}
            onClick={() => {
              initGame(timeMode, authUser, accessToken)
              Swal.fire({
                icon: "success",
                title: "Success",
                type: "success",
                text: "Your work has been saved.",
              })
            }}
          >
            Играть!
          </button>
        </Link>
      </div>
      <div>
        <div className={classes.playFriend}>
          <div className={classes.imgWrap}>
            <img src={friends} />
          </div>
          <button
            className={classes.playFriendButton}
            onClick={() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>',
              })
            }}
          >
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