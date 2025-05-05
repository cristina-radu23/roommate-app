import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <nav className=" navbar navbar-expand-lg navbar-light bg-light fixed-top"style={{
          zIndex: 10,
        }}>
          <div className="container">
            <Link className="navbar-brand" to="/">Roommate Finder</Link>
    
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createaccount">Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );  
};

export default Navbar;