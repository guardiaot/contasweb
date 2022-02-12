import React, {Component, useEffect, useState } from 'react';

const Parcelas = (props) => {
const [getPar, setPar] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])   
  
return (
        <select 
        name={props.name} 
        id={props.id} 
        name={props.name} 
        id={props.id} 
        option={getPar}
        className={props.className} 
        value={props.value} 
        draftValue={props.value}
        onChange={props.fnbutton}
        >
            <option value="">---</option>
            {getPar.map(item => (
                <option key={item}  value={item} >{item}x</option>
            ))}
        </select>
    )    
}

export default Parcelas;