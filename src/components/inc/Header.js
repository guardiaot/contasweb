import React, { Component, useEffect, useState } from 'react';


const Header = () => {
    
        return (
            <div id="header" className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container-fluid">
                    <div className="sidebar-toggle-box hidden-phone">
                        <div className="icon-reorder" />
                    </div>
                    <a className="brand" href="sistema.php">
                        <img src="/img/logop.png"  style={{maxHeight: 50}} />
                    </a>
                    <a className="btn btn-navbar collapsed" id="main_menu_trigger" data-toggle="collapse" data-target=".nav-collapse">
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="arrow" />
                    </a>
                    <div id="top_menu" className="nav notify-row">
                        <ul className="nav top-menu">
                        </ul>
                    </div>
                    <div className="top-nav ">
                        <ul className="nav pull-right top-menu">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <span className="username">{/*?php echo $nome_admin; ?*/}</span>
                            <b className="caret" />
                            </a>
                            <ul className="dropdown-menu extended logout">
                            <li><a href="sair.php"><i className="icon-key" /> Sair</a></li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

 
export default Header ;