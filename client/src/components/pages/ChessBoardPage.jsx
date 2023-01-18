import "../../styles/pages/ChessBoardPageStyles.css"
import Board from "../Board"
import Clock from "../Clock"
import {useDispatch} from "react-redux"
import {unselectPiece} from "../../reducers/gameReducer"

export default function ChessBoardPage() {
  const dispatch = useDispatch()

  return (
    <div id="app-wrapper">
      <div id="game-area" onClick={() => dispatch(unselectPiece())}>
        <Board />
        <Clock />
      </div>
    </div>
  )
}