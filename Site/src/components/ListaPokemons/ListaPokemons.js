import React, { Component } from 'react';
import axios from 'axios';
import './ListaPokemons.css';
import Main from '../template/Main';
import { Link} from 'react-router-dom';

const title = "Lista de Pokémons";

const url_api_pokemons = "https://localhost:7275/api/pokemon";
const url_api_elementos = "https://localhost:7275/api/elemento";
const url_api_regiao = "https://localhost:7275/api/regiao";
const initialState = {
    listaPokemons: [],
    listaElementos: [],
    listaRegioes: []
}

export default class ListaPokemons extends Component {

    state = { ...initialState }

    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaPokemons" id="tblListaPokemons">

                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNumero">Número</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloElemento">Elemento</th>
                            <th className="tabTituloRegiao">Região</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.listaPokemons.map((pokemon) =>
                            <tr key={pokemon.id_pokemon}>
                            <td>{pokemon.numero}</td>
                            <td>{pokemon.nome}</td>
                            <td>{this.state.listaElementos.map((elemento) => {
                                if(elemento.id_elemento === pokemon.id_elemento){
                                    return elemento.nome;
                                }
                            })}</td>                            
                            <td>{this.state.listaRegioes.map((regiao) => {
                                if(regiao.id_regiao === pokemon.id_regiao){
                                    return regiao.nome;
                                }
                            })}</td>
                            <td>
                                <Link to={{pathname: '../crudPokemon', state: {id_pokemon: pokemon.id_pokemon}}}>
                                    <button>
                                        Altera
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => this.remover(pokemon)} >
                                    Remove
                                </button>
                            </td>
                            </tr>
                            
                        )}
                    </tbody>

                </table>

                <br/>
                <Link to="../crudPokemon">
                    <button>
                        Novo Pokémon
                    </button>
                </Link>
            </div>
        )
    }

    componentDidMount() {
        axios(url_api_pokemons).then(resp => {
            this.setState({ listaPokemons: resp.data })
        });

        axios(url_api_elementos).then(resp => {
            this.setState({ listaElementos: resp.data })
        });

        axios(url_api_regiao).then(resp => {
            this.setState({ listaRegioes: resp.data })
        });
    }

    getListaAtualizada(pokemon, add = true) {
        const lista = this.state.listaPokemons.filter(p => p.id_pokemon !== pokemon.id_pokemon);
        if (add) lista.unshift(pokemon);
        return lista;
    }

    remover(pokemon) {
        const url = url_api_pokemons + "/" + pokemon.id_pokemon;
        if (window.confirm("Confirma remoção do Pokémon: " + pokemon.nome + "?")) {

            axios['delete'](url, pokemon)
                .then(resp => {
                    const lista = this.getListaAtualizada(pokemon, false)
                    this.setState({ pokemon: initialState.pokemon, listaPokemons : lista })
                })
        }
    }

}