import React, {Component, useEffect, useState } from 'react';
import api from '../../helpers/ApiClientes';

const Fornecedor = (props) => {
const [getFornecedor, setFornecedor] = useState([]);
useEffect(() => {
    getFornec();
},[]); 
const getFornec = async () => {
    api.get("http://contaspr.test/api/fornecedores",  {params: {'id': 1, 'pagina': 1000}})
    .then((response) => {
        let result = response.data.list.data;
        setFornecedor(result);
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
    });
}
return (
        <select 
        name={props.name} 
        id={props.id} 
        option={getFornecedor}
        className={props.className} 
        value={props.value} 
        draftValue={props.value}
        onChange={props.fnbutton}
        >
            <option value="">---</option>
            {getFornecedor && getFornecedor.map((item, k) => (
                <option key={item.id} value={item.id} >{item.nome}</option>
            ))}
        </select>
    )    
}
export default Fornecedor;