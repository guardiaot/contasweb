import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';

import api from '../../helpers/ApiClientes';
import Parcelas from '../../components/modulos/Parcelas';
import Categorias from '../../components/modulos/Categorias';
import Cartao from "../../components/modulos/Cartao";
import Tipopagamento from "../../components/modulos/Tipopagamento";
import Status from "../../components/modulos/Status";
import Fornecedor from "../../components/modulos/Fornecedor";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default (props) => {
        
        const [selectTipo, setselectTipo] = useState(1);
        const [nomePessoa, setnomePessoa] = useState("Jurídica");
        const [getConta, setCon] = useState([]);
        const [startDate, setStartDate] = useState(new Date());
        
        useEffect(() => {
                const getcont = async () => {                    
                    api.get("http://contaspr.test/api/despesa/" + props.conteudo)
                    .then((response) => {
                        let result = response.data.list;
                        if(result.length > 0){                        
                            setCon(result[0]);
                        }else{                        
                            setCon({
                                id : '',
                                data_lancamento: "",
                                data_pagamento: "",
                                data_vencimento: "",
                                desconto: 0,
                                descricao: "",
                                frm_pagamento: '',
                                id_cartao: 0,
                                id_categoria: 0,
                                id_cliente: 0,
                                id_status: 1,
                                multa: "0",
                                nparcelas: '1x',
                                valor: 0,
                                valor_pago: 0,
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

        const datapicker1 = (data, dateString, e) => {
            console.log(dateString);
            let today = new Date(data);
            let inputValues = getConta;
            let d = today.toLocaleString().split(' ');

            setStartDate(d[0]);
            inputValues['data_vencimento'] = d[0]; 
            setCon({ ...inputValues});
        }
        const datapicker2 = (data, dateString, e) => {
            console.log(dateString);
            let today = new Date(data);
            let inputValues = getConta;
            let d = today.toLocaleString().split(' ');

            setStartDate(d[0]);
            inputValues['data_pagamento'] = d[0]; 
            setCon({ ...inputValues});
        }

        const handleUpdade =  (e) => {
            e.preventDefault();
            const updadte =  () => {
                if(props.titulo != 'Editando'){
                    api.post(
                        'http://contaspr.test/api/postdespesa',
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
                        'http://contaspr.test/api/putdespesa/'+getConta.id,
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
                            <span className="span3">Titulo:<br />
                            <input name="descricao" type="text" id="descricaof" size={50} maxLength={100} defaultValue={getConta.descricao} className="obrigatorio span12" onChange={handleIput} />
                            </span>
                            <span className="span2">Categoria:<br />
                                <Categorias 
                                name="id_categoria" 
                                id="id_categoria" 
                                className="obrigatorio span12" 
                                value={getConta.id_categoria}                            
                                fnbutton={handleIput} 
                                />
                            </span>
                            <span className="span2">Tipo pg:<br />
                                <Tipopagamento 
                                name="frm_pagamento" 
                                id="frm_pagamento" 
                                className="obrigatorio span12"
                                value={getConta.frm_pagamento}                            
                                fnbutton={handleIput}
                                />
                            </span>
                            <span className="span2">Cartão:<br />
                                <Cartao 
                                name="id_cartao" 
                                id="id_cartao" 
                                className="obrigatorio span12"
                                value={getConta.id_cartao} 
                                fnbutton={handleIput}
                                />
                            </span>
                            <span className="span1">N.Parcelas:<br />
                                <Parcelas 
                                name="nparcelas" 
                                id="nparcelas" 
                                value={getConta.nparcelas} 
                                className="obrigatorio span12"
                                fnbutton={handleIput} 
                                />
                            </span>
                            <span className="span2">Valor:<br />
                            <input name="valor" type="text" id="valor" size={50} maxLength={100} defaultValue={getConta.valor} className="masc_preco obrigatorio span12" onChange={handleIput}/>
                            </span>
                        </div>
                        <div className="row-fluid">
                                <span className="span2">Data vencimento:<br />
                                <DatePicker
                            className="obrigatorio masc_data span12"
                            name="data_vencimento" value={getConta.data_vencimento}  onChange={datapicker1}  />
                                
                                </span>
                                <span className="span2">Data pagamento:<br />
                                <DatePicker
                            className="obrigatorio masc_data span12"
                            name="data_pagamento" value={getConta.data_pagamento}  onChange={datapicker2}  />
                             
                                </span>
                                <span className="span2">Valor pago:<br />
                                <input name="valor_pago" type="text" id="valor_pago" size={50} maxLength={100} defaultValue={getConta.valor_pago} className="masc_preco span12" onChange={handleIput} />
                                </span>
                                <span className="span3">Fornecedor:<br />
                                    <Fornecedor 
                                    name="id_cliente" 
                                    id="id_cliente" 
                                    value={getConta.id_cliente} 
                                    className="obrigatorio span12"
                                    fnbutton={handleIput}
                                    />
                                </span>
                                <span className="span2">Status:<br />
                                    <Status 
                                    name="id_status" 
                                    id="id_status" 
                                    value={getConta.id_status} 
                                    className="obrigatorio span12"
                                    fnbutton={handleIput}
                                    />
                                </span>
                            </div>
                            <div className="row-fluid">
                                <span className="span12">Observações:<br />
                                <textarea name="obs" cols={50} rows={3} className=" span12" id="obs" defaultValue={getConta.obs} onChange={handleIput}/>
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
