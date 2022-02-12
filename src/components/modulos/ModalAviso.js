import React, { useEffect, useState , useRef } from 'react';
import styled from 'styled-components';


export default (props) => {

        const onCloseModal = (e) => {
            props.closeAction(false);
        };
        console.log(props);
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
                            <span className="span10">
                                Esta <b>categoria</b> não pode ser excluida exite <b>{props.conteudo.e}</b> entradas cadastrada
                                <br />
                                Esta <b>categoria</b> não pode ser excluida exite <b>{props.conteudo.d}</b> despesas cadastrada
                            </span>
                            
                        </div>
                        <div className="row-fluid">
                                <center>
                                <button className="btn btn-primary" onClick={onCloseModal}   >OK</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
    //export default ModalContas; 
