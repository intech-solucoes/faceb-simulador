import React, { Component } from 'react';

class Resultado extends Component {
	render() {
		return (
            <div hidden={this.props.hidden}>
                Resultado da simulação
            </div>
    	);
  	}
}

export default Resultado;
