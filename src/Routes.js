import React from 'react';
import { Switch, useParams, Link } from 'react-router-dom';

import RouteHandler from './components/RouteHandler'

import Signin from './paginas/Signin/index';
import Home from './paginas/home/Home';
import Clientes from './paginas/clientes/Clientes';
import Fornecedor from './paginas/fornecedor/Fornecedor';
import Contas from './paginas/contas/Contas';
import Fatura from './paginas/faturas/Faturas';
import Financeiro from './paginas/financeiro/Financeiro';
import Servicos from './paginas/servicos/Servicos';
import Usuarios from './paginas/usuarios/Usuarios';
import NotFound from './paginas/NotFound/NotFound';
import Recebimento from './paginas/recebimento/Recebimento';

export default () => {
    return (
        <Switch>
            <RouteHandler private exact path="/">
                <Home />
            </RouteHandler>
            <RouteHandler private path="/clientes">
                <Clientes />
            </RouteHandler>
            <RouteHandler private exact path="/fornecedor">
                <Fornecedor />
            </RouteHandler>
            <RouteHandler private exact path="/contasapagar">
                <Contas />
            </RouteHandler>
            <RouteHandler private exact path="/entradas">
                <Fatura />
            </RouteHandler>
            <RouteHandler  exact path="/signin">
                <Signin />
            </RouteHandler>
            <RouteHandler private exact path="/financeiro">
                <Financeiro />
            </RouteHandler>
            <RouteHandler private exact path="/tiposervicos">
                <Servicos />
            </RouteHandler>
            <RouteHandler private exact path="/recebimento">
                <Recebimento />
            </RouteHandler>
            <RouteHandler private exact path="/usuarios">
                <Usuarios />
            </RouteHandler>
            <RouteHandler>
                <NotFound />
            </RouteHandler>
        </Switch>
    );
}