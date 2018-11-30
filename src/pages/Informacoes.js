import React, { Component } from 'react';
import { CampoTexto, Combo, Row, Col, Botao } from './componentes';

class Informacoes extends Component {
	constructor(props) {
		super(props);

		this.state = this.props.state;
	}
	
	continuar = async () => { 
		this.props.setPaginaAtiva("resultado", this.state);
	}

	render() {
		return (
            <div hidden={this.props.hidden} >
                <h4>Para começar, precisamos de algumas informações sobre você e sua contribuição para o plano CEBPREV!</h4>

				<CampoTexto contexto={this} tipo="text" nome="nome" value={this.state.nome} label={"Digite seu nome"} 
							max="50" obrigatorio />

				<CampoTexto contexto={this} tipo="text" nome="dataNascimento" mascara={"+4\9 99 999 99"} value={this.state.dataNascimento} 
						    label={"Digite sua data de nascimento"} obrigatorio />

				<CampoTexto contexto={this} tipo="text" nome="remuneracaoInicial" value={this.state.remuneracaoInicial} 
						    label={"Digite sua Remuneração Inicial"} obrigatorio />

				<Combo contexto={this} nome="percentualContribuicao" valor={this.state.percentualContribuicao}
					   label={"Escolha o percentual de contribuição entre 5% e 10% (a patrocinadora também contribuirá com o mesmo % para você!)"} 
					   min={5} max={10} incremento={1} padrao={10} obrigatorio />

				<CampoTexto contexto={this} tipo="text" nome="contribuicaoFacultativa" value={this.state.contribuicaoFacultativa} 
							label={"Deseja realizar contribuições facultativas? (Contribuição exclusiva do participante)"} obrigatorio mascara="99999-9999"/>
				
				<h4>Composição Familiar</h4>

				<CampoTexto contexto={this} mascara={"99/99/9999"} nome="nascimentoConjugue" value={this.state.nascimentoConjugue} 
						    tipo="text" label={"Data de nascimento do cônjugue ou companheiro"} />
							
				<CampoTexto contexto={this} mascara={"99/99/9999"} nome="nascimentoFilhoInvalido" value={this.state.nascimentoFilhoInvalido} 
							tipo="text" label={"Possui filho inválido? Data de nascimento"} />

				<CampoTexto contexto={this} mascara={"99/99/9999"} nome="nascimentoFilhoMaisNovo" value={this.state.nascimentoFilhoMaisNovo} 
						    tipo="text" label={"Data de nascimento do filho mais novo"} />														
				
				<h3>Estamos quase lá!</h3>

				<Combo contexto={this} label={"Com quantos anos você pretende se aposentar?"} 
					   nome="idadeAposentadoria" valor={this.state.idadeAposentadoria} obrigatorio
					   min={48} max={70} incremento={1} padrao={48} sufixo={"anos"} />

				<Combo contexto={this} label={"Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?"} 
					   nome="percentualSaque" valor={this.state.percentualSaque} obrigatorio
					   min={1} max={25} incremento={1} textoVazio={"NÃO"} prefixo={"SIM - "} sufixo={"%"} />

				<Combo contexto={this} label={"Taxa de juros para simulação"} 
					   nome="taxaJuros" valor={this.state.taxaJuros} obrigatorio
					   min={4} max={5.5} incremento={0.5} padrao={4} sufixo={"%"} />

				<h4>Dados válidos somente para essa simulação!</h4>

				<Botao titulo="Enviar" clicar={this.continuar} tipo={"primary"} block={true} usaLoading={true} />
            </div>
    	);
  	}
}

export default Informacoes;
