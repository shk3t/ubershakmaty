import React, {useEffect} from "react"
import classes from "../../styles/pages/MainPage.module.css"
import friends from "../../assets/mainPageImgs/friends.png"
import DropDownButton from "../../components/buttons/DropDownButton"
import {TABLE_PATH, CHESS_BOARD_PATH} from "../../consts/routes"
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import Swal from "sweetalert2"
import {useDispatch, useSelector} from "react-redux"
import {initGame} from "../../reducers/gameReducer"

export default function MainPage() {
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authReducer.authUser)
  const gameId = useSelector((state) => state.gameReducer.gameId)
  const navigate = useNavigate()
  const [timeMode, setTimeMode] = useState("3 | 2")

  useEffect(() => {
    if (gameId) navigate(CHESS_BOARD_PATH)
  }, [gameId])

  return (
    <div className={classes.menu} id="__cy_root" data-cy-root>
      <div className={classes.newGame} id="newGame">
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
        <button className={classes.play} id="playButton">
          Играть!
        </button>
      </div>
      <div>
        <div className={classes.playFriend}>
          <div className={classes.imgWrap}>
            <img src={friends} alt="Friends" />
          </div>
          <button
            className={classes.playFriendButton}
            id="friendsButton"
            onClick={() => {
              Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "It seems like you have no friends..",
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
            <button className={classes.seeTable} id="rateButton">
              <p>Таблица лидеров</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
