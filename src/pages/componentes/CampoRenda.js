import React, { Component } from 'react';

export default class CampoRenda extends Component { 
    constructor(props) {
        super(props);
    }

    render() {
        var format = "form-group";
        if(this.props.formatoComponente)
            format = this.props.formatoComponente;
        
        return (
            <div className="input-group">
                {this.props.posicaoValor === 'esquerda' &&
                    <h4 className="form-group">{this.props.valor}</h4>
                }

                {this.props.labelNegrito ? 
                    <label><b>{this.props.label}</b></label> : 
                    <label>{this.props.label}</label> 
                }

                {this.props.posicaoValor === 'direita' &&
                    <h4>{this.props.valor}</h4>
                }
            </div>
        );
    }
}
