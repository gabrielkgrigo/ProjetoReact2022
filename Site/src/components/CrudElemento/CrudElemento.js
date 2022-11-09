import axios from 'axios';
import './CrudElemento.css';
import Main from '../template/Main';
import { useEffect, useState } from "react";

export default function CrudElemento() {
    const title = "Cadastrar Elementos";

    const url_api_elementos = "https://localhost:7275/api/elemento";

    const [id_elemento, setIdElemento] = useState(0);
    const [nome, setNome] = useState('');

    const [listaElementos, setListaElementos] = useState([]);

    
    const renderForm = () => {
        return (
            <div className="inclui-container">
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do Elemento"
                    className="form-input"
                    name="nome"                    
                    value={nome}                    
                    onChange={ e => atualizaCampo(e)}
                />

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
                <table className="listaElementos" id="tblListaElementos">

                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNumero">ID</th>
                            <th className="tabTituloNome">Nome</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaElementos.map((elemento) =>
                            <tr key={elemento.id_elemento}>
                            <td>{elemento.id_elemento}</td>
                            <td>{elemento.nome}</td>
                            <td>
                                <button onClick={() => carregar(elemento)} >
                                    Altera
                                </button>
                            </td>
                            <td>
                                <button onClick={() => remover(elemento)} >
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
        axios(url_api_elementos).then(resp => {
            setListaElementos(resp.data)
        });
    });

    const carregar = (elemento) => {
        setIdElemento(elemento.id_elemento);
        setNome(elemento.nome);
    };

    const limpar = () => {
        setIdElemento(0);
        setNome('');
    };

    const salvar = () => {
        const elemento = { id_elemento: id_elemento, nome: nome};
        elemento.id_elemento = Number(elemento.id_elemento);
        const metodo = elemento.id_elemento ? 'put' : 'post';
        const url = elemento.id_elemento ? `${url_api_elementos}/${elemento.id_elemento}` : url_api_elementos;
        
        axios[metodo](url, elemento)
            .then(resp => {
                const lista = getListaAtualizada(resp.data)
                setIdElemento(0);
                setNome('');
                setListaElementos(lista);
            })
    };

    const atualizaCampo = (event) => {
        const _elemento = { id_elemento: id_elemento, nome: nome};
        _elemento[event.target.name] = event.target.value;
        setIdElemento(_elemento.id_elemento);
        setNome(_elemento.nome);
    };

    const getListaAtualizada = (elemento, add = true) => {
        const lista = listaElementos.filter(e => e.id_elemento !== elemento.id_elemento);
        if (add) lista.unshift(elemento);
        return lista;
    };

    const remover = (elemento) => {
        const url = url_api_elementos + "/" + elemento.id_elemento;
        if (window.confirm("Confirma remoção do Elemento: " + elemento.nome + "?")) {

            axios['delete'](url, elemento)
                .then(resp => {
                    const lista = getListaAtualizada(elemento, false)
                    setIdElemento(0);
                    setNome('');
                    setListaElementos(lista);
                })
        }
    };

    return (
        <Main title={title}>
            {renderForm()}
            {renderTable()}
        </Main>
    )

};