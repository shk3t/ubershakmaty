import React from "react"
import classes from "../styles/DropDownPanel.module.css"
import ModeButton from "../components/buttons/GameModeButton"

export default function DropDownPanel() {
  return (
    <div className={classes.dropdown_content} id="drop-cont">
        <div className={classes.panel}>
            <h2>Выбор контроля времени</h2>
        </div>
        <div className={classes.mode}>
            <h2>Пуля</h2>
            <div>
                <ModeButton text="1 мин"/>
                <ModeButton text="1 | 1"/>
                <ModeButton text="2 | 1"/>
            </div>
        </div>
        <div className={classes.mode}>
            <h2>Блиц</h2>
            <div>
                <ModeButton text="3 мин"/>
                <ModeButton text="5 | 2"/>
                <ModeButton text="5 мин"/>
            </div>
            <div>
                <ModeButton text="5 | 5"/>
            </div>   
        </div>
        <div className={classes.mode}>
            <h2>Рапид</h2>
            <div>
                <ModeButton text="3 мин"/>
                <ModeButton text="5 | 2"/>
                <ModeButton text="5 мин"/>
            </div>
        </div>
    </div>
  )
}