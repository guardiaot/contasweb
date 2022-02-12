import React, { Component } from 'react'

export default class Recebimento extends Component {
    render() {
        return (
            <div>
               <div id="main-content" style={{marginLeft: 180}}>
                    {/* BEGIN PAGE CONTAINER*/}
                    <div className="container-fluid">
                        {/* BEGIN PAGE HEADER*/}
                        <div className="row-fluid">
                        <div className="span12">
                            {/* BEGIN PAGE TITLE & BREADCRUMB*/}
                            <h3 className="page-title titulomeio">Tipos de recebimento</h3>
                            {/* END PAGE TITLE & BREADCRUMB*/}
                        </div>
                        </div>
                        {/* END PAGE HEADER*/}
                        {/* BEGIN PAGE CONTENT*/}
                        <div className="row-fluid" id="conteudo"><div className="widget gray">
                            <div className="widget-title">
                            <h4><i className="icon-reorder" /> Aplicativos</h4>
                            <span className="tools">
                            </span>
                            </div>
                            <div className="widget-body">
                            {/*BEGIN METRO STATES*/}
                            <div className="metro-nav metro-fix-view">
                                <div className="metro-nav-block nav-block-green double">
                                <a data-original-title href="#boletos" onclick="boletos('');">
                                    <i className="icon-barcode" />
                                    <div className="info">0</div>
                                    <div className="status">Boletos</div>
                                </a>
                                </div><div className="metro-nav-block nav-block-orange double">
                                <a data-original-title href="#intermediarios" onclick="intermediarios('');">
                                    <i className="icon-credit-card" />
                                    <div className="info">2</div>
                                    <div className="status">Intermediários</div>
                                </a>
                                </div>                              </div>
                            <div className="clearfix" />
                            {/*END METRO STATES*/}
                            </div>
                        </div>
                        {/* BEGIN BASIC PORTLET*/}
                        </div>
                        {/* END PAGE CONTENT*/}         
                    </div>
                    {/* END PAGE CONTAINER*/}
                    </div>

            </div>
        )
    }
}
