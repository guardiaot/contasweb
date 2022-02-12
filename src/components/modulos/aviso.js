import React, { Component } from 'react'

export default class aviso extends Component {
    
    render() {
        const dias = this.props.status.replace("-", "");
        return (
                <span className={this.props.stilo} ><i className={this.props.icon}></i>{dias}</span>
        )
    }
}
