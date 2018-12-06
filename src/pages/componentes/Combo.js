import React, { Component } from "react";

import { handleFieldChange } from "@intechprev/react-lib";

export default class Combo extends Component {
	constructor(props) {
		super(props);

		this.possuiErros = [];
		this.erros = [];
	}

	static defaultProps = {
		padrao: "",
		incremento: 1
	}

	async componentDidMount() {
		var nome = this.props.nome;

		// Atualiza o state do combo para o valor padrão selecionado via props.
		await this.props.contexto.setState({
			[nome]: this.props.padrao
		});
	}

	onChange = async (e) => {
        await handleFieldChange(this.props.contexto, e);
		
		if(this.props.onChange) {
			await this.props.onChange(e);
		}
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
		var col = "col";

		if(this.props.col)
            col = this.props.col;

		var opcoes = [];
		for(var i = this.props.min; i <= this.props.max; i = parseFloat((i + this.props.incremento).toFixed(2)))
		{
			if(this.props.decimais)
				opcoes.push(i.toFixed(2));
			else
				opcoes.push(i);
		}

        return (
			<div className={"col-lg-5 col-md-5 col-xs-12 col-sm-12"}>
				<label htmlFor={this.props.nome}>
					<b>{this.props.label}</b>
					<div className="text-secondary">{this.props.labelSecundaria}</div>
				</label>

				<select id={this.props.nome} name={this.props.nome} className="form-control" onChange={this.onChange} 
						value={this.props.valor} disabled={this.props.desabilitado}>

					{this.props.textoVazio &&
						<option value="">{this.props.textoVazio}</option>
					}

					{
						opcoes.map((opcao, index) => {
							opcao = opcao.toString();
							opcao = opcao.replace('.', ',');
							return (
								<option key={index} value={opcao}>{this.props.prefixo}{opcao}{this.props.sufixo}</option>
							);
						})
					}
					
				</select>
			</div>
        )
    }

}