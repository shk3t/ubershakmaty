import React from "react"
import classes from "../../styles/DropDownPanel.module.css"

export default function GameModeButton({text, setTime}) {
    function handleClick() {
        setTime(text);
    }
    return (
        <button onClick={ handleClick } className={classes.modeButton}>
            {text}
        </button>
    );
}