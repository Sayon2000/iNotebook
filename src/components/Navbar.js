import React from 'react'
import { Link  , useLocation , useHistory} from 'react-router-dom'

export const Navbar = () => {
  let location = useLocation();
  let history = useHistory()

  const handleClick = ()=>{
    localStorage.removeItem('token');
    history.push('/login')
  }

    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">


      <Link className="nav-link text-white" to="/">iNotebook</Link>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
     
      <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
        </li>
      {localStorage.getItem('token') && <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/account" ? "active" : ""}`} aria-current="page" to="/account">Account Details</Link>
        </li>}
     
  
      </ul>

    </div>

    {(!localStorage.getItem('token'))? < ><Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary" to="/signup" role="button">Signup</Link></> : 
    
    <button className="btn btn-primary" onClick={handleClick} role="button">Logout</button>}
    
  </div>
</nav>
    )
}
