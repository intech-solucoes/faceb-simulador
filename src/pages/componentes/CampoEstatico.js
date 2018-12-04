import React, { Component } from 'react';

function col(valor) {
    if(valor)
        return "col-" + valor;
    else
        return "col";
}

export default class CampoEstatico extends Component { 
    constructor(props) {
        super(props);
    }

    render() {
        var format = "form-group";
        if(this.props.formatoComponente)
            format = this.props.formatoComponente;
        
        return (
            <div className={format + col(this.props.col)}>
                <div className={"form-group " + col(this.props.col)}>
                    <label className="text-primary">{this.props.titulo}</label>
                    <label className="form-control-plaintext">{this.props.valor}</label>
                </div>
            </div>
        );
    }
}
