import { NavLink } from "react-router-dom";
import classNameObj from "./NavBar.module.css";

function NavBar(props) {
    return (
        <nav className={classNameObj.navContainer}>
            <ul>
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/messages">Messages</NavLink>
                </li>
                <li>
                    <NavLink to="/news">News</NavLink>
                </li>
                <li>
                    <NavLink to="/music">Music</NavLink>
                </li>
                <li>
                    <NavLink to="/settings">Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;