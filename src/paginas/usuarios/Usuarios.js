import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../helpers/ApiClientes';
import Luz from '../../components/modulos/Luz';
import Aviso from '../../components/modulos/aviso';
import ModalUsuarios from '../../components/modulos/ModalUsuarios';


const Usuarios = (props) => {

    const [stateList, setStateList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [visual, setVisual] = useState(1);
    const [titulo, setTitulo] = useState("");
    const [stateUser, setStateUser] = useState([]);


    const [statLast, setLast] = useState([]);
    const [statCurrent, setCurrent]= useState(1);
    const [statCount, setCount]= useState([]);

    useEffect(() => { 
        getUsuarios();        
    },[]);

    const  updatetable = () =>{ 
        getUsuarios();
    }
    const updateUser = (id) => {
        setStateUser(id);
        setVisual(2);
        setTitulo("Editando");
        setShowModal(true);
    }

    const addUser = (id) => {
        setStateUser(id);
        setVisual(2);
        setTitulo("Novo");
        setShowModal(true);
    }
    const getUsuarios = async () => {
            let tpagina = document.getElementById("tpagina").value;
            let currentpage = document.getElementById("current_page").value;
            api.get("http://contaspr.test/api/users",  {params: {'id': 2, 'pagina': tpagina, 'page': currentpage}})
            .then((response) => {
                let result = response.data.list.data;
                setLast(result.last_page);
                setCount(response.data.cont);
                setStateList(result);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
        });
        
    }
    const delUser = async (id) =>{
        api.delete("http://contaspr.test/api/user/" + id,
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
    }
    const nextPage = (pag) => {
        document.getElementById("current_page").value = pag + 1;
        setCurrent(pag + 1); //current_page
        getUsuarios();
    }

    const beforePage = (pag) =>{
        document.getElementById("current_page").value = pag - 1;
        setCurrent(pag - 1); //current_page
        getUsuarios();
    }
    return (
        <>
        {showModal ? <Luz /> : null }
        {showModal ? <ModalUsuarios closeAction={()=>setShowModal(false)} conteudo={stateUser} visualizar={visual} titulo={titulo} fn={updatetable}/> : null }
        <div>
            <div id="main-content" style={{ marginLeft: 180 }}>
                {/* BEGIN PAGE CONTAINER*/}
                <div className="container-fluid">
                    {/* BEGIN PAGE HEADER*/}
                    <div className="row-fluid">
                        <div className="span12">
                            {/* BEGIN PAGE TITLE & BREADCRUMB*/}
                            <h3 className="page-title titulomeio">Usuários</h3>
                            {/* END PAGE TITLE & BREADCRUMB*/}
                        </div>
                    </div>
                    {/* END PAGE HEADER*/}
                    {/* BEGIN PAGE CONTENT*/}
                    <div className="row-fluid" id="conteudo">
                        <div className="widget gray">
                            <div className="widget-title">
                                <h4><i className="icon-reorder" /> Usuários (2)</h4>
                                <span className="tools">
                                    <button className="btn btn-small"  onClick={()=>updatetable()} >
                                    <i className="icon-retweet icon-white" /> </button>
                                </span>
                                <span className="tools">
                                    <button className="btn btn-small" onClick={()=>addUser()}><i className="icon-plus icon-white" /> Adicionar</button>
                                </span>
                            </div>
                            <div className="widget-body">
                                <div id="sample_1_wrapper" className="dataTables_wrapper form-inline" role="grid">
                                    <div className="row-fluid">
                                        <div className="span6">
                                            <div id="sample_1_length" className="dataTables_length">
                                                <label>
                                                    <select size={1} name="tpagina"  id="tpagina" aria-controls="sample_1" defaultValue="10" className="input-mini">
                                                        <option value={10}>10</option>
                                                        <option value={25}>25</option>
                                                        <option value={50}>50</option>
                                                        <option value={100}>100</option>
                                                    </select> resultados por página</label>
                                                </div>
                                            </div>
                                        <div className="span6">
                                            <div className="dataTables_filter" id="sample_1_filter">
                                                <label>Buscar: <input type="text" aria-controls="sample_1" className="input" defaultValue="" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-bordered table-hover dataTable" id="sample_1" aria-describedby="sample_1_info">
                                        <thead>
                                            <tr role="row">
                                                <th className="sorting_asc" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Nome: activate to sort column descending" style={{ width: 308 }}>Avatar</th>
                                                <th className="hidden-phone sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Usuário: activate to sort column ascending" style={{ width: 217 }}>Nome</th>
                                                <th className="hidden-phone sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Email: activate to sort column ascending" style={{ width: 440 }}>Email</th>
                                                <th className="sorting" width={80} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Ação: activate to sort column ascending" style={{ width: 80 }}>Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody role="alert" aria-live="polite" aria-relevant="all">
                                           {stateList && stateList.map((item, k) => ( 
                                            <tr className="gradeX odd" key={item.id}>
                                            <td className="hidden-phone ">{item.avatar}</td>
                                            <td className="  sorting_1">{item.name}</td>
                                            <td className="hidden-phone ">{item.email}</td>
                                            <td className="center  ">
                                                <button className="btn btn-primary center" data-toggle="modal" onClick={()=>updateUser(item.id)}>
                                                    <i className="icon-pencil" />
                                                </button>
                                                <button className="btn btn-danger center" data-toggle="modal" onClick={()=>delUser(item.id)}>
                                                    <i className="icon-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                        ))}
                                       
                                        </tbody>
                                    </table>
                                    <div className="row-fluid">
                                        <div className="span6">
                                            <div className="dataTables_info" id="sample_1_info">Mostrando 1 até 2 do total de 2 entradas</div>
                                        </div>
                                        <div className="span6">
                                        <input name="last_page" type="hidden" id="last_page" defaultValue={statLast}  />
                                <input name="current_page" type="hidden" id="current_page" defaultValue={statCurrent}  />
                                        <div className="dataTables_paginate paging_bootstrap pagination">
                                            <ul>
                                                {statCount.last_page_url > 0 &&  
                                                    <li className="prev enabled">
                                                        <a  onClick={()=>beforePage(statCurrent)}>← Anterior</a>
                                                    </li>
                                                }
                                                {statCount.last_page_url == 0 &&
                                                <li className="prev disabled">
                                                    <a >← Anterior</a>
                                                </li>
                                                }
                                                
                                                {statCount.next_page_url > 0  &&  
                                                <li className="next enabled">
                                                    <a  onClick={()=>nextPage(statCurrent)} >Próxima → </a>
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

export default Usuarios;
