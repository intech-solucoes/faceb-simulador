import React, { Component } from "react";
import { handleFieldChange } from "@intechprev/react-lib";

var InputMask = require('react-input-mask');

export default class CampoTexto extends Component {

	constructor(props) {
		super(props);

		this.erros = [];
		this.possuiErros = false;
	}

    onChange = async (e) => {
		await handleFieldChange(this.props.contexto, e, this.props.parent);
		
        if(this.props.onChange)
            this.props.onChange();
    }

	validar = () => {
		this.possuiErros = false;
		this.erros = [];

		if(this.props.obrigatorio)
		{
			if(this.props.valor === "") 
				this.erros.push(`Campo "${this.props.label}" obrigatório.`);
		}

		this.possuiErros = this.erros.length > 0;
	}

	render() {
		return (
            <div align="center">
                <label htmlFor={this.props.nome}><b>{this.props.label}</b></label>
				<InputMask mask={this.props.mascara} name={this.props.nome} value={this.props.valor} maxLength={this.props.max} className="form-control"
							type={this.props.tipo} placeholder={this.props.placeholder} id={this.props.nome} disabled={this.props.desabilitado}
							onChange={(e) => this.onChange(e)} maskChar={null} />
            </div>
		);
	}
}