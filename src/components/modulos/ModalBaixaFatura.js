import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';
import api from '../../helpers/ApiClientes';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CurrencyFormat from 'react-currency-format';

export default (props) => {
        const box = useRef();
        const [baixafatura, setfatura] = useState([]);
        const [startDate, setStartDate] = useState(new Date());
        const [stateC, setStateC] = useState(1);
        const [inputValues, setInputValues] = useState([]);
    
        useEffect(() => {
            const getfat = async () => {
            api.get("http://contaspr.test/api/entrada/" + props.conteudo)
            .then((response) => {
                let result = response.data.list;
                if(result.length > 0){                        
                    setfatura(result[0]);
                }else{ 
                setfatura({
                    id : 0,
                    descricao : '',
                    data_entrada : '',
                    id_categoria : '',
                    valor : '0,0',
                    id_status : '',
                    nentradas : '',
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
        },[]);   

        const onCloseModal = (e) => {
            props.closeAction(false);
                
        };

        const handleWindoClick = (e) =>{
            if(!box.current.contains(e.target)){
            }
        }

        const teste = (data, dateString) => {
            let today = new Date(data);
            let inputValues = baixafatura;
            let d = today.toLocaleString().split(' ');
            setStartDate(d[0]);
            inputValues['data_pagamento'] = d[0]; 
            setfatura({ ...inputValues});
        }
        
        const handleIput = evt => {
            evt.preventDefault();
            let inputValues = baixafatura;
            const {name, value } = evt.target;
            inputValues[name] = value;            
            
            setfatura({ ...inputValues});
        };


        const handleUpdade =  (e) => {
            e.preventDefault();    
            api.put(
                'http://contaspr.test/api/baixaentrada/'+ baixafatura.id,
                baixafatura
            ).then((response) => {
                props.fn()   
            });
            onCloseModal();
        }

        return (
            <>
            <div className="popup" >
                <div className="titulopopup">
                    <span id="titulo" className="page-title tpopup">{props.titulo}</span>
                    <a href="#" onclick="fecharpopup(); return false;">
                    <img src="/img/fecharpopup.png" onClick={onCloseModal}  />
                    </a>
                </div>
                <div className="conteudopopup" ref={box}>
                    <style />
                    <div className="row-fluid">
                        <span className="span6">
                        <h3>{baixafatura.obs}</h3>
                        </span>
                        <span className="span2">Status:<br />
                        <select id="id_status" name="id_status" className=" span12" value={baixafatura.id_status}  onChange={handleIput}>
                            <option value="1" selected="selected">PENDENTE</option>  
                            <option value="2">FECHADO</option>
                        </select>
                        </span>
                        <span className="span2">Vencimento:<br />
                        {baixafatura.data_vencimento}  </span>
                        <span className="span2">Pagamento:<br />
                        <DatePicker
                        className="obrigatorio masc_data span12"
                        name="fechado" value={baixafatura.data_pagamento}  onChange={teste}  />
                      
                        </span>
                    </div>
                    <div className="row-fluid">
                        <span className="span6">
                        <table className="table table-hover">
                            <thead>
                            <tr bgcolor="#E8E8E8">
                                <th><i className="icon-question" /> Descrição</th>
                                <th><i className="icon-usd" /> Preço</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{baixafatura.descricao}</td>
                                <td>R$ {baixafatura.valor}</td>
                            </tr>
                            <tr>
                                <td><div className="text-right">Total:</div></td>
                                <td><b>R$ {baixafatura.valor}</b></td>
                            </tr>
                            </tbody>
                        </table>
                        </span>
                        <span className="span6">
                        <table className="table table-hover">
                        <thead>
                        <tr bgcolor="#E8E8E8">
                            <th><i className="icon-time" /> Data</th>
                            <th><i className="icon-ok" /> Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{baixafatura.data_vencimento}</td>
                            <td><button onclick className="btn btn-danger center" data-toggle="modal"><i className="icon-thumbs-down" /> PENDENTE</button></td>
                        </tr>
                       
                        <tr>
                            <td>{baixafatura.data_pagamento  == ''  ? '//' : baixafatura.data_pagamento}</td>
                            <td><button onclick className="btn btn-success center" data-toggle="modal"><i className="icon-thumbs-up" /> FECHADO</button></td>
                        </tr>
                        </tbody>
                        </table>
                        </span>
                    </div>
                    <div className="row-fluid">
                    </div>
                    <div className="row-fluid">
                        <center>
                        <button className="btn btn-primary" onClick={function(event) {handleUpdade(event);  }}>Salvar</button>
                        </center>
                    </div>
                </div>
            </div>

            </>
        );

}