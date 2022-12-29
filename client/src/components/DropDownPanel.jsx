import React from "react"
import classes from "../styles/DropDownPanel.module.css"
import ModeButton from "../components/buttons/GameModeButton"
import { useCallback } from 'react'

export default function DropDownPanel({setTime}) {
  return (
    <div className={classes.dropdown_content} id="drop-cont">
        <div className={classes.panel}>
            <h2>Выбор контроля времени</h2>
        </div>
        <div className={classes.mode}>
            <h2>Пуля</h2>
            <div>
                <ModeButton text="1 мин" setTime={setTime}/>
                <ModeButton text="1 | 1" setTime={setTime}/>
                <ModeButton text="2 | 1" setTime={setTime}/>
            </div>
        </div>
        <div className={classes.mode}>
            <h2>Блиц</h2>
            <div>
                <ModeButton text="3 мин" setTime={setTime}/>
                <ModeButton text="3 | 2" setTime={setTime}/>
                <ModeButton text="5 мин" setTime={setTime}/>
            </div>
            <div>
                <ModeButton text="5 | 5" setTime={setTime}/>
            </div>
        </div>
        <div className={classes.mode}>
            <h2>Рапид</h2>
            <div>
                <ModeButton text="10 мин" setTime={setTime}/>
                <ModeButton text="15 | 10" setTime={setTime}/>
                <ModeButton text="30 мин" setTime={setTime}/>
            </div>
        </div>
    </div>
  )
}