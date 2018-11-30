import React, { Component } from "react";
import { handleFieldChange } from "@intechprev/react-lib";

var InputMask = require('react-input-mask');

export default class CampoTexto extends Component {

	constructor(props) {
		super(props);

		this.erros = [];
		this.temErros = false;
	}

    onChange = async (e) => {
		await handleFieldChange(this.props.contexto, e, this.props.parent);
		console.log(this.props.contexto.state);
		
        if(this.props.onChange)
            this.props.onChange();
    }

	render() {
		return (
            <div align="center">
                <label htmlFor={this.props.nome}><b>{this.props.label}</b></label>
                <div className="input-group">
					<InputMask mask={this.props.mascara} name={this.props.nome} value={this.props.valor} maxLength={this.props.max} className="form-control"
							   type={this.props.tipo} placeholder={this.props.placeholder} id={this.props.nome} disabled={this.props.desabilitado}
							   onChange={(e) => this.onChange(e)} />
                </div>
            </div>
		);
	}
}