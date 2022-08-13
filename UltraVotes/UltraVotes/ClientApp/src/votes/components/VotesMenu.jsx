import React from 'react'
import { NavLink, useParams } from 'react-router-dom';

const navMenu = [
    {
        to:  '/votaciones/resumen',
        name:'Resumen'
    },
    {
        to:  '/votaciones/detalle',
        name:'Detalle'
    },
    {
        to:  '/votaciones/usuarios',
        name:'Usuarios'
    },
    {
        to:  '/votaciones/resultados',
        name:'Resultados'
    },
    {
        to:  '/votaciones/notificaciones',
        name:'Notificaciones'
    }
];

export const VotesMenu = () => {

    const { id } = useParams();

    const getMenuClass = (isActive)=> {
        return `list-group-item ${isActive ? 'bg-secondary text-white' : ''}`;
    }

    return (
        <>
            <nav className="pe-2">
                <div className="card">
                <div className="card-header">
                    Menú Votaciones
                </div>
                <ul className="list-group list-group-flush">
                    {
                        navMenu.map(navItem => (
                            <NavLink
                                key={navItem.name}
                                className="text-decoration-none"
                                to={`${navItem.to}/${id}`}
                                >
                                {({ isActive }) => (
                                    <>
                                        <li className={ getMenuClass(isActive)}>{navItem.name}</li>
                                    </>
                                )}
                            </NavLink>
                        ))
                    }
                </ul>
                </div>
            </nav>
        </>
    )
}
