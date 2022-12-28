import {useDispatch, useSelector} from "react-redux"
import {movePiece, selectPiece} from "../reducers/gameReducer"
import {RangeArray, squareIsBlack} from "../utils"

export default function Board() {
  const dispatch = useDispatch()
  const {selected, pieces} = useSelector((state) => state.gameReducer)

  function handleMove(event) {
    event.stopPropagation()
    const targetIndex = parseInt(event.target.id)
    if (selected.piece) {
      dispatch(movePiece(targetIndex))
    } else {
      dispatch(selectPiece(targetIndex))
    }
  }

  return (
    <div id="board-area">
      <div id="board">
        {RangeArray(64).map((i) => (
          <div
            key={i}
            className={squareIsBlack(i) ? "dark-square" : "light-square"}
          ></div>
        ))}
      </div>
      <div id="pieces">
        {RangeArray(64).map((i) => (
          <div
            id={i}
            key={i}
            className={`piece-${pieces[i]} ${
              selected.index === i ? "selected-piece" : ""
            }`}
            onClick={(event) => handleMove(event)}
          ></div>
        ))}
      </div>
    </div>
  )
}