import React from 'react';
import '../style/loading.css';

class Loading extends React.Component {
  render() {
    const { typeLoadingClass } = this.props;

    return (
      <div id="container" className={typeLoadingClass}>
        <img src='images/loading.gif' />
      </div>
    );
  }
}

export default Loading;
