import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Board from "../models/Board"
import Color from "../models/Color"
import {movePiece, selectPiece} from "../reducers/gameReducer"
import {RangeArray, squareIsBlack} from "../utils"

export default function BoardComponent() {
  const dispatch = useDispatch()
  // const board = useSelector((state) => state.gameReducer.board) Видимо такая хероборина не чекает в глубину :/
  const {board} = useSelector((state) => state.gameReducer)

  function handleMove(event) {
    event.stopPropagation()
    const index = parseInt(event.target.id)
    if (board.selectedPiece) {
      dispatch(movePiece(index))
    } else {
      dispatch(selectPiece(index))
    }
  }

  return (
    <div id="board-area">
      {board && (
        <>
          <div id="board">
            {board.squares.map((square, i) => (
              <div
                key={i}
                className={
                  square.color === Color.WHITE ? "light-square" : "dark-square"
                }
              ></div>
            ))}
          </div>
          <div id="pieces">
            {board.squares.map(({piece}, i) => (
              <div
                id={i}
                key={i}
                className={`piece ${
                  piece && piece.selected && "selected-piece"
                }`}
                style={piece && {backgroundImage: `url(${piece.image})`}}
                onClick={(event) => handleMove(event)}
              ></div>
            ))}
          </div>
          <div id="hints">
            {board.squares.map((square, i) => (
              <div
                key={i}
                className={square.possibleMove ? "hint" : null}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  )

  // return (
  //   <div id="board-area">
  //     <div id="board">
  //       {RangeArray(64).map((i) => (
  //         <div
  //           key={i}
  //           className={squareIsBlack(i) ? "dark-square" : "light-square"}
  //         ></div>
  //       ))}
  //     </div>
  //     <div id="pieces">
  //       {RangeArray(64).map((i) => (
  //         <div
  //           id={i}
  //           key={i}
  //           className={`piece-${pieces[i]} ${
  //             selected.index === i ? "selected-piece" : ""
  //           }`}
  //           onClick={(event) => handleMove(event)}
  //         ></div>
  //       ))}
  //     </div>
  //   </div>
  // )
}