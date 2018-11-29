import React, { Component } from 'react';
import { Informacoes, Resultado } from './';

class MasterPage extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            pagina: 'informacoes'
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
                <Informacoes ref={this.informacoes} setPaginaAtiva={this.setPaginaAtiva} hidden={this.state.pagina !== 'informacoes'} />
                <Resultado ref={this.resultado} setPaginaAtiva={this.setPaginaAtiva} hidden={this.state.pagina !== 'resultado'} />
            </div>
        );
    }

	render() {
		return (
            <div className="container">
                <div align="center">
                    <img className="logo figure-img" src="imagens/logo.png" alt="" />
                    <h2>Bem vindo ao Simulador de Benefício do Plano CEBPREV</h2>

                </div>

                <div align="center">
                    {this.renderConteudoPagina()}
                </div>
            </div>
    	);
  	}
}

export default MasterPage;
