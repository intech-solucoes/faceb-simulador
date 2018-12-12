import React from 'react';

/**
 * @returns Componente com o botão de informações.
 * @description Classe responsável pela renderização e comportamentos do botão de informações, que abre uma modal com o texto enviado.
 */
export default class TituloResultado extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisivel: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    /**
     * @description Método que renderiza a Modal com o texto enviado pela props 'textoModal'. A Modal é renderizada apenas se o state 'modalVisivel' for true,
     * alterado pelo método toggleModal() chamado no onClick do Botao de Ajuda.
     */
    renderModal() {
        if (this.state.modalVisivel) {
            return (
                <div className="modal" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="basicPercentModalTitle">Informações</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.toggleModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.textoModal}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal()}>Ok, entendi!</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return <div></div>
        }
    }

    toggleModal() {
        this.setState({ modalVisivel: !this.state.modalVisivel });
    }

    render() {
        return (
            <div className="row">
                <h5><b>{this.props.titulo}</b></h5>

                {this.props.usaBotaoInfo &&
                    <button type="button" className="btn rounded-circle btn-informacao text-white" onClick={() => this.toggleModal()}>
                        <i className="fas fa-info"></i>
                    </button>
                }

                <hr />

                {this.renderModal()}
            </div>
        );
    }
}
