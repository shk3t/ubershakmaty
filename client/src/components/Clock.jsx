import "../index.css"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {WHITE} from "../consts/game"

export default function Clock() {
  const turn = useSelector((state) => state.gameReducer.turn)
  const [whiteTime, setWhiteTime] = useState(500)
  const [blackTime, setBlackTime] = useState(500)

  useEffect(() => {
    const pTime = setInterval(() => {
      if (turn === WHITE) {
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