import React, { Component } from 'react';
import { Informacoes, Resultado } from './';

class MasterPage extends Component {
	render() {
		return (
            <div className="container">
                <div align="center">
                    <img className="logo figure-img" src="imagens/logo.png" alt="" />
                    <h2>Bem vindo ao Simulador de Benefício do Plano CEBPREV</h2>

                    {/* {this.renderAbaPassos()} */}
                </div>

                {/* {this.renderConteudoPassos()} */}
            </div>
    	);
  	}
}

export default MasterPage;
