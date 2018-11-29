import React, { Component } from "react";
import { Row, Col } from "../componentes";

import { handleFieldChange } from "@intechprev/react-lib";

export default class Combo extends Component {

	constructor(props) {
		super(props);
	}

	static defaultProps = {
		padrao: "",
		opcoes: [],
		textoVazio: "Selecione uma opção",
		nomeMembro: "nome",
		valorMembro: "valor"
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
        console.log(this.props.contexto.state);
		
		if(this.props.onChange) {
			await this.props.onChange(e);
		}
	}

    render() {
		var col = "col";

		if(this.props.col)
            col = this.props.col;

        return (
			<Row className="form-group row">

				<Col className={col}>
                    <b><label htmlFor={this.props.nome}>
                        {this.props.label} {this.props.obrigatorio && " *"}
                    </label></b>

					<select id={this.props.nome} name={this.props.nome} className="form-control" onChange={this.onChange} 
						    value={this.props.valor} disabled={this.props.desabilitado}>

						{this.props.textoVazio &&
							<option value="">{this.props.textoVazio}</option>
						}

						{
							this.props.opcoes.map((opcao, index) => {
								return (
									<option key={index} value={opcao[this.props.valorMembro]}>{opcao[this.props.nomeMembro]}</option>
								)
							})
						}
						
                    </select>
				</Col>
			</Row>
        )
    }

}