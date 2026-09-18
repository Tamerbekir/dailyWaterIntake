import { Link } from "react-router-dom";
import './navbar.css'

export function Navbar() {

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/settings">
        Settings
      </Link>
      <Link className="nav-link" to="/notes">
        Notes
      </Link>
    </nav>
  )

}