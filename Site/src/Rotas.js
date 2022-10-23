import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import ListaPokemons from './components/ListaPokemons/ListaPokemons';
import CrudPokemon from './components/CrudPokemon/CrudPokemon';
import Login from './components/Login/Login';

export default function Rotas() {
    return (
        <Routes>

            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div>Cadastro de Pokémons.</div>
                    </Main> }
            />

            <Route path='/listaPokemons' element={<ListaPokemons/>} />

            <Route path='/crudPokemon' element={<CrudPokemon/>} />

            <Route path='/login' element={<Login/>} />

            <Route path='*' element={
                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>}
            />

        </Routes>
    )
}