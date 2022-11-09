import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import AuthService from './services/AuthService';
import Main from './components/template/Main';
import CrudPokemon from './components/CrudPokemon/CrudPokemon';
import CrudElemento from './components/CrudElemento/CrudElemento';
import CrudRegiao from './components/CrudRegiao/CrudRegiao';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

export default function Rotas() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Routes>

            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div>Cadastro de Pokémons.</div>
                    </Main> }
            />

            {currentUser ? (
                <Route exact path='/crudPokemon'
                    element={<CrudPokemon />}
                />
            ) : (
                <Route exact path='/crudPokemon'
                    element={
                        <Main title="Cadastro de Pokemons">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}

            {currentUser ? (
                <Route exact path='/crudElemento'
                    element={<CrudElemento/>}
                />
            ) : (
                <Route exact path='/crudElemento'
                    element={
                        <Main title="Elementos">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}

            {currentUser ? (
                <Route exact path='/crudRegiao'
                    element={<CrudRegiao/>}
                />
            ) : (
                <Route exact path='/crudRegiao'
                    element={
                        <Main title="Regioes">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}

            {/* <Route path='/crudPokemon' element={<CrudPokemon/>} />
            <Route path='/crudElemento' element={<CrudElemento/>} />
            <Route path='/crudRegiao' element={<CrudRegiao/>} /> */}

            <Route path='/login' element={<Login/>} />

            <Route path='/logout' element={<Logout />} />

            <Route path='*' element={
                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>}
            />

        </Routes>
    )
}