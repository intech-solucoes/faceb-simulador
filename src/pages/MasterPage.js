import React, { Component } from 'react';
import { Informacoes, Resultado } from './';
import { Row, Col } from './componentes';

class MasterPage extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            pagina: 'informacoes',

            // States página Informacoes
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
            erros: [],

            // States página Resultado
            rendaCurtoPrazo: [
                "226,70",
                "212,53",
                "200,03",
                "188,91",
                "178,97",
                "170,02",
                "161,93",
                "154,57",
                "147,85",
                "141,68",
                "136,02"
            ]
        };

        this.informacoes = React.createRef();
        this.resultado = React.createRef();
    }

    /**
     * @param {string} pagina Pagina do simulador 
     * @description 
     */
    setPaginaAtiva = async (pagina, state) => {
        window.scrollTo(0, 0);

        await this.setState({ state });

        await this.setState({ pagina: pagina});

    }

    renderConteudoPagina = () => {
        return (
            <div>
                <Informacoes ref={this.informacoes} state={this.state} setPaginaAtiva={this.setPaginaAtiva} hidden={this.state.pagina !== 'informacoes'} />
                <Resultado ref={this.resultado} state={this.state} setPaginaAtiva={this.setPaginaAtiva} hidden={this.state.pagina !== 'resultado'} />
            </div>
        );
    }

	render() {
		return (
            <div className="container">
                <div align="center">
                    <img className="logo figure-img" src="imagens/logo.png" alt="" />
                    <h2>Bem vindo ao</h2>
                    <h2>Simulador de Benefício do Plano CEBPREV</h2>
                </div>
                <br />

                <div align="center">
                    {this.renderConteudoPagina()}
                </div>
            </div>
    	);
  	}
}

export default MasterPage;
