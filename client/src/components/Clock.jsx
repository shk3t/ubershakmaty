import "../index.css"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import Color from "../models/Color"

export default function Clock() {
  const turn = useSelector((state) => state.gameReducer.board.turn)
  const whiteTimer = useSelector((state) => state.gameReducer.whiteTimer)
  const blackTimer = useSelector((state) => state.gameReducer.blackTimer)
  // const timeMode = useSelector((state) => state.gameReducer.timeMode)

  const [whiteTime, setWhiteTime] = useState(0)
  const [blackTime, setBlackTime] = useState(0)

  useEffect(() => {
    setWhiteTime(whiteTimer)
    setBlackTime(blackTimer)
  }, [whiteTimer, blackTimer])

  // TODO адекватный формат времени
  useEffect(() => {
    const pTime = setInterval(() => {
      if (turn === Color.WHITE) {
        console.log("white turn")
        setWhiteTime((prev) => prev - 1)
      } else {
        console.log("black turn")
        setBlackTime((prev) => prev - 1)
      }
    }, 1000)
    return () => clearInterval(pTime)
  }, [turn])

  return (
    <div id="clock-area">
      <div className="clock-wrapper">
        <div className="clock-face">
          <div className="time">{blackTime}</div>
          <div className="time">{whiteTime}</div>
        </div>
      </div>
    </div>
  )
}