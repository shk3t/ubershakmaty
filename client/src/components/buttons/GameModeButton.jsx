import React from "react"
import classes from "../../styles/DropDownPanel.module.css"
export default class GameModeButton extends React.Component  {
    handleClick = () => {
        console.log(this.props.text);
    }
    render() {
        return (
            <button onClick={ this.handleClick } 
                    className={classes.modeButton}>
                {this.props.text}
            </button>
        );
    }
}