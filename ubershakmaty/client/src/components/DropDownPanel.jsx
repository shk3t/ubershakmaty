import React from "react"
import classes from "../styles/DropDownPanel.module.css"

export default function DropDownPanel() {
  return (
    <div className={classes.dropdown_content} id="drop-cont">
        <div className={classes.panel}>
            <h2>Выбор контроля времени</h2>
        </div>
        <div className={classes.mode}>
            <h2>Пуля</h2>
            <div>
                <button>1 мин</button>
                <button>1 | 1</button>
                <button>2 | 1</button>
            </div>
        </div>
        <div className={classes.mode}>
            <h2>Блиц</h2>
            <div>
                <button>3 мин</button>
                <button>5 | 2</button>
                <button>5 мин</button>
            </div>
            <div>
                <button>5 | 5</button>
            </div>   
        </div>
        <div className={classes.mode}>
            <h2>Рапид</h2>
            <div>
                <button>3 мин</button>
                <button>5 | 2</button>
                <button>5 мин</button>
            </div>
        </div>
    </div>
  )
}