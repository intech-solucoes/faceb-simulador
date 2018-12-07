import React, { Component } from 'react';

import { Botao, Row, Col, CampoEstatico, CaixaInformativa, CampoRenda } from './componentes';

class Resultado extends Component {
	constructor(props) { 
		super(props);

		this.state = this.props.state;
		this.anos = 0;
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
						
						<Row>
							<Col tamanho={"5"}>
								<div align="left">
									<h5><b>Renda por prazo indeterminado</b></h5>
								</div>
							</Col>
							<Col>
								<hr />
							</Col>
						</Row>

						<Row>
							<Col>
								<div align="middle">
									<CampoRenda valor={"R$ 197,51"} label={"Com Reversão em Pensão"} posicaoValor={"direita"} />
									<CampoRenda valor={"R$ 198,04"} label={"Sem Reversão em Pensão"} posicaoValor={"direita"} />
								</div>
							</Col>
							<Col tamanho="7">
								<div align="right">
									<CaixaInformativa texto={"Calculada atuarialmente em função da expectativa de vida do participante e beneficiários, com ou sem reversão para pensão por morte. Benefício recalculado anualmente."} />
								</div>
							</Col>
						</Row>
						
						<Row>
							<Col>
								<div align="left">
									<h5><b>Renda por Prazo Certo</b></h5>
								</div>
							</Col>
							<Col tamanho={"8"}>
								<hr />
							</Col>
						</Row>

						<Row>
							<Col>
								{
									this.state.rendaCurtoPrazo.map((index) => { 
										this.anos++;
										return (
											<CampoRenda key={index} valor={`R$ ${index}`} label={`em ${this.anos} anos`} posicaoValor={"esquerda"} />
										);
									})
								}
							</Col>
							<Col tamanho="7">
								<div align="right">
									<CaixaInformativa texto={"Renda por Prazo Certo: recebimento entre 15 e 20 anos, cujo benefício será mantido em quantitativo de cotas e valorizado pela cota do mês anterior ao pagamento."} />
								</div>
								<br />
							</Col>
						</Row>
						<br />
						
						<Row>
							<Col tamanho={"5"}>
								<div align="left">
									<h5><b>Renda por percentual do saldo de contas</b></h5>
								</div>
							</Col>
							<Col>
								<hr />
							</Col>
						</Row>

						<Row>
							<Col>
								<CampoRenda valor={"R$ 221,51"} label={"0,5%"} posicaoValor={"esquerda"} />
								<CampoRenda valor={"R$ 442,53"} label={"1,0%"} posicaoValor={"esquerda"} />
								<CampoRenda valor={"R$ 663,09"} label={"1,5%"} posicaoValor={"esquerda"} />
								<CampoRenda valor={"R$ 884,11"} label={"2,0%"} posicaoValor={"esquerda"} />
							</Col>
							<Col tamanho="7">
								<div align="right">
									<CaixaInformativa texto={"Renda por Percentual do Saldo: aplicação de percentual entre 0,5% a 2,0% sobre o saldo da Conta Assistido, cujo benefício será mantido em quantitativo de cotas e valorizado pela cota do mês anterior ao pagamento."} />
								</div>
							</Col>
						</Row>
						<br />

						<Botao titulo="Clique aqui para fazer sua Adesão!" clicar={this.aderir} tipo={"primary"} block={true} usaLoading={true} />
					</Col>
				</Row>
            </div>
    	);
  	}
}

export default Resultado;
