import React, {Component, useEffect, useState } from 'react';
import api from '../../helpers/ApiClientes';

const Status = (props) => {

const [getStatus, setStatus] = useState([]);

useEffect(() => {
    getSt();
},[]); 

const getSt = async () => {
    api.get("http://contaspr.test/api/status")
    .then((response) => {
        let result = response.data.list;
        setStatus(result);
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
    });
}


return (
        <select 
        name={props.name} 
        id={props.id} 
        option={getStatus}
        className={props.className} 
        value={props.value} 
        draftValue={props.value}
        onChange={props.fnbutton}
        >
            <option value="">---</option>
            {getStatus && getStatus.map((item, k) => (
                <option key={item.id} value={item.id} >{item.nome}</option>
            ))}
        </select>
    )    
}

export default Status;