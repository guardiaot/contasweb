import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import api from '../../helpers/ApiClientes';
import Luz from '../../components/modulos/Luz';
import ModalContas from '../../components/modulos/ModalContas';
import Aviso from '../../components/modulos/aviso';
import Navcalendario from '../../components/modulos/Navcalendario';


const Contas = (props) => {

    const [stateList, setStateList] = useState([]);
    const [stateSaldo, setStateSaldo] = useState([]);
    const [stateConta, setStateContas] = useState([]);
    //Modal
    const [showModal, setShowModal] = useState(false);
    const [showModalClente, setShowModalClente] = useState(false);
    const [visual, setVisual] = useState(1);
    const [titulo, setTitulo] = useState("");
    const [stateC, setStateC] = useState([]);
    const [statTotal, setTotal] = useState([]);
    const [statResult, setResult] = useState([]);
    const [statPage, setPage] = useState([]);
    const [statAmount, setAmount] = useState([]);

    const [statLast, setLast] = useState([]);
    const [statCurrent, setCurrent]= useState(1);
    const [statCount, setCount]= useState([]);

    const [statMes, setMes] = useState([]);
    const [statAno, setAno] = useState([]);

    useEffect(() => { 
        updatetable();        
    },[]);

    const updatetable = () =>{
        const d = new Date();
        setMes(d.getMonth()+1);
        setAno(d.getFullYear());
        var mes = d.getMonth()+1;
        var ano = d.getFullYear();
        if(mes.toString().length == 1){
            getfat("0"+ mes.toString(), ano)
         }else{
            getfat(mes.toString(), ano)
         }
    }

    const getfat = async (mes, ano) => {
        let tpagina = document.getElementById("tpagina").value;
        let currentpage = document.getElementById("current_page").value;
        api.get("http://contaspr.test/api/despesas", {params: {'pagina': tpagina, 'page': currentpage, 'mes' : mes, 'ano' : ano}})
        .then((response) => {
            setAmount(response.data.amount);
            setCount(response.data.cont);
            let result = response.data.list;
            setLast(result.last_page);
            //setCurrent(result.current_page);
            setTotal(result.to);
            setResult(result.total)                    
            setStateList(result.data);  
            setPage(tpagina);
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    
    }

    const updateComta = (id) => {
        setStateContas(id);
        setVisual(2);
        setTitulo("Editando");
        setShowModal(true);
    }

    const addComta = (id) => {
        setStateContas(id);
        setVisual(2);
        setTitulo("Novo");
        setShowModal(true);
    }

    const nextPage = (pag) => {
        document.getElementById("current_page").value = pag + 1;
        setCurrent(pag + 1); //current_page
        updatetable();
    }

    const beforePage = (pag) =>{
        document.getElementById("current_page").value = pag - 1;
        setCurrent(pag - 1); //current_page
        updatetable();
    }

    //pega a função do calendario
    const calend = (e,c) => {
        getfat(e,c);
    }
    const delDespesas = async (id) =>{
        api.delete("http://contaspr.test/api/despesa/" + id,
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
        return (
            
            <div>
                {showModal ? <Luz /> : null }
                {showModal ?
                   <ModalContas closeAction={()=>setShowModal(false)} conteudo={stateConta} visualizar={visual} titulo={titulo} fn={updatetable} /> : null 
                } 
               <div id="main-content" style={{marginLeft: 180}}>
                <div className="container-fluid">
                    <div className="row-fluid">
                    <div className="span12">
                        <h3 className="page-title titulomeio">Contas a pagar</h3>
                    </div>
                    </div>
                    <div className="row-fluid" id="conteudo">
                    <div className="widget gray">
                        <div className="widget-title">
                        <h4><i className="icon-reorder" /> Contas a pagar ({statTotal ? statTotal: 0})</h4>
                        <span className="tools">
                        <button className="btn btn-small"  onClick={()=>updatetable()} >
                            <i className="icon-retweet icon-white" /> </button>
                            </span>
                        <span className="tools">
                            <button className="btn btn-small" onClick={()=>addComta()}>
                            <i className="icon-plus icon-white" /> Adicionar</button>
                        </span>
                        <Navcalendario calendar={calend} mes={statMes} ano={statAno} />
                        </div>
                        <div className="widget-body">
                        <div id="sample_1_wrapper" className="dataTables_wrapper form-inline" role="grid"><div className="row-fluid"><div className="span6"><div id="sample_1_length" className="dataTables_length"><label>
                            <select size={1} id="tpagina" name="tpagina" aria-controls="sample_1" className="input-mini" defaultValue="10">
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                </select> resultados por página</label>
                                </div>
                                </div>
                                <div className="span6"><div className="dataTables_filter" id="sample_1_filter"><label>Buscar: <input type="text" aria-controls="sample_1" className="input" /></label></div></div></div><table className="table table-striped table-bordered table-hover dataTable" id="sample_1" aria-describedby="sample_1_info">
                            <thead>
                                <tr role="row">
                                    <th width={100} className="sorting_asc" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Vencimento: activate to sort column descending" style={{width: 100}}>Vencimento</th>
                                    <th width={100} className="sorting_asc" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Vencimento: activate to sort column descending" style={{width: 100}}>Pagamento</th>
                                    <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Titulo / Observações: activate to sort column ascending" style={{width: 608}}>Titulo / Observações</th>
                                    <th className="sorting" width={80} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Valor: activate to sort column ascending" style={{width: 110}}>Valor</th>
                                    <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Titulo / Observações: activate to sort column ascending" style={{width: 80}}>Desconto</th>
                                    <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Titulo / Observações: activate to sort column ascending" style={{width: 80}}>Multa</th>
                                    <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Titulo / Observações: activate to sort column ascending" style={{width: 110}}>Valor Pago</th>
                                    <th className="sorting" width={120} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Status: activate to sort column ascending" style={{width: 120}}>Status</th>
                                    <th className="sorting" width={80} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Ação: activate to sort column ascending" style={{width: 190}}>Ação</th></tr>
                            </thead>
                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                                {stateList != 0 && stateList.map((item, k) => (
                                    <tr className="odd gradeX" key={item.id}>
                                        <td>
                                            <span className="text-error">
                                                <b>{item.data_vencimento}</b>
                                                {item.dias == 0 && item.data_pagamento == 0 &&
                                                    <Aviso stilo="" status="HOJE"/>
                                                }
                                                { item.dias > 0 && item.data_pagamento == 0  &&
                                                    <Aviso stilo="badge badge-info badge-mini" status={"Faltam " + item.dias + " dias"}/>
                                                }
                                                {item.dias < 0 && item.data_pagamento > 0 &&
                                                    <Aviso stilo="badge badge-important badge-mini" status={"Atrasado "+ item.dias +" dias"}/>
                                                }
                                            </span>
                                            
                                        </td>
                                        <td>
                                            <>
                                            {item.id_status == 2 &&
                                             <>
                                               <span className="text-success"><b>{item.data_pagamento}</b></span>
                                             </>   
                                             }
                                            </>
                                        </td>
                                        <td className="">
                                            <>
                                            <b>{item.descricao}</b>
                                            <br></br>
                                            <i>{item.obs}</i>
                                            </>
                                        </td>
                                        <td className="">
                                            <>
                                            <span className="text-info">
                                                <b>R$ {item.valor}</b>
                                            </span><br></br>
                                            
                                            </>                            
                                        </td>
                                        <td className="">
                                            <>
                                            <b><span className="text-success">R$ {item.desconto}</span></b>
                                            <br></br>
                                            <i></i>
                                            </>
                                        </td>
                                        <td className="">
                                            <>
                                            <b><span className="text-error">R$ {item.multa}</span></b>
                                            <br></br>
                                            <i></i>
                                            </>
                                        </td>
                                        <td className="">
                                            <>
                                            <b>{item.valor_pago != 0 &&
                                                <span className="text-success">R$ {item.valor_pago}</span>
                                            }</b>
                                            <br></br>
                                            <i></i>
                                            </>
                                        </td>
                                        <td className="">
                                            {item.id_status == 1 &&
                                                <span className="label label-important"><i className="icon-warning-sign icon-white"></i> Pendente</span>
                                            }
                                            {item.id_status == 2 &&
                                                <span className="label label-success"><i className="icon-ok icon-white"></i> Quitado</span>
                                            }
                                            
                                        </td>
                                        <td className="center ">
                                        <button className="btn btn-primary center" data-toggle="modal" onClick={()=>updateComta(item.id)}><i className="icon-pencil"></i></button>
                                        <button className="btn btn-danger center" data-toggle="modal" onClick={()=>delDespesas(item.id)}><i className="icon-trash"></i></button>
                                        </td>
                                    </tr>
                                    ))
                                }
                                {stateList == 0 &&
                                <tr className="odd">
                                    <td valign="top" colSpan={9} className="dataTables_empty">
                                        <center>Nenhum Resultado Encontrado :(</center>
                                    </td>
                                </tr>
                                }
                            </tbody>
                            </table>
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
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="text-error" width={100}><b>Total à pagar</b></td>
                                <td className="text-error"><b>R$ { statAmount.despesas }</b></td>
                            </tr>
                            <tr>
                                <td className="text-success"><b>Pago</b></td>
                                <td className="text-success"><b>R$ { statAmount.baixa }</b></td>
                            </tr>
                            <tr>
                                <td className="text-info"><b>Saldo à pagar</b></td>
                                <td className="text-info"><b>R$ { statAmount.subtotal }</b></td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div></div>
                    {/* END PAGE CONTENT*/}         
                </div>
                {/* END PAGE CONTAINER*/}
                </div>

            </div>
        )
    }

export default Contas;    
