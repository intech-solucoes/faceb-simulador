import React, { Component } from 'react';

import { Botao, Row, Col, CampoEstatico, TituloResultado } from './componentes';

class Resultado extends Component {
	constructor(props) { 
		super(props);

		this.state = this.props.state;
	}

	componentDidMount = () => { 
	}

	onVisible = async (state) => {
		await this.setState(state);
	}

	aderir = async () => { 
		window.open('http://www.faceb.com.br/', '_blank');
	}

	render() {
		return (
            <div hidden={this.props.hidden}>
				<Row>
					<Col className={"col-lg-8 col-md-8 col-sm-12 col-xs-12 center"}>
						<h3><b>Resultado da simulação</b></h3>
						<CampoEstatico titulo="Data da Aposentadoria" valor={this.state.dataAposentadoria} />

						<CampoEstatico titulo="Saldo de Contas para a data de aposentadoria" valor={`R$ ${this.state.valorFuturo}`} />

						<CampoEstatico titulo="Valor do Resgate Solicitado" valor={`R$ ${this.state.valorSaque}`} />

						<h3>Opções de Recebimento da sua Aposentadoria</h3>
						<br />

						<TituloResultado titulo={"Renda por Prazo Indeterminado"} usaBotaoInfo 
										 textoModal={"Calculada atuarialmente em função da expectativa de vida do participante e dos beneficiários, com ou sem reversão para pensão por morte. Benefício recalculado anualmente."} />

						<Row>
							<Col>
								<div align="middle">
									<div className="table-responsive">
										<table className="table table-result">
											<thead>
												<tr>
													<th>Com Reversão em Pensão</th>
													<th>Sem Reversão em Pensão</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td><h4>R$ {this.state.rendaPrazoIndeterminadoPensaoMorte}</h4></td>
													<td><h4>R$ {this.state.rendaPrazoIndeterminadoSemPensaoMorte}</h4></td>
												</tr>
											</tbody>
										</table>
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
									<table className="table">
										<thead />
										<tbody>
											<tr>
												<td><h4>R$ {this.state.listaPrazos[0].Value} </h4>em {this.state.listaPrazos[0].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[1].Value} </h4>em {this.state.listaPrazos[1].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[2].Value} </h4>em {this.state.listaPrazos[2].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[3].Value} </h4>em {this.state.listaPrazos[3].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[4].Value} </h4>em {this.state.listaPrazos[4].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[5].Value} </h4>em {this.state.listaPrazos[5].Key} anos</td>
											</tr>
											<tr>
												<td><h4>R$ {this.state.listaPrazos[6].Value} </h4>em {this.state.listaPrazos[6].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[7].Value} </h4>em {this.state.listaPrazos[7].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[8].Value} </h4>em {this.state.listaPrazos[8].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[9].Value} </h4>em {this.state.listaPrazos[9].Key} anos</td>
												<td><h4>R$ {this.state.listaPrazos[10].Value} </h4>em {this.state.listaPrazos[10].Key} anos</td>
											</tr>
										</tbody>
									</table>
								</div>
							</Col>
						</Row>
						<br />

						<TituloResultado titulo={"Renda por percentual do saldo de contas"} usaBotaoInfo 
										 textoModal={"Renda por Percentual do Saldo: aplicação de percentual entre 0,5% a 2,0% sobre o saldo da Conta Assistido, cujo benefício será mantido em quantitativo de cotas e valorizado pela cota do mês anterior ao pagamento."} />
								
						<Row>
							<div className="table-responsive">
								<table className="table">
									<tbody>
										<tr>
											<td>
												<h4>R$ {this.state.listaSaldoPercentuais[0].Value}</h4>&nbsp; {this.state.listaSaldoPercentuais[0].Key}%
											</td>

											<td>
												<h4>R$ {this.state.listaSaldoPercentuais[1].Value}</h4>&nbsp; {this.state.listaSaldoPercentuais[1].Key}%
											</td>

											<td>
												<h4>R$ {this.state.listaSaldoPercentuais[2].Value}</h4>&nbsp; {this.state.listaSaldoPercentuais[2].Key}%
											</td>

											<td>
												<h4>R$ {this.state.listaSaldoPercentuais[3].Value}</h4>&nbsp; {this.state.listaSaldoPercentuais[3].Key}%
											</td>
										</tr>
									</tbody>
								</table>
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
