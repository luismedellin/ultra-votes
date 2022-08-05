import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated  } from "@azure/msal-react";

export const Navbar = () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const isActive = ({isActive})=> {
        return `nav-item nav-link ${isActive ? 'active' : ''}`;
    }

    const onLogout = () => {
        instance.logoutRedirect().catch(e => {
            console.error(e);
        });
    }

    console.log('Authenticated', isAuthenticated);

    return (
        <header className="header-home">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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

                    <div id="navbarLogout"
                        className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex">
                        <ul className="navbar-nav ml-auto">
                            <span className="nav-item nav-link text-primary">
                                {/* { user?.name } */}
                            </span>
                            { isAuthenticated ?  
                                (
                                    <button
                                        className="nav-item nav-link btn"
                                        onClick={ onLogout }
                                    >
                                        Cerrar sesión
                                    </button>
                                )
                            : ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </header>
    )
}
