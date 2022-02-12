import React, {Component, useEffect, useState } from 'react';
import api from '../../helpers/ApiClientes';

const Tipopagamento = (props) => {

const [getTipoPagamento, setTipoPagamento] = useState([]);

useEffect(() => {
    getTipopagamentos();
},[]); 

const getTipopagamentos = async () => {
    api.get("http://contaspr.test/api/tipopagamentos")
    .then((response) => {
        let result = response.data.list;
        setTipoPagamento(result);
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
    });
}


return (
        <select 
        name={props.name} 
        id={props.id} 
        option={getTipoPagamento}
        className={props.className} 
        value={props.value} 
        draftValue={props.value}
        onChange={props.fnbutton}
        >
            <option value="">---</option>
            {getTipoPagamento && getTipoPagamento.map((item, k) => (
                <option key={item.id} value={item.id} >{item.nome}</option>
            ))}
        </select>
    )    
}

export default Tipopagamento;