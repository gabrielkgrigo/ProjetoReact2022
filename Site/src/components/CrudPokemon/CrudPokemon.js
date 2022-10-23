import React, { Component } from 'react';
import axios from 'axios';
import './CrudPokemon.css';
import Main from '../template/Main';
import { Link} from 'react-router-dom';

const title = "Cadastrar Pokémon";

const url_api_pokemons = "https://localhost:7275/api/pokemon";
const url_api_elementos = "https://localhost:7275/api/elemento";
const url_api_regiao = "https://localhost:7275/api/regiao";
const initialState = {
    id_Pokemon: 0,
    listaPokemons: [],
    listaElementos: [],
    listaRegioes: []
}

export default class CrudPokemon extends Component {

    state = { ...initialState }

    render() {
        let {id_pokemon} = this.props.id_pokemon;
        console.log(id_pokemon);

        return (
            <Main title={title}>

            </Main>
        )
    }

}