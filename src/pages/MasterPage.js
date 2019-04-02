import React, { Component } from 'react';
import { Informacoes, Resultado } from './';
import packageJson from '../../package.json';

class MasterPage extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            pagina: 'informacoes',

            // States página Informacoes
			nome: "",
            dataNascimento: "",
            sexo: "M",
			remuneracaoInicial: "",
			percentualContribuicao: "",
            contribuicaoFacultativa: "0,00",
            aporte: "0,00",
			nascimentoConjuge: "",
			nascimentoFilhoInvalido: "",
			sexoFilhoInvalido: "",
			nascimentoFilhoMaisNovo: "",
			sexoFilhoMaisNovo: "",
			idadeAposentadoria: "",
			percentualSaque: "",
            taxaJuros: "",
            
            // States de erros
            erros: [],
            erroDataNascimento: false,
            erroNascimentoConjuge: false,
            erroNascimentoFilhoInvalido: false,
            erroNascimentoFilhoMaisNovo: false,

            // States página Resultado
            valorFuturo: "",
            dataAposentadoria: "",
            valorSaque: "",
            idadeDependente: "",
            fatorAtuarialPensaoMorte: "",
            fatorAtuarialSemPensaoMorte: "",
            rendaPrazoIndeterminadoPensaoMorte: "",
            rendaPrazoIndeterminadoSemPensaoMorte: "",
            listaPrazos: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            listaSaldoPercentuais: [{}, {}, {}, {}]
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

        await this.setState(state);

        await this.setState({ pagina: pagina });

        if(pagina === 'informacoes')
            this.informacoes.current.onVisible(this.state);
        else if(pagina === 'resultado') 
            this.resultado.current.onVisible(this.state);

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
                    <h2>Bem-vindo ao</h2>
                    <h2>Simulador de Benefício do Plano CEBPREV</h2>
                </div>
                <br />

                <div align="center">
                    {this.renderConteudoPagina()}
                </div>

                <div align="center" className={"mt-5"}>
                    Simulador Faceb v{packageJson.version}
                </div>
            </div>
    	);
  	}
}

export default MasterPage;
