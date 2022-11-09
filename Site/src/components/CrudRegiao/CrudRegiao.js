import axios from 'axios';
import './CrudRegiao.css';
import Main from '../template/Main';
import { useEffect, useState } from "react";

export default function CrudRegiao() {
    const title = "Cadastrar Regiao";

    const url_api_regioes = "https://localhost:7275/api/regiao";

    const [id_regiao, setIdRegiao] = useState(0);
    const [nome, setNome] = useState('');

    const [listaRegioes, setListaRegioes] = useState([]);

    const renderForm = () => {
        return (
            <div className="inclui-container">
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome da Região"
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
                <table className="listaRegioes" id="tblListaRegioes">

                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNumero">ID</th>
                            <th className="tabTituloNome">Nome</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaRegioes.map((regiao) =>
                            <tr key={regiao.id_regiao}>
                            <td>{regiao.id_regiao}</td>
                            <td>{regiao.nome}</td>
                            <td>
                                <button onClick={() => carregar(regiao)} >
                                    Altera
                                </button>
                            </td>
                            <td>
                                <button onClick={() => remover(regiao)} >
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
        axios(url_api_regioes).then(resp => {
            setListaRegioes(resp.data)
        });
    });

    const carregar = (regiao) => {
        setIdRegiao(regiao.id_regiao);
        setNome(regiao.nome);
    };

    const limpar = () => {
        setIdRegiao(0);
        setNome('');
    };

    const salvar = () => {
        const regiao = { id_regiao: id_regiao, nome: nome};
        regiao.id_regiao = Number(regiao.id_regiao);
        const metodo = regiao.id_regiao ? 'put' : 'post';
        const url = regiao.id_regiao ? `${url_api_regioes}/${regiao.id_regiao}` : url_api_regioes;
        
        axios[metodo](url, regiao)
            .then(resp => {
                const lista = getListaAtualizada(resp.data)
                setIdRegiao(0);
                setNome('');
                setListaRegioes(lista);
            })
    };

    const atualizaCampo = (event) => {
        const _regiao = { id_regiao: id_regiao, nome: nome};
        _regiao[event.target.name] = event.target.value;
        setIdRegiao(_regiao.id_regiao);
        setNome(_regiao.nome);
    };

    const getListaAtualizada = (regiao, add = true) => {
        const lista = listaRegioes.filter(r => r.id_regiao !== regiao.id_regiao);
        if (add) lista.unshift(regiao);
        return lista;
    };

    const remover = (regiao) => {
        const url = url_api_regioes + "/" + regiao.id_regiao;
        if (window.confirm("Confirma remoção da Região: " + regiao.nome + "?")) {

            axios['delete'](url, regiao)
                .then(resp => {
                    const lista = getListaAtualizada(regiao, false)
                    setIdRegiao(0);
                    setNome('');
                    setListaRegioes(lista);
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