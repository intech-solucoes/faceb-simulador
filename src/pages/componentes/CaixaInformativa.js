import React, { Component } from 'react';
import { Row, Col } from './';

export default class CaixaInformativa extends Component {

    render() {
        return (
            <div className="card">
                <Row>
                    <Col tamanho="2">
                        <h1 className="card-title">
                            <i className="fas fa-info-circle text-secondary" />
                        </h1>
                    </Col>
                    <Col>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.texto}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
