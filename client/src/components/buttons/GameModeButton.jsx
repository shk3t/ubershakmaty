import React from "react"
import classes from "../../styles/DropDownPanel.module.css"

export default function GameModeButton({text}) {
  function handleClick() {
    console.log(text)
  }
  return (
    <button onClick={handleClick} className={classes.modeButton}>
      {text}
    </button>
  )
}
