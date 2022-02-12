import React, {Component, useEffect, useState } from 'react';
import api from '../../helpers/ApiClientes';

const Clientes = (props) => {
const [getClientes, setClientes] = useState([]);
useEffect(() => {
    getFornec();
},[]); 
const getFornec = async () => {
    api.get("http://contaspr.test/api/clientes",  {params: {'id': 1, 'pagina': 1000}})
    .then((response) => {
        let result = response.data.list.data;
        setClientes(result);
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
    });
}
return (
        <select 
        name={props.name} 
        id={props.id} 
        option={getClientes}
        className={props.className} 
        value={props.value} 
        draftValue={props.value}
        onChange={props.fnbutton}
        >
            <option value="">---</option>
            {getClientes && getClientes.map((item, k) => (
                <option key={item.id} value={item.id} >{item.nome}</option>
            ))}
        </select>
    )    
}
export default Clientes;