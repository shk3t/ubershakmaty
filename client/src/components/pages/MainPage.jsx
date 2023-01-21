import React from "react"
import classes from "../../styles/pages/MainPage.module.css"
import friends from "../../assets/mainPageImgs/friends.png"
import DropDownButton from "../../components/buttons/DropDownButton"
import {TABLE_PATH, CHESS_BOARD_PATH} from "../../consts/routes"
import {Link, useNavigate} from "react-router-dom"
import Swal from "sweetalert2"
import {useDispatch, useSelector} from "react-redux"
import {initGame} from "../../reducers/gameReducer"
import {makeRequest} from "../../reducers/requestReducer"
import useCompletedRequest from "../../hooks/useCompletedRequest"

export default function MainPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authReducer.authUser)
  const gameId = useSelector((state) => state.gameReducer.gameId)
  const timeMode = useSelector((state) => state.gameReducer.timeMode)

  useCompletedRequest("InitGame", () => {
    if (gameId) {
      Swal.fire({
        icon: "success",
        title: "The game was found",
      })
      navigate(CHESS_BOARD_PATH)
    } else {
      Swal.fire({
        icon: "info",
        title: "Looking for another player...",
      })
    }
  })

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
        <div className={classes.choosen}>{timeMode.toPretty()}</div>
        <button
          className={classes.play}
          onClick={() => {
            dispatch(makeRequest(() => initGame(authUser), "InitGame"))
          }}
        >
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
            <button className={classes.seeTable}>
              <p>Таблица лидеров</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}