import React from 'react';
import '../style/loading.css';

class Loading extends React.Component {
  render() {
    const { typeLoadingClass } = this.props;

    return (
      <div id="container" className={typeLoadingClass}>
        <img src='https://raw.githubusercontent.com/ts-dart/TTunes/main/public/images/loading.gif' />
      </div>
    );
  }
}

export default Loading;
