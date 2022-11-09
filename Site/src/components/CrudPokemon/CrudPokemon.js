import axios from 'axios';
import './CrudPokemon.css';
import Main from '../template/Main';
import { useEffect, useState } from "react";
import UserService from '../../services/UserService';

export default function CrudPokemon () {
    const title = "Cadastrar Pokémons";

    const user = JSON.parse(localStorage.getItem("user"));

    const [mens, setMens] = useState([]);

    const url_api_pokemons = "https://localhost:7275/api/pokemon";
    const url_api_elementos = "https://localhost:7275/api/elemento";
    const url_api_regiao = "https://localhost:7275/api/regiao";

    const [id_pokemon, setIdPokemon] = useState(0);
    const [numero, setNumero] = useState(0);
    const [nome, setNome] = useState('');
    const [id_elemento, setIdElemento] = useState(0);
    const [id_regiao, setIdRegiao] = useState(0);

    const [listaPokemons, setListaPokemons] = useState([]);
    const [listaElementos, setListaElementos] = useState([]);
    const [listaRegioes, setListaRegioes] = useState([]);

    const renderForm = () => {
        return (
            <div className="inclui-container">
                <label> Número: </label>
                <input
                    type="text"
                    id="numero"
                    placeholder="Número do Pokémon"
                    className="form-input"
                    name="numero"            
                    value={numero}            
                    onChange={ e => atualizaCampo(e)}
                />

                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do Pokémon"
                    className="form-input"
                    name="nome"                    
                    value={nome}                    
                    onChange={ e => atualizaCampo(e)}
                />

                <label>Elemento: </label>
                <select
                    id="id_elemento"
                    name="id_elemento"                    
                    value={id_elemento}                    
                    onChange={ e => atualizaCampo(e)}
                >
                    <option value="" selected>--Selecione um elemento--</option>
                    {listaElementos.map(
                        (elemento) =>
                        <option value={elemento.id_elemento}>{elemento.nome}</option>
                    )}
                </select><br/>

                <label>Região: </label>
                <select
                    id="id_regiao"
                    name="id_regiao"                    
                    value={id_regiao}                    
                    onChange={ e => atualizaCampo(e)}
                >
                    <option value="" selected>--Selecione uma região--</option>
                    {listaRegioes.map(
                        (regiao) =>
                        <option value={regiao.id_regiao}>{regiao.nome}</option>
                    )}
                </select>

                <button className="btnSalvar"
                    onClick={e => salvar(e)} >
                        Salvar
                </button>

                <button className="btnCancelar"
                    onClick={e => limpar(e)} >
                        Cancelar
                </button>
            </div>
        )
    };

    const renderTable = () => {
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
                        {listaPokemons.map((pokemon) =>
                            <tr key={pokemon.id_pokemon}>
                            <td>{pokemon.numero}</td>
                            <td>{pokemon.nome}</td>
                            <td>{listaElementos.map((elemento) => {
                                if(elemento.id_elemento === pokemon.id_elemento){
                                    return elemento.nome;
                                }
                                return '';
                            })}</td>                            
                            <td>{listaRegioes.map((regiao) => {
                                if(regiao.id_regiao === pokemon.id_regiao){
                                    return regiao.nome;
                                }
                                return '';
                            })}</td>
                            <td>
                                <button onClick={() => carregar(pokemon)} >
                                    Altera
                                </button>
                            </td>
                            <td>
                                <button onClick={() => remover(pokemon)} >
                                    Remove
                                </button>
                            </td>
                            </tr>
                            
                        )}
                    </tbody>

                </table>

                <br/>
            </div>
        )
    };

    useEffect(() => {
        // axios(url_api_pokemons).then(resp => {
        //     setListaPokemons(resp.data)
        // });

        axios(url_api_elementos).then(resp => {
            setListaElementos(resp.data)
        });

        axios(url_api_regiao).then(resp => {
            setListaRegioes(resp.data)
        });

        UserService.getAdministradorBoard().then(resp => {
                setListaPokemons(resp.data);
                setMens(null);
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMens(_mens);
                console.log("_mens: " + _mens);
        });
    });

    const carregar = (pokemon) => {
        setIdPokemon(pokemon.id_pokemon);
        setNumero(pokemon.numero);
        setNome(pokemon.nome);
        setIdElemento(pokemon.id_elemento);
        setIdRegiao(pokemon.id_regiao);
    };

    const limpar = () => {
        setIdPokemon(0);
        setNumero(0);
        setNome('');
        setIdElemento(0);
        setIdRegiao(0);
    };

    const salvar = () => {
        const pokemon = { id_pokemon: id_pokemon, numero: numero, nome: nome, id_elemento: id_elemento, id_regiao: id_regiao};
        pokemon.numero = Number(pokemon.numero);
        const metodo = pokemon.id_pokemon ? 'put' : 'post';
        const url = pokemon.id_pokemon ? `${url_api_pokemons}/${pokemon.id_pokemon}` : url_api_pokemons;
        
        axios[metodo](url, pokemon)
            .then(resp => {
                const lista = getListaAtualizada(resp.data)
                setIdPokemon(0);
                setNumero(0);
                setNome('');
                setIdElemento(0);
                setIdRegiao(0);
                setListaPokemons(lista);
            })
    };

    const atualizaCampo = (event) => {
        const _pokemon = { id_pokemon: id_pokemon, numero: numero, nome: nome, id_elemento: id_elemento, id_regiao: id_regiao};
        _pokemon[event.target.name] = event.target.value;
        setIdPokemon(_pokemon.id_pokemon);
        setNumero(_pokemon.numero);
        setNome(_pokemon.nome);
        setIdElemento(_pokemon.id_elemento);
        setIdRegiao(_pokemon.id_regiao);
    };

    const getListaAtualizada = (pokemon, add = true) => {
        const lista = listaPokemons.filter(p => p.id_pokemon !== pokemon.id_pokemon);
        if (add) lista.unshift(pokemon);
        return lista;
    };

    const remover = (pokemon) => {
        const url = url_api_pokemons + "/" + pokemon.id_pokemon;
        if (window.confirm("Confirma remoção do Pokémon: " + pokemon.nome + "?")) {

            axios['delete'](url, pokemon)
                .then(resp => {
                    const lista = getListaAtualizada(pokemon, false)
                    setIdPokemon(0);
                    setNumero(0);
                    setNome('');
                    setIdElemento(0);
                    setIdRegiao(0);
                    setListaPokemons(lista);
                })
        }
    };

    return (
        <Main title={title}>
            { (mens) ?
            "Problema com conexão ou autorização (contactar administrador)." : 
                [renderForm(),
                renderTable()]
            }
        </Main>
    )

};