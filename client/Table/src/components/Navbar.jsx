import {Component} from "react";
import "../style/Navbar.css"
class Navbar extends Component{
    render() {
        return(
            <div className="panel">
                <nav className="NavbarItems">
                    <div className="rating-text">
                        <h1>Рейтинг игроков</h1>
                        <h2>Главная</h2>
                    </div>
                </nav>
            </div>

        );
    }
}
export default Navbar;
