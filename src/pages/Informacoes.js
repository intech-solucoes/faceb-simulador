import React, { Component } from 'react';
import { CampoTexto, Combo, Row, Col, Botao } from './componentes';
import { DataInvalida, CalculaIdade } from './utils';
import { SimuladorService } from '@intechprev/advanced-service';

const service = new SimuladorService();

class Informacoes extends Component {
	constructor(props) {
		super(props);

        this.listaCampos = [];
        this.erros = [];

		this.state = this.props.state;
	}

	componentDidMount() {
		setTimeout(() => this.calcularIdadeMinima(), 5000)
	}

    onVisible(state) {
        this.setState(state);
    }

    limparErros = async () => {
        this.erros = [];
        await this.setState({ erros: this.erros });
    }

    adicionarErro = async (mensagem) => {
        this.erros.push(mensagem);
        await this.setState({ erros: this.erros });
    }

	continuar = async () => { 
		try {
			if(this.state.percentualSaque === '')
				await this.setState({ percentualSaque: 0 });
	
			await this.limparErros();
			for(var i = 0; i < this.listaCampos.length; i++) {
                var campo = this.listaCampos[i];
	
				await campo.validar();
	
				if(campo.possuiErros)
					await this.adicionarErro(campo.erros);
			}
			
			if(this.state.nascimentoConjuge.length <= 0)
				await this.setState({ erroNascimentoConjuge: false });	
	
			if(this.state.nascimentoFilhoInvalido.length <= 0)
				await this.setState({ erroNascimentoFilhoInvalido: false });	
	
			if(this.state.nascimentoFilhoMaisNovo.length <= 0)
                await this.setState({ erroNascimentoFilhoMaisNovo: false });
                
            if(this.state.possuiFilhoInvalido === "N") {
                await this.setState({ 
                    nascimentoFilhoInvalido: null, 
                    sexoFilhoInvalido: null
                });
            }
                
            if(this.state.possuiFilhos === "N") {
                await this.setState({ 
                    nascimentoFilhoMaisNovo: null, 
                    sexoFilhoMaisNovo: null
                });
            }
	
			var errosData = this.state.erroDataNascimento || this.state.erroNascimentoConjuge || this.state.erroNascimentoFilhoInvalido 
						|| this.state.erroNascimentoFilhoMaisNovo;
	
			var contribBasica =  this.converteStringFloat(this.state.remuneracaoInicial) * (this.state.percentualContribuicao / 100);
			var contribFacultativa =  this.converteStringFloat(this.state.contribuicaoFacultativa);
            var aporteInicial = this.state.aporte === "" ? 0 : this.converteStringFloat(this.state.aporte);
			var taxaJuros = this.converteStringFloat(this.state.taxaJuros);
            
            var sexo = this.state.sexo === "" ? "M" : this.state.sexo;

			var nascimentoConjuge = this.state.nascimentoConjuge === "" ? null : this.state.nascimentoConjuge;
            var nascimentoFilhoInvalido = this.state.nascimentoFilhoInvalido === "" ? null : this.state.nascimentoFilhoInvalido;
            var sexoFilhoInvalido = this.state.sexoFilhoInvalido === "" ? "M" : this.state.sexoFilhoInvalido;
            var nascimentoFilhoMaisNovo = this.state.nascimentoFilhoMaisNovo === "" ? null : this.state.nascimentoFilhoMaisNovo;
            var sexoFilhoMaisNovo = this.state.sexoFilhoMaisNovo === "" ? "M" : this.state.sexoFilhoMaisNovo;

			if(this.erros.length === 0 && !errosData) {
				var { data: resultadoSimulacao } = await service.SimularNaoParticipante(contribBasica, contribFacultativa, aporteInicial,
					this.state.idadeAposentadoria, this.state.percentualSaque, this.state.dataNascimento, sexo, nascimentoConjuge, 
					nascimentoFilhoInvalido, sexoFilhoInvalido, nascimentoFilhoMaisNovo, sexoFilhoMaisNovo, taxaJuros);
	
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
	
				await this.formatarValorBrasileiro(resultadoSimulacao);
				this.props.setPaginaAtiva("resultado", this.state);
			}
				
		} catch(err) {
			if(err.response) {
				console.error(err.response.data)
				this.adicionarErro(err.response.data);
			} else
				console.error(err);
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

	onBlurCampoMonetario = async () => { 
	}

	validarData = async (campoErro, valor) => {
		var dataPartes = valor.split("/");
		var dataObjeto = new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
		
		var dataInvalida = DataInvalida(dataObjeto, valor);
		if(valor !== "")
			await this.setState({ [campoErro]: dataInvalida })

		this.calcularIdadeMinima();
	}

	calcularIdadeMinima = () => {
		var dataNascimento = new Date(this.converteData(this.state.dataNascimento));
		var idade = CalculaIdade(dataNascimento).anos;
		
		if(idade < 48)
			return 48;
		else if(idade >= 48 && idade <= 70)
			return idade;
		else if(idade === isNaN(idade))
			return 48;
		else if(idade > 70)
			return 70;
	}

	converteData = (dataString) => {
        var dataPartes = dataString.split("/");
        return new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
	}
	
	render() {
		return (
            <div hidden={this.props.hidden} >
				<Row>
					<Col className="col-12 center">
						<h5>Para começar, precisamos de algumas informações sobre você e sua contribuição para o plano CEBPREV!</h5>
						<br />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[0] = input } tipo="text" nome="nome" 
									valor={this.state.nome} label={"Digite seu nome"} max="50" obrigatorio />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[1] = input } tipo="data" nome="dataNascimento" 
									valor={this.state.dataNascimento} label={"Digite sua data de nascimento"} mascara={"99/99/9999"} obrigatorio 
									onBlur={() => this.validarData('erroDataNascimento', this.state.dataNascimento)} erro={this.state.erroDataNascimento} />
                            
                        <Combo contexto={this} opcoes={[{ valor: "M", titulo: "MASCULINO"} , { valor: "F", titulo: "FEMININO" }]}
                                label={"Sexo"} 
                                nome="sexo" valor={this.state.sexo} obrigatorio />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[2] = input } tipo="text" nome="remuneracaoInicial" className="money"
									valor={this.state.remuneracaoInicial} label={"Digite seu salário bruto"} max={10} obrigatorio onBlur={this.onBlurCampoMonetario} />

						<Combo contexto={this} ref={ (input) => this.listaCampos[3] = input } nome="percentualContribuicao" valor={this.state.percentualContribuicao}
							   label={"Escolha o percentual de contribuição entre 5% e 10%"} labelSecundaria={"(a patrocinadora também contribuirá com o mesmo % para você!)"} 
							   min={5} max={10} incremento={1} padrao={10} obrigatorio sufixo={"%"} />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[4] = input } tipo="text" nome="contribuicaoFacultativa" 
									valor={this.state.contribuicaoFacultativa} obrigatorio className="money" max={10} onBlur={this.onBlurCampoMonetario}
									label={"Deseja realizar contribuições facultativas?"} labelSecundaria={"(Contribuição exclusiva do participante)"} />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[5] = input } tipo="text" nome="aporte" 
									valor={this.state.aporte} className="money" max={10} label={"Deseja realizar um aporte inicial?"} />

						<h4 className={"mt-5"}>Composição Familiar</h4>

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[6] = input } nome="nascimentoConjuge" mascara={"99/99/9999"}
									valor={this.state.nascimentoConjuge} tipo="data" label={"Data de nascimento do cônjuge ou companheiro"} 
									onBlur={() => this.validarData('erroNascimentoConjuge', this.state.nascimentoConjuge)} erro={this.state.erroNascimentoConjuge} />

                        <div className={"mt-5"}>
                            <Combo contexto={this} opcoes={[{ valor: "N", titulo: "NÃO"} , { valor: "S", titulo: "SIM" }]}
                                label={"Possui filho inválido (portador de necessidades especiais)?"} 
                                nome="possuiFilhoInvalido" valor={this.state.possuiFilhoInvalido} obrigatorio />
                        </div>

                        {this.state.possuiFilhoInvalido && this.state.possuiFilhoInvalido === "S" &&
                            <div>
                                <CampoTexto contexto={this} nome="nascimentoFilhoInvalido" mascara={"99/99/9999"}
                                            valor={this.state.nascimentoFilhoInvalido} tipo="data" label={"Data de nascimento do filho inválido"} 
                                            onBlur={() => this.validarData('erroNascimentoFilhoInvalido', this.state.nascimentoFilhoInvalido)} erro={this.state.erroNascimentoFilhoInvalido} />

                                <Combo contexto={this} opcoes={[{ valor: "M", titulo: "MASCULINO"} , { valor: "F", titulo: "FEMININO" }]}
                                        label={"Sexo do filho inválido"} 
                                        nome="sexoFilhoInvalido" valor={this.state.sexoFilhoInvalido} obrigatorio />
                            </div>
                        }
                        
                        <div className={"mt-5"}>
                            <Combo contexto={this} opcoes={[{ valor: "N", titulo: "NÃO"} , { valor: "S", titulo: "SIM" }]}
                                label={"Possui filhos?"} 
                                nome="possuiFilhos" valor={this.state.possuiFilhos} obrigatorio />
                        </div>
                        
                        {this.state.possuiFilhos && this.state.possuiFilhos === "S" &&
                            <div>
                                <CampoTexto contexto={this} nome="nascimentoFilhoMaisNovo" mascara={"99/99/9999"}
                                            valor={this.state.nascimentoFilhoMaisNovo} tipo="data" label={"Data de nascimento do filho mais novo"} 
                                            onBlur={() => this.validarData('erroNascimentoFilhoMaisNovo', this.state.nascimentoFilhoMaisNovo)} erro={this.state.erroNascimentoFilhoMaisNovo} />

                                <Combo contexto={this} opcoes={[{ valor: "M", titulo: "MASCULINO"} , { valor: "F", titulo: "FEMININO" }]}
                                        label={"Sexo do filho mais novo"}
                                        nome="sexoFilhoMaisNovo" valor={this.state.sexoFilhoMaisNovo} obrigatorio />
                            </div>
                        }

						<h3 className={"mt-5"}>Estamos quase lá!</h3>

						<Combo contexto={this} ref={ (input) => this.listaCampos[7] = input } label={"Com quantos anos você pretende se aposentar?"} 
							   nome="idadeAposentadoria" valor={this.state.idadeAposentadoria} obrigatorio
							   min={this.calcularIdadeMinima()} max={70} incremento={1} padrao={48} sufixo={" anos"} />

						<Combo contexto={this} ref={ (input) => this.listaCampos[8] = input } 
							   label={"Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?"} 
							   nome="percentualSaque" valor={this.state.percentualSaque} obrigatorio
							   min={1} max={25} incremento={1} textoVazio={"NÃO"} prefixo={"SIM - "} sufixo={"%"} />

						<Combo contexto={this} opcoes={[ "4,00", "4,23", "4,50", "5,00", "5,50" ]}
							   nome="taxaJuros" valor={this.state.taxaJuros} obrigatorio label={"Taxa de Juros"}
							   padrao={"4,23"} sufixo={"%"} decimais />

						<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
							{this.erros.length > 0 &&
								<div className="alert alert-danger" role="alert" 
									dangerouslySetInnerHTML={{__html: this.state.erros.join("<br/>") }}>
								</div>
							}
						</div>
						<br />

						<div className="text-secondary">
							<h6>Dados válidos somente para essa simulação!</h6>
						</div>
						<br />

						<Botao titulo={"Continuar  "} clicar={this.continuar} tipo={"primary"} block={true} usaLoading={true}>
							<i className="fas fa-angle-right" />
							<i className="fas fa-angle-right" />
						</Botao>
					</Col>
				</Row>
            </div>
    	);
  	}
}

export default Informacoes;
