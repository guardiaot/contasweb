import React, {Component, useEffect, useState } from 'react';
import api from '../../helpers/ApiClientes';

const Categorias = (props) => {

const [getCategoria, setCategoria] = useState([]);

useEffect(() => {
        getcont();
},[]); 

const getcont = async () => {                    
    api.get("http://contaspr.test/api/categorias")
    .then((response) => {
        let result = response.data.list;
        if(result.length > 0){                        
            setCategoria(result);
        }else{                        
            setCategoria({
                id : '',
                nome: ""
            })
        }
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
}

return (
        <select 
        name={props.name} 
        id={props.id} 
        option={getCategoria}
        className={props.className} 
        value={props.value} 
        draftValue={props.value}
        onChange={props.fnbutton}
        >
            <option value="">---</option>
            {getCategoria && getCategoria.map((item, k) => (
                <option key={item.id} value={item.id} >{item.nome}</option>
            ))}
        </select>
    )    
}

export default Categorias;