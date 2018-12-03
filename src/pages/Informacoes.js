import React, { Component } from 'react';
import { CampoTexto, Combo, Row, Col, Botao } from './componentes';

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
		await this.limparErros();
        for(var i = 0; i < this.listaCampos.length; i++) {
			var campo = this.listaCampos[i];

			await campo.validar();

            if(campo.possuiErros)
				await this.adicionarErro(campo.erros);
			
			
		}
		
		if(this.erros.length === 0)
			this.props.setPaginaAtiva("resultado", this.state);
	}

	render() {
		return (
            <div hidden={this.props.hidden} >
				<h5>Para começar, precisamos de algumas informações sobre</h5>
				<h5>você e sua contribuição para o plano CEBPREV!</h5>
				<br />
				<Row>
					<Col className="col-5 center">

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[0] = input } tipo="text" nome="nome" 
									valor={this.state.nome} label={"Digite seu nome"} max="50" obrigatorio />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[1] = input } tipo="text" nome="dataNascimento" 
									valor={this.state.dataNascimento} label={"Digite sua data de nascimento"} mascara={"99/99/9999"} obrigatorio />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[2] = input } tipo="text" nome="remuneracaoInicial" 
									valor={this.state.remuneracaoInicial} label={"Digite sua Remuneração Inicial"} obrigatorio />

						<Combo contexto={this} ref={ (input) => this.listaCampos[3] = input } nome="percentualContribuicao" valor={this.state.percentualContribuicao}
							   label={"Escolha o percentual de contribuição entre 5% e 10% (a patrocinadora também contribuirá com o mesmo % para você!)"} 
							   min={5} max={10} incremento={1} padrao={10} obrigatorio sufixo={"%"} />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[4] = input } tipo="text" nome="contribuicaoFacultativa" 
									valor={this.state.contribuicaoFacultativa} obrigatorio
									label={"Deseja realizar contribuições facultativas? (Contribuição exclusiva do participante)"}  />
						
						<h4>Composição Familiar</h4>

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[5] = input } nome="nascimentoConjugue" mascara={"99/99/9999"}
									valor={this.state.nascimentoConjugue} tipo="text" label={"Data de nascimento do cônjugue ou companheiro"} />
									
						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[6] = input } nome="nascimentoFilhoInvalido" mascara={"99/99/9999"}
									valor={this.state.nascimentoFilhoInvalido} tipo="text" label={"Possui filho inválido? Data de nascimento"} />

						<CampoTexto contexto={this} ref={ (input) => this.listaCampos[7] = input } nome="nascimentoFilhoMaisNovo" mascara={"99/99/9999"}
									valor={this.state.nascimentoFilhoMaisNovo} tipo="text" label={"Data de nascimento do filho mais novo"} />														
						
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

						{this.erros.length > 0 &&
							<div className="alert alert-danger" role="alert" 
								dangerouslySetInnerHTML={{__html: this.state.erros.join("<br/>") }}>
							</div>
						}

						<div className="text-primary">
							Dados válidos somente para essa simulação!
						</div>

						<Botao titulo="Enviar" clicar={this.continuar} tipo={"primary"} block={true} usaLoading={true} />
					</Col>
				</Row>
            </div>
    	);
  	}
}

export default Informacoes;
