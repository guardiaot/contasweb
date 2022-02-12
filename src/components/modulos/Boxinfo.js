import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation
  } from "react-router-dom";
export default class Clientes extends Component {
    render() {
        return (
            <div>
                   <Link to={this.props.targt} >
                        <i className={this.props.icon} />
                        <div className="info">{this.props.info}</div>
                        <div className="status">{this.props.status}</div>
                    </Link>
                </div>
        )
    }
}
