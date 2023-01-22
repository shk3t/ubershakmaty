import "../index.css"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import Color from "../models/Color"
import {zeroPad} from "../utils"

export default function Clock() {
  const turn = useSelector((state) => state.gameReducer.board.turn)
  const whiteTimer = useSelector((state) => state.gameReducer.whiteTimer)
  const blackTimer = useSelector((state) => state.gameReducer.blackTimer)
  const endMessage = useSelector((state) => state.gameReducer.endMessage)
  // const timeMode = useSelector((state) => state.gameReducer.timeMode)

  const [whiteTime, setWhiteTime] = useState(0)
  const [blackTime, setBlackTime] = useState(0)

  useEffect(() => {
    setWhiteTime(whiteTimer)
    setBlackTime(blackTimer)
  }, [whiteTimer, blackTimer])

  useEffect(() => {
    const pTime = setInterval(() => {
      if (turn === Color.WHITE) {
        setWhiteTime((prev) => (prev <= 0 ? 0 : prev - 1))
      } else {
        setBlackTime((prev) => (prev <= 0 ? 0 : prev - 1))
      }
    }, 1000)
    return () => clearInterval(pTime)
  }, [turn])

  function timeFromSeconds(seconds) {
    return `${zeroPad(Math.floor(seconds / 60), 2)}:${zeroPad(seconds % 60, 2)}`
  }

  return (
    <div id="clock-area">
      <div className="clock-wrapper">
        <div className="clock-face">
          <div className="time">{endMessage || `${turn} turn`}</div>
          {!endMessage && (
            <>
              <div className="time">{timeFromSeconds(blackTime)}</div>
              <div className="time">{timeFromSeconds(whiteTime)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}