import React, {Component, useEffect, useState, useContext } from 'react';
import api from '../../helpers/ApiClientes';

//import { contextProvider, UserContext } from '../../UserContext/index';

const Navcalendario = (props) => {

const [statMes, setMes] = useState([]);
const [statAno, setAno] = useState([]);
const [statLablemes, setLablemes] = useState([]);

useEffect(() => { 
    const d = new Date();
    setMes(d.getMonth()+1);
    setAno(d.getFullYear());
    var mes = d.getMonth()+1;
    var ano = d.getFullYear();
    if(mes.toString().length == 1){
        setLablemes(labelmes("0"+ mes.toString()));
        props.calendar("0"+ mes.toString(), ano)
     }else{
        setLablemes(labelmes(mes.toString()));
        props.calendar(mes.toString(), ano)
     }        
},[]);           


const calculadata = (mes, ano) => { 
     
    if(mes == 13){
        setMes(1);
        setAno(ano+1);
        props.calendar("01", ano+1);
        setLablemes(labelmes("01"));
    } else if(mes == 0){
        setMes(12);
        setAno(ano - 1);
        props.calendar(12, ano - 1);
        setLablemes(labelmes("12"));
    }else{
        if(mes.toString().length == 1){
            setMes(mes.toString());
            setLablemes(labelmes("0"+ mes.toString()));
            props.calendar("0"+ mes.toString(), ano);
         }else{
            setMes(mes);
            setLablemes(labelmes(mes.toString()));
            props.calendar(mes.toString(), ano);
         }
        setAno(ano);
        
    }
}

const labelmes = (mes) => {
    switch (mes) {
        case '01':
            return 'Janeiro';
        break;
        case '02':
            return 'Fevereiro';
        break;
        case '03':
            return 'Março';
        break;
        case '04':
            return 'Abril';
        break;
        case '05':
            return 'Maio';
        break;
        case '06':
            return 'Junho';
        break;
        case '07':
            return 'Julho';
        break;
        case '08':
            return 'Agosto';
        break;
        case '09':
            return 'Setembro';
        break;
        case '10':
            return 'Outubro';
        break;
        case '11':
            return 'Novembro';
        break; 
        case '12':
            return 'Dezembro';
        break;   
    }
}
    

return (
    <span className="tools">                            
    <button className="btn btn-small btn-primary" data-v=""  onClick={()=>calculadata(parseInt(statMes) - 1, statAno )} >
        <i className="icon-circle-arrow-left" /></button>
    <button className="btn btn-small btn-primary separetor" data-m=""  >{ statLablemes } de  { statAno }</button>
    <button className="btn btn-small btn-primary" data-a="" onClick={()=>calculadata(parseInt(statMes) + 1, statAno)} >
        <i className="icon-circle-arrow-right" /></button>
    </span>
    )    
}

export default Navcalendario;