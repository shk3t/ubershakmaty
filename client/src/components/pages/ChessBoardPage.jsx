import "../../styles/pages/ChessBoardPageStyles.css"
import Board from "../Board"
import Clock from "../Clock"
import {useDispatch} from "react-redux"
import {unselect} from "../../reducers/gameReducer"

export default function ChessBoardPage() {
  const dispatch = useDispatch()

  return (
    <div id="app-wrapper">
      <div id="game-area" onClick={() => dispatch(unselect())}>
        <Board />
        <Clock />
      </div>
    </div>
  )
}