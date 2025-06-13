import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<nav className="navbar">
			<Link to="/">Home</Link>
			<Link to="/directors">Directors</Link>
			<Link to="/about">About</Link>
		</nav>
	);
}

export default NavBar;
