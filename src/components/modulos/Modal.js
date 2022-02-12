import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../helpers/ApiClientes';


const Modal = ({onClose = ()  =>{}, children }) =>{
        const Api = useApi();
        const [selectTipo, setselectTipo] = useState(1);
        const [nomePessoa, setnomePessoa] = useState("Jurídica");

        useEffect(() => {            
           
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


        return (
            <div>
               <div className="popup">
                    <div className="titulopopup">
                    <span id="titulo" class="page-title tpopup">Adicionar</span>
                        <a href="#" >
                            <img src="img/fecharpopup.png" height={25} width={25} border={0} onClick={onClose} />
                        </a>
                    </div>
                    <div class="conteudopopup">
                        <div>
                        <div className="row-fluid">
                            <span className="span2">Tipo:<br />
                            <select name="tipo" id="tipo" className="obrigatorio span12" onChange={()=>enableFisica()}>
                                <option value={1} selected="selected">Jurídica</option>
                                <option value={2}>Física</option>
                            </select>
                            </span>
                            {selectTipo == 1 &&
                                <>
                                </>
                            }

                                <span className="span4"><span id="tfantasia">Nome {nomePessoa}</span>:<br />
                                <input name="fantasia" type="text" className="obrigatorio span12" id="fantasia" defaultValue size={50} maxLength={100} required="required" />
                                </span>
                                <span className="span3">Responsável:<br />
                                <input name="nome" type="text" className="obrigatorio span12" id="nome" defaultValue size={50} maxLength={100} required="required" />
                                </span>
                            
                            <span className="span3">
                            Email:<br />
                            <input name="email" type="text" className="obrigatorio span12" id="email" defaultValue size={50} maxLength={100} required="required" />
                            </span>
                        </div>
                        {selectTipo == 1 &&
                        <>
                        <div className="row-fluid juridica">
                            <span className="span7">Razão Social:<br />
                            <input name="razao" type="text" className="obrigatorio span12" id="razao" defaultValue size={50} maxLength={100} required="required" />
                            </span>
                            <span className="span5">CNPJ:<br />
                            <input name="cnpj" type="text" className="obrigatorio masc_cnpj span12" id="cnpj" defaultValue size={30} required="required" />
                            </span>
                        </div>
                        </>
                        }
                        <div className="row-fluid fisica" style={{display: 'none'}}>
                            <span className=" span3">Nascimento:<br />
                            <input name="nascimento" type="text" className=" masc_data span12" id="nascimento" defaultValue="2021-08-02" size={50} maxLength={100} />
                            </span>
                            <span className=" span3">CPF:<br />
                            <input name="cpf" type="text" className="obrigatorio masc_cpf span12" id="cpf" defaultValue size={30} required="required" />
                            </span>
                            <span className=" span3">RG:<br />
                            <input name="rg" type="text" className=" masc_num span12" id="rg" defaultValue size={30} />
                            </span>
                            <span className=" span3">Orgão emissor:<br />
                            <input name="orgao" type="text" className=" span12" id="orgao" defaultValue size={30} />
                            </span>
                        </div>
                        <div className="row-fluid">
                            <span className="span2">CEP:<br />
                            <input name="cep" type="text" className=" masc_cep span12" id="cep" defaultValue size={30} />
                            </span>
                            <span className="span4">Endereço:<br />
                            <input name="endereco" type="text" className=" span12" id="endereco" defaultValue size={30} />
                            </span>
                            <span className="span3">Bairro:<br />
                            <input name="bairro" type="text" className="  span12" id="bairro" defaultValue size={30} />
                            </span>
                            <span className="span3">Cidade:<br />
                            <input name="cidade" type="text" className="obrigatorio span12" id="cidade" defaultValue size={30} />
                            </span>
                        </div>
                        <div className="row-fluid">
                            <span className="span2">Estado:<br />
                            <select id="uf" name="uf" className=" span12">
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
                            <input name="tel1" type="text" className="obrigatorio masc_tel span12" id="tel1" defaultValue size={30} required="required" />
                            </span>
                            <span className="span2">Telefone²:<br />
                            <input name="tel2" type="text" className=" masc_tel span12" id="tel2" defaultValue size={30} />
                            </span>
                            
                        </div>
                        <div className="row-fluid">
                            <span className="span12">Observações:<br />
                            <textarea name="obs" cols={30} rows={2} className="span12" id="obs" defaultValue={""} />
                            </span>
                        </div>
                        <div className="row-fluid">
                            <center>
                            <button className="btn btn-primary" onclick="formclientes('0','adicionar');">Salvar</button>
                            </center>
                        </div>
                        </div>
                        </div>
                </div> 
            </div>
        )
    }
    export default Modal; 
