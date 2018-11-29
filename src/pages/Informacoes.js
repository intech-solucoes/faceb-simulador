import React, { Component } from 'react';
import { CampoTexto, Combo, Row, Col, Botao } from './componentes';

class Informacoes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nome: "",
			dataNascimento: "",
			remuneracaoInicial: "",
			percentualContribuicao: "",
			contribuicaoFacultativa: "",
			nascimentoConjugue: "",
			nascimentoFilhoInvalido: "",
			nascimentoFilhoMaisNovo: "",
			idadeAposentadoria: "",
			percentualSaque: "",
			taxaJuros: "1",

			combos: {
				teste: [
					{
						nome: "Opção 1",
						valor: "1"
					},
					{
						nome: "Opção 2",
						valor: "2"
					}
				]
			}
		};
	}
	
	continuar = async () => { 
		this.props.setPaginaAtiva("resultado", this.state);
	}

	render() {
		return (
            <div hidden={this.props.hidden} >
                <h4>Para começar, precisamos de algumas informações sobre você e sua contribuição para o plano CEBPREV!</h4>

				<CampoTexto contexto={this} nome="nome" obrigatorio value={this.state.nome} tipo="text" label={"Digite seu nome"} />

				<CampoTexto contexto={this} mascara={"99/99/9999"} nome="dataNascimento" obrigatorio value={this.state.dataNascimento} 
						    tipo="text" label={"Digite sua data de nascimento"} />

				<CampoTexto contexto={this} nome="remuneracaoInicial" obrigatorio value={this.state.remuneracaoInicial} tipo="text" 
						    label={"Digite sua Remuneração Inicial"} />

				<Combo contexto={this} label={"Escolha o percentual de contribuição entre 5% e 10% (a patrocinadora também contribuirá com o mesmo % para você!)"} 
					   nome="percentualContribuicao" valor={this.state.percentualContribuicao} obrigatorio
					   opcoes={this.state.combos.teste} />

				<CampoTexto contexto={this} label={"Deseja realizar contribuições facultativas? (Contribuição exclusiva do participante)"}
							obrigatorio value={this.state.contribuicaoFacultativa} tipo="text" nome="contribuicaoFacultativa" />
				
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
					   opcoes={this.state.combos.teste} />

				<Combo contexto={this} label={"Você deseja sacar à vista um percentual do seu saldo de contas na concessão do benefício?"} 
					   nome="percentualSaque" valor={this.state.percentualSaque} obrigatorio
					   opcoes={this.state.combos.teste} />

				<Combo contexto={this} label={"Taxa de juros para simulação"} 
					   nome="taxaJuros" valor={this.state.taxaJuros} obrigatorio
					   opcoes={this.state.combos.teste} />

				<h4>Dados válidos somente para essa simulação!</h4>

				<Botao titulo="Enviar" clicar={this.continuar} tipo={"primary"} block={true} usaLoading={true} />
            </div>
    	);
  	}
}

export default Informacoes;
