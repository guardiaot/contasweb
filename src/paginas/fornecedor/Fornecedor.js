import React, { useEffect, useState } from 'react';
import api from '../../helpers/ApiClientes';
import Aviso from '../../components/modulos/aviso'; 

import Luz from '../../components/modulos/Luz';
import ModalFornecedor from '../../components/modulos/ModalFornecedor';

const Clientes = () => {
   
    const [stateClient, setStateClient] = useState([]);
    const [stateCli, setStateCli] = useState([]);
    const [stateStatus, setStateStatus] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [visual, setVisual] = useState(1);
    const [titulo, setTitulo] = useState("");

    const [statLast, setLast] = useState([]);
    const [statCurrent, setCurrent]= useState(1);
    const [statCount, setCount]= useState([]);

    const [statTotal, setTotal] = useState([]);
    const [statResult, setResult] = useState([]);
    const [statPage, setPage] = useState([]);


    useEffect(() => { 
            getclie();
    },[]);
    
    const updatetable = () => {
        getclie();
    }
    const getclie = async () => {
        let status = 1;
        let tpagina = document.getElementById("tpagina").value;
        let currentpage = document.getElementById("current_page").value;
        api.get("http://contaspr.test/api/fornecedores",  {params: {'id': 1, 'pagina': tpagina, 'page': currentpage}})
        .then((response) => {
            let result = response.data.list;
            setLast(result.last_page);
            setCount(response.data.cont);
            setTotal(result.to);
            setResult(result.total);
            setPage(tpagina);  
            setStateClient(result.data);
            
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }

    const clienteOn = () => {
        setStateStatus(1);
        const getclientes = async () => {
            let status = 1;
                let tpagina = document.getElementById("tpagina").value;
                let currentpage = document.getElementById("current_page").value;
                api.get("http://contaspr.test/api/fornecedores",  {params: {'id': 1, 'pagina': tpagina, 'page': currentpage}})
                .then((response) => {
                    let result = response.data.list;
                    setLast(result.last_page);
                    setCount(response.data.cont);
                    setTotal(result.to);
                    setResult(result.total)
                    setStateClient(result.data);
                    setPage(tpagina);  
                })
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
        }
        getclientes();
    }   

    const clienteOff = () => {
        setStateStatus(2);
        const getclientes = async () => {
            let status = stateStatus;
            let tpagina = document.getElementById("tpagina").value;
            let currentpage = document.getElementById("current_page").value;
            api.get("http://contaspr.test/api/fornecedores",  {params: {'id': 2, 'pagina': tpagina, 'page': currentpage}})
            .then((response) => {
                let result = response.data.list;
                setLast(result.last_page);
                setCount(response.data.cont);
                setTotal(result.to);
                setResult(result.total)
                setStateClient(result.data);
                setPage(tpagina); 
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }
        getclientes();
       
    }

    const delFornecedor = async (id) =>{
        api.delete("http://contaspr.test/api/fornecedor/" + id,
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
    const handleServiceChoise = () => {
        setStateCli(0);
        setVisual(3);
        setTitulo("Adicionar");
        setShowModal(true);
    }  

    const handleModal = () => {
        setShowModal(false);
    }

    const visualiCliente = (id) => {
        setStateCli(id);
        setVisual(1);
        setTitulo("Visualizando");
        setShowModal(true);
    }
    const updateCliente = (id) => {
        setStateCli(id);
        setVisual(2);
        setTitulo("Editando");
        setShowModal(true);
    }
    const nextPage = (pag) => {
        document.getElementById("current_page").value = pag + 1;
        setCurrent(pag + 1); //current_page
        getclie();
    }

    const beforePage = (pag) =>{
        document.getElementById("current_page").value = pag - 1;
        setCurrent(pag - 1); //current_page
        getclie();
    }
        return (
            <div>
                {showModal ? <Luz /> : null }
                {showModal && 
                     <ModalFornecedor closeAction={()=>setShowModal(false)} conteudo={stateCli} visualizar={visual} titulo={titulo} fn={updatetable}/>
                } 
                <div id="main-content" style={{marginLeft: 180}}>
                <div className="container-fluid">
                    <div className="row-fluid">
                    <div className="span12">
                        <h3 className="page-title titulomeio">Fornecedor</h3>
                    </div>
                    </div>
                    <div className="row-fluid" id="conteudo">
                    <div className="widget gray">
                        <div className="widget-title">
                        <h4><i className="icon-reorder" /> Clientes ({statTotal ? statTotal: 0})</h4>
                        <span className="tools">
                            <button className="btn btn-small"  onClick={()=>updatetable()} >
                            <i className="icon-retweet icon-white" /> </button>
                        </span>
                        <span className="tools">
                            <button className="btn btn-small"  onClick={()=>handleServiceChoise()} ><i className="icon-plus icon-white" /> Adicionar</button>
                        </span>
                        <span className="tools">
                            {stateStatus == 1 &&
                                <button  onClick={()=>clienteOff()} className="btn btn-small btn-success center" data-toggle="modal">
                                <i className="icon-thumbs-up" /></button>
                            }
                            {stateStatus == 2 &&
                                <button  onClick={()=>clienteOn()} className="btn btn-small btn-danger center" data-toggle="modal">
                                <i className="icon-thumbs-down" /></button>
                            }   
                        </span>
                        </div>
                        <div className="widget-body">
                        <div id="sample_1_wrapper" className="dataTables_wrapper form-inline" role="grid">
                            <div className="row-fluid">
                                <div className="span6">
                                    <div id="sample_1_length" className="dataTables_length">
                                        <label>
                                            <select size={1} name="sample_1_length" id="tpagina" aria-controls="sample_1" className="input-mini">
                                                <option defaultValue={"10"} value="10" >10</option>
                                                <option defaultValue={"25"} value="25">25</option>
                                                <option defaultValue={"50"} value="50">50</option>
                                                <option defaultValue={"100"} value="100">100</option>
                                            </select> resultados por p??gina
                                        </label>
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
                                    <th className="sorting_asc"  rowSpan={1} colSpan={1}  style={{width: 370}}>Nome / Respons??vel</th>
                                    <th className="hidden-phone sorting"  style={{width: 100}}>Filial / Tipo</th>
                                    <th className="sorting" role="columnheader"  style={{width: 194}}>Telefones</th>
                                    <th className="sorting" role="columnheader" style={{width: 120}}>Faturas</th>
                                    <th className="sorting" role="columnheader"  style={{width: 120}}>A????o</th>
                                </tr>
                            </thead>
                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                               
                                {stateClient != 0 && stateClient.map((item, k) => (
                                    <tr key={item.id} className="gradeX odd">
                                          <td className="sorting_1">
                                             <b>Nome: {item.nome}</b>
                                             <br></br>
                                             {item.tipo == 2 &&
                                                <span className="text-error">{item.fantasia}</span>
                                             }
                                             {item.tipo == 1 &&
                                                <span className="text-error">{item.fantasia}</span>
                                             }
                                          </td>
                                          <td className="text-success hidden-phone">
                                              <br></br>
                                              {item.tipo == 1 &&
                                                <span className="badge badge-important badge-mini">Jur??dica</span>
                                              }
                                              {item.tipo == 2 &&
                                                <span className="badge badge-info badge-mini">F??sica</span>
                                              }
                                          </td>
                                          <td >{item.tel1}<br></br>{item.tel2}
                                          </td>
                                          
                                          <td className=" ">
                                               <button className="btn btn-info  center" data-toggle="modal" >
                                                   <i className="icon-barcode"> {item.faturas}</i>
                                               </button>
                                          </td>
                                          <td className="center  ">
                                                <button className="btn btn-warning  center" data-toggle="modal" onClick={()=>visualiCliente(item.id)}>
                                                    <i className="icon-eye-open"></i>
                                                    </button>
                                                <button className="btn btn-primary center" data-toggle="modal" onClick={()=>updateCliente(item.id)}>
                                                    <i className="icon-pencil"></i>
                                                </button>
                                                <button className="btn btn-danger center" data-toggle="modal" onClick={()=>delFornecedor(item.id)}><i className="icon-trash"></i></button>
                                          </td>
                                    </tr>
                                 ))
                                }
                                {stateClient == 0 &&
                                <tr  className="odd" >
                                    <td valign="top" colSpan={5} className="dataTables_empty">
                                        <center>Nenhum Resultado Encontrado :(</center>
                                    </td>
                                </tr>
                                }
                            </tbody></table>
                            <div className="row-fluid">
                                <div className="span6">
                                    <div className="dataTables_info" id="sample_1_info">Mostrando {statTotal} a {statPage} de {statResult} entradas</div>
                                    </div>
                                <div className="span6">
                                <input name="last_page" type="hidden" id="last_page" defaultValue={statLast}  />
                                <input name="current_page" type="hidden" id="current_page" defaultValue={statCurrent}  />
                                        <div className="dataTables_paginate paging_bootstrap pagination">
                                            <ul>
                                                {statCount.last_page_url > 0 &&  
                                                    <li className="prev enabled">
                                                        <a  onClick={()=>beforePage(statCurrent)}>??? Anterior</a>
                                                    </li>
                                                }
                                                {statCount.last_page_url == 0 &&
                                                <li className="prev disabled">
                                                    <a >??? Anterior</a>
                                                </li>
                                                }
                                                
                                                {statCount.next_page_url > 0  &&  
                                                <li className="next enabled">
                                                    <a  onClick={()=>nextPage(statCurrent)} >Pr??xima ??? </a>
                                                </li>
                                                }
                                                {statCount.next_page_url == 0 &&
                                                    <li className="next disabled">
                                                        <a >Pr??xima ??? </a>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div></div>
                </div>
                </div>
            </div>
        )
    }


export default Clientes;
