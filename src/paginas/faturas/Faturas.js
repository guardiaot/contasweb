import React, { useEffect, useState } from 'react';


import styled from 'styled-components';

import api from '../../helpers/ApiClientes';

import Luz from '../../components/modulos/Luz';
import ModalFaturas from '../../components/modulos/ModalFaturas';
import Aviso from '../../components/modulos/aviso'; 
import ModalBaixaFatura from '../../components/modulos/ModalBaixaFatura';
import Navcalendario from '../../components/modulos/Navcalendario';

const Faturas = () => {

    const [stateList, setStateList] = useState([]);
    const [stateConta, setStateContas] = useState([]);
    //Modal
    const [showModal, setShowModal] = useState(false);
    const [showBaixa, setShowBaixa] = useState(false);
    const [visual, setVisual] = useState(1);
    const [titulo, setTitulo] = useState("");
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
            api.get("http://contaspr.test/api/entradas", {params: {'pagina': tpagina, 'page': currentpage, 'mes' : mes, 'ano' : ano}})
            .then((response) => {
                setAmount(response.data.amount);
                setCount(response.data.cont);
                let result = response.data.list;
                setLast(result.last_page);
                setTotal(result.to);
                setResult(result.total)                    
                setStateList(result.data);  
                setPage(tpagina);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
            
        }
        
    

    const updateConta = (id) => {
        setStateContas(id);
        setVisual(2);
        setTitulo("Editando");
        setShowModal(true);
    }

    const handleServiceChoise = () => {
        setStateContas(0);
        setVisual(3);
        setTitulo("Adicionar");
        setShowModal(true);
    }

    const updateFatura = (id) => {
        setStateContas(id);
        setVisual(2);
        setTitulo("Fatura #" + id);
        setShowBaixa(true);
    } 
    
      //pega a função do calendario
    const calend = (e,c) => {
        getfat(e,c);
    }
    const delEntradas = async (id) =>{
        api.delete("http://contaspr.test/api/entrada/" + id,
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
        updatetable();
    }

    const beforePage = (pag) =>{
        document.getElementById("current_page").value = pag - 1;
        setCurrent(pag - 1); //current_page
        updatetable();
    }
    return (
        
        <div>
            {showModal ? <Luz /> : null }
            {showModal ? <ModalFaturas closeAction={()=>setShowModal(false)} conteudo={stateConta} visualizar={visual} titulo={titulo}  fn={updatetable} /> : null } 
            {showBaixa ? <Luz /> : null }
            {showBaixa ? <ModalBaixaFatura closeAction={()=>setShowBaixa(false)} conteudo={stateConta} visualizar={visual} titulo={titulo} fn={updatetable}/> : null }
            <div id="main-content" style={{marginLeft: 180}}>
            <div className="container-fluid">
            <div className="row-fluid">
                <div className="span12">
                <h3 className="page-title titulomeio">Constas a Receber</h3>
                </div>
            </div>
            <div className="row-fluid" id="conteudo">
                <div className="widget gray">
                <div className="widget-title">
                    <h4><i className="icon-reorder" /> Constas a Receber  ({statTotal ? statTotal : 0})</h4>
                    <span className="tools">
                    <button className="btn btn-small"  onClick={()=>updatetable()} >
                        <i className="icon-retweet icon-white" /> </button>
                    </span>
                    <span className="tools">
                    <button className="btn btn-small"  onClick={()=>handleServiceChoise()} ><i className="icon-plus icon-white" /> Adicionar</button>
                    </span>
                    
                    <Navcalendario calendar={calend} mes={statMes} ano={statAno} />
                    
                </div>
                <div className="widget-body">
                    <div id="sample_1_wrapper" className="dataTables_wrapper form-inline" role="grid">
                        <div className="row-fluid">
                            <div className="span6">
                                <div id="sample_1_length" className="dataTables_length">
                                    <label>
                                        <select size={1} id="tpagina" name="tpagina" aria-controls="sample_1" className="input-mini" defaultValue="10">
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select> resultados por página
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
                            <th className="sorting_asc" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="ID: activate to sort column descending" style={{width: 30}}>ID</th>
                            <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Cliente / Serviço / Observações: activate to sort column ascending" style={{width: 321}}>Cliente / Serviço / Observações</th>
                            <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Valor: activate to sort column ascending" style={{width: 100}}>Valor</th>
                            <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Vencimento: activate to sort column ascending" style={{width: 166}}>Vencimento</th>
                            <th className="sorting" role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Envio: activate to sort column ascending" style={{width: 50}}>Envio</th>
                            <th className="sorting" width={80} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Status: activate to sort column ascending" style={{width: 120}}>Status</th>
                            <th className="sorting" width={160} role="columnheader" tabIndex={0} aria-controls="sample_1" rowSpan={1} colSpan={1} aria-label="Ação: activate to sort column ascending" style={{width: 160}}>Ação</th>
                        </tr>
                    </thead>
                        <tbody role="alert" aria-live="polite" aria-relevant="all">
                        {stateList != 0 && stateList.map((item, k) => (
                            <tr className="gradeX odd" key={item.id}>
                                <td className="  sorting_1">
                                    #{item.id}
                                </td>
                                <td className=" ">
                                    <a href="#faturas#1"  ><b>{item.cliente}</b> / </a>
                                    <span className="text-error">{item.categoria}</span> / {item.descricao}
                                </td>
                                <td className="text-success  ">
                                    <b>R$ {item.valor}</b>
                                </td>
                                <td className="textobox">
                                    <span className="text-error"><b>{item.data_vencimento}</b></span>
                                    {item.dias == 0 && item.id_status == 1 &&
                                        <Aviso stilo="badge  badge-mini" status="HOJE"/>
                                    }
                                    { item.dias > 0 && item.id_status == 1 &&
                                        <Aviso stilo="badge badge-info badge-mini " status={"Faltam " + item.dias + " dias"}/>
                                    }
                                    {item.dias < 0 && item.id_status == 1 &&
                                        
                                        <Aviso stilo="badge badge-important badge-mini " status={"Atrasado "+ item.dias +" dias"}/>
                                    }
                                </td>
                                <td className=" " id="envio_2">
                                    {item.id_status == 1 &&
                                        <button  className="btn btn-danger center" data-toggle="modal">
                                            <i className="icon-envelope" />
                                        </button>
                                    }
                                    {item.id_status == 2 &&
                                    <>
                                        <button  className="btn btn-warning center" data-toggle="modal">
                                            <i className="icon-retweet"></i>
                                        </button>
                                    </>    
                                    }
                                    {item.id_status == 3 &&
                                    <>
                                         <button  className="btn btn-primary center" data-toggle="modal">
                                            <i className="icon-retweet"></i>
                                        </button>
                                    </>    
                                    }
                                    {item.id_status == 4 &&
                                    <>
                                        <button  className="btn btn-info center" data-toggle="modal">
                                            <i className="icon-retweet"></i>
                                        </button>
                                    </>    
                                    }
                                    {item.id_status == 5 &&
                                    <>
                                        
                                    </>    
                                    }
                                </td>
                                <td className=" " id="status_faturas_2">
                                    {item.aviso == 1 &&
                                        <button  className="btn btn-danger center" onClick={() => updateFatura(item.id)} data-toggle="modal">
                                            <i className="icon-thumbs-down" /> PENDENTE
                                        </button>
                                    } 
                                    {item.aviso == 2 &&
                                    <>
                                        <button  className="btn btn-warning center" data-toggle="modal">
                                            <i className="icon-signin"></i> ENVIADO  
                                        </button>
                                    </>    
                                    }
                                    {item.aviso == 3 &&
                                    <>
                                        <button  className="btn btn-primary center" data-toggle="modal">
                                            <i className="icon-signin"></i> REENVIADO 
                                        </button>
                                    </>    
                                    }
                                    {item.aviso == 4 &&
                                    <>
                                        <button  className="btn btn-info center" data-toggle="modal">
                                             <i className="icon-signin"></i> VISUALIZADO 
                                        </button>
                                    </>    
                                    }
                                    {item.aviso == 5 &&
                                    <>
                                        <button  className="btn btn-success center" data-toggle="modal">
                                             <i className="icon-signin"></i> FECHADO
                                        </button>
                                    </>    
                                    }
                                </td>
                                <td className="center  ">
                                    <button className="btn btn-inverse  center" data-toggle="modal" >
                                        <i className="icon-barcode" />
                                    </button>
                                    <button className="btn btn-primary center" data-toggle="modal" onClick={()=>updateConta(item.id)}>
                                        <i className="icon-pencil" />
                                    </button>
                                    <button className="btn btn-default center" data-toggle="modal" >
                                        <i className="icon-copy" />
                                    </button>
                                    <button className="btn btn-danger center" data-toggle="modal" onClick={()=>delEntradas(item.id)}>
                                        <i className="icon-trash" />
                                    </button>
                                </td>
                            </tr>
                        ))}    
                        {stateList == 0 &&
                            <tr className="odd">
                                <td valign="top" colSpan={7} className="dataTables_empty">
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
                                <td className="text-error" width={100}><b>Total à receber</b></td>
                                <td className="text-error"><b>R$ { statAmount.entradas }</b></td>
                            </tr>
                            <tr>
                                <td className="text-success"><b>Total recebido</b></td>
                                <td className="text-success"><b>R$ { statAmount.pendente } </b></td>
                            </tr>
                            <tr>
                                <td className="text-error"><b>Total atrasado</b></td>
                                <td className="text-error"><b>R$ { statAmount.atrasado }</b></td>
                            </tr>
                            <tr>
                                <td className="text-info"><b>Saldo à receber</b></td>
                                <td className="text-info"><b>R$ { statAmount.saldo }</b></td>
                            </tr>
                            </tbody>
                        </table>
                </div>
                </div></div>
            </div>
            </div>
        </div>
    )
    
}

export default Faturas;