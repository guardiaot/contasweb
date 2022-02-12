import React, { useEffect, useState , useRef } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import api from '../../helpers/ApiClientes';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default (props) => {
        const dispatch = useDispatch();
        const box = useRef();
        
        
        const [selectTipo, setselectTipo] = useState(1);
        const [nomePessoa, setnomePessoa] = useState("Jurídica");
        const [getdb, setdb] = useState([]);
        const [startDate, setStartDate] = useState(new Date());
        useEffect(() => {            
                const getclie = async () => {
                    api.get("http://contaspr.test/api/cliente/"+ props.conteudo)
                    .then((response) => {
                        let result = response.data.list;
                        if(result.length > 0){                        
                            setdb(result[0]);
                            setselectTipo(result[0].tipo);
                        }else{
                            setdb({
                                id: 0,
                                nome : '',
                                responsavel : '',
                                email : '',
                                fantasia : '',
                                cnpj : '',
                                nascimento : '',
                                cpf : '',
                                rg : '',
                                orgao : '',
                                cep : '',
                                endereco : '',
                                bairro : '',
                                cidade : '',
                                tel1 : '',
                                tel2 : '',
                                descricao : '',
                                cli_form : '',
                            });
                        }  
                    })
                    .catch((err) => {
                        console.error("ops! ocorreu um erro" + err);
                    });
                    
                }
                getclie();

        },[]);

        const enableFisica = (evt) => {
            evt.preventDefault();
            var tipo = document.querySelector('#tipo').value;
            setselectTipo(tipo);
            if(tipo == 1){
                setnomePessoa("Jurídica");
            }else{
                setnomePessoa("");
            }

            let inputValues = getdb;
            const {name, value } = evt.target;
            inputValues[name] = value;            
            
            setdb({ ...inputValues});
        }   
    
        const onCloseModal = (e) => {
            props.closeAction();
                
        };

        const handleWindoClick = (e) =>{
            if(!box.current.contains(e.target)){
            }
        }

        const handleIput = evt => {
            evt.preventDefault();
            let inputValues = getdb;
            const {name, value } = evt.target;
            inputValues[name] = value;            
            
            setdb({ ...inputValues});
        }
        const datapicker = (data, dateString) => {
            let today = new Date(data);
            let inputValues = getdb;
            let d = today.toLocaleString().split(' ');

            setStartDate(d[0]);
            inputValues['nascimento'] = d[0]; 
            setdb({ ...inputValues});
        }
        const handleUpdade =  (e) => {
            e.preventDefault();
            const updadte =  () => {
                if(props.titulo != 'Editando'){
                    api.post(
                        'http://contaspr.test/api/postcliente',
                         getdb,
                        {
                          headers: {
                            "x-access-token": "token-value",
                          },
                        }
                      );
                }else{
                    api.put(
                        'http://contaspr.test/api/putcliente/'+getdb.id,
                        getdb
                      );
                
                }
                onCloseModal();
            }
            updadte();
        }
        

        return (
            < >
               <div className="popup" onClick={handleWindoClick} >
                    <div className="titulopopup">
                    <span id="titulo" className="page-title tpopup">{props.titulo}</span>
                        <a href="#" >
                            <img src="/img/fecharpopup.png" height={25} width={25} border={0} onClick={onCloseModal} />
                        </a>
                    </div>
                    <div className="conteudopopup"  ref={box}>
                    <form >
                        <div className="row-fluid">
                            <span className="span2">Tipo:<br />
                            <select name="tipo" id="tipo" className="obrigatorio span12" onChange=
                            {enableFisica} value={getdb.tipo} draftValue={getdb.tipo} >
                                <option value="1" selected="selected">Jurídica</option>
                                <option value="2">Física</option>
                            </select>
                            </span>
                            <span className="span4"><span id="tfantasia">Nome {nomePessoa}</span>:<br />
                                <input 
                                    name="nome" 
                                    type="text" 
                                    className="obrigatorio span12" 
                                    value={getdb.nome} 
                                    draftValue={getdb.nome}
                                    onChange={handleIput} 
                                 />
                                </span>
                                <span className="span3">Responsável:<br />
                                <input name="responsavel" type="text" className="obrigatorio span12"  draftValue={getdb.responsavel} value={getdb.responsavel}  onChange={handleIput} />
                            </span>
                            
                            <span className="span3">
                            Email:<br />
                            <input name="email" type="text" className="obrigatorio span12"   draftValue={getdb.email} value={getdb.email}  onChange={handleIput} />
                            </span>
                        </div>
                        {selectTipo == 1 &&
                        <>
                        <div className="row-fluid juridica">
                            <span className="span7">Razão Social:<br />
                            <input name="fantasia" type="text" className="obrigatorio span12" value={getdb.fantasia}  draftValue={getdb.fantasia} onChange={handleIput}  />
                            </span>
                            <span className="span5">CNPJ:<br />
                            <input name="cnpj" type="text" className="obrigatorio masc_cnpj span12" value={getdb.cnpj} draftValue={getdb.cnpj} onChange={handleIput}  />
                            </span>
                        </div>
                        </>
                        }
                        {selectTipo == 2 &&
                        <div className="row-fluid fisica" style={{display: 'block'}}>
                            <span className=" span3">Nascimento:<br />
                           
                            <DatePicker
                            className="obrigatorio masc_data span12"
                            name="nascimento" value={getdb.nascimento}  onChange={datapicker}  />
                            </span>
                            <span className=" span3">CPF:<br />
                            <input name="cpf" type="text" className="obrigatorio masc_cpf span12" value={getdb.cpf} draftValue={getdb.cpf} onChange={handleIput} />
                            </span>
                            <span className=" span3">RG:<br />
                            <input name="rg" type="text" className=" masc_num span12" id="rg" value={getdb.rg}  draftValue={getdb.rg} onChange={handleIput}/>
                            </span>
                            <span className=" span3">Orgão emissor:<br />
                            <input name="orgao" type="text" className=" span12" id="orgao" value={getdb.orgao}  draftValue={getdb.orgao} onChange={handleIput}/>
                            </span>
                        </div>
                        }
                        <div className="row-fluid">
                            <span className="span2">CEP:<br /> 
                            <input name="cep" type="text" className=" masc_cep span12" value={getdb.cep}  draftValue={getdb.cep} onChange={handleIput}/>
                            </span>
                            <span className="span4">Endereço:<br />
                            <input name="endereco" type="text" className=" span12" value={getdb.endereco} draftValue={getdb.endereco} onChange={handleIput}/>
                            </span>
                            <span className="span3">Bairro:<br />
                            <input name="bairro" type="text" className="  span12" value={getdb.bairro} draftValue={getdb.bairro} onChange={handleIput}/>
                            </span>
                            <span className="span3">Cidade:<br />
                            <input name="cidade" type="text" className="obrigatorio span12" value={getdb.cidade}   draftValue={getdb.cidade} onChange={handleIput}/>
                            </span>
                        </div>
                        <div className="row-fluid">
                            <span className="span2">Estado:<br />
                            <select id="uf" name="uf" className=" span12" value={getdb.uf} onChange={handleIput} draftValue={getdb.uf}>
                                <option value selected="selected">Selecione</option>  
                                <option value>--</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AM">AM</option>
                                <option value="AP">AP</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MG">MG</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="PR">PR</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="RS">RS</option>
                                <option value="SC">SC</option>
                                <option value="SE">SE</option>
                                <option value="SP">SP</option>
                                <option value="TO">TO</option>
                            </select>
                            </span>
                           
                            <span className="span2">Telefone¹:<br />
                            <input name="tel1" type="text" className="obrigatorio masc_tel span12" value={getdb.tel1}  draftValue={getdb.tel1} onChange={handleIput} />
                            </span>
                            <span className="span2">Telefone²:<br />
                            <input name="tel2" type="text" className=" masc_tel span12" id="tel2" value={getdb.tel2}   draftValue={getdb.tel2} onChange={handleIput} />
                            </span>
                            
                        </div>
                        <div className="row-fluid">
                            <span className="span12">Observações:<br />
                            <textarea name="descricao" cols={30} rows={2} className="span12" id="obs" value={getdb.descricao}  draftValue={getdb.descricao} onChange={handleIput} />
                            </span>
                        </div>
                        <div className="row-fluid">
                            <center>
                                {props.visualizar != 1 &&
                                    <span className="btn btn-primary" onClick={handleUpdade} >Salvar</span>
                                }
                            </center>
                        </div>
                        </form>
                        </div>
                </div> 
            </>
        )
    }
    //export default ModalClientes; 
