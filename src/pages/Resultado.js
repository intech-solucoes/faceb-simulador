import React, { Component } from 'react';

import { Botao, Row, Col, CampoEstatico, CaixaInformativa } from './componentes';

class Resultado extends Component {
	constructor(props) { 
		super(props);

		this.state = {

		}
	}

	aderir = async () => { 
		console.log("")
	}

	render() {
		return (
            <div hidden={this.props.hidden}>
				<Row>
					<Col className={"col-8 center"}>
						<h3>Resultado da simulação</h3>
						<br />
						<CampoEstatico titulo="Data da Aposentadoria" valor={"17/08/2050"} />

						<CampoEstatico titulo="Saldo de Contas para a data de aposentadoria" valor={"R$ 52.745,87"} />

						<CampoEstatico titulo="Valor do Resgate Solicitado" valor={"R$ 5.274,58"} />

						<h4>Opções de Recebimento da sua Aposentadoria</h4>
						
						<Row>
							<Col tamanho={"5"}>
								<div align="left">
									<h5>Renda por prazo indeterminado</h5>
								</div>
							</Col>
							<Col>
								<hr />
							</Col>
						</Row>

						<Row>
							<Col tamanho="6">
								<div className="input-group">
									<label>Com Reversão em Pensão</label>&nbsp;
									<h3>R$ 197,51</h3>
								</div>
								<div className="input-group">
									<label>Com Reversão em Pensão</label>&nbsp;
									<h3>R$ 198,04</h3>
								</div>
							</Col>
							<Col tamanho="6">
								<div align="right">
									<CaixaInformativa texto={"Calculada atuarialmente em função da expectativa de vida do participante e beneficiários, com ou sem reversão para pensão por morte. Benefício recalculado anualmente."} />
								</div>
							</Col>
						</Row>

						<Botao titulo="Clique aqui para fazer sua Adesão!" clicar={this.aderir} tipo={"primary"} block={true} usaLoading={true} />
					</Col>
				</Row>
            </div>
    	);
  	}
}

export default Resultado;
