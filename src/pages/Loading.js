import React from 'react';
import '../style/loading.css';

class Loading extends React.Component {
  render() {
    const { typeLoadingClass } = this.props;

    return (
      <div id="container" className={typeLoadingClass}>
        <h1 id='txt-header'>Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
