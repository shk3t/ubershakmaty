import '../../styles/pages/ChessBoardPageStyles.css'
import Board from "../Board";
import Clock from "../Clock";
import {useState} from "react";

function ChessBoardPage() {
  const [whiteMove, setWhiteMove] = useState(true);
  return (
    <>
      <div id="app-wrapper">
	<div id="game-area">
          <div id="board-area">
	    <Board whiteMove={whiteMove} setWhiteMove={setWhiteMove}/>
          </div>
          <div id="clock-area">
            <div className="clock-wrapper">
	      <Clock whiteMove={whiteMove}/>
            </div>
          </div>
	</div>
      </div>
    </>
  );
}

export default ChessBoardPage;