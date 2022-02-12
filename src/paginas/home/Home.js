import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import api from '../../helpers/ApiClientes';

import Aviso from '../../components/modulos/aviso'; 

import Clientes from '../../components/modulos/Clientes';
import Boxinfo from '../../components/modulos/Boxinfo';
import Luz from '../../components/modulos/Luz';
import ModalContas from '../../components/modulos/ModalContas';
import ModalClientes from '../../components/modulos/ModalClientes';

const Home = () => {
    const [stateList, setStateList] = useState([]);
    const [stateConta, setStateContas] = useState([]);
    const [stateDia, setStateDia] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalClente, setShowModalClente] = useState(false);
    const [visual, setVisual] = useState(1);
    const [titulo, setTitulo] = useState("");
    const [stateC, setStateC] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => { 
        getDespesas();
    },[]);

    const getDespesas = async () => {
        api.get("http://contaspr.test/api/contaspagas" )
            .then((response) => {
                let result = response.data.list;
                setCount(response.data.cont);
                setStateList(result.data);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }
    const handleServiceChoise = () => {
        setStateContas(0);
        setVisual(3);
        setTitulo("Adicionar");
        setShowModalClente(true);
    }   

    const handleModal = () => {
        setShowModal(false);
    }
    

    const visualiCliente = (id) => {
        setStateContas(id);
        setVisual(1);
        setTitulo("Visualizando");
        setShowModal(true);
    }
    const updateComta = (id) => {
        setStateContas(id);
        setVisual(2);
        setTitulo("Editando");
        setShowModal(true);
    }

    return (
            <div>
                {showModal ? <Luz /> : null }
                {showModal ? <ModalContas closeAction={()=>setShowModal(false)} conteudo={stateConta} visualizar={visual} titulo={titulo}/> : null } 
                {showModalClente ? <Luz /> : null }
                {showModalClente ? <ModalClientes closeAction={()=>setShowModalClente(false)} conteudo={stateConta} visualizar={visual} titulo={titulo}/> : null } 
                <div id="main-content" style={{marginLeft: 180}}>
                <div className="container-fluid">
                    <div className="row-fluid">
                    <div className="span12">
                        <h3 className="page-title titulomeio">Home</h3>
                    </div>
                    </div>
                    <div className="row-fluid" id="conteudo"><div className="widget gray">
                        <div className="widget-title">
                        <h4><i className="icon-reorder" /> Aplicativos</h4>
                        <span className="tools">
                            <button className="btn btn-small"  onClick={()=>getDespesas()} >
                            <i className="icon-retweet icon-white" /> </button>
                        </span>
                        <span className="tools">
                        </span>
                        </div>
                        <div className="widget-body">
                        <div className="metro-nav metro-fix-view">
                            <div className="metro-nav-block nav-block-green long">
                                <Boxinfo openModal={()=>handleServiceChoise()} icon="icon-plus" info={count.soma } status="Contas a pagar" />
                            </div>
                            <div className="metro-nav-block nav-block-orange double">
                                <Boxinfo targt="/entradas" icon="icon-barcode" info={count.entradas } status="Contas a receber" />
                            </div>
                            <div className="metro-nav-block nav-block-red double">
                                <Boxinfo targt="/contasapagar" icon="icon-warning-sign" info={ count.paga  } status="Contas a pagar" />
                            </div>
                            <div className="metro-nav-block nav-block-green double">
                                <Boxinfo targt="/clientes" icon="icon-book" info={count.cliente} status="Clientes" />
                            </div>
                            
                            <div className="metro-nav-block nav-block-grey ">
                                <Boxinfo targt="/usuarios" icon="icon-user" info={count.suario}  status="Usuários" />
                            </div>
                            <div className="metro-nav-block nav-block-green double">
                                <Boxinfo targt="/clientes" icon="icon-book" info={count.fornecedor} status="Fornecedores" />
                            </div>
                            <div className="metro-nav-block nav-block-purple double">
                                <Boxinfo targt="/tiposervicos" icon="icon-briefcase" info={count.categoria} status="Categorias" />
                            </div>
                        </div>
                        <div className="clearfix" />
                        <h3>Conta a pagar - { count.mes }</h3>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Vencimento</th>
                                <th>Titulo / Observações</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                            </thead>
                            <tbody>
                                {stateList && stateList.map((item, k) => (
                                    <tr key={item.id} className="odd gradeX">
                                        <td><span className="text-error"><b>Vencimento: {item.data_vencimento} </b> <br></br>
                                            {item.dias == 0 &&
                                                        <Aviso stilo="" status="HOJE"/>
                                            }
                                            { item.dias > 0 &&
                                                        <Aviso stilo="badge badge-info badge-mini" status={"Faltam " + item.dias + " dias"}/>
                                            }
                                            {item.dias < 0 &&
                                                        <Aviso stilo="badge badge-important badge-mini" status={"Atrasado "+ item.dias +" dias"}/>
                                            }        
                                        </span>
                                        { item.data_pagamento != 0 &&
                                            <span>Pagamento: {item.data_pagamento}</span>
                                        }
                                        
                                        </td>
                                        <td className=""><b>{item.nome}</b> {item.id_cliente != 0 && <span> : {item.cliente}</span>} <br /> <i> {item.descricao}</i></td>
                                        <td className=""><span className="text-error"><b>Valor: R$ {item.valor}</b></span><br></br>
                                        { item.valor_pago != null &&
                                            <span>Pago: R$ {item.valor_pago}</span>
                                        }
                                        </td>
                                        <td className="">
                                        {item.id_status == 2 &&
                                            <Aviso stilo="label label-success" icon="icon-ok icon-white" status=" Quitado"/>
                                        }
                                        {item.id_status == 1  &&
                                            <Aviso stilo="label label-important" icon="icon-warning-sign icon-white" status=" Pendente"/>
                                        }
                                        {item.id_status == null  &&
                                            <Aviso stilo="label label-important" icon="icon-warning-sign icon-white" status=" Pendente"/>
                                        }
                                        </td>
                                        <td className="center ">
                                        <button className="btn btn-primary center" data-toggle="modal"  onClick={()=>updateComta(item.id)} >
                                            <i className="icon-pencil" ></i>
                                            </button>
                                        <button className="btn btn-danger center" data-toggle="modal" ><i className="icon-trash"></i>
                                        </button>
                                        </td>
                                    </tr>
                                ))} 
                            </tbody>
                            </table>
                        </div>
                       
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    
}

export default Home;