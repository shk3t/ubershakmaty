import {Component} from "react";
import classes from "../styles/Navbar.module.css"
class Navbar extends Component{
    render() {
        return(
            <div className={classes.panel}>
                <nav className={classes.NavbarItems}>
                    <div className={classes.ratingText}>
                        <h1>Рейтинг игроков</h1>
                        <h2>Главная</h2>
                    </div>
                </nav>
            </div>

        );
    }
}
export default Navbar;