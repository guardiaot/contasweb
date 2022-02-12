import React, {Component, useEffect, useState } from 'react';
import api from '../../helpers/ApiClientes';

const Cartao = (props) => {

const [getCartao, setCartao] = useState([]);

useEffect(() => {
    getCartoes();
},[]); 

    const getCartoes = async () => {
        api.get("http://contaspr.test/api/cartoes")
        .then((response) => {
            let result = response.data.list;
            setCartao(result);
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }
    

return (
        <select 
        name={props.name} 
        id={props.id} 
        option={getCartao}
        className={props.className} 
        value={props.value} 
        draftValue={props.value}
        onChange={props.fnbutton}
        >
            <option value="">---</option>
            {getCartao && getCartao.map((item, k) => (
                <option key={item.id} value={item.id} >{item.nome}</option>
            ))}
        </select>
    )    
}

export default Cartao;