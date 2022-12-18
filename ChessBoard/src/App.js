import './index.css';
import Board from "./components/Board";
import Clock from "./components/Clock";
import {useState} from "react";

function App() {
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

export default App;
