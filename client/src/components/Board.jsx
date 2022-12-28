import {useRef, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {COORDS} from "../consts/game"
import {movePiece} from "../reducers/gameReducer"

export default function Board({whiteMove, setWhiteMove}) {
  const dispatch = useDispatch()
  const pieces = useSelector((state) => state.gameReducer.pieces)
  const [moving, setMoving] = useState(false)
  const clickedSquare = useRef("")
  const selectedPiece = useRef("")

  function handleMove(e) {
    if (!moving) {
      clickedSquare.current = e.target.id
      selectedPiece.current = e.target.className
      e.target.classList.toggle("selected-piece")
    } else {
      if (e.target.id === clickedSquare.current) {
        e.target.className = selectedPiece.current
        return
      }
      dispatch(movePiece(clickedSquare, selectedPiece, e))
      setWhiteMove((prev) => !prev)
    }
    setMoving(!moving)
  }

  return (
    <>
      <div id="board">
        {COORDS.map((row, x) =>
          row.map((c, y) =>
            y % 2 ? (
              <div
                key={`board-${c}`}
                className={x % 2 ? "light-square" : "dark-square"}
              ></div>
            ) : (
              <div
                key={`board-${c}`}
                className={x % 2 ? "dark-square" : "light-square"}
              ></div>
            )
          )
        )}
      </div>
      <div id="pieces">
        {COORDS.map((row, x) =>
          row.map((c, y) => (
            <div
              key={`piece-${c}`}
              className={pieces[c] ? pieces[c] : ""}
              onClick={(e) => handleMove(e)}
              id={`${c}`}
            ></div>
          ))
        )}
      </div>
    </>
  )
}