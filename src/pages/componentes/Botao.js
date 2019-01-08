import React, { Component } from "react";

export default class Botao extends Component {

    constructor(props) {
        super(props);

        this.state = {
            carregando: false
        }
    }

    onClick = async (e) => {
        e.preventDefault();

        if(this.props.usaLoading)
            await this.setState({ carregando: true });

        await this.props.clicar();

        if(this.props.usaLoading)
            await this.setState({ carregando: false });
    }

    render() {
        var sm = this.props.pequeno ? " btn-sm" : "";
        var type = this.props.submit ? "submit" : "button";

        return (
            <button type={type} 
                className={"btn btn-" + this.props.tipo + sm + " " + this.props.className} 
                onClick={this.onClick} disabled={this.props.desativado || this.state.carregando}>
                
                {!this.state.carregando && 
                    this.props.titulo}

                {!this.state.carregando && 
                    this.props.children
                }

                {this.state.carregando &&
                    <i className="fas fa-spinner fa-pulse"></i>}
            </button>
        );
    }

}