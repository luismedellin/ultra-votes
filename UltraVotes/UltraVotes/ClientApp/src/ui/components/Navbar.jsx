import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const isActive = ({isActive})=> {
        return `nav-item nav-link ${isActive ? 'active' : ''}`;
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Ultra Votes
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ isActive }
                        to="/auth/login"
                    >
                        Login
                    </NavLink>

                    <NavLink 
                        className={ isActive }
                        to="/"
                    >
                        Votaciones
                    </NavLink>

                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    {/* <span className="nav-item nav-link text-primary">
                        { user?.name }
                    </span>
                    <button
                        className="nav-item nav-link btn"
                        onClick={ onLogout }
                    >
                        Logout
                    </button> */}
                </ul>
            </div>
        </nav>
    )
}
