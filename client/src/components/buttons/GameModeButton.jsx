import React from "react"
import {useDispatch} from "react-redux"
import {setTimeMode} from "../../reducers/gameReducer"
import classes from "../../styles/DropDownPanel.module.css"

export default function GameModeButton({timeMode}) {
  const dispatch = useDispatch()

  return (
    <button
      onClick={() => dispatch(setTimeMode(timeMode))}
      className={classes.modeButton}
    >
      {timeMode.toPretty()}
    </button>
  )
}