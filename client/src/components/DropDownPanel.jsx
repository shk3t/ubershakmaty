import React from "react"
import classes from "../styles/DropDownPanel.module.css"
import ModeButton from "../components/buttons/GameModeButton"
import TimeMode from "../models/TimeMode"

export default function DropDownPanel() {
  return (
    <div className={classes.dropdown_content} id="drop-cont">
      <div className={classes.panel}>
        <h2>Выбор контроля времени</h2>
      </div>
      <div className={classes.mode}>
        <h2>Пуля</h2>
        <div>
          {[new TimeMode(1), new TimeMode(1, 1), new TimeMode(2, 1)].map(
            (timeMode, i) => (
              <ModeButton key={i} timeMode={timeMode} />
            )
          )}
        </div>
      </div>
      <div className={classes.mode}>
        <h2>Блиц</h2>
        <div>
          {[new TimeMode(3), new TimeMode(3, 2), new TimeMode(5)].map(
            (timeMode, i) => (
              <ModeButton key={i} timeMode={timeMode} />
            )
          )}
        </div>
        <div>
          <ModeButton timeMode={new TimeMode(5, 5)} />
        </div>
      </div>
      <div className={classes.mode}>
        <h2>Рапид</h2>
        <div>
          {[new TimeMode(10), new TimeMode(15, 10), new TimeMode(30)].map(
            (timeMode, i) => (
              <ModeButton key={i} timeMode={timeMode} />
            )
          )}
        </div>
      </div>
    </div>
  )
}