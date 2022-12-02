import React, { useState } from "react"
import classes from "../../styles/buttons/DropDownButton.module.css"
import arrow from "../../assets/mainPageImgs/Arrow-down.svg"
import DropDownPanel from "../../components/DropDownPanel"

export default function ExampleButton() {
    const [isActive, setIsActive] = useState(false); 
    return (
        <div>
            <div className={classes.dropDownButton} 
            style={{ backgroundImage: `url(${arrow})` }} 
            onClick={(e) => setIsActive(!isActive)} />
            {isActive && <DropDownPanel/>}
        </div>
    )
}
