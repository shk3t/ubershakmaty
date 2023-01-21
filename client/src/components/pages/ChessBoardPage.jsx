import "../../styles/pages/ChessBoardPageStyles.css"
import Board from "../Board"
import Clock from "../Clock"
import {useDispatch, useSelector} from "react-redux"
import {unselectPiece} from "../../reducers/gameReducer"
import { useEffect } from "react"
import Swal from "sweetalert2"

export default function ChessBoardPage() {
  const dispatch = useDispatch()
  const endMessage = useSelector((state) => state.gameReducer.endMessage)

  useEffect(() => {
    if (endMessage) {
      Swal.fire({
        icon: "warning",
        title: endMessage
      })
    }
  }, [endMessage])

  return (
    <div id="app-wrapper">
      <div id="game-area" onClick={() => dispatch(unselectPiece())}>
        <Board />
        <Clock />
      </div>
    </div>
  )
}