import React, { Component, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation
  } from "react-router-dom";

const Menu = () => {
    const location = useLocation();

    const [stateMenu, setStateMenu] = useState("/");
    

    useEffect(() => {       
        setStateMenu(location.pathname);
    },[]);

    const trocaMenu = (menu) => {
        setStateMenu(menu);
    }
    
    
    return (
            <>
                <div className="sidebar-scroll">
                    <div id="sidebar" className="nav-collapse collapse">
                        <div className="navbar-inverse">
                        <form className="navbar-search visible-phone">
                            <input type="text" className="search-query" placeholder="Busca" />
                        </form>
                        </div>

                        <ul className="sidebar-menu">
                            
                            <li className={ stateMenu == "/" ? 'sub-menu menu inicial active open' : 'sub-menu menu inicial' } >
                               <Link to="/" onClick={()=>trocaMenu("/")}  >
                                <i className="icon-home"  />
                                <span>Home</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/clientes" ? 'sub-menu menu clientes active open' : 'sub-menu menu clientes' }>
                               <Link to="/clientes"   onClick={()=>trocaMenu("/clientes")} >
                                <i className="icon-book" />
                                <span>Clientes</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/Fornecedor" ? 'sub-menu menu fornecedor active open' : 'sub-menu menu fornecedor' }>
                               <Link to="/fornecedor"   onClick={()=>trocaMenu("/Fornecedor")} >
                                <i className="icon-book" />
                                <span>Fornecedor</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/financeiro" ? 'sub-menu menu financeiro active open' : 'sub-menu menu financeiro' }>
                               <Link to="/financeiro"  onClick={()=>trocaMenu("/financeiro")} >
                                <i className="icon-usd" />
                                <span>Financeiro</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/entradas" ? 'sub-menu menu faturas active open' : 'sub-menu menu faturas' }>
                               <Link to="/entradas"  onClick={()=>trocaMenu("/entradas")} >
                                <i className="icon-barcode" />
                                <span>Contas a receber</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/contasapagar" ? 'sub-menu menu contasapagar active open' : 'sub-menu menu contasapagar' } >
                               <Link to="/contasapagar"  onClick={()=>trocaMenu("/contasapagar")} >
                                <i className="icon-warning-sign" />
                                <span>Contas a pagar</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/usuarios" ? 'sub-menu menu usuarios active open' : 'sub-menu menu usuarios' }>
                               <Link to="/usuarios"  onClick={()=>trocaMenu("/usuarios")} >
                                <i className="icon-user" />
                                <span>Usuários</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/tiposervicos" ? 'sub-menu menu tiposervicos active open' : 'sub-menu menu tiposervicos' }>
                               <Link to="/tiposervicos"  onClick={()=>trocaMenu("/tiposervicos")} >
                                <i className="icon-briefcase" />
                                <span>Categorias</span>
                                </Link>
                            </li>
                            <li className={ stateMenu == "/recebimento" ? 'sub-menu menu recebimento active open' : 'sub-menu menu recebimento' }>
                               <Link to="/recebimento"  onClick={()=>trocaMenu("/recebimento")} >
                                <i className="icon-credit-card" />
                                <span>Tipos de recebimento</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
    export default  Menu;