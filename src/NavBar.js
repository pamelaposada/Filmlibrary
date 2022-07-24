import { NavLink} from "react-router-dom"
import './NavBar.css'

const NavBar = () => {
    return(
        <nav className="nav-bar">
          <NavLink to="/" className="main-links">Home | </NavLink> 
          <NavLink to="/films" className="main-links">Films</NavLink>
        </nav>
    )
    
}

export default NavBar