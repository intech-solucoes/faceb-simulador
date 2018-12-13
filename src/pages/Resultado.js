import React, { Component } from 'react';

import { Botao, Row, Col, CampoEstatico, TituloResultado } from './componentes';

class Resultado extends Component {
	constructor(props) { 
		super(props);

		this.state = this.props.state;
	}

	componentDidMount = () => { 
	}

	aderir = async () => { 
		console.log("Redirecionando para Faceb...");
	}

	render() {
		return (
            <div hidden={this.props.hidden}>
				<Row>
					<Col className={"col-lg-8 col-md-8 col-sm-12 col-xs-12 center"}>
						<h3><b>Resultado da simulação</b></h3>
						<CampoEstatico titulo="Data da Aposentadoria" valor={"17/08/2050"} />

						<CampoEstatico titulo="Saldo de Contas para a data de aposentadoria" valor={"R$ 52.745,87"} />

						<CampoEstatico titulo="Valor do Resgate Solicitado" valor={"R$ 5.274,58"} />

						<h3>Opções de Recebimento da sua Aposentadoria</h3>
						<br />

						<TituloResultado titulo={"Renda por Prazo Curto"} usaBotaoInfo 
										 textoModal={"Calculada atuarialmente em função da expectativa de vida do participante e beneficiários, com ou sem reversão para pensão por morte. Benefício recalculado anualmente."} />

						<Row>
							<Col>
								<div align="middle">
									<div className="table-responsive">
										<div className="table table-result">
											<thead>
												<tr>
													<th>Com Reversão em Pensão</th>
													<th>Sem Reversão em Pensão</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td><h4>R$ 197,51</h4></td>
													<td><h4>R$ 198,04</h4></td>
												</tr>
											</tbody>
										</div>
									</div>
								</div>
							</Col>
						</Row>
						<br />

						<TituloResultado titulo={"Renda por Prazo Certo"} usaBotaoInfo 
										 textoModal={"Renda por Prazo Certo: recebimento entre 15 e 25 anos, cujo benefício será mantido em quantitativo de cotas e valorizado pela cota do mês anterior ao pagamento."} />

						<Row>
							<Col>
								<div className="table-responsive">
									<div className="table">
										<thead />
										<tbody>
											<tr>
												<td><h4>R$ 226,70 </h4>em 15 anos</td>
												<td><h4>R$ 212,53 </h4>em 16 anos</td>
												<td><h4>R$ 200,03 </h4>em 17 anos</td>
												<td><h4>R$ 188,91 </h4>em 18 anos</td>
												<td><h4>R$ 178,97 </h4>em 19 anos</td>
												<td><h4>R$ 170,02 </h4>em 20 anos</td>
											</tr>
											<tr>
												<td><h4>R$ 161,93 </h4>em 21 anos</td>
												<td><h4>R$ 154,57 </h4>em 22 anos</td>
												<td><h4>R$ 147,85 </h4>em 23 anos</td>
												<td><h4>R$ 141,68 </h4>em 24 anos</td>
												<td><h4>R$ 136,02 </h4>em 25 anos</td>
											</tr>
										</tbody>
									</div>
								</div>
							</Col>
						</Row>
						<br />
				
						<TituloResultado titulo={"Renda por percentual do saldo de contas"} usaBotaoInfo 
										 textoModal={"Renda por Percentual do Saldo: aplicação de percentual entre 0,5% a 2,0% sobre o saldo da Conta Assistido, cujo benefício será mantido em quantitativo de cotas e valorizado pela cota do mês anterior ao pagamento."} />
								
						<Row>
							<div className="table-responsive">
								<div className="table">
									<tbody>
										<tr>
											<td>
												<h4>R$ 221,51</h4>&nbsp; 0,5%
											</td>

											<td>
												<h4>R$ 442,53</h4>&nbsp; 1,0%
											</td>

											<td>
												<h4>R$ 663,09</h4>&nbsp; 1,5%
											</td>

											<td>
												<h4>R$ 884,11</h4>&nbsp; 2,0%
											</td>
										</tr>
									</tbody>
								</div>
							</div>
						</Row>
						<br />

						<Botao titulo="Voltar" clicar={() => this.props.setPaginaAtiva('informacoes', this.state)} tipo={"secondary"} usaLoading={true} />&nbsp;
						<br className="br-on-mobile" />
						<br className="br-on-mobile" />

						<Botao titulo="Clique aqui para fazer sua Adesão!" clicar={this.aderir} tipo={"primary"} usaLoading={true} />
					</Col>
				</Row>
            </div>
    	);
  	}
}

export default Resultado;
