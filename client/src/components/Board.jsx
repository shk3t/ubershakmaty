import '../index.css';
import {useRef, useEffect, useState} from 'react';
import {useGame} from "../hooks/useGame";
import {COORDS} from "../consts/game";

export default function Board({whiteMove, setWhiteMove}) {
  const [state, dispatch] = useGame();
  const [moving, setMoving] = useState(false);
  const {pieces} = state;
  const clickedSquare = useRef("");
  const selectedPiece = useRef("");

  const handleMove = e => {
    if (!moving) {
      setMoving(true);
      clickedSquare.current = e.target.id;
      selectedPiece.current = e.target.className;
      e.target.classList.toggle("selected-piece");
      return;
    } else {
      setMoving(false);
      if (e.target.id === clickedSquare.current) {
	e.target.className = selectedPiece.current;
        return;
      }
      dispatch({
        type: "MOVE",
        payload: {
          from: clickedSquare.current,
          to: e.target.id,
          piece: selectedPiece.current
        }
      });
      setWhiteMove(prev => !prev);
      return;
    }
  };

  return (
    <>
    <div id="board">
      {COORDS.map((row, x) => (row.map((c, y) => (
	  y % 2
	  ? <div className={x % 2 ? "light-square" : "dark-square"}
		  key={`board-${c}`}></div>
	  : <div className={x % 2 ? "dark-square" : "light-square"}
		key={`board-${c}`}></div>
	))
      ))}
    </div>
    <div id="pieces">
      {COORDS.map((row, x) => (row.map((c, y) => (
	<div
	  className={pieces[c] ? pieces[c] : ""}
	  onClick={(e) => handleMove(e)}
	  key={`piece-${c}`} id={`${c}`}></div>
	))
      ))}
    </div>
    </>
  );
};