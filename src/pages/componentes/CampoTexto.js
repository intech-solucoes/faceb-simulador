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

	onBlur = async (e) => {
		await handleFieldChange(this.props.contexto, e, this.props.parent);

		if(this.props.onBlur)
			this.props.onBlur();
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
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12" align="center">
                <label htmlFor={this.props.nome}>
					<b>{this.props.label}</b>
					<div className="text-secondary">{this.props.labelSecundaria}</div>
				</label>
				<InputMask mask={this.props.mascara} name={this.props.nome} value={this.props.valor} maxLength={this.props.max} className={"form-control " + this.props.className}
						   type={this.props.tipo} placeholder={this.props.placeholder} id={this.props.nome} disabled={this.props.desabilitado}
						   onChange={(e) => this.onChange(e)} maskChar={null} onBlur={(e) => this.onBlur(e)} />
            </div>
		);
	}
}