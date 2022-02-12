import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';

import api from '../../helpers/ApiClientes';
import Parcelas from '../../components/modulos/Parcelas';
import Categorias from '../../components/modulos/Categorias';
import Cartao from "../../components/modulos/Cartao";
import Tipopagamento from "../../components/modulos/Tipopagamento";
import Status from "../../components/modulos/Status";
import Fornecedor from "../../components/modulos/Fornecedor";

export default (props) => {
        
        const [selectTipo, setselectTipo] = useState(1);
        const [nomePessoa, setnomePessoa] = useState("Jurídica");
        const [getConta, setCon] = useState([]);
        
        useEffect(() => {
                const getcont = async () => {                    
                    api.get("http://contaspr.test/api/categoria/" + props.conteudo)
                    .then((response) => {
                        let result = response.data.list;
                        if(result.length > 0){                        
                            setCon(result[0]);
                        }else{                        
                            setCon({
                                id : '',
                                nome: ""
                            })
                        }
                        }).catch((err) => {
                            console.error("ops! ocorreu um erro" + err);
                        });
                }
                getcont();
               
        },[]);
        const enableFisica = () => {
            var tipo = document.querySelector('#tipo').value;
            setselectTipo(tipo);
            if(tipo == 1){
                setnomePessoa("Jurídica");
            }else{
                setnomePessoa("");
            }
        }   
    
        const enableJiridica = () => {
            setselectTipo(1);
        }
        const onCloseModal = (e) => {
            props.closeAction(false);
        };

        const handleIput = evt => {
            evt.preventDefault();            
            let inputValues = getConta;
            const {name, value } = evt.target;
            inputValues[name] = value;            
            setCon({ ...inputValues});

        };

        const handleUpdade =  (e) => {
            e.preventDefault();
            const updadte =  () => {
                if(props.titulo != 'Editando'){
                    api.post(
                        'http://contaspr.test/api/postcategoria',
                         getConta,
                         
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
                        'http://contaspr.test/api/putcategoria/'+getConta.id,
                        getConta
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
                    <span id="titulo" className="page-title tpopup">{props.titulo}</span>
                        <a href="#" >
                            <img src="/img/fecharpopup.png" height={25} width={25} border={0} onClick={onCloseModal} />
                        </a>
                    </div>
                    <div className="conteudopopup">
                        <div>
                        <div className="row-fluid">
                            <span className="span10">Titulo:<br />
                            <input name="nome" type="text" id="nomef" size={50} maxLength={100} defaultValue={getConta.nome} className="obrigatorio span12" onChange={handleIput} />
                            </span>
                            
                        </div>
                        <div className="row-fluid">
                                <center>
                                <button className="btn btn-primary" onClick={function(event) {handleUpdade(event);  }}   >Salvar</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
    //export default ModalContas; 
