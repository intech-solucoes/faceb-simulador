import React, { Component } from 'react';
import { CampoTexto, Combo, Row, Col, Botao } from './componentes';
import DataInvalida from './utils/Data';

class Informacoes extends Component {
	constructor(props) {
		super(props);

        this.listaCampos = [];
        this.erros = [];

		this.state = this.props.state;
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
		if(this.state.percentualSaque === '')
			await this.setState({ percentualSaque: 0 });

		await this.limparErros();
        for(var i = 0; i < this.listaCampos.length; i++) {
			var campo = this.listaCampos[i];

			await campo.validar();

            if(campo.possuiErros)
				await this.adicionarErro(campo.erros);
		}
		
		if(this.state.nascimentoConjugue.length <= 0)
			await this.setState({ erroNascimentoConjugue: false });	

		if(this.state.nascimentoFilhoInvalido.length <= 0)
			await this.setState({ erroNascimentoFilhoInvalido: false });	

		if(this.state.nascimentoFilhoMaisNovo.length <= 0)
			await this.setState({ erroNascimentoFilhoMaisNovo: false });	

		var errosData = this.state.erroDataNascimento || this.state.erroNascimentoConjugue || this.state.erroNascimentoFilhoInvalido 
					|| this.state.erroNascimentoFilhoMaisNovo;

		if(this.erros.length === 0 && !errosData)
			this.props.setPaginaAtiva("resultado", this.state);
	}

	onBlurCampoMonetario = async () => { 
		console.log("");
	}

	validarData = async (campoErro, valor) => {
		var dataPartes = valor.split("/");
		var dataObjeto = new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
		
		var dataInvalida = DataInvalida(dataObjeto, valor);
		
		await this.setState({
			[campoErro]: dataInvalida
		})
	}

	render() {
		return (
            <div hidden={this.props.hidden} >
				<Row>
					<Col className="col-12 center">
						<h5>Para começar, precisamos de algumas informações sobre</h5>
						<h5>você e sua contribuição para o plano CEBPREV!</h5>
						<br />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[0] = input } tipo="text" nome="nome" 
									valor={this.state.nome} label={"Digite seu nome"} max="50" obrigatorio />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[1] = input } tipo="data" nome="dataNascimento" 
									valor={this.state.dataNascimento} label={"Digite sua data de nascimento"} mascara={"99/99/9999"} obrigatorio 
									onBlur={() => this.validarData('erroDataNascimento', this.state.dataNascimento)} erro={this.state.erroDataNascimento} />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[2] = input } tipo="text" nome="remuneracaoInicial" className="money"
									valor={this.state.remuneracaoInicial} label={"Digite sua Remuneração Inicial"} max={10} obrigatorio onBlur={this.onBlurCampoMonetario} />

						<Combo contexto={this} ref={ (input) => this.listaCampos[3] = input } nome="percentualContribuicao" valor={this.state.percentualContribuicao}
							   label={"Escolha o percentual de contribuição entre 5% e 10%"} labelSecundaria={"(a patrocinadora também contribuirá com o mesmo % para você!)"} 
							   min={5} max={10} incremento={1} padrao={10} obrigatorio sufixo={"%"} />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[4] = input } tipo="text" nome="contribuicaoFacultativa" 
									valor={this.state.contribuicaoFacultativa} obrigatorio className="money" max={10} onBlur={this.onBlurCampoMonetario}
									label={"Deseja realizar contribuições facultativas?"} labelSecundaria={"(Contribuição exclusiva do participante)"} />
						<br />

						<h4>Composição Familiar</h4>

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[5] = input } nome="nascimentoConjugue" mascara={"99/99/9999"}
									valor={this.state.nascimentoConjugue} tipo="data" label={"Data de nascimento do cônjugue ou companheiro"} 
									onBlur={() => this.validarData('erroNascimentoConjugue', this.state.nascimentoConjugue)} erro={this.state.erroNascimentoConjugue} />
									
						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[6] = input } nome="nascimentoFilhoInvalido" mascara={"99/99/9999"}
									valor={this.state.nascimentoFilhoInvalido} tipo="data" label={"Possui filho inválido? Data de nascimento"} 
									onBlur={() => this.validarData('erroNascimentoFilhoInvalido', this.state.nascimentoFilhoInvalido)} erro={this.state.erroNascimentoFilhoInvalido} />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[7] = input } nome="nascimentoFilhoMaisNovo" mascara={"99/99/9999"}
									valor={this.state.nascimentoFilhoMaisNovo} tipo="data" label={"Data de nascimento do filho mais novo"} 
									onBlur={() => this.validarData('erroNascimentoFilhoMaisNovo', this.state.nascimentoFilhoMaisNovo)} erro={this.state.erroNascimentoFilhoMaisNovo} />														
						<br />

						<h3>Estamos quase lá!</h3>

						<Combo contexto={this} ref={ (input) => this.listaCampos[8] = input } label={"Com quantos anos você pretende se aposentar?"} 
							   nome="idadeAposentadoria" valor={this.state.idadeAposentadoria} obrigatorio
							   min={48} max={70} incremento={1} padrao={48} sufixo={" anos"} />

						<Combo contexto={this} ref={ (input) => this.listaCampos[9] = input } 
							   label={"Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?"} 
							   nome="percentualSaque" valor={this.state.percentualSaque} obrigatorio
							   min={1} max={25} incremento={1} textoVazio={"NÃO"} prefixo={"SIM - "} sufixo={"%"} />

						<Combo contexto={this} ref={ (input) => this.listaCampos[10] = input } label={"Taxa de juros para simulação"} 
							   nome="taxaJuros" valor={this.state.taxaJuros} obrigatorio
							   min={4} max={5.5} incremento={0.5} padrao={4} sufixo={"%"} decimais />

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
