import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';
import api from '../../helpers/ApiClientes';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Clientes from '../../components/modulos/Clientes';
import Categorias from '../../components/modulos/Categorias';
import Parcelas from '../../components/modulos/Parcelas';

import CurrencyFormat from 'react-currency-format';

export default (props) => {
        const [selectTipo, setselectTipo] = useState(1);
        const [nomePessoa, setnomePessoa] = useState("Jurídica");
        const [getConta, setCon] = useState([]);
        const [getdatafatura, setfatura] = useState([]);
        const [getCategory, setCategory] = useState([]);
        const [startDate, setStartDate] = useState(new Date());
        const [inputValues, setInputValues] = useState([]);
        
        useEffect(() => {                     
                    const getfat = async () => {                    
                    api.get("http://contaspr.test/api/entrada/" + props.conteudo)
                    .then((response) => {
                        let result = response.data.list;
                        console.log(result);
                        if(result.length){                        
                            setfatura(result[0]);
                        }else{ 
                            setfatura({
                                id : 0,
                                descricao : '',
                                data_entrada : '',
                                id_categoria : '',
                                valor : '0,0',
                                id_status : 1,
                                nentradas : 1,
                                data_vencimento : '',
                                data_pagamento : '',
                                id_cliente : '',
                                aviso : '',
                                obs : '',
                            });
                    }}).catch((err) => {
                        console.error("ops! ocorreu um erro" + err);
                    });
            }
            getfat();
            console.log(getdatafatura);
        },[]); 

        const onCloseModal = (e) => {
                props.closeAction(false);
        };

        const formatReal = evt => {
            evt.preventDefault();
            let inputValues = getdatafatura;
            const {name, value } = evt.target;
            let valor = value + '';
            valor = parseInt(valor.replace(/[\D]+/g, ''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ",$1");

            if(valor.length > 6){
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            if(valor == 'NaN'){
                valor = '';
            }

            inputValues[name] = valor; 

            setfatura({ ...inputValues});
        }

        const teste = (data, dateString) => {
            let today = new Date(data);
            let inputValues = getdatafatura;
            let d = today.toLocaleString().split(' ');
            setStartDate(d[0]);
            inputValues['data_vencimento'] = d[0]; 
            setfatura({ ...inputValues});
        }
        
        const handleIput = evt => {
            evt.preventDefault();
            let inputValues = getdatafatura;
            const {name, value } = evt.target;
            inputValues[name] = value;            
            
            setfatura({ ...inputValues});
        };

        const handleUpdade =  (e) => {
            e.preventDefault();
            const updadte =  () => {
                if(props.titulo != 'Editando'){
                    api.post(
                        'http://contaspr.test/api/postentrada',
                        getdatafatura,
                         
                        {
                          headers: {
                            "x-access-token": "token-value",
                          },
                        }
                      ).then((response) => {
                        props.fn()   
                      });
                     
                }else{
                    api.put(
                        'http://contaspr.test/api/putentrada/'+getdatafatura.id,
                        getdatafatura
                    ).then((response) => {
                        props.fn()   
                    });
                }
               // 
                onCloseModal();
            }
            updadte();
        }

        return (
            <div>
                <div className="popup">
                    <div className="titulopopup">
                    <span id="titulo" class="page-title tpopup">{props.titulo}</span>
                        <a href="#" >
                            <img src="/img/fecharpopup.png" height={25} width={25} border={0} onClick={onCloseModal} />
                        </a>
                    </div>
                    <div class="conteudopopup">
                    <div>
                    <div className="row-fluid">
                        <span className="span3">Descrição:<br />
                        <input name="descricao" type="text" id="descricaof" size={50} maxLength={100} defaultValue={getdatafatura.descricao} className="obrigatorio span12" onChange={handleIput} />
                        </span>
                        <span className="span5">Cliente:<br />
                        <Clientes 
                            name="id_cliente" 
                            id="id_cliente" 
                            value={getdatafatura.id_cliente} 
                            className="obrigatorio span12"
                            fnbutton={handleIput}
                            />
                        </span>
                        <span className="span1">N.Parcelas:<br />
                                <Parcelas 
                                name="nentradas" 
                                id="nentradas" 
                                value={getdatafatura.nentradas} 
                                className="obrigatorio span12"
                                fnbutton={handleIput} 
                                />
                        </span>
                        <span className="span2"><span id="tfantasia">Vencimento</span>:<br />
                        <DatePicker
                        className="obrigatorio masc_data span12"
                        name="vencimento" value={getdatafatura.data_vencimento}  onChange={teste}  />
                        </span>
                    </div>
                    <div className="row-fluid">
                        <span className=" span7">Serviço:<br />
                        <Categorias 
                                name="id_categoria" 
                                id="id_categoria" 
                                className="obrigatorio span12" 
                                value={getdatafatura.id_categoria}                            
                                fnbutton={handleIput} 
                                />  </span>
                        <span className=" span3">Valor:<br />
                        <input name="valor" value={getdatafatura.valor} defaultValue={getdatafatura.valor} onChange={formatReal}/>
                        
                        </span>
                        
                        <span className=" span1"><br />
                        </span>
                    </div>
                  
                    <div className="row-fluid">
                        <span className="span12">Observações:<br />
                        <textarea name="obs" cols={30} rows={2} className="span12" id="obs" defaultValue={getdatafatura.obs} onChange={handleIput} />
                        </span>
                    </div>
                    <div className="row-fluid">
                        <center>
                        {getdatafatura.id_status == 1 &&
                        <button className="btn btn-primary" onClick={function(event) {handleUpdade(event);  }}>Salvar</button>
                        }
                        </center>
                    </div>
                    </div>
                    </div> 
                </div> 
            </div>
        )
    }
    //export default ModalContas; 
