import React, { useEffect, useState, useRef } from 'react';
import { render } from 'react-dom'

import styled from 'styled-components';

import api from '../../helpers/ApiClientes';
import Aviso from '../../components/modulos/aviso'; 
import Clientes from '../../components/modulos/Clientes';
import Boxinfo from '../../components/modulos/Boxinfo';
import Luz from '../../components/modulos/Luz';
import ModalContas from '../../components/modulos/ModalContas';
import ModalFaturas from '../../components/modulos/ModalFaturas';

import Navcalendario from '../../components/modulos/Navcalendario';



import { PieChart } from 'react-minimal-pie-chart';

const Financeiro = (props) => {
        let subtitle;        

        const [stateList, setStateList] = useState([]);
        const [stateConta, setStateContas] = useState([]);
        const [stateDia, setStateDia] = useState('');
        //Financeiro
        const [stateFin, setStateFin] = useState([]);

        //Modal
        const [showModal, setShowModal] = useState(false);
        const [showModalClente, setShowModalClente] = useState(false);
        const [visual, setVisual] = useState(1);
        const [titulo, setTitulo] = useState("");
        const [stateC, setStateC] = useState([]);

        //calendario
        const [statResult, setResult] = useState([]);
        const [statPage, setPage] = useState([]);
        const [statAmount, setAmount] = useState([]);
        const [statCategoria, setCategoria] = useState([]);
        
    
        const [statMes, setMes] = useState([]);
        const [statAno, setAno] = useState([]);

       
        const [chart1, setChart1] = useState([]);
        const [chart2, setChart2] = useState([]);
       

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
                getChart("0"+ mes.toString(), ano)
                listcategoria("0"+ mes.toString(), ano)
             }else{
                getfat(mes.toString(), ano)
                getChart(mes.toString(), ano)
                listcategoria(mes.toString(), ano)
             }
        }
        
        const getChart = async (mes, ano) => {
            api.get("http://contaspr.test/api/grafico", {params: {'mes' : mes, 'ano' : ano}})
            .then((response) => {
                let result = response.data.cont;

            }).catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
            });

         
        }
        const shiftSize = 7;
        const defaultLabelStyle = {
            fontSize: '5px',
            fontFamily: 'sans-serif',
          };
        const listcategoria = async (mes, ano) => {            
            api.get("http://contaspr.test/api/despesascat", {params: {'mes' : mes, 'ano' : ano}})
            .then((response) => {
                let result = response.data;                
                setCategoria(response.data.list.data);
                let array = [];   
                let cor = ['#DC143C','#FF4500', '#FF8C00','#E38627', '#6A5ACD','#C13C37', '#6A2135', '#228B22', '#DC143C'];
                {response.data.list.data != 0 && response.data.list.data.map((item, k) => (
                    array.push({ title: item.nome, value: parseFloat(item.valor_pago.replace(/[\D]+/g, '')), color: cor[k] })
                ))}
                setChart1(array);
               
            }).catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
            });
        }

        const getfat = async (mes, ano) => {
        api.get("http://contaspr.test/api/lastdespesas", {params: {'mes' : mes, 'ano' : ano}})
        .then((response) => {
                let result = response.data.list;
                setStateList(response.data.cont);
                
            }).catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }

        const handleServiceChoise = () => {
            setStateContas(0);
            setVisual(3);
            setTitulo("Adicionar");
            setShowModal(true);
        } 

        //pega a função do calendario
        const calend = (e,c) => {
            getfat(e,c);
            listcategoria(e,c);
            getChart(e,c);
        }

       

        return (
            <> 
            {showModal ? <Luz /> : null }
            {showModal ? <ModalFaturas closeAction={()=>setShowModal(false)} conteudo={stateConta} visualizar={visual} titulo={titulo} fn={updatetable}/> : null }
                <div id="main-content" style={{marginLeft: 180}}>
                <div className="container-fluid">
                <div className="row-fluid">
                    <div className="span12">
                    <h3 className="page-title titulomeio">Financeiro</h3>
                    </div>
                </div>
                <div className="row-fluid" id="conteudo">
                    <div className="widget gray">
                    <div className="widget-title">
                        <h4><i className="icon-reorder" /> Financeiro</h4>
                        <span className="tools">
                        </span>
                        <span className="tools">
                            <button className="btn btn-small"  onClick={()=>updatetable()} >
                                <i className="icon-retweet icon-white" /> </button>
                        </span>
                        <Navcalendario calendar={calend} mes={statMes} ano={statAno} />
                    </div>
                    <div className="widget-body">
                    <h3>Entradas e saídas - {stateList.mes} </h3>
                        <div className="metro-nav metro-fix-view double">
                            {parseFloat(stateList.saldo) > 0 ?
                                <div className="metro-nav-block nav-block-green long double">
                                    <Boxinfo targt="/contasapagar" info="baixa" icon="icon-thumbs-up" info={'R$ '+ stateList.saldo} status="Saldo do Mes" />
                                </div>
                            :
                                <div className="metro-nav-block nav-block-red2 long double">
                                    <Boxinfo targt="/contasapagar" info="baixa" icon="icon-thumbs-down" info={'R$ '+ stateList.saldo} status="Saldo do Mes" />
                                </div>
                            }
                        <div className="metro-nav-block nav-block-blue double">
                            <Boxinfo targt="/faturas/1" icon="icon-usd" info={'R$ '+ stateList.sub_contareceber} status="Entrada esperada" />
                        </div>
                        <div className="metro-nav-block nav-block-green2 double">
                            <Boxinfo targt="/faturas/5" icon="icon-thumbs-up" info={'R$ '+ stateList.cont_recebidas} status="Entrada recebidas" />
                        </div>
                        <div className="metro-nav-block nav-block-green double"> 
                        <Boxinfo targt="/faturas/0" icon="icon-book" info={'R$ '+ stateList.cont_pendente} status="Entrada a receber" /> 	
                        </div>
                        <div className="metro-nav-block nav-block-red double">
                            <Boxinfo targt="/contasapagar" icon="icon-warning-sign" info={'R$ '+stateList.sub_apaga} status="Contas a pagar" />
                        </div>
                        <div className="metro-nav-block nav-block-grey double">
                            <Boxinfo targt="/baixa" icon="icon-ok" info="baixa" status="Contas pagas dinheiro" info={'R$ '+stateList.pg_dinheiro}  />
                        </div>
                        <div className="metro-nav-block nav-block-orange double">
                            <Boxinfo targt="/faturas/0" icon="icon-barcode" info={'R$ '+stateList.pg_cartao} status="Contas pagas cartão" />
                        </div>
                       
                        </div>
                        <div className="clearfix" />
                       
                        <span className="span5">           
                            <h3>Categorias mais utilizadas </h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td><h4>Nome</h4></td>
                                        <td><h4>Valor</h4></td>
                                    </tr>
                                </thead>
                                <tbody>
                                {statCategoria != 0 && statCategoria.map((item, k) => (
                                    <tr key={item.id}>
                                        <td className="text-success"><b>{item.nome}</b></td>
                                        <td className="text-info" ><b>R$ {item.valor_pago}</b></td>
                                    </tr>
                                ))}
                                </tbody>
                                </table>
                        </span>
                        <span className="span2">
                        
                        </span>
                        <span className="span4">                        
                        <h3>Top Categorias</h3>
                        <PieChart 
                        data={chart1}
                        lineWidth={60}
                        animate
                        paddingAngle={2}
                        radius={PieChart.defaultProps.radius - shiftSize}
                        label={({ x, y, dx, dy, dataEntry }) => (
                            <text
                              x={x}
                              y={y}
                              dx={dx}
                              dy={dy}
                              dominantBaseline="central"
                              textAnchor="middle"
                              style={{
                                fontSize: '4px',
                                fontFamily: 'sans-serif',
                              }} >
                                    {Math.round(dataEntry.percentage) + '%'}
                            </text>
                        )}
                        labelPosition={60}
                        labelStyle={defaultLabelStyle}
                        labelStyle={(index) => ({
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        })}
                        
                        />;
                       
                        </span>
                        <span className="span6">
                        </span>
                        <div className="clearfix" />
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </>
        )
    }
    export default Financeiro;
