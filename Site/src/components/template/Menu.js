import './Menu.css';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import AuthService from '../../services/AuthService';

export default function Menu(props) {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <nav className='menu'>

            <Link to="crudPokemon">
                Pokémons
            </Link>

            <Link to="crudElemento">
                Elementos
            </Link>

            <Link to="crudRegiao">
                Regiões
            </Link>

            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
                ) : (
                <Link to="/login">
                    Login
                </Link>
            )}

        </nav>
    )
}