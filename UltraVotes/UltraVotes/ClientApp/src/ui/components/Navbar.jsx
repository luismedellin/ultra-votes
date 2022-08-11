import { Link, NavLink } from 'react-router-dom';
import { useIsAuthenticated  } from "@azure/msal-react";

export const Navbar = () => {
    const isAuthenticated = useIsAuthenticated();

    const isActive = ({isActive})=> {
        return `nav-link ${isActive ? 'active' : ''}`;
    }

    const onLogout = () => {
        localStorage.clear();
        window.location.reload();
        
        // instance.logoutRedirect().catch(e => {
        //     console.error(e);
        // });
    }

    return (
        <header className="header-home">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" 
                        type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarTogglerUltraVotes" 
                        aria-controls="navbarTogglerUltraVotes" 
                        ria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link 
                    className="navbar-brand" 
                    to="/"
                >
                    Ultra Votes
                </Link>

                <div className="collapse navbar-collapse" id="navbarTogglerUltraVotes">
                    
                    <ul className="navbar-nav col-6">

                        {/* <NavLink 
                            className={ isActive }
                            to="/auth/login"
                        >
                            Login
                        </NavLink> */}
                        <li className="nav-item dropdown">
                        <NavLink 
                            className={ isActive }
                            to="/"
                        >
                            Mis Votaciones
                        </NavLink>
                        </li>

                        <li className="nav-item">
                        <NavLink 
                            className={ isActive }
                            to="/votaciones"
                        >
                            Votaciones
                        </NavLink>
                        </li>
                    </ul>

                    <div id="navbarLogout"
                        className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex">
                        <ul className="navbar-nav ml-auto">
                            <span className="nav-item nav-link text-primary">
                                {/* { user?.name } */}
                            </span>
                            { isAuthenticated &&
                                <button
                                    className="nav-item nav-link btn"
                                    onClick={ onLogout }
                                >
                                    Cerrar sesión
                                </button>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </header>
    )
}
