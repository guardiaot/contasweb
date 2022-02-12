import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import api from '../../helpers/ApiClientes';
import Luz from '../../components/modulos/Luz';
import Aviso from '../../components/modulos/aviso';
import ModalCategoria from '../../components/modulos/ModalCategoria';
import ModalAviso from '../../components/modulos/ModalAviso';
const Servicos = (props) => {
    const [stateList, setStateList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAviso, setAviso] = useState(false);
    const [statData, setData] = useState([]);
    
    const [visual, setVisual] = useState(1);
    const [titulo, setTitulo] = useState("");
    const [stateConta, setStateContas] = useState([]);

    const [statLast, setLast] = useState([]);
    const [statCurrent, setCurrent] = useState(1);
    const [statCount, setCount] = useState([]);

    const [statTotal, setTotal] = useState([]);
    const [statResult, setResult] = useState([]);
    const [statPage, setPage] = useState([]);

    useEffect(() => {
        getCategoria();
    }, []);

    const updatetable = () => {
        getCategoria();
    }
    const getCategoria = async () => {
        let tpagina = document.getElementById("tpagina").value;
        let currentpage = document.getElementById("current_page").value;
        api.get("http://contaspr.test/api/list-categoria", { params: { 'id': 2, 'pagina': tpagina, 'page': currentpage } })
            .then((response) => {
                let result = response.data.list;
                setLast(result.last_page);
                setCount(response.data.cont);
                setTotal(response.data.cont.total);
                setResult(response.data.cont.total);
                setLast(response.data.cont.last_page);
                
                setPage(tpagina);
                setStateList(result);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

    }
    const delServico = async (id, e, d) => {
        if(e == 0 && d == 0){
            api.delete("http://contaspr.test/api/categoria/" + id,
            {
                headers: {
                    "x-access-token": "token-value",
                },
            }).then((response) => {
                updatetable()
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }else{
            setTitulo("Novo");
            setAviso(true);
            setData({
                e: e,
                d: d
            })
        }
    }
    const updateCat = (id) => {
        setStateContas(id);
        setVisual(2);
        setTitulo("Editando");
        setShowModal(true);
    }

    const addCat = (id) => {
        setStateContas(id);
        setVisual(2);
        setTitulo("Novo");
        setShowModal(true);
    }
    const nextPage = (pag) => {
        document.getElementById("current_page").value = pag + 1;
        setCurrent(pag + 1); //current_page
        getCategoria();
    }

    const beforePage = (pag) => {
        document.getElementById("current_page").value = pag - 1;
        setCurrent(pag - 1); //current_page
        getCategoria();
    }
    return (
        <>
            {showModal ? <Luz /> : null}
            {showModal ? <ModalCategoria closeAction={() => setShowModal(false)} conteudo={stateConta} visualizar={visual} titulo={titulo} fn={updatetable} /> : null}
            {showAviso ? <Luz /> : null}
            {showAviso ? <ModalAviso closeAction={() => setAviso(false)} conteudo={statData} visualizar={visual} titulo={titulo}  /> : null}
            <div>
                <div id="main-content" style={{ marginLeft: 180 }}>
                    {/* BEGIN PAGE CONTAINER*/}
                    <div className="container-fluid">
                        {/* BEGIN PAGE HEADER*/}
                        <div className="row-fluid">
                            <div className="span12">
                                {/* BEGIN PAGE TITLE & BREADCRUMB*/}
                                <h3 className="page-title titulomeio">Serviços</h3>
                                {/* END PAGE TITLE & BREADCRUMB*/}
                            </div>
                        </div>
                        {/* END PAGE HEADER*/}
                        {/* BEGIN PAGE CONTENT*/}
                        <div className="row-fluid" id="conteudo">
                            <div className="widget gray">
                                <div className="widget-title">
                                    <h4><i className="icon-reorder" /> Tipo de Serviços ({statResult})</h4>
                                    <span className="tools">
                                        <button className="btn btn-small" onClick={() => updatetable()} >
                                            <i className="icon-retweet icon-white" /> </button>
                                    </span>
                                    <span className="tools">
                                        <button className="btn btn-small" onClick={() => addCat()}><i className="icon-plus icon-white" /> Adicionar</button>
                                    </span>
                                </div>
                                <div className="widget-body">
                                    <div id="sample_1_wrapper" className="dataTables_wrapper form-inline" role="grid">
                                        <div className="row-fluid">
                                            <div className="span6">
                                                <div id="sample_1_length" className="dataTables_length"><label>
                                                    <select size={1} name="sample_1_length" id="tpagina" aria-controls="sample_1" defaultValue="10" className="input-mini">
                                                        <option value={10}>10</option>
                                                        <option value={25}>25</option>
                                                        <option value={50}>50</option>
                                                        <option value={100}>100</option>
                                                    </select> resultados por página</label>
                                                </div>
                                            </div>
                                            <div className="span6">
                                                <div className="dataTables_filter" id="sample_1_filter">
                                                    <label>Buscar: <input type="text" aria-controls="sample_1" className="input" /></label>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-striped table-bordered table-hover dataTable" id="sample_1" aria-describedby="sample_1_info">
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting_asc" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Serviço: activate to sort column descending" style={{ width: 917 }}>Categoria</th>
                                                    <th className="hidden-phone sorting" width={50} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Data: activate to sort column ascending" style={{ width: 190 }}>Atribuido</th>
                                                    <th className="sorting" width={80} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Ação: activate to sort column ascending" style={{ width: 80 }}>Ação</th></tr>
                                            </thead>
                                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                                                {stateList && stateList.map((item, k) => (
                                                    <tr className="gradeX odd" key={item.id} >
                                                        <td className="  sorting_1">{item.nome}</td>
                                                        <td className="hidden-phone ">
                                                            <Aviso stilo="badge badge-info badge-mini" status={"Entradas " + item.e_status + " "} style={{ marginRight: '5px' }} />
                                                            -:-
                                                            <Aviso stilo="badge badge-important badge-mini" status={"Despesas " + item.d_status + " "} style={{ marginRight: '5' }} />

                                                        </td>
                                                        <td className="center  ">
                                                            <button className="btn btn-primary center" data-toggle="modal" ><i className="icon-pencil" onClick={() => updateCat(item.id)} /></button>
                                                            <button className="btn btn-danger center" data-toggle="modal"
                                                             onClick={() => delServico(item.id, item.e_status, item.d_status)} ><i className="icon-trash" /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="row-fluid">
                                            <div className="span6">
                                                <div className="dataTables_info" id="sample_1_info">Mostrando {statTotal} a {statPage} de {statResult} entradas</div></div>
                                            <div className="span6">
                                                <input name="last_page" type="hidden" id="last_page" defaultValue={statLast} />
                                                <input name="current_page" type="hidden" id="current_page" defaultValue={statCurrent} />
                                                <div className="dataTables_paginate paging_bootstrap pagination">
                                                    <ul>
                                                        {statCount.last_page_url > 0 &&
                                                            <li className="prev enabled">
                                                                <a onClick={() => beforePage(statCurrent)}>← Anterior</a>
                                                            </li>
                                                        }
                                                        {statCount.last_page_url == 0 &&
                                                            <li className="prev disabled">
                                                                <a >← Anterior</a>
                                                            </li>
                                                        }

                                                        {statCount.next_page_url > 0 &&
                                                            <li className="next enabled">
                                                                <a onClick={() => nextPage(statCurrent)} >Próxima → </a>
                                                            </li>
                                                        }
                                                        {statCount.next_page_url == 0 &&
                                                            <li className="next disabled">
                                                                <a >Próxima → </a>
                                                            </li>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                        {/* END PAGE CONTENT*/}
                    </div>
                    {/* END PAGE CONTAINER*/}
                </div>

            </div>
        </>
    )

}

export default Servicos;