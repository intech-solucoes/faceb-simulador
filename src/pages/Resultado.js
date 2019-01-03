import React, { Component } from 'react';
import { SimuladorService } from '@intechprev/advanced-service';

import { Botao, Row, Col, CampoEstatico, TituloResultado } from './componentes';

const service = new SimuladorService();

class Resultado extends Component {
	constructor(props) { 
		super(props);

		this.state = this.props.state;
	}

	componentDidMount = () => { 
	}

	onVisible = async (state) => {
		await this.setState(state);

		var contribBasica =  this.converteStringFloat(this.state.remuneracaoInicial) * (this.state.percentualContribuicao / 100);
		var contribFacultativa =  this.converteStringFloat(this.state.contribuicaoFacultativa);
		var taxaJuros = this.state.taxaJuros;
		
		var nascimentoConjugue = this.state.nascimentoConjugue === "" ? null : this.state.nascimentoConjugue;
		var nascimentoFilhoInvalido = this.state.nascimentoFilhoInvalido === "" ? null : this.state.nascimentoFilhoInvalido;
		var nascimentoFilhoMaisNovo = this.state.nascimentoFilhoMaisNovo === "" ? null : this.state.nascimentoFilhoMaisNovo;

		try {
			var { data: resultadoSimulacao } = await service.SimularNaoParticipante(contribBasica, contribFacultativa, 
				this.state.idadeAposentadoria, this.state.percentualSaque, this.state.dataNascimento, nascimentoConjugue, 
				nascimentoFilhoInvalido, nascimentoFilhoMaisNovo, taxaJuros);

			await this.setState({
				valorFuturo: resultadoSimulacao.valorFuturo,
				dataAposentadoria: resultadoSimulacao.dataAposentadoria,
				valorSaque: resultadoSimulacao.valorSaque,
				idadeDependente: resultadoSimulacao.idadeDependente,
				fatorAtuarialPensaoMorte: resultadoSimulacao.fatorAtuarialPensaoMorte,
				fatorAtuarialSemPensaoMorte: resultadoSimulacao.fatorAtuarialSemPensaoMorte,
				rendaPrazoIndeterminadoPensaoMorte: resultadoSimulacao.rendaPrazoIndeterminadoPensaoMorte,
				rendaPrazoIndeterminadoSemPensaoMorte: resultadoSimulacao.rendaPrazoIndeterminadoSemPensaoMorte,
				listaPrazos: resultadoSimulacao.listaPrazos,
				listaSaldoPercentuais: resultadoSimulacao.listaSaldoPercentuais
			});

			this.formatarValorBrasileiro(resultadoSimulacao);
		} catch(err) {
			if(err.response) {
				console.error(err.response.data);
			} else {
				console.error(err);
			}
		}
	}

    converteStringFloat = (valor) => {
		if(typeof(valor) !== 'string')
			return valor;

		if(valor.match(/./))
			valor = valor.replace(/\./g, '');   // Troca todos os pontos por espaços vazios (pontos que separam os milhares).
			
        valor = valor.replace(',', '.');    // Troca a única vírgula por ponto.
		valor = parseFloat(valor);
        return valor;
	}

	formatarValorBrasileiro = async (resultados) => {
		for (const resultado in resultados) {
			if(typeof(resultados[resultado]) === "number") {
				resultados[resultado] = parseFloat(resultados[resultado]);
				resultados[resultado] = resultados[resultado].toFixed(2).split('.');
				resultados[resultado][0] = resultados[resultado][0].split(/(?=(?:...)*$)/).join('.');   // Regex utilizada para colocar um (.) a cada 3 casas decimais antes da vírgula, para separar os milhares.
				resultados[resultado] = resultados[resultado].join(',');

			} else if (typeof(resultados[resultado]) === "object") {
				for (const valorPrazo in resultados[resultado]) {
					resultados[resultado][valorPrazo].Value= parseFloat(resultados[resultado][valorPrazo].Value);
					resultados[resultado][valorPrazo].Value= resultados[resultado][valorPrazo].Value.toFixed(2).split('.');
					resultados[resultado][valorPrazo].Value[0] = resultados[resultado][valorPrazo].Value[0].split(/(?=(?:...)*$)/).join('.');   // Regex utilizada para colocar um (.) a cada 3 casas decimais antes da vírgula, para separar os milhares.
					resultados[resultado][valorPrazo].Value= resultados[resultado][valorPrazo].Value.join(',');
				}
			}
			await this.setState({ [resultado]: resultados[resultado] });
		}
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
